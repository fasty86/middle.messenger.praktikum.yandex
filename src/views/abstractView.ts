import Handlebars from 'handlebars';

// Register partials
import Input from '../components/input/Input.ts';
import Label from '../components/label/Label.ts';
import Button from '../components/button/Button.ts';
import Form from '../components/form/Form.ts';
import Link from '../components/link/Link.ts';

// Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Form', Form);
Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);

export default class {
  constructor(protected root: HTMLElement) {
    this.root = root;
  }

  protected setTitle(title: string) {
    document.title = title;
  }
  async render() {
    // Implement the render method here
  }
  protected addEvtListeners() {}
}
