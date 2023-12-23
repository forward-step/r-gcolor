import { SketchPicker, InputColor, SingleColor, InputFields } from '@/index';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Preview } from './preview';

const meta = {
    title: '拾色器/sketch-picker',
    component: SketchPicker,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof SketchPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const horizontal: Story = {
    name: '基础使用',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return (
            <Preview color={color}>
                <SketchPicker {...args} value={color} onChange={setColor} />
            </Preview>
        );
    },
    args: {},
};

export const input: Story = {
    name: '输入框',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return (
            <Preview color={color}>
                <SketchPicker {...args} value={color} onChange={setColor}></SketchPicker>
            </Preview>
        );
    },
    args: {
        suffix: e => (
            <InputColor
                {...e}
                style={{
                    width: '130px',
                }}
            />
        ),
    },
};

export const input2: Story = {
    name: '字段输入框',
    render(args) {
        const [color, setColor] = useState<SingleColor>('blue');
        return (
            <Preview color={color}>
                <SketchPicker {...args} value={color} onChange={setColor}></SketchPicker>
            </Preview>
        );
    },
    args: {
        suffix: e => <InputFields {...e} />,
    },
};
