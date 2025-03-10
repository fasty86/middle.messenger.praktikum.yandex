import { UserController } from "../framework/Store/controllers/userController";
import { isWindow } from "../types/typeguards";
import { watchChatData } from "../utils/watchChatData";
import ChatView from "../views/chatView";
import LoginView from "../views/loginView";
import ProfileView from "../views/profileView";
import RegistrationView from "../views/registarationView";
import { Route } from "./route";
import { Constructable, viewClassTypes } from "./types";

export class Router {
  static __instance: Router | null = null;
  routes: Route[] = [];
  history: History = window.history;
  _currentRoute: Route | null = null;
  _rootQuery: string = "/";
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: Constructable<viewClassTypes>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  async start() {
    window.onpopstate = ((event: Event) => {
      if (isWindow(event.currentTarget)) this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);
    UserController.getUser().then(async (status) => {
      if (status) {
        watchChatData();
      }
      this._onRoute(window.location.pathname);
    });
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route {
    const route = this.routes.find((route) => route.match(pathname)) || this.routes[0];
    return route;
  }
}

const router = new Router("#app");

// Можно обновиться на /user и получить сразу пользователя
router
  .use("/", LoginView)
  .use("/sign-up", RegistrationView)
  .use("/messenger", ChatView)
  .use("/settings", ProfileView)
  .start();

export { router };
