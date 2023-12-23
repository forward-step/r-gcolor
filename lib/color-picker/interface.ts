import { ChangeValueProps, ColorObj, ColorTypeOptions, IColorType, SingleColor } from '@/types';
import { ReactNode } from 'react';
import { AngleInnerProps, CoordInnerProps, GradientBarInnerProps } from '@/index';

export interface ColorPickerSelectProps extends ChangeValueProps<IColorType> {
    options: ColorTypeOptions;
}

export interface ColorPickerProps extends ChangeValueProps<ColorObj> {
    /**
     * 自定义颜色类型选择器
     */
    select?: (props: ColorPickerSelectProps) => ReactNode;
    /**
     * 子节点
     * @param props.value 颜色对象
     * @param props.onChange 修改颜色
     * @returns {JSX}
     */
    children?: (props: ChangeValueProps<SingleColor>) => ReactNode;
    /**
     * 角度控件参数
     */
    angleProps?: Partial<AngleInnerProps>;
    /**
     * 坐标控件参数
     */
    coordProps?: Partial<CoordInnerProps>;
    /**
     * 渐变条控件参数
     */
    GradientBarProps?: Partial<GradientBarInnerProps>;
}
