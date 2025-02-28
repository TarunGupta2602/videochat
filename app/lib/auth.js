import { verify } from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function getTokenFromHeader(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  return authHeader.split(' ')[1];
} 