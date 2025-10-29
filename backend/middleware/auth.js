import { verifyToken } from '../utils/jwt.js';

// Authentication middleware
export async function authMiddleware(c, next) {
  try {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json({ error: 'Invalid or expired token' }, 401);
    }

    // Set user data in context
    c.set('userId', payload.userId);
    c.set('userEmail', payload.email);
    c.set('userType', payload.user_type);
    c.set('isAdmin', payload.is_admin === 1);

    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Authentication failed' }, 401);
  }
}

// Admin middleware
export async function adminMiddleware(c, next) {
  const isAdmin = c.get('isAdmin');

  if (!isAdmin) {
    return c.json({ error: 'Admin access required' }, 403);
  }

  await next();
}

// Optional auth middleware (doesn't fail if no token)
export async function optionalAuthMiddleware(c, next) {
  try {
    const authHeader = c.req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = await verifyToken(token, c.env.JWT_SECRET);

      if (payload) {
        c.set('userId', payload.userId);
        c.set('userEmail', payload.email);
        c.set('userType', payload.user_type);
        c.set('isAdmin', payload.is_admin === 1);
      }
    }
  } catch (error) {
    // Silently fail for optional auth
    console.log('Optional auth failed:', error);
  }

  await next();
}
