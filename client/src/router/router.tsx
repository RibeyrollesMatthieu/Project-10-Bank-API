import { appRoutes } from '@router/appRoutes';
import { authRoutes } from '@router/authRoutes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { MainLayout } = await import('@components/layout/MainLayout');
      return { Component: MainLayout };
    },
    children: [
      appRoutes,
      authRoutes,
      /* 404 handling */
      // {
      //   path: '*',
      //   lazy: async () => {
      //     const { NotFound } = await import('@components/pages/NotFoundPage');
      //     return { Component: NotFound };
      //   },
      // },
    ],
  },
]);
