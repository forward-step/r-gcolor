import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Coord } from '@/index';
import { InputNumber } from 'antd';

const meta = {
    title: 'widget/Coord',
    component: Coord,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Coord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
    name: '基础使用',
    render(args) {
        const [x, setX] = useState(0.5);
        const [y, setY] = useState(0.5);
        return (
            <Coord
                {...args}
                x={x}
                y={y}
                onChange={e => {
                    setX(e.x);
                    setY(e.y);
                }}
            />
        );
    },
    args: {},
};

export const defineInput: Story = {
    name: '自定义输入框',
    render(args) {
        const [x, setX] = useState(0.5);
        const [y, setY] = useState(0.5);
        return (
            <Coord
                {...args}
                x={x}
                y={y}
                onChange={e => {
                    setX(e.x);
                    setY(e.y);
                }}
            />
        );
    },
    args: {
        xInput: ({ onChange, ...props }) => (
            <InputNumber {...props} onChange={val => typeof val === 'number' && onChange?.(val)} />
        ),
        yInput: ({ onChange, ...props }) => (
            <InputNumber {...props} onChange={val => typeof val === 'number' && onChange?.(val)} />
        ),
    },
};

export const bgAndPointer: Story = {
    name: '自定义背景与指针',
    render(args) {
        const [x, setX] = useState(0.5);
        const [y, setY] = useState(0.5);
        return (
            <Coord
                {...args}
                x={x}
                y={y}
                onChange={e => {
                    setX(e.x);
                    setY(e.y);
                }}
            />
        );
    },
    args: {
        xInput: ({ onChange, ...props }) => (
            <div>{props.value}</div>
        ),
        style: {
            background: 'pink',
        },
        pointer: ({ isDragging }) => {
            return (
                <div
                    style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '100%',
                        background: isDragging ? 'red' : 'blue',
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>
            );
        },
    },
};
