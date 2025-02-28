import { NextResponse } from 'next/server';
import { User } from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

export async function GET(request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const onlineUsers = await User.getOnlineUsers(decoded.userId);
    
    return NextResponse.json({ success: true, users: onlineUsers });
  } catch (error) {
    console.error('Error fetching online users:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 