This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### 1. Prerequisites
- Install [node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/)
- Install node packages by opening a command-line terminal and navigating to the `lean_techniques_coding_challenge_web` folder. Run the following command to install all project requirements:
```bash
npm install
```
### 2. Environment configuration
Copy the `.env.example` file to `.env`. Update the containing environment variables as needed. The available variables are as follows:<br /><br />

`API_URL`: URI Location of the backend API service. By default this should be set to `https://jsonplaceholder.typicode.com/photos` and will point to the default location of the photo album API.<br /><br />

`DEFAULT_TIMEOUT`: Default timeout time in milliseconds for requests made to the API service. By default, this timeout is set to 30 seconds.

### 3. Run the app

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
