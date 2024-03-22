export const authRoutes = {
  // lazy: async () => {
  // const { AuthLayout } = await import('@components/layout/AuthLayout');
  // return { Component: AuthLayout };
  // },
  children: [
    {
      path: 'signin',
      lazy: async () => {
        const { SigninPage } = await import('@pages/auth/SigninPage');
        return { Component: SigninPage };
      },
    },
    {
      path: 'signout',
      lazy: async () => {
        const { SignoutPage } = await import('@pages/auth/SignoutPage');
        return { Component: SignoutPage };
      },
    },
  ],
};
