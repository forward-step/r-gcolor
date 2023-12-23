# [React Color Picker](https://github.com/forward-step/r-color)

[![Npm Version][npm-version-image]][npm-version-url]
[![Build Status][travis-svg]][travis-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

* **小组件** - 灵活自定义拾色器布局

* **颜色渐变** - 支持纯色、线性渐变、径向渐变、锥形渐变

## Demo

[**Live Demo**](https://www.chromatic.com/library?appId=658675bcfe785ddab169094e&branch=master)

## 纯色拾色器

```js
import { useState } from 'react';
import { ElementPicker } from 'r-color';
import 'r-color/index.css';

function App() {
    const [color, setColor] = useState<Color | string>('blue');
    return (
        <ElementPicker value={color} onChange={setColor} />
    );
}
```

## 渐变拾色器

```js
import { useState } from 'react';
import { ColorPicker, ElementPicker, ColorObj, InputColor } from 'r-color';
import 'r-color/index.css';

function App() {
    const [color, setColor] = useState<ColorObj>({
        type: 'linear',
        angle: 90,
        colors: [
            { offset: 0, color: 'red' },
            { offset: 1, color: 'blue' },
        ],
    });
    return (
        <ColorPicker value={color} onChange={setColor}>
            {props => {
                return (
                    <>
                        <ElementPicker {...props} />
                        <InputColor {...props} style={{ width: '100px' }} />
                    </>
                );
            }}
        </ColorPicker>
    );
}
```