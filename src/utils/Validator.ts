class Validator {
    public static mapping: {
        [key in ValidatorMapping]: (value: string) => boolean;
    } = {
        login: Validator.validateLogin,
        first_name: Validator.validateUsername,
        second_name: Validator.validateUsername,
        email: Validator.validateEmail,
        password: Validator.validatePassword,
        phone: Validator.validatePhoneNumber,
        message: Validator.validateMessage,
        passwordConfirm: Validator.validatePassword,
        display_name: Validator.validateUsername,
        oldPassword: Validator.validatePassword,
        newPassword: Validator.validatePassword,
        confirmNewPassword: Validator.validatePassword,
    };
    public static validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
        return emailRegex.test(email);
    }
    public static validateLogin(login: string): boolean {
        const loginRegex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
        return loginRegex.test(login);
    }
    public static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_-]{8,40}$/;
        return passwordRegex.test(password);
    }
    public static validateUsername(username: string): boolean {
        const russianCapitalStart = /^[А-Я][а-яА-Я-]{0,}$/;
        const latinCapitalStart = /^[A-Z][A-Za-z-]{0,}$/;
        return (
            russianCapitalStart.test(username) ||
            latinCapitalStart.test(username)
        );
    }
    public static validatePhoneNumber(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\+?\d{10,15}$/;
        return phoneNumberRegex.test(phoneNumber);
    }
    public static validateMessage(message: string): boolean {
        const messageRegex = /^.+$/;
        return messageRegex.test(message);
    }
}

export type ValidatorMapping =
    | "login"
    | "first_name"
    | "second_name"
    | "email"
    | "password"
    | "phone"
    | "message"
    | "passwordConfirm"
    | "display_name"
    | "oldPassword"
    | "newPassword"
    | "confirmNewPassword";

export { Validator };
