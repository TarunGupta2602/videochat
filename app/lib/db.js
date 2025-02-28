import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['query'],
  });
}

const prisma = globalForPrisma.prisma;

export default prisma; 