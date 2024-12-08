import LoginView from '../views/loginView';
import RegistrationView from '../views/registarationView';
import ChatView from '../views/chatView';
import ProfileView from '../views/profileView';
import NotFoundView from '../views/notFoundView';
import ServerErrorview from '../views/serverErrorView';
import ProfileEditData from '../views/profileEditDataView';
import ProfileEditPassword from '../views/profileEditPasswordView';
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
      path: '/profile',
      view: () => new ProfileView(root).render(),
    },
    {
      path: '/profile/edit/data',
      view: () => new ProfileEditData(root).render(),
    },
    {
      path: '/profile/edit/password',
      view: () => new ProfileEditPassword(root).render(),
    },
    {
      path: '/notFound',
      view: () => new NotFoundView(root).render(),
    },
    {
      path: '/serverError',
      view: () => new ServerErrorview(root).render(),
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
