import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PointerElementParams, SingleColor, SVPanel } from '@/index';

const meta = {
    title: 'widget/SVPanel',
    component: SVPanel,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof SVPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
    name: '基础使用',
    render(args) {
        const [color, setColor] = useState<SingleColor>('rgba(19, 206, 102, 0.8)');
        return <SVPanel {...args} value={color} onChange={setColor} />;
    },
    args: {},
};

const MyPointer = ({ isDragging }: Partial<PointerElementParams>) => {
    return (
        <span
            style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                background: isDragging ? 'black' : 'white',
                borderRadius: '100%',
                transform: 'translate(-50%, -50%)',
            }}
        ></span>
    );
};
export const funcPointer: Story = {
    name: '自定义函数指针',
    render(args) {
        const [color, setColor] = useState<SingleColor>('rgba(19, 206, 102, 0.8)');
        return <SVPanel {...args} value={color} onChange={setColor} />;
    },
    args: {
        pointer: e => <MyPointer {...e} />,
    },
};
