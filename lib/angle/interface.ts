import type { ChangeValueProps, PointerElement } from '@/types';
import type { CSSProperties, ReactElement } from 'react';

export interface AngleInputProps extends Required<ChangeValueProps<number>> {
    min: number;
    max: number;
    step: number;
    unit: string;
}

export interface AngleInnerProps{
    className?: string;
    angleStyle?: CSSProperties;
    /**
     * 自定义输入，flase表示隐藏，true表示使用系统默认
     * @default true
     */
    input?: boolean | ((props: AngleInputProps) => ReactElement);
    /**
     * 自定义指针
     */
    pointer?: PointerElement;
    /**
     * 格式化角度值
     * @default Math.round
     */
    formatAngle?: () => number;
}

export interface AngleProps extends ChangeValueProps<number>, AngleInnerProps {}