# SignCast Application

SignCast, a full-stack digital signage app. Built with Node, Mongo, Express and React featuring JWT auth. Users can create, read, update, and delete advertisements with a clean, responsive interface.

Link to project: [will update with a link to project]

[Screenshot placeholder - will add a screenshot when available]

## How It's Made

**Tech used:** MongoDB, Express.js, React.js, Node.js, JWT, bcrypt, DaisyUI, Vite



## Futre Optimizations

- **REST API Design**: Implemented proper RESTful endpoints with appropriate HTTP methods and status codes
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

