import { defineEventHandler, createError, type H3Event } from 'h3'

interface TransformedRatingData {
  rating365: number;
  count365: number;
  overallCount: number;
  calculatedAt: string;
  reviews: Array<{
    name: string;
    title: string;
    comment: string;
    rating: number;
    submittedAt: string;
  }>;
}

export default defineEventHandler(async (event: H3Event): Promise<TransformedRatingData> => {  
  const clientId = process.env.TRUSTED_SHOPS_CLIENT_ID;
  const clientSecret = process.env.TRUSTED_SHOPS_CLIENT_SECRET;
  const channelId = process.env.TRUSTED_SHOPS_CHANNEL_ID;

  if (!clientId || !clientSecret || !channelId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Trusted Shops credentials not configured',
    })
  }

  try {
    // Get OAuth token
    const tokenResponse = await $fetch<{ access_token: string }>(
      'https://login.etrusted.com/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          audience: 'https://api.etrusted.com',
        }).toString(),
      }
    )

    const accessToken = tokenResponse.access_token
    const headers = { 'Authorization': `Bearer ${accessToken}` }

    // Fetch reviews and aggregate ratings in parallel
    const [reviewsResponse, aggregateResponse] = await Promise.all([
      $fetch<any>('https://api.etrusted.com/reviews?count=20&status=APPROVED', {
        headers,
      }),
      
      $fetch<any>(`https://api.etrusted.com/channels/${channelId}/service-reviews/aggregate-rating`, {
        headers,
      }),
    ])

    // console.log('Raw reviews response:', reviewsResponse)
    // console.log('Raw aggregate response:', aggregateResponse)

    // Transform to match your component's interface
    const transformedData: TransformedRatingData = {
      rating365: aggregateResponse['365days']?.rating || 0,
      count365: aggregateResponse['365days']?.count || 0,
      overallCount: aggregateResponse.overall?.count || 0,
      calculatedAt: aggregateResponse.overall.period.calculatedAt,
      reviews: reviewsResponse.items?.map((item: any) => ({
        name: item.customer?.firstName
          ? item.customer.lastName 
            ? `${item.customer.firstName} ${item.customer.lastName[0]}.`
            : item.customer.firstName
          : 'Community-Mitglied',
        title: item.title || '',
        comment: item.comment || '',
        rating: item.rating || 5,
        submittedAt: item.createdAt || item.submittedAt || new Date().toISOString(),
      })) || []
    }

    // console.log('Transformed data:', transformedData)

    return transformedData
    
  } catch (error: any) {
    console.error('eTrusted API error details:', {
      message: error.message,
      status: error.status,
      data: error.data,
    })
    
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.data?.message || error.message || 'Failed to fetch Trusted Shops ratings',
    })
  }
})