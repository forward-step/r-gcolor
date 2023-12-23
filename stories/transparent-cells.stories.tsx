import type { Meta, StoryObj } from '@storybook/react';
import { TransparentCells } from '@/index';

const meta = {
    title: 'widget/TransparentCells',
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TransparentCells>;

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
    render() {
        return <TransparentCells style={{ width: 100, height: 100 }} />;
    },
};

export const withColor: Story = {
    render() {
        return (
            <TransparentCells style={{ width: 100, height: 100 }} background="rgba(255,0,0,0.2)" />
        );
    },
};
