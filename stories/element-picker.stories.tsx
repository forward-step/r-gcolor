import { ElementPicker, InputColor, InputFields } from '@/index';
import type { Meta, StoryObj } from '@storybook/react';
import Color from 'color';
import { useState } from 'react';
import { Preview } from './preview';

const meta = {
    title: '拾色器/element-picker',
    component: ElementPicker,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ElementPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const horizontal: Story = {
    name: '基础使用',
    render(args) {
        const [color, setColor] = useState<Color | string>('blue');
        return (
            <Preview color={color}>
                <ElementPicker {...args} value={color} onChange={setColor} />
            </Preview>
        );
    },
    args: {},
};

export const input: Story = {
    name: '输入框',
    render(args) {
        const [color, setColor] = useState<Color | string>('blue');
        return (
            <Preview color={color}>
                <ElementPicker
                    {...args}
                    value={color}
                    onChange={setColor}
                    suffix={props => (
                        <InputColor
                            {...props}
                            style={{
                                marginTop: '12px',
                            }}
                        />
                    )}
                />
            </Preview>
        );
    },
};

export const hideAlpha: Story = {
    name: '字段输入框',
    render(args) {
        const [color, setColor] = useState<Color | string>('blue');
        return (
            <Preview color={color}>
                <ElementPicker
                    {...args}
                    value={color}
                    onChange={setColor}
                    suffix={props => (
                        <InputFields
                            {...props}
                            style={{
                                marginTop: '12px',
                            }}
                        />
                    )}
                />
            </Preview>
        );
    },
};
