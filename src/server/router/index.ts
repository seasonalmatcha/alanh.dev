import { createRouter } from './context';
import superjson from 'superjson';

import { protectedSnippetsRouter, snippetsRouter } from './snippets-router';
import { projectsRouter } from './projects-router';
import { experiencesRouter } from './experiences-router';
import { languagesRouter } from './languages-router';
/**
 * I'll keep it just in case
 */
// import { usersRouter } from './users-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('snippets.', snippetsRouter)
  .merge('protected.snippets.', protectedSnippetsRouter)
  .merge('projects.', projectsRouter)
  .merge('experiences.', experiencesRouter)
  .merge('languages.', languagesRouter);
// .merge('users', usersRouter);

export type AppRouter = typeof appRouter;
