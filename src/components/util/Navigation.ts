import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import { router } from "../../router/router";
import Link from "../link/Link";
import ListElement from "../list/ListElement";
export default class Navigation extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return `<nav class="util_nav">
                    <ul>
                     {{{List}}}
                    </ul>
                </nav>`;
  }
}

const NavigationComponent = new Navigation({
  lists: {
    List: [
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "логин",
            },
            attributes: {
              href: "/login",
            },
            events: {
              click: function (this: Link, e: Event) {
                e.preventDefault();
                router.go("/");
              },
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "регистрация",
            },
            attributes: {
              href: "/registration",
            },
            events: {
              click: function (this: Link, e: Event) {
                e.preventDefault();
                router.go("/sign-up");
              },
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "чат",
            },
            attributes: {
              href: "/chat",
            },
            events: {
              click: function (this: Link, e: Event) {
                e.preventDefault();
                router.go("/messenger");
              },
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "профиль",
            },
            attributes: {
              href: "/profile",
            },
            events: {
              click: function (this: Link, e: Event) {
                e.preventDefault();
                router.go("/settings");
              },
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "изменение данных профиля",
            },
            attributes: {
              href: "/profile/edit/data",
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "изменение пароля",
            },
            attributes: {
              href: "/profile/edit/password",
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "404",
            },
            attributes: {
              href: "/notFound",
            },
          }),
        },
      }),
      new ListElement({
        attributes: {
          className: "list",
        },
        childrens: {
          content: new Link({
            rootData: {
              text: "500",
            },
            attributes: {
              href: "/serverError",
            },
          }),
        },
      }),
    ],
  },
});

export { NavigationComponent };
