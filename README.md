<h1 align="center">
  <div>
    <p>NLW Polls</p>
  </div>
  <div>
    <img src="https://img.shields.io/badge/-Node.js-34740A" />
    <img src="https://img.shields.io/badge/-TypeScript-3178c6" />
    <img src="https://img.shields.io/badge/-Prisma-5a67d8" />
    <img src="https://img.shields.io/badge/-Fastify-202020" />
    <img src="https://img.shields.io/badge/-Web%20Sockets-8cb4ff" />
  </div>
</h1>

## ✨ Description

This Node.js API creates polls and updates the votes in real time using web sockets.

Developed with 💜 during the Next Level Week - Node.js by Rocketseat.

## 🚀 Technologies
-  TypeScript (programming language)
-  Node.js
-  Fastify (web framework)
-  Prisma (ORM)
  -  PostgreSQL (database)
  -  Redis (database)
-  Zod (data validation)
-  Cookies (user identification => 1 vote per person per poll)
-  Web Sockets (bidirectional connections => update votes in real time)

## 💻 Installation

> Make sure you have Node.js and Docker installed on your machine.

1. Clone this repository <br />
```bash
git clone https://github.com/renatomarquesteles/nlw-expert-node.git
```
2. Install the project dependencies <br />
```bash
npm install
```
3. Run the docker compose script to create your databases <br />
```bash
docker compose up -d
```
4. Run the migrations to create the tables on the database <br />
```bash
npx prisma migrate dev
```
5. Run the server, it'll start at `http://localhost:3333`
```bash
npm run dev
```

## 🌟 Requests Examples

1. Create a poll
```http
POST http://localhost:3333/polls
Content-Type: application/json

{
  "title": "What's the best Node.js framework?",
  "options": ["Express", "Fastify", "NestJS", "HapiJS"]
}
```
2. Get a poll
```http
GET http://localhost:3333/polls/:pollId
```
3. Vote on a poll
```http
POST http://localhost:3333/polls/:pollId/votes
Content-Type: application/json

{
  "pollOptionId": "acb2db24-8946-4c1d-9194-a7d1ad2f4962"
}
```
4. Connect with a poll via websocket to get votes in real time
```http
ws://localhost:3333/polls/4e09d7ba-e8d2-47bb-9f8c-b34622e74da3/results
```
