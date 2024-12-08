### Ветка, в которой делаете задания спринта, должна называться sprint_i, где i - номер спринта. Не переименовывайте её.

### Откройте pull request в ветку main из ветки, где вы разрабатывали проект, и добавьте ссылку на этот pr в README.md в ветке main.

### ВАЖНО: pull request должен называться “Sprint i” (i — номер спринта).

### Например, задания для проектной работы во втором спринте вы делаете в ветке sprint_2. Открываете из неё pull request в ветку main. Ссылку на этот pr добавляете в README.md в ветке main. После этого на платформе Практикума нажимаете «Проверить задание».

### Также не забудьте проверить, что репозиторий публичный.

---

## Netlify

[Netlify deploy](https://otolmachevspint1.netlify.app/)
Даже законченный проект остаётся только заготовкой, пока им не начнут пользоваться. Но сначала пользователь должен понять, зачем ему пользоваться вашим кодом. В этом помогает файл README.

README — первое, что прочитает пользователь, когда попадёт в репозиторий на «Гитхабе». Хороший REAMDE отвечает на четыре вопроса:

- Готов ли проект к использованию?
- В чём его польза?
- Как установить?
- Как применять?

## Бейджи

Быстро понять статус проекта помогают бейджи на «Гитхабе». Иногда разработчики ограничиваются парой бейджев, которые сообщат о статусе тестов кода:

![Бэйджи](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/b.png)

Если пользователь увидит ошибку в работе тестов, то поймёт: использовать текущую версию в важном проекте — не лучшая идея.

Бейджи помогают похвастаться достижениями: насколько популярен проект, как много разработчиков создавало этот код. Через бейджи можно даже пригласить пользователя в чат:

![Версии](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/vers.png)

В README **Webpack** строка бейджев подробно рассказывает о покрытии кода тестами. Когда проект протестирован, это вызывает доверие пользователя. Последний бейдж приглашает присоединиться к разработке.

Другая строка убедит пользователя в стабильности инфраструктуры и популярности проекта. Последний бейдж зовёт в чат проекта.

## Описание

Краткое опишите, какую задачу решает проект. Пользователь не верит обещаниям и не готов читать «полотна» текста. Поэтому в описании достаточно нескольких строк:

![Описание](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/desc.png)

Авторы **React** дробят описание на абзацы и списки — так проще пробежаться глазами по тексту и найти ключевую информацию.

Если у проекта есть сайт, добавьте ссылку в заголовок.

## Установка

Лучше всего пользователя убеждает собственный опыт. Чем быстрее он начнёт пользоваться проектом, тем раньше почувствует пользу. Для этого помогите ему установить приложение: напишите краткую пошаговую инструкцию.

Если проект предназначен для разработчиков, добавьте информацию об установке тестовых версий. Например:

- `npm install` — установка стабильной версии,
- `npm start` — запуск версии для разработчика,
- `npm run build:prod` — сборка стабильной версии.

## **Примеры использования**

Хорошо, если сразу после установки пользователь сможет решить свои задачи без изучения проекта. Это особенно верно, если ваш пользователь — не профессиональный разработчик. Но даже профессионал поймёт вас лучше, если показать примеры использования:

![Ссылки](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/link.png)

Для более подробных инструкции добавьте новые разделы или ссылки:

- на документацию,
- вики проекта,
- описание API.

В учебном проекте будут полезен раздел с описанием стиля кода и правилами разработки: как работать с ветками, пул-реквестами и релизами.

### **Команда**

Если вы работаете в команде, укажите основных участников: им будет приятно, а новые разработчики охотнее присоединятся к проекту. «Гитхаб» — не просто инструмент, это социальная сеть разработчиков.

![Команда](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/team.png)

### **Примеры README**

- «[Реакт](https://github.com/facebook/react)»,
- «[Эхо](https://github.com/labstack/echo)»,
- «[Вебпак](https://github.com/webpack/webpack)»,
- «[ТДенгине](https://github.com/taosdata/TDengine)»,
- «[Соул-хантинг](https://github.com/vladpereskokov/soul-hunting/)».
