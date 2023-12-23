import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alpha } from '@/index';
import { HEIGHT, WIDTH } from '@/config';
import { PointerElementParams, SingleColor } from '@/types';

const meta = {
    title: 'widget/Alpha',
    component: Alpha,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Alpha>;

export default meta;
type Story = StoryObj<typeof meta>;

export const horizontal: Story = {
    name: '水平方向',
    render(args) {
        const [color, setColor] = useState<SingleColor>('red');
        return <Alpha {...args} value={color} onChange={setColor} />;
    },
    args: {
        dir: 'horizontal',
    },
};
export const vertical: Story = {
    name: '垂直方向',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return <Alpha {...args} value={color} onChange={setColor} width={HEIGHT} height={WIDTH} />;
    },
    args: {
        dir: 'vertical',
    },
};

const MyPointer = ({ isDragging }: Partial<PointerElementParams>) => {
    return (
        <span
            style={Object.assign(
                {},
                {
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    background: 'rgb(248, 248, 248)',
                    borderRadius: '100%',
                    transform: 'translate(-50%, 2px)',
                },
                isDragging
                    ? {
                          background: 'black',
                      }
                    : {}
            )}
        ></span>
    );
};

export const pointer: Story = {
    name: '自定义指针',
    render(args) {
        const [color, setColor] = useState<SingleColor>('red');
        return <Alpha {...args} value={color} onChange={setColor} />;
    },
    args: {
        dir: 'horizontal',
        pointer: <MyPointer />,
    },
    argTypes: {},
};

export const funcPointer: Story = {
    name: '自定义函数指针',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return <Alpha {...args} value={color} onChange={setColor} />;
    },
    args: {
        dir: 'horizontal',
        pointer: e => <MyPointer {...e} />,
    },
    argTypes: {},
};
