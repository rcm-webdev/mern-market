# SignCast

SignCast, a full-stack digital signage app. Built with Node, Mongo, Express and React featuring JWT auth. Users can create, read, update, and delete advertisements with a clean, responsive interface.

Link to project: [will update with a link to project]

![SignCast](frontend/public/signcast.png)

## Technologies used

### Authentication
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Frameworks and Libraries used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Testing Routes and JavaScript application

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


## Futre Optimizations

- **Refresh Tokens**: Currently do not have any refresh tokens implemented, but if I wanted to increase security on my appication, I can consider implementing shorter session requirements (re-authenticate more frequently) which I think would be the low hanging fruit



## Lessons Learned


## Getting Started

### Configure you environment variables
```
PORT = "30000" or whatever you want
DB_STRING="insert db connection string with mongodb"
FRONTEND_URL="your frontend url"

# Authentication
JWT_SECRET="secret-key"
```

### Generate JWT_SECRET Key
#### Generate a random 256-bit (32-byte) key in base64
```bash
openssl rand -base64 32
```

### Start the backend
```bash
npm install
npm run dev
```

### Start the frontend
```bash
npm install
npm run dev
```

