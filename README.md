# EcoTrack

EcoTrack is a web application designed to help users track their carbon footprint and water usage, providing insights and tips to promote environmentally friendly habits.

## Features

- Track Carbon Footprint: Monitor your carbon emissions from various activities such as transportation, electricity usage, and more.
- Water Usage Tracking: Keep track of your water consumption across different categories like drinking, cooking, bathing, and washing.
- Environmental/WHO Tips: Get personalized eco-friendly tips and suggestions to reduce your environmental impact.
- Global, Local, Top Environment News & Events: Stay informed about global environmental news and events shaping our future.

## Technologies Used

- React.js: Frontend library for building user interfaces.
- Node.js: Backend runtime environment for running JavaScript code server-side.
- MongoDB: NoSQL database for storing user data.
- Express.js: Web application framework for Node.js.
- Material-UI: React component library for styling user interfaces.

## Getting Started

### Client/Frontend

1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file with the following environment variables:

```plaintext
REACT_APP_BASE_URL_ADMIN=http://localhost:3011/admin
REACT_APP_BASE_URL=http://localhost:3011
```
4. Run `npm run start` to start the frontend server.
   
### Server/Backend
1. Navigate to the server directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following environment variables:
   
```plaintext
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.w6slea8.mongodb.net/ecotrack?retryWrites=true&w=majority"
PORT=3011
JWT_SECRET=secr1235
```

4. Run `npm run dev` to start the backend server.
