import { createRequestHandler } from '@react-router/cloudflare';
import type { ExecutionContext } from '@cloudflare/workers-types';

export type Env = unknown;

declare module 'react-router' {
  interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const requestHandler = createRequestHandler({
      build: () => import('virtual:react-router/server-build'),
      getLoadContext: () => ({
        cloudflare: { env, ctx },
      }),
    });

    return requestHandler(request);
  },
};
