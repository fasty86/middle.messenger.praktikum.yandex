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
};
export type UserProfilePassword = {
  oldPassword: string;
  newPassword: string;
};

export type UserAvatar = FormData;
