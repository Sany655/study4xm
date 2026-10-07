const allowedOrigins = new Set([
  'https://study4xm.web.app',
  'https://study4xm.firebaseapp.com',
  'https://localhost',
  'capacitor://localhost'
]);

function applyCors(req, res, methods) {
  const configuredAppUrl = process.env.PUBLIC_APP_URL;
  if (configuredAppUrl) allowedOrigins.add(new URL(configuredAppUrl).origin);
  if (process.env.NODE_ENV !== 'production') allowedOrigins.add('http://localhost:5173');

  const origin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', methods.join(', '));

  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ message: 'This origin is not allowed.' });
    return false;
  }
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return false;
  }

  return true;
}

async function requireUser(req, res, auth) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) {
    res.status(401).json({ message: 'Sign in to continue.' });
    return null;
  }

  try {
    return await auth.verifyIdToken(token);
  } catch {
    res.status(401).json({ message: 'Your session has expired. Sign in again.' });
    return null;
  }
}

module.exports = { applyCors, requireUser };
