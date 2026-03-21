/**
 * Creates the authorized admin user.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/create-admin.ts
 * Or: npx tsx scripts/create-admin.ts
 */
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const AUTHORIZED_EMAIL = 'kumailkmr.dev@gmail.com';
const AUTHORIZED_PASSWORD = 'Wabbit@admin25?.';

async function main() {
  const prisma = new PrismaClient();

  const hashedPassword = await hash(AUTHORIZED_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: AUTHORIZED_EMAIL },
    update: { password: hashedPassword, role: 'ADMIN', name: 'Admin' },
    create: {
      email: AUTHORIZED_EMAIL,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created/updated successfully:', AUTHORIZED_EMAIL);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
