import LoginView from '../views/loginView';
import RegistrationView from '../views/registarationView';
import ChatView from '../views/chatView';
type route = { path: string; view: () => void };

const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};
const router = async () => {
  const root = document.getElementById('app')!;
  const routes: Array<route> = [
    {
      path: '/',
      view: () => new LoginView(root).render(),
    },
    {
      path: '/login',
      view: () => new LoginView(root).render(),
    },
    {
      path: '/registration',
      view: () => new RegistrationView(root).render(),
    },
    {
      path: '/chat',
      view: () => new ChatView(root).render(),
    },
    {
      path: '/notFound',
      view: () => console.log('not found'),
    },
  ];
  const matchedRoutes = routes.map((route) => {
    return {
      route,
      requested: location.pathname === route.path,
    };
  });
  let requestedRoute = matchedRoutes.find((route) => route.requested);
  requestedRoute =
    requestedRoute !== undefined
      ? requestedRoute
      : {
          route: routes[routes.length - 1],
          requested: true,
        };

  requestedRoute.route.view();
};

export { router, navigateTo };
