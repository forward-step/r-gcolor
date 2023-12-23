import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GradientColorItem } from '@/types';
import Color from 'color';
import { GradientBar, GradientBarPointerParams } from '@/index';
import { InputNumber } from 'antd';

const meta = {
    title: 'widget/GradientBar',
    component: GradientBar,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof GradientBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultGColor: GradientColorItem[] = [
    {
        offset: 0,
        color: Color('red'),
    },
    {
        offset: 1,
        color: Color('rgba(0, 0, 255, 0.5)'),
    },
];

export const basic: Story = {
    name: '基础使用',
    render() {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
};

export const noInput: Story = {
    name: '不使用输入框',
    render(props) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...props}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        input: false,
    },
};

export const defineInput: Story = {
    name: '自定义输入框',
    render(props) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...props}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        input: ({ value, onChange }) => (
            <InputNumber
                value={value}
                onChange={val => typeof val === 'number' && onChange?.(val)}
            />
        ),
    },
};

export const append: Story = {
    name: '按钮追加',
    render(args) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...args}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        appendMode: 'button',
        appendColor: Color('green'),
        appendOffset: 0.5,
    },
};

export const clickMode: Story = {
    name: '点击追加',
    render(args) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...args}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        input: false,
        appendMode: 'click',
        appendColor: Color('green'),
        appendOffset: 0.5,
    },
};

export const noneMode: Story = {
    name: '不追加',
    render(args) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...args}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        input: false,
        appendMode: 'none',
        appendColor: Color('green'),
        appendOffset: 0.5,
    },
};

export const deleteWhenOverflow: Story = {
    name: '溢出的时候删除',
    render(args) {
        const [gcolor, setGcolor] = useState<GradientColorItem[]>([
            {
                offset: 0,
                color: Color('red'),
            },
            {
                offset: 0.5,
                color: Color('black'),
            },
            {
                offset: 1,
                color: Color('rgba(0, 0, 255, 0.5)'),
            },
        ]);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...args}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        input: false,
        appendMode: 'click',
        deleteWhenOverflow: true,
    },
};

const MyPointer = ({ isDragging, isActive, color }: GradientBarPointerParams) => {
    const colorSrting = color.toString();
    return (
        <div
            style={{
                cursor: 'pointer',
            }}
        >
            <svg
                style={Object.assign(
                    {
                        transform: 'rotate(180deg)',
                        fill: colorSrting,
                    },
                    isActive && !isDragging
                        ? {
                              filter: `drop-shadow(0px 0px 2px ${colorSrting})`,
                          }
                        : {}
                )}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2581"
                width="20"
                height="20"
            >
                <path
                    d="M505.668923 74.919385c-17.142154 19.282708-34.282338 44.994954-100.688738 149.962831-32.143754 53.5552-59.984738 102.829292-85.698954 152.103385-49.274092 96.407631-98.548185 227.089723-98.548185 310.636308 2.140554 72.847754 29.993354 134.973046 85.698954 186.387692C364.266338 925.426215 430.682585 951.138462 509.950031 951.138462s147.822277-25.712246 203.52-79.267446c57.844185-53.565046 85.698954-115.688369 83.5584-188.526277C797.026462 462.684554 503.518523 72.778831 505.668923 74.919385z"
                    p-id="2582"
                ></path>
            </svg>
        </div>
    );
};

export const definePointer: Story = {
    name: '自定义指针',
    render(args) {
        const [gcolor, setGcolor] = useState(defaultGColor);
        const [current, setCurrent] = useState(0);
        return (
            <GradientBar
                {...args}
                value={gcolor}
                onChange={setGcolor}
                current={current}
                onCurrentChange={setCurrent}
            />
        );
    },
    args: {
        pointer: e => <MyPointer {...e} />,
    },
};
