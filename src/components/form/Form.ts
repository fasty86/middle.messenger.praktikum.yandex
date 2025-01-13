import "./form.pcss";
import Block from "../../framework/Block";
import { PropsType } from "../../framework/types";
import { Validator, ValidatorMapping } from "../../utils/Validator";
import FormGroup from "../formGroup/FormGroup";
import Input from "../input/Input";
import { isValidatorExist } from "../../types/typeguards";
import Link from "../link/Link";
import Button from "../button/Button";
import { UserController } from "../../framework/store/controllers/userController";
const testuser: userData = {
  first_name: "test",
  second_name: "test",
  login: "testasdfasdfqwsdsdeasdsdsddfasdfaf_login",
  email: "testdsfsdfsdqwsdsdsdesfd@yandex.ru",
  password: "12345",
  phone: "1234567890",
};
export default class Form extends Block<FormPropsType> {
  constructor(props: FormPropsType) {
    super(props);
    UserController.createUser(testuser);
    UserController.getUser();
  }
  protected validateForm() {
    const report: {
      [key in ValidatorMapping]?: {
        value: string;
        isValid: boolean;
      };
    } = {};
    if ("Elements" in this.lists) {
      const inputElements = this.lists.Elements as FormGroup[];
      inputElements.forEach((formGroup) => {
        if ("Input" in formGroup.childrens) {
          const input = formGroup.childrens.Input as Input;
          const domElem = input.getContent() as HTMLInputElement;
          const inputName = input.attributes.name;
          if (isValidatorExist(inputName)) {
            const validatorMethod = Validator.mapping[inputName];
            const isValid = input.validate(validatorMethod);
            report[inputName] = { value: domElem.value, isValid };
          }
        }
      });
    }
    console.table(report);
    return Object.entries(report).every(([, value]) => value.isValid);
  }
  render() {
    return `<form class="{{formClassName}}">
                  {{{Elements}}}
                  {{{Button}}}
                  {{{Link}}}
                </form>`;
  }
}

type FormPropsType = PropsType & {
  attributes: {
    formClassName: string;
  };
  childrens: {
    Link?: Link;
    Button?: Button;
  };
  lists: {
    Elements: FormGroup[];
  };
};
