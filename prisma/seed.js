import teamList from "./seed/teams.seed";
import driverList from "./seed/drivers.seed";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  await prisma.team.createMany({ data: teamList });
  await prisma.driver.createMany({ data: driverList });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
