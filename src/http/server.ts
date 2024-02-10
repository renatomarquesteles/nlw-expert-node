import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';

import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollResults } from './websockets/poll-results';

const app = fastify();

app.register(fastifyCookie, {
  secret: 'polls-app-21309123', // this code is used to sign the cookies and prevent users from modifying them.
  hook: 'onRequest',
});

app.register(fastifyWebsocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server listening on port 3333');
});
