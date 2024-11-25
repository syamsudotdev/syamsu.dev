import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('/posts', [
    index('routes/posts.tsx'),
    route(':slug', 'routes/post.tsx'),
  ]),
] satisfies RouteConfig;
