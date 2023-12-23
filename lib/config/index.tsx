import Color from 'color';
import { ColorTypeOptions } from '@/types';

export const WIDTH = 316;
export const HEIGHT = 16;
export const SINGLE_PICKER_CLSNAME = import.meta.env.VITE_SINGLE_PICKER;
export const DEFAULT_COLOR = Color();

export const default_coord_x = 0.5;
export const default_coord_y = 0.5;

export enum COLOR_TYPE {
    SINGLE = 'single',
    LINEAR = 'linear',
    RADIAL = 'radial',
    CONIC = 'conic',
}

export enum COLOR_FORMAT {
    HEX = 'hex',
    RGB = 'rgb',
    HSL = 'hsl',
    HSV = 'hsv',
}

export enum Dir {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export const colorTypeOptions: ColorTypeOptions = [
    { label: '纯色', value: COLOR_TYPE.SINGLE },
    { label: '线性渐变', value: COLOR_TYPE.LINEAR },
    { label: '径向渐变', value: COLOR_TYPE.RADIAL },
    { label: '锥形渐变', value: COLOR_TYPE.CONIC },
];
