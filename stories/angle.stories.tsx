import type { Meta, StoryObj } from '@storybook/react';
import { Angle } from '@/index';
import { useState } from 'react';
import { PointerElementParams } from '@/types';
import { InputNumber } from 'antd';

const meta = {
    title: 'widget/Angle',
    component: Angle,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Angle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
    name: '基础使用',
    render(args) {
        const [value, setValue] = useState(0);
        return <Angle {...args} value={value} onChange={setValue} />;
    },
    args: {},
};

export const defineInput: Story = {
    name: '自定义输入框',
    render(args) {
        const [value, setValue] = useState(0);
        return <Angle {...args} value={value} onChange={setValue} />;
    },
    args: {
        input: ({ value, onChange }) => (
            <InputNumber value={value} onChange={e => typeof e === 'number' && onChange(e)} />
        ),
    },
};

const MyPointer = ({ isDragging }: PointerElementParams) => {
    const color = isDragging ? 'red' : '#8ed1fc';
    return (
        <span
            style={{
                position: 'absolute',
                inset: '0px',
                bottom: '50%',
                background: `linear-gradient(to right, transparent 47%, ${color} 47%, ${color} 53%, transparent 53%)`,
            }}
        ></span>
    );
};

export const pointer: Story = {
    name: '自定义指针',
    render(args) {
        const [value, setValue] = useState(0);
        return <Angle {...args} value={value} onChange={setValue} />;
    },
    args: {
        angleStyle: {
            borderColor: '#8ed1fc',
        },
        pointer: (props) => <MyPointer {...props} />,
    },
};