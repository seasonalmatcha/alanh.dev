import type { AppRouter } from '@/server/router';
import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';
import { createReactQueryHooks } from '@trpc/react';

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationInput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;
