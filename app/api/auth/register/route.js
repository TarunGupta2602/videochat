import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { User } from '../../../models/User';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
    
    // Update status to online
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 