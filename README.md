# Kumail Kmr - Full-Stack Developer Portfolio

![Portfolio Screenshot](/public/screenshot.png)

A modern, high-conversion developer portfolio built to showcase projects, share insights through a blog, and attract new clients. Designed with a premium dark-mode aesthetic.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Forms & Validation**: React Hook Form + Zod

## Features

- **Interactive Terminal Loading Animation**: A unique code-typing loading screen.
- **Dynamic Projects Showcase**: Displays major works alongside measurable metrics (e.g., revenue generated).
- **Integrated Blog**: Share articles and insights directly within the platform.
- **Admin Dashboard**: Secure backend to manage projects, blog posts, testimonials, and user metrics.
- **Contact System**: Fully functional contact form to handle client inquiries.
- **Responsive & Accessible**: Optimized for seamless viewing across all devices.

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up your `.env` file with your database and NextAuth credentials (see `.env.example`).
4. Run Prisma migrations:
```bash
npx prisma db push
```
5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## License

This project is open-source and available under the [MIT License](LICENSE).
