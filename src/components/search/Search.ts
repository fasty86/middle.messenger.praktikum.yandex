import './search.pcss';

export default `<div class='header__search-container'>
  <i class='header__search-icon'></i>
    {{> Input id=search.id type=search.type placeholder=search.placeholder value=search.value  className=search.className}}
</div>`;
