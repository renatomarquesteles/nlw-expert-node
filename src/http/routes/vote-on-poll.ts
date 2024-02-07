import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import { prisma } from '../../lib/prisma';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);

    let { sessionId } = request.cookies;

    if (sessionId) {
      const previousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: { sessionId, pollId },
        },
      });

      if (previousVoteOnPoll) {
        const isNewVoteDifferent =
          pollOptionId !== previousVoteOnPoll.pollOptionId;

        if (isNewVoteDifferent) {
          await prisma.vote.delete({
            where: { id: previousVoteOnPoll.id },
          });
        } else {
          return reply.status(400).send({
            message: 'You already voted on this poll',
          });
        }
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/', // every route can have access to this cookie
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true, // the user won't be able to change it
        httpOnly: true, // only the server can access this cookie
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    return reply.status(201).send();
  });
}
