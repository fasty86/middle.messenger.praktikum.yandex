import './chatAreaHeader.pcss';

export default `<header class="chat-area__header">
            <nav class="chat-area_navigation">
              <div class="chat-area__user-info">
                {{> Image data=chatAreaHeaderData.headerInfoData.imageData }}
                <p class="user-info__name">{{chatAreaHeaderData.headerInfoData.userData}}</p>
              </div>
             {{> Menu data=chatAreaHeaderData.headerOptionsData }}
            </nav>
          </header>
`;
