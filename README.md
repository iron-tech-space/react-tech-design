## React technical design library

## Install

```bash
npm install --save git+https://github.com/iron-tech-space/react-tech-design.git
```

```bash
yarn add git+https://github.com/iron-tech-space/react-tech-design.git
```

## Usage

```static
import { SingleDate, CommandPanel } from 'rt-design';
const App = () => (
  <>
    <SingleDate />
    <CommandPanel
        commandPanelProps={{
            showElements: ['add', 'delete', 'edit']
        }}
        borderStyle={'all'}
    />
  </>
);
```

## connect with main project

```
Подключение RT-design к основному проекту

1.	Пройти по ссылке https://github.com/iron-tech-space/react-tech-design
2.	Клонировать проект к себе на устройство
3.	Зайти в проект сделать npm i
4.	Нажать ПКМ на папку node_modules и скопировать путь (абсолютный путь до этой папки как на вашем устройстве)
5.	Удалить папку “"react-redux” в папке node_modules 
6.	Зайти в основной проект assd-side-ui
7.	Открыть package.json 
8.	Изменить “react” на путь “D:\\Папка с Rt-design\\react-tech-design\node_modules\react”
9.	Изменить “react- dom” на путь “D:\\Папка с Rt-design\\react-tech-design\node_modules\react-dom”
10.	Изменить “rt-design” на путь “D:\\Папка с Rt-design\\react-tech-design”
11.	Сделать npm I --legacy-peer-deps
12.	Запустить основной проект и проект rt-design 
13.	Готово!

P.S. \\ - данные используется в пути используются для Windows

```

## Documentation

## License

MIT © [Iron tech space](https://github.com/iron-tech-space/react-tech-design/blob/master/LICENSE.md)
