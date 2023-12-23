import type { ChangeValueProps, GradientColorItem, SingleColor } from '@/types';
import type { CSSProperties, ReactElement } from 'react';

export type GradientBarPointerParams = {
    /**
     * 是否正在拖拽
     */
    isDragging: boolean;
    /**
     * 是否激活
     */
    isActive: boolean;
    /**
     * 使用的颜色
     */
    color: SingleColor;
    /**
     * 当前偏移的位置
     */
    offset: number;
};

export interface GradientBarInnerProps {
    className?: string;
    style?: CSSProperties;
    /**
     * 追加颜色的模式，button为按钮追加，click为点击追加
     * @default 'button'
     */
    appendMode?: 'none' | 'button' | 'click';
    /**
     * 默认追加的颜色
     * @default Color()
     */
    appendColor?: SingleColor;
    /**
     * 默认追加的颜色的位置 ; 仅在appendMode='button'下有效
     * @default 1
     */
    appendOffset?: number;
    /**
     * 追加之后是否聚焦到追加的元素
     * @default true
     */
    focusWhenAppend?: boolean;
    /**
     * 超出之后删除
     * @default false
     */
    deleteWhenOverflow?: boolean;
    /**
     * 自定义输入框，true表示使用系统默认，false表示隐藏
     * @default true
     */
    input?: boolean | ((props: ChangeValueProps<number>) => ReactElement);
    /**
     * 自定义指针
     * @param e 拖拽参数
     */
    pointer?: (e: GradientBarPointerParams) => ReactElement;
}

export interface GradientBarProps
    extends ChangeValueProps<GradientColorItem[]>,
        GradientBarInnerProps {
    /**
     * 当前使用的颜色数组的下标
     */
    current?: number;
    /**
     * 修改当前使用的颜色数组下标
     * @param index 颜色数组下标
     */
    onCurrentChange?: (index: number) => void;
}
