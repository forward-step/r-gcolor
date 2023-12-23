import { ChangeValueProps, PointerElement } from '@/types';
import { CSSProperties, ReactNode } from 'react';

export interface CoordInnerProps  {
    className?: string;
    style?: CSSProperties;
    /**
     * 自定义指针
     */
    pointer?: PointerElement;
    /**
     * 自定义输入框
     * @param props 输入框参数
     */
    xInput?: (
        props: ChangeValueProps<number> & { min: number; max: number; step: number }
    ) => ReactNode;
    /**
     * 自定义输入框
     * @param props 输入框参数
     */
    yInput?: (
        props: ChangeValueProps<number> & { min: number; max: number; step: number }
    ) => ReactNode;
}

export interface CoordProps extends CoordInnerProps {
    x?: number;
    y?: number;
    onChange?: (e: { x: number; y: number }) => void;
}
