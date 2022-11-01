import { createRouter } from './context';
import superjson from 'superjson';

import { protectedSnippetsRouter, snippetsRouter } from './snippets-router';
import { projectsRouter, protectedProjectsRouter } from './projects-router';
import { experiencesRouter, protectedExperiencesRouter } from './experiences-router';
import { languagesRouter, protectedLanguagesRouter } from './languages-router';
import { postsRouter, protectedPostsRouter } from './posts-router';
import { bookmarksRouter, protectedBookmarksRouter } from './bookmarks-router';
import { contactRouter } from './contact-router';
/**
 * I'll keep it just in case
 */
// import { usersRouter } from './users-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('snippets.', snippetsRouter)
  .merge('protected.snippets.', protectedSnippetsRouter)
  .merge('projects.', projectsRouter)
  .merge('protected.projects.', protectedProjectsRouter)
  .merge('experiences.', experiencesRouter)
  .merge('protected.experiences.', protectedExperiencesRouter)
  .merge('languages.', languagesRouter)
  .merge('protected.languages.', protectedLanguagesRouter)
  .merge('posts.', postsRouter)
  .merge('protected.posts.', protectedPostsRouter)
  .merge('bookmarks.', bookmarksRouter)
  .merge('protected.bookmarks.', protectedBookmarksRouter)
  .merge('contacts.', contactRouter);
// .merge('users', usersRouter);

export type AppRouter = typeof appRouter;
