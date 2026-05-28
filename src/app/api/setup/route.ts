import { NextResponse } from "next/server";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Run migration
    const migrateOutput = execSync("npx prisma migrate deploy", {
      encoding: "utf-8",
      stdio: "pipe",
    });

    // Run seed
    const seedOutput = execSync("npx tsx scripts/seed.ts", {
      encoding: "utf-8",
      stdio: "pipe",
    });

    return NextResponse.json({
      success: true,
      migrate: migrateOutput,
      seed: seedOutput,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        stderr: (error as Error & { stderr?: string }).stderr,
      },
      { status: 500 }
    );
  }
}
