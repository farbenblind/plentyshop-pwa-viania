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
  const config = useRuntimeConfig()
  
  const clientId = String(config.trustedShopsClientId || '');
  const clientSecret = String(config.trustedShopsClientSecret || '');
  const channelId = String(config.trustedShopsChannelId || '');

  // DETAILED LOGGING FOR PRODUCTION DEBUG
  console.log('=== TRUSTED SHOPS API DEBUG ===')
  console.log('Environment check:', {
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    hasChannelId: !!channelId,
    clientIdLength: clientId?.length,
    clientSecretLength: clientSecret?.length,
    channelIdLength: channelId?.length,
  })
  console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('TRUSTED')))

  if (!clientId || !clientSecret || !channelId) {
    console.error('MISSING CREDENTIALS!')
    throw createError({
      statusCode: 500,
      statusMessage: `Missing credentials: clientId=${!!clientId}, clientSecret=${!!clientSecret}, channelId=${!!channelId}`,
    })
  }

  try {
    console.log('Step 1: Requesting OAuth token...')
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
    console.log('Step 1: Token received successfully')

    const accessToken = tokenResponse.access_token
    const headers = { 'Authorization': `Bearer ${accessToken}` }

    console.log('Step 2: Fetching reviews and ratings...')
    const [reviewsResponse, aggregateResponse] = await Promise.all([
      $fetch<any>('https://api.etrusted.com/reviews?count=20&status=APPROVED', {
        headers,
      }),
      
      $fetch<any>(`https://api.etrusted.com/channels/${channelId}/service-reviews/aggregate-rating`, {
        headers,
      }),
    ])
    console.log('Step 2: Data fetched successfully')

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

    console.log('Step 3: Transformation complete, returning data')
    return transformedData
    
  } catch (error: any) {
    console.error('=== ERROR IN TRUSTED SHOPS API ===')
    console.error('Error message:', error.message)
    console.error('Error status:', error.status)
    console.error('Error data:', error.data)
    console.error('Full error:', JSON.stringify(error, null, 2))
    
    throw createError({
      statusCode: error.status || 500,
      statusMessage: `TS API Error: ${error.message}`,
    })
  }
})