import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.model.deleteMany();
    await prisma.model.createMany({ data: [] });
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
