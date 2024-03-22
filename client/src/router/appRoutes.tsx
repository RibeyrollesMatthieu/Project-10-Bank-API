export const appRoutes = {
  // lazy: async () => {
  //   /* layout */
  // },
  children: [
    {
      path: '',
      lazy: async () => {
        const { LandingPage } = await import('@pages/app/LandingPage');
        return { Component: LandingPage };
      },
    },
    {
      path: 'profile',
      lazy: async () => {
        const { ProfilePage: ProfilePage } = await import('@pages/app/ProfilePage');
        return { Component: ProfilePage };
      },
    },
  ],
};
