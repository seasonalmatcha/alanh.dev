import { createRouter } from './context';
import superjson from 'superjson';

import { snippetsRouter } from './snippets-router';
import { projectsRouter } from './projects-router';
import { experiencesRouter } from './experiences-router';
import { languagesRouter } from './languages-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('snippets.', snippetsRouter)
  .merge('projects.', projectsRouter)
  .merge('experiences.', experiencesRouter)
  .merge('languages.', languagesRouter);

export type AppRouter = typeof appRouter;
