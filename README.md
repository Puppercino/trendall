## Getting Started
Before starting, make sure you have [Node.js 20 LTS or later](https://nodejs.org/en/) installed on your machine.

First, install dependencies by running this npm command in the root directory of the project:

```bash
npm install
```

### Local Development

To run the development server, first create a `.env.local` file in the root directory based on the `.env.example` file. 
Then, add your own environment variables to the file.

```dotenv
# MongoDB URI here (include port).
DB_URI=
DB_NAME=
DB_USER=
DB_PASS=

# Base API route
NEXT_PUBLIC_API_URL=

# If you're using Amazon Cognito, fill in these fields.
# You can find these values in the client settings of your user pool.
# More information here: https://next-auth.js.org/providers/cognito
COGNITO_CLIENT_ID=
COGNITO_CLIENT_SECRET=
COGNITO_ISSUER=

# Project's production domain and secret for NextAuth.
# Trendall Project will not run in production without these variables.
# More information here: https://next-auth.js.org/configuration/options#secret
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Then, run the development server for testing:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production

**STOP!** Before continuing, read the [deployment guide](https://nextjs.org/docs/deployment) for Next.js. 

You can deploy Trendall using node.js and a reverse proxy like Nginx or Apache so that you can keep the Mongo database 
within the local network.

After reading the deployment guide and setting up your production environment with secure settings, run the following 
commands:

```bash

# Build production optimised version of Trendall.
npm run build

# Start the production server.
npm run start

```
