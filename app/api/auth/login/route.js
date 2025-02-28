import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { User } from '../../../models/User';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const user = await User.findByEmail(email);
    
    if (!user || !(await User.comparePassword(user.password, password))) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update user status
    await User.updateStatus(user.id, 'online');
    
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        username: user.username 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 