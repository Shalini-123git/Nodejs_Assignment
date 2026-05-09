# School Management API

REST API built with **Node.js**, **Express.js**, and **MySQL** to add schools and retrieve them sorted by proximity.

---

## Setup

```bash
npm install
cp .env.example .env   # fill in your MySQL credentials
node db/createTable.js # create the schools table
node server.js         # start the server
```

---

## Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mydb
```

---

## API Endpoints

### POST `/addSchool`
Adds a new school with validation.

**Body:**
```json
{
  "name": "DPS School",
  "address": "New Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

### GET `/listSchool`
Returns all schools sorted by distance from user's location.

**Query Params:**
```
/listSchools?latitude=28.70&longitude=77.10
```

---

## Tech Stack
- Node.js + Express.js
- MySQL (`mysql2`)
- `express-validator`, `dotenv`