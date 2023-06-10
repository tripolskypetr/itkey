# ITKey CRM Boilerplate

> Пример использования [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) архитектуры для команд IT специалистов, имеющих ограничения по бюджету на проект, как следствие, квалификации кадров

## Запуск проекта

```bash
npm install
npm start
```

## Описание архитектуры

Исходя из соображений бюджета невозможно выделить время программистов на проектирование [микросервисной архитектуры с шиной событий](https://kafka.apache.org/), было принято решение переместить большую часть вычислений на сторону пользователя. Данных подход позволяет сэкономить на квалификации кадров, ограничив штат сотрудников одним Senior разработчиком и несколькими Junior

Данное приложение вдохновлено подходом из книги ["Чистая архитектура" Роберта Мартина](https://habr.com/en/articles/672328/). Была спроектирована композиция сервисов [через инъекцию зависимостей](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-7.0), которая позволяет применить центрическую архитектуру, где мутация модели данных бизнес объектов проходит через несколько вложенных чистых функций в методах сервисов.

Наиболее похожим является паттерн [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), широко применяемый при Backend разработке или разработке Desktop приложений на фреймворках Qt (C++), WPF (C#)

## Иерархия вложенности сервисов

**System space** - На нулевом уровне вложенности ([src/lib/services/base/FirebaseService.ts](src/lib/services/base/FirebaseService.ts)) осуществляется обертка над клиентом облачной базы данных [Firebase](https://firebase.google.com/). Если в последующем потребуется убрать бюджетные издержки, этот подход позволит прозрачно перейти на бесплатный аналог [AppWrite](https://appwrite.io). Авторизация через почту или социальные сети, обработка ошибок и др

**Model** - На первом уровне вложенности ([src/lib/services/db/ClientDbService.ts](src/lib/services/db/ClientDbService.ts)) осуществляется сериализация и десериализация моделей данных и запись в базу данных

**Controller** - На втором уровне вложенности ([src/lib/services/view/ClientViewService.ts](src/lib/services/view/ClientViewService.ts)) осуществляется обработка вычисляемых полей к данным из базы данных (например, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`, просчет итого для суммы списка товаров из сметы)

**View** - На третьем уровне вложенности ([src/pages/view/ClientListPage/ClientListPage.ts](src/pages/view/ClientListPage/ClientListPage.ts)) происходит опрос пользовательского ввода для обработки данных. Обратите внимание на декларативный подход, [повторное использование кода](https://github.com/react-declarative/react-declarative) исключает временные издержки на исправление типовых ошибок

## Консистентность данных

Firebase гарантирует целостность данных [при использовании транзакций](https://firebase.google.com/docs/firestore/manage-data/transactions). Я планирую добавлять интеграцию к сторонним API через консольные приложения, оркестрация которых осуществлена через [PM2](https://pm2.keymetrics.io/), так как я ограничен в стоимости и квалификации кадров.

Для решения поставленных передо мной задач согласования контрактов и полей `createdBy`,  `updatedBy` будет достаточно. Дополнительно, Firebase и AppWrite позволяют подписываться на обновления моделей без AJAX [с использованием WebSocket и SSE](https://firebase.google.com/docs/firestore/query-data/listen)


