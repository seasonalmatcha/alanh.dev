import { createRouter } from './context';
import superjson from 'superjson';

import { snippetsRouter } from './snippets-router';

export const appRouter = createRouter().transformer(superjson).merge('snippets.', snippetsRouter);

export type AppRouter = typeof appRouter;
