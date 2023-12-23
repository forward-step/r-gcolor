import { COLOR_FORMAT, default_coord_x, default_coord_y } from '@/config';
import Color from 'color';
import {
    ColorObj,
    ConicGradientColor,
    GradientColor,
    LinearGradientColor,
    RadialGradientColor,
    SingleColor,
} from '../types';
import { overflow } from './math';

export function isGradientColor(color: any): color is GradientColor {
    return !!color && Array.isArray(color.colors) && color.type;
}
export function isLinearGradientColor(color: GradientColor): color is LinearGradientColor {
    return color.type === 'linear';
}
export function isConicGradientColor(color: GradientColor): color is ConicGradientColor {
    return color.type === 'conic';
}
export function isRadialGradientColor(color: GradientColor): color is RadialGradientColor {
    return color.type === 'radial';
}
export function hasAngleGradientColor(
    color: GradientColor
): color is LinearGradientColor | ConicGradientColor {
    return ['linear', 'conic'].includes(color.type);
}
export function hasCoordGradientColor(
    color: GradientColor
): color is RadialGradientColor | ConicGradientColor {
    return ['radial', 'conic'].includes(color.type);
}

function formatCoord(num: number) {
    return num * 100 + '%';
}

function formatterSingleColor(single: SingleColor, format: string) {
    const color = Color(single);
    switch (format) {
        case COLOR_FORMAT.HEX:
            return color.hex();
        case COLOR_FORMAT.RGB:
            return color.rgb().string();
        case COLOR_FORMAT.HSL:
            return color.hsl().string();
        case COLOR_FORMAT.HSV:
            return color.hsv().string();
    }
    return single.toString();
}

/**
 * 格式化对象返回颜色字符串
 * @param color 颜色对象
 * @param format 格式
 * @returns 颜色字符串
 */
export function formatterColor(color?: ColorObj, format: COLOR_FORMAT = COLOR_FORMAT.RGB): string {
    if (!color) return '';
    else if (isGradientColor(color)) {
        const { type, colors } = color;

        let validColorNums = 0;
        const joinColors = colors
            .slice()
            .sort((a, b) => a.offset - b.offset)
            .reduce((total, item) => {
                if (overflow(item.offset, [0, 1])) return total;
                validColorNums++;
                return (total += `${formatterSingleColor(item.color, format)} ${
                    item.offset * 100
                }%,`);
            }, '')
            .slice(0, -1);
        if (validColorNums < 2) return '';
        else if (isLinearGradientColor(color)) {
            const { angle } = color;
            return `${type}-gradient(${angle}deg, ${joinColors})`;
        } else if (isConicGradientColor(color)) {
            const { angle, x = default_coord_x, y = default_coord_y } = color;
            return `${type}-gradient(from ${angle}deg at ${formatCoord(x)} ${formatCoord(
                y
            )}, ${joinColors})`;
        } else if (isRadialGradientColor(color)) {
            const { x = default_coord_x, y = default_coord_y } = color;
            return `${type}-gradient(at ${formatCoord(x)} ${formatCoord(y)},${joinColors})`;
        }
        return `${type}-gradient(${joinColors})`;
    } else {
        return formatterSingleColor(color, format);
    }
}

/**
 * 解析颜色字符串，返回颜色对象
 * @param colorString 颜色字符串
 * @param defalutColor 解析失败默认的颜色
 */
// export function parseColorString(colorString: string, defalutColor?: SingleColor): ColorObj {
//     colorString.trim();
// }
