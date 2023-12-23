import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColorPicker, ElementPicker, SketchPicker, InputColor, ColorObj } from '@/index';
import { InputNumber, Select } from 'antd';
import { Preview } from './preview';

const meta = {
    title: '拾色器/color-picker',
    component: ColorPicker,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLinearColor: ColorObj = {
    type: 'linear',
    angle: 90,
    colors: [
        { offset: 0, color: 'red' },
        { offset: 1, color: 'blue' },
    ],
};
const defaultRadialColor: ColorObj = {
    type: 'radial',
    colors: [
        { offset: 0, color: 'red' },
        { offset: 1, color: 'blue' },
    ],
};
const defaultConicColor: ColorObj = {
    type: 'conic',
    angle: 0,
    colors: [
        { offset: 0, color: 'red' },
        { offset: 1, color: 'blue' },
    ],
};

export const element: Story = {
    name: '基础使用-element',
    render() {
        const [color, setColor] = useState<ColorObj>(defaultLinearColor);
        return (
            <Preview color={color}>
                <ColorPicker value={color} onChange={setColor}>
                    {props => {
                        return (
                            <>
                                <ElementPicker {...props} />
                                <InputColor {...props} />
                            </>
                        );
                    }}
                </ColorPicker>
            </Preview>
        );
    },
};

export const sketch: Story = {
    name: '基础使用-sketch',
    render(args) {
        const [color, setColor] = useState<ColorObj>(defaultLinearColor);
        return (
            <Preview color={color}>
                <ColorPicker {...args} value={color} onChange={setColor}>
                    {props => {
                        return (
                            <>
                                <SketchPicker {...props} />
                                <InputColor {...props} style={{ width: '100px' }} />
                            </>
                        );
                    }}
                </ColorPicker>
            </Preview>
        );
    },
    args: {
        GradientBarProps: {
            style: {
                width: '220px',
            },
        },
    },
};

export const define: Story = {
    name: '自定义输入',
    render(args) {
        const [color, setColor] = useState<ColorObj>(defaultConicColor);
        return (
            <Preview color={color}>
                <ColorPicker {...args} value={color} onChange={setColor}>
                    {props => {
                        return (
                            <>
                                <ElementPicker {...props} />
                                <InputColor {...props} />
                            </>
                        );
                    }}
                </ColorPicker>
            </Preview>
        );
    },
    args: {
        select: props => (
            <Select
                {...props}
                style={{
                    minWidth: '100px',
                }}
            ></Select>
        ),
        angleProps: {
            input: props => (
                <InputNumber
                    value={props.value}
                    onChange={e => (typeof e === 'number' ? props.onChange?.(e) : null)}
                />
            ),
        },
        coordProps: {
            xInput: props => (
                <InputNumber
                    value={props.value}
                    onChange={e => (typeof e === 'number' ? props.onChange?.(e) : null)}
                />
            ),
            yInput: props => (
                <InputNumber
                    value={props.value}
                    onChange={e => (typeof e === 'number' ? props.onChange?.(e) : null)}
                />
            ),
        },
        GradientBarProps: {
            input: props => (
                <InputNumber
                    value={props.value}
                    onChange={e => (typeof e === 'number' ? props.onChange?.(e) : null)}
                />
            ),
        },
    },
};

export const radial: Story = {
    name: '径向渐变',
    render(args) {
        const [color, setColor] = useState<ColorObj>(defaultRadialColor);
        return (
            <Preview color={color}>
                <ColorPicker {...args} value={color} onChange={setColor}>
                    {props => {
                        return (
                            <>
                                <ElementPicker {...props} />
                                <InputColor {...props} />
                            </>
                        );
                    }}
                </ColorPicker>
            </Preview>
        );
    },
};

export const conic: Story = {
    name: '锥形渐变',
    render(args) {
        const [color, setColor] = useState<ColorObj>(defaultConicColor);
        return (
            <Preview color={color}>
                <ColorPicker {...args} value={color} onChange={setColor}>
                    {props => {
                        return (
                            <>
                                <ElementPicker {...props} />
                                <InputColor {...props} />
                            </>
                        );
                    }}
                </ColorPicker>
            </Preview>
        );
    },
};
