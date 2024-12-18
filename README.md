[![Netlify Status](https://api.netlify.com/api/v1/badges/46ae13a3-e441-4655-8046-059d65facb24/deploy-status)](https://app.netlify.com/sites/otolmachevspint1/deploys)

# Веб приложение "Мессенджер"

"Мессенджер": SPA приложение позволяющие обмениваться сообщениями

- realtime отправка сообщений между пользователями
- возможность обмена не только текстовыми сообщениями, а так же фотографиями, файлами и геолокацией

## Макет приложения

[Figma](<https://www.figma.com/design/50VC2zZHNeNxL3LgvNixkS/Chat_external_link-(Copy)?node-id=1-616&node-type=frame&t=g67gsTH2sLVjB6gR-0>)

## Описание

Ведение дискуссий на интересующие темы, знакомство с новыми людьми.

[Netlify](https://otolmachevspint1.netlify.app/)

### Страницы приложения

В приложении реализован роутинг, при нажатии на соответствующие кнопки(нет аккаунта?/Авторизоваться?войти/профиль) происходит переход на соответсвующие страницы. Так же ,для удобства ревьювера, слева на каждой странице добавлен блок для перехода на все страницы приложения.

### Установка

- `npm run start` — сборка и запуск проекта на localhost:3000
- `npm run dev` — dev запуск через Vite localhost:3000
- `npm run build` — сборка проекта в production
- `npm run lint`, - проверка кода на ошибки линтера
- `npm run lint:fix` - автоматическое исправление ошибок линтером
- `npm format` — форматирование кода согласно Prettier
- `npm lint:style` — проверка кода на ошибки стилей stylelint
- `npm run lint:style:fix` — автоматическое исправление ошибок стилей stylelint

### Использованные технологии

- [TypeScript](https://www.typescriptlang.org/)
- [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Vite](https://vite.dev/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)
- [ESlint](https://eslint.org/)
