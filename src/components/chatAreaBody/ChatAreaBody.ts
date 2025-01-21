import "./chatAreaBody.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import Message from "../message/Message";
import { connect } from "../../utils/connect";
import Text from "../Text/Text";
import { MessageTypes } from "../../services/WSS";
import { getDateInfo } from "../../utils/date";
import Image from "../image/Image";
import { ApiDestinations } from "../../services/api/base-api";
import Link from "../link/Link";
export default class ChatAreaBody extends Block<ChatAreaBodyPropsType> {
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
    this.scroll();
  }
  scroll() {
    console.log("SCROLL");

    const container = document.querySelector(".chat-area__message-container");
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight + 200;
      // setTimeout(() => {
      //   container.scrollTop = container.scrollHeight - container.clientHeight;
      // }, 100);
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
  const messages = state.activeChat?.messages;
  const userId = state.user?.id;
  const messageList: Message[] = [];
  messages?.forEach((message) => {
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
      },
      childrens: {
        Content: content,
      },
      attributes: {
        className: Number(message.user_id) === userId ? "chat-area__message-content-author" : "",
      },
    });
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

export const MessageListWithData = withMessages(ChatAreaBody);
//  new Message({
//             rootData: {
//               date: messages[0].date,
//             },
//             childrens: {
//               Content: new Text({
//                 rootData: {
//                   text: messages[0].content as string,
//                 },
//               }),
//             },
//           }),
//           new Message({
//             rootData: {
//               date: messages[1].date,
//               contentType: messages[1].contentType,
//             },
//             childrens: {
//               Content: new Image({
//                 attributes: messages[1].content as imageType,
//               }),
//             },
