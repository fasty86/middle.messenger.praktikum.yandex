import { PropsType } from "../../framework/types";
import Block from "../../framework/Block";
class NotFoundPageBlock extends Block {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return `
              <div class="app">
                <div class="util-container">
                  <h1 class="util-title">404</h1>
                  <h3 class="util-text">{{text}}</h3>
                  {{{Link}}}
                  </div>
                </div>
               </div> `;
    }
}

export { NotFoundPageBlock };
