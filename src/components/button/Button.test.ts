import Block from "../../framework/Block";
import Button, { ButtonPropsType } from "./Button";

describe("Button", () => {
  let props: ButtonPropsType;

  beforeEach(() => {
    props = {
      attributes: {
        id: "test-btn",
        className: "btn-primary",
        type: "submit",
        text: "Click me",
        disabled: "",
      },
    };
  });

  it("должно отрендериться с заданными атрибутами", () => {
    const button = new Button(props);

    const content = button.getContent();

    expect(content.id).toBe("test-btn");
    expect(content.className).toBe("btn-primary");
    expect(content.getAttribute("type")).toBe("submit");
    expect(content.textContent).toBe("Click me");
  });
  it("должен быть наследником Block", () => {
    const button = new Button(props);

    expect(button).toBeInstanceOf(Block);
  });

  it("должен вызваться метод componentDidUpdate после смены пропсов", () => {
    const button = new Button(props);
    const componentDidUpdate = jest.spyOn(button, "componentDidUpdate");
    componentDidUpdate.mockImplementation(() => true);

    button.setProps({ attributes: { text: "New text" } });

    expect(componentDidUpdate).toHaveBeenCalled();
  });

  it("остальные пропсы должны остаться неизмененными", () => {
    const button = new Button(props);
    const newProps = { attributes: { className: "btn-submit" } };

    button.setProps(newProps);

    expect(button.attributes.id).toBe("test-btn");
    expect(button.attributes.type).toBe("submit");
    expect(button.attributes.text).toBe("Click me");
  });
});
