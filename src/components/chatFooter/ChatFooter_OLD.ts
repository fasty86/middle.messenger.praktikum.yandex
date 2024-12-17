import "./chatFooter.pcss";

export default `<footer class="footer">
            {{> Menu data=footerData.menu }}
            {{#with footerData.input}}
              {{> Input id=id name=name type=type placeholder=placeholder value=value class=className}}
            {{/with}}
            {{#with footerData.button}}
              {{> Button id=id class=className type=type text=text}}
            {{/with}}
          </footer>`;
