import http from 'node:http';

const routes = {
  '/health': { status: 'ok', service: 'api-gateway' },
  '/api/v1': {
    modules: [
      'auth/jwt-refresh-rbac',
      'organizations-hierarchy',
      'documents-lifecycle',
      'workflows-approvals',
      'ai-analysis-automation',
      'search-semantic-elasticsearch',
      'audit-compliance-monitoring'
    ]
  }
};

const server = http.createServer((req, res) => {
  const body = routes[req.url] ?? { error: 'not_found' };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
});

server.listen(4000, () => {
  console.log('OSAI API listening on :4000');
});
