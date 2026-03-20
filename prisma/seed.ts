import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const settings = [
    { key: 'site_name', value: 'KK Portfolio', label: 'Site Name', group: 'General' },
    { key: 'admin_email', value: 'kumailkmr.dev@gmail.com', label: 'Admin Email', group: 'General' },
    { key: 'site_desc', value: 'Creative Developer & Designer specializing in premium web experiences.', label: 'Description', group: 'General' },
    { key: 'branding_color', value: '#3b82f6', label: 'Brand Color', group: 'Appearance' },
    { key: 'theme', value: 'system', label: 'Theme Mode', group: 'Appearance' },
    { key: 'twitter', value: 'https://twitter.com/kumailkmr', label: 'Twitter', group: 'Social' },
    { key: 'github', value: 'https://github.com/kumailkmr', label: 'GitHub', group: 'Social' },
    { key: 'linkedin', value: 'https://linkedin.com/in/kumailkmr', label: 'LinkedIn', group: 'Social' },
  ];

  console.log('Seeding system settings...');
  for (const s of settings) {
    await prisma.systemSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log('Seeding initial admin user...');
  // Note: Password hashing should happen here if you were creating a new user, 
  // but we assume the user already exists from the first step of this task.
  
  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
