class Validator {
    public static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    public static validatePassword(password: string): boolean {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    public static validateUsername(username: string): boolean {
        const usernameRegex = /^[A-ZА-Я][а-яА-Яa-zA-Z]{0,}/;
        return usernameRegex.test(username);
    }
    public static validatePhoneNumber(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\+?\d{10,15}/;
        // /^\+?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
        return phoneNumberRegex.test(phoneNumber);
    }
    public static validateText(text: string): boolean {
        const textRegex = /^[a-zA-Z0-9\s]+$/;
        return textRegex.test(text);
    }
}

export { Validator };
