import Color from 'color';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export type IDir = 'horizontal' | 'vertical';
export type IColorType = 'single' | 'linear' | 'radial' | 'conic';

//#region color type
export type SingleColor = Color | string;
export type GradientColorItem = {
    color: SingleColor;
    offset: number;
};
export type LinearGradientColor = {
    type: 'linear';
    angle: number;
    colors: GradientColorItem[];
};
export type ConicGradientColor = {
    type: 'conic';
    angle: number;
    x?: number;
    y?: number;
    colors: GradientColorItem[];
};
export type RadialGradientColor = {
    type: 'radial';
    x?: number;
    y?: number;
    colors: GradientColorItem[];
};
export type GradientColor = LinearGradientColor | RadialGradientColor | ConicGradientColor;
export type ColorObj = SingleColor | GradientColor;
//#endregion

export interface ChangeValueProps<T> {
    // defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
}

/// 拖拽组件的共同参数
export type PointerElementParams = { isDragging: boolean };
export type PointerElement = ReactElement | ((e: PointerElementParams) => ReactElement);

export interface DragComponentProps extends ChangeValueProps<SingleColor | string> {
    width?: string | number;
    height?: string | number;
    dir?: IDir;
    pointer?: PointerElement;
}

export interface SingleColorPicker extends ChangeValueProps<SingleColor> {
    className?: string;
    style?: CSSProperties;
    /**
     * 前缀
     */
    prefix?: ReactNode | ((props: ChangeValueProps<SingleColor>) => ReactNode);
    /**
     * 后缀
     */
    suffix?: ReactNode | ((props: ChangeValueProps<SingleColor>) => ReactNode);
}

export type ColorTypeOptions = Array<{ label: string; value: IColorType }>;
