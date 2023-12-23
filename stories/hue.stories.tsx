import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HEIGHT, WIDTH } from '@/config';
import { Hue, SingleColor, PointerElementParams } from '@/index';

const meta = {
    title: 'widget/Hue',
    component: Hue,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Hue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const horizontal: Story = {
    name: '水平方向',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return <Hue {...args} value={color} onChange={setColor} width={WIDTH} height={HEIGHT} />;
    },
    args: {
        dir: 'horizontal',
    },
};

export const vertical: Story = {
    name: '垂直方向',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return <Hue {...args} value={color} onChange={setColor} width={HEIGHT} height={WIDTH} />;
    },
    args: {
        dir: 'vertical',
    },
};

const MyPointer = ({ isDragging }: PointerElementParams) => {
    return (
        <span
            style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                background: isDragging ? 'black' : 'rgb(248, 248, 248)',
                borderRadius: '100%',
                transform: 'translate(-50%, 2px)',
            }}
        ></span>
    );
};
export const funcPointer: Story = {
    name: '自定义函数指针',
    render(args) {
        const [color, setColor] = useState<SingleColor>('red');
        return <Hue {...args} value={color} onChange={setColor} />;
    },
    args: {
        dir: 'horizontal',
        pointer: e => <MyPointer {...e} />,
    },
};
