import abstractView from "../views/abstractView";
import ChatView from "../views/chatView";
import LoginView from "../views/loginView";
import NotFoundView from "../views/notFoundView";
import ProfileView from "../views/profileView";
import RegistrationView from "../views/registarationView";
import ServerErrorView from "../views/serverErrorView";

export type routeProps = {
  rootQuery: string;
  [key: string]: unknown;
};
export type viewClassTypes = LoginView | RegistrationView | ChatView | ProfileView | NotFoundView | ServerErrorView;

export type Constructable<T extends abstractView = abstractView> = new (root: HTMLElement) => T;
