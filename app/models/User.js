import prisma from '../lib/db';
import bcrypt from 'bcryptjs';

export const User = {
  async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      },
    });
  },

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  },

  async getOnlineUsers(excludeUserId) {
    return prisma.user.findMany({
      where: {
        AND: [
          { status: 'online' },
          { id: { not: excludeUserId } }
        ]
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        status: true,
        lastSeen: true,
      },
    });
  },

  async updateStatus(userId, status) {
    return prisma.user.update({
      where: { id: userId },
      data: { 
        status,
        lastSeen: new Date()
      },
    });
  },

  async comparePassword(hashedPassword, candidatePassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}; 