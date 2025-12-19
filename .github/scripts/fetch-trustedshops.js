const fs = require('fs');
const path = require('path');

async function fetchTrustedShopsData() {
  const clientId = process.env.TRUSTED_SHOPS_CLIENT_ID;
  const clientSecret = process.env.TRUSTED_SHOPS_CLIENT_SECRET;
  const channelId = process.env.TRUSTED_SHOPS_CHANNEL_ID;

  try {
    // Get OAuth token
    const tokenResponse = await fetch('https://login.etrusted.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: 'https://api.etrusted.com',
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const headers = { 'Authorization': `Bearer ${accessToken}` };

    // Fetch reviews and ratings
    const [reviewsResponse, aggregateResponse] = await Promise.all([
      fetch('https://api.etrusted.com/reviews?count=20&status=APPROVED', { headers }).then(r => r.json()),
      fetch(`https://api.etrusted.com/channels/${channelId}/service-reviews/aggregate-rating`, { headers }).then(r => r.json()),
    ]);

    // Transform data
    const transformedData = {
      rating365: aggregateResponse['365days']?.rating || 0,
      count365: aggregateResponse['365days']?.count || 0,
      overallCount: aggregateResponse.overall?.count || 0,
      calculatedAt: aggregateResponse.overall?.period?.calculatedAt || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      reviews: reviewsResponse.items?.map((item) => ({
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
    };

    // Save to file
    const outputPath = path.join(__dirname, '../../apps/web/public/trustedshops-data.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(transformedData, null, 2));

    console.log('✅ Trusted Shops data updated successfully');
    console.log(`📊 ${transformedData.reviews.length} reviews fetched`);
    console.log(`⭐ Rating: ${transformedData.rating365}`);
  } catch (error) {
    console.error('❌ Error fetching Trusted Shops data:', error);
    process.exit(1);
  }
}

fetchTrustedShopsData();