import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const DriversService = {
  insert: (driver) => prisma.driver.create({ data: { ...driver } }),
  getAll: () => prisma.driver.findMany(),
  getById: (id) => prisma.driver.findUnique({ where: { id } }),
  update: (id, driver) =>
    prisma.driver.update({ where: { id }, data: { ...driver } }),
  deleteById: (id) => prisma.driver.delete({ where: { id } }),
};

export default DriversService;
