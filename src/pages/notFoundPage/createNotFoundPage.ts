import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
class NotFoundPage extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `
              <div class="app">
                {{{Navigation}}}
                <div class="util-container">
                  <h1 class="util-title">404</h1>
                  <h3 class="util-text">{{text}}</h3>
                  {{{Link}}}
                  </div>
                </div>
               </div> `;
    }
}

export { NotFoundPage };
