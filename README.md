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

## Documentation

## License

MIT © [Iron tech space](https://github.com/iron-tech-space/react-tech-design/blob/master/LICENSE.md)
