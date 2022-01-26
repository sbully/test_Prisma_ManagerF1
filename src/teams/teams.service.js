import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const TeamsService = {
  insert: (team) => prisma.team.create({ data: { ...team } }),
  getAll: () => prisma.team.findMany(),
  getById: (id) => prisma.team.findUnique({ where: { id } }),
  update: (id, team) =>
    prisma.team.update({ where: { id }, data: { ...team } }),
  deleteById: (id) => prisma.team.delete({ where: { id } }),
};

export default TeamsService;
