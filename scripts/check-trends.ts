import { prisma } from "../src/lib/prisma";

async function main() {
  const trends = await prisma.trend.findMany({
    select: { slug: true, title: true },
    take: 20,
  });
  console.log("Trends in database:");
  trends.forEach(t => console.log(`- ${t.slug}: ${t.title}`));
}

main().catch(console.error);
