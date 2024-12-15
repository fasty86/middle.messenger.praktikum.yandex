import './chatListHeader.pcss';

export default `<header class="header">
            <nav class="header__nav">
              {{> Link href="/profile" text="Профиль" className="link header__profile-link" }}
              <div class="header__search-container">
                <i class="header__search-icon"></i>
              {{> Search search=data.search}}
              </div>
            </nav>
          </header>
`;
