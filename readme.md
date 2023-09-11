# NaturaLP

Команда "NaturaLP" представляет удобное и эффективное решение для улучшения работы сервиса "Мой голос" путем внедрения технологий искусственного интеллекта и машинного обучения, а также инновационных подходов визуализации данных.

## ИНСТРУКЦИЯ:
Для запуска проекта требуется выполнить следующие команды в консоле:
```
    pip install npm
    cd server/
    pip install -r requirements.txt
       uvicorn src.main:app --reload
    frontend/
       npm i
       npm start
```

* [![React][React.js]][React-url]
* [![FastApi][FastApi.py]][FastApi-url]

## Цели:
1) Улучшении сервиса «Мой голос»;
2) Внедрения технологий ИИ;
3) Внедрение инновационных методов визуализации.

## Задачи:
1) Создание качественной модели кластеризации;
2) Разработка инновационных методов отображения данных.

## В созданном веб-приложении используется:

1) нейросетевая многоязычная модель глубокого обучения, предназначенная для векторизации текста в 768-мерном пространстве;
2) продвинутая библиотека градиентного бустинга на деревьях решений - CatBoost;
3) алгоритм кластрезации, улучшенный путем реализации анасамблевого многопоточного алгоритма;
4) для создания быстрого HTTP API-сервера со встроенными валидацией, сериализацией и асинхронностью - фреймворк FAST API;
5) для создания интуитивно понятного и приятного интерфейса - фреймворк React.js.

## Технические особенности:
Масштабируемость, многопоточность, развертываемость, автономность, user-friendly интерфейс, state-of-art technology.

## Уникальность решения:
EMOGI-translator, фильтр нецензурной лексики, отсеивание бессмысленных ответов, исправление опечаток и неправильной раскладки клавиатуры, высочайшая стабильность доработанного алгоритма кластеризации, инновационный подход визуализации данных, использование ТОЛЬКО open-source технологий.

## Дальнейшее развитие проекта:
1) Расширение функциональности;
2) Дообучение модели;
3) Развитие алгоритма;
4) Выпуск в Production.

## Дополнительное описание проекта:
Особое внимание мы уделили исправлению ненормативной лексики. Для этого на просторах интернета мы собрали датасеты, содержащие некультурные высказывания, и внесли авторские правки. Неприличные выражения мы заменяем символом *. Важно отметить, что замещение *-ками происходит на этапе визуализации, то есть семантический анализ ответов происходит с учетом нецензурных высказываний, так как они могут нести смысловую нагрузку.

Для исправления опечаток и ошибок, связанных с неправильной раскладкой клавиатуры, мы используем модель машинного обучения CatBoost, в которой реализован уникальный алгоритм градиентного бустинга. Как показано на слайде, ответы пользователей, написанные на неправильной раскладке клавиатуры, как и опечатки, исправляются.

Во время хакатона нами была переработана библиотека demoji, предназначенная для дешифрирования смайликов, но не работающая с русским языком. Мы переработали описания смайликов, теперь они также несут смысловую нагрузку.

Одной из открытых проблем остается определение оптимального количества кластеров. Для этого нами была подготовлена масштабируемая архитектура проекта, позволяющая быстро внедрять методики оценки качества кластеризации для повышения эффективности получения оптимального количества кластеров. Основная метрика – коэффициент силуэтов, учитывающий удаленность и плотность кластеров в многомерном пространстве.

Серверная часть проекта выполнена с использованием фреймворка FAST API. Визуальная составляющая создана с использованием фреймворка React.js. Реализована ролевая система – пользователь имеет возможность пройти опрос, а администратор – создать опрос, внести в него изменения, добавить и удалить вопрос, закрыть или открыть доступ к нему, загрузить JSON-файл с ответами, загрузить CSV-файл с вопросами и просмотреть результаты опроса. Данные представлены в виде нескольких диаграмм и графиков, позволяющих в полной мере оценить общественное мнение по заданному вопросу.



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[FastApi.py]: https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png
[FastApi-url]: https://fastapi.tiangolo.com/
