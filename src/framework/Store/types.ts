import WSSTransport, { responseMessageType } from "../../services/WSS";

export type StateType = {
  user: UserInfoType | null;
  statuses: {
    [key in ApiStatus]: STATUS;
  };
  chatList: ChatListType;
  activeChat: {
    chatId: number | null;
    token: string;
    socket: WSSTransport;
    messages: responseMessageType[];
    users: UserChatInfo[];
  } | null;
  chatInterValId: number | null;
};
export type StorePath = OPaths<StateType>;

export type UserAuthType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UserLoginType = Pick<UserAuthType, "login" | "password">;
export type UserInfoType = UserAuthType & {
  id: number;
  avatar: string | null;
  display_name: string | null;
};

export type UserProfile = {
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  password: string;
  phone: string;
  login: string;
};
export type UserChatInfo = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string | null;
  role: string;
};

export type UserProfilePassword = {
  oldPassword: string;
  newPassword: string;
};

export type UserAvatar = FormData;
export enum STATUS {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}
export enum ApiStatus {
  AVATAR = "avatarLoading",
  FILE = "fileLoading",
  USER_ADD = "userAdding",
  USER_DELETE = "userDeleting",
}

export type ChatInfoType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};

export type LastMessage = {
  user: UserProfile;
  time: string;
  content: string;
};

export type ChatListType = ChatInfoType[];
export type ID = {
  id: number;
};
export type OPaths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends Record<string, unknown>
    ? {
        [K in keyof T]-?: K extends string ? `${K}` | Join<K, OPaths<T[K], Prev[D]>> : never;
      }[keyof T]
    : "";
type Join<K, P> = K extends string
  ? P extends string
    ? IsStringLiteral<P> extends true
      ? `${K}.${P}`
      : K
    : P extends number
      ? K
      : never
  : never;
type IsStringLiteral<T> = T extends string ? ("" extends T ? false : true) : false;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];
