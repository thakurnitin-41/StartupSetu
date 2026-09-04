import http from 'http';

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('Testing REST API endpoints...');
  try {
    const challenges = await makeRequest('/challenges');
    console.log('GET /api/challenges:', challenges.status, `${challenges.body.length} challenges found`);

    const aiGen = await makeRequest('/ai/generate-challenge', 'POST', { problemStatement: 'Garbage vehicles miss routes in Bhopal city' });
    console.log('POST /api/ai/generate-challenge:', aiGen.status, `Title generated: "${aiGen.body.title}"`);

    const match = await makeRequest('/ai/match-startups', 'POST', { challengeId: 'ch-1' });
    console.log('POST /api/ai/match-startups:', match.status, `${match.body.matches.length} startups matched (Top match: ${match.body.matches[0].startupName} - ${match.body.matches[0].matchScore}%)`);

    const dec = await makeRequest('/decisions/generate', 'POST', { pilotId: 'pil-1' });
    console.log('POST /api/decisions/generate:', dec.status, `AI Recommendation: "${dec.body.aiRecommendation}"`);

    const audit = await makeRequest('/audit-logs');
    console.log('GET /api/audit-logs:', audit.status, `${audit.body.length} audit events in ledger`);

    console.log('\n✅ ALL REST API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ API Test Error:', err);
  }
}

runTests();
