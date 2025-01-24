import "./chatAreaBody.pcss";
import Block from "../../framework/Block";
import { PropsType, StoreEvents } from "../../framework/types";
import Message from "../message/Message";
import { connect } from "../../utils/connect";
import Text from "../Text/Text";
import { MessageTypes, responseMessageType } from "../../services/WSS";
import { getDateInfo } from "../../utils/date";
import Image from "../image/Image";
import { ApiDestinations } from "../../services/api/base-api";
import Link from "../link/Link";
import store from "../../framework/Store/Store";
export default class ChatAreaBody extends Block<ChatAreaBodyPropsType> {
  observer: IntersectionObserver;
  constructor(props: ChatAreaBodyPropsType) {
    super(props);
    this.observer = new IntersectionObserver((entries, _observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.scroll();
          this.observer.unobserve(entry.target);
        }
      });
    });
    store.on(StoreEvents.NEW_MESSAGE, (message) => {
      this.addNewMessage(message as responseMessageType);
    });
  }
  private observe() {
    (this.lists.MessageList as Message[]).forEach((message) => {
      this.observer.observe(message.getContent());
    });
  }
  render() {
    return `<section class="chat-area__body">
            <div class="chat-area__message-date">{{currentDate}}</div>
            <div class="chat-area__message-container">
             {{{MessageList}}}
              </div>
            </div>
          </section>`;
  }
  _render(): void {
    super._render();
    this.observe();
  }
  scroll() {
    const container = document.querySelector(".chat-area__message-container");
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }
  protected addNewMessage(data: responseMessageType) {
    const newMessage = createMessage(data);
    this.observer.observe(newMessage.getContent());
    const container = document.querySelector(".chat-area__message-container");
    if (container) {
      container.appendChild(newMessage.getContent());
      this.scroll();
    }
  }
}

type ChatAreaBodyPropsType = PropsType & {
  lists?: {
    MessageList: Message[];
  };
  rootData?: {
    currentDate: string;
  };
};

export const withMessages = connect<ChatAreaBodyPropsType>((state) => {
  const storedState = state.activeChat?.messages || {};
  const messages = store.getState().activeChat?.messages;
  const messageList: Message[] = [];
  messages?.forEach((message: responseMessageType) => {
    const newMessage = createMessage(message);
    messageList.push(newMessage);
  });
  const component: ChatAreaBodyPropsType = {
    lists: {
      MessageList: messageList,
    },
    rootData: {
      currentDate: getDateInfo(new Date().toISOString()),
    },
  };
  return { storedState, component };
});

function createMessage(message: responseMessageType): Message {
  const userId = store.getState().user?.id;
  const userLogin = getUserLogin(Number(message.user_id));
  let content: Block = null as unknown as Block;
  if (!message.file && message.type === MessageTypes.MESSAGE) {
    content = new Text({
      rootData: {
        text: message.content,
      },
      attributes: {
        Tag: "span",
        className: "message-text",
      },
    });
  } else {
    if (message.file?.content_type.startsWith("image/")) {
      content = new Image({
        attributes: {
          src: `${ApiDestinations.RESOURCES}${message.file?.path}`,
          alt: "picture",
          className: "chat-area__message-image",
        },
      });
    } else {
      content = new Link({
        attributes: {
          href: `${ApiDestinations.RESOURCES}${message.file?.path}`,
          className: "chat-area__message-link",
        },
      });
    }
  }
  const newMessage = new Message({
    rootData: {
      date: getDateInfo(message.time || ""),
      author: userLogin,
    },
    childrens: {
      Content: content,
    },
    attributes: {
      className: Number(message.user_id) === userId ? "chat-area__message-content-author" : "",
    },
  });
  return newMessage;
}

function getUserLogin(userId: number) {
  const chatUsers = store.getState().activeChat?.users || [];
  const user = chatUsers.find((user: { id: number }) => user.id === userId);
  return user?.display_name || user?.login || "Guest";
}
export const MessageListWithData = withMessages(ChatAreaBody);
