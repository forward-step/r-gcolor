import { IColorType, GradientColor, GradientColorItem, SingleColor } from '@/types';
import { bem } from 'bem2';
import { useMemo, useState } from 'react';
import { GradientBar } from '@/gradient-bar';
import { produce } from 'immer';
import { isGradientColor, hasAngleGradientColor, hasCoordGradientColor } from '@/utils';
import './index.scss';
import { COLOR_TYPE, colorTypeOptions, DEFAULT_COLOR } from '@/config';
import { Angle } from '@/angle';
import { Coord } from '@/coord';
import { Select } from './select';
import { ColorPickerProps } from './interface';

export * from './interface';

const { emsc } = bem('color-picker');

export function ColorPicker({
    value,
    onChange,
    select = Select,
    children,
    angleProps,
    coordProps,
    GradientBarProps,
}: ColorPickerProps) {
    const [current, setCurrent] = useState(0);
    const { type, angle, colors, singleColor, x, y } = useMemo<{
        type: IColorType;
        angle: number;
        colors: GradientColorItem[];
        singleColor?: SingleColor;
        x?: number;
        y?: number;
    }>(() => {
        if (isGradientColor(value)) {
            return {
                angle: 0,
                ...value,
                singleColor: value.colors[current].color,
            };
        }
        return {
            type: COLOR_TYPE.SINGLE,
            angle: 0,
            colors: [],
            singleColor: value,
        };
    }, [value, current]);
    const [formatType, setFormatType] = useState(type);

    // 切换颜色类型
    const handleFormatTypeChange = (type: string) => {
        if (formatType === type || !onChange) return;
        /// gradient
        if (isGradientColor(value)) {
            if (type === COLOR_TYPE.SINGLE) {
                onChange(value.colors[0].color);
            } else if (type === COLOR_TYPE.LINEAR || type === COLOR_TYPE.CONIC) {
                const angle = hasAngleGradientColor(value) ? value.angle : 0;
                onChange({
                    type,
                    angle,
                    colors: value.colors,
                });
            } else if (type === COLOR_TYPE.RADIAL) {
                onChange({
                    type,
                    colors: value.colors,
                });
            }
        }
        /// single
        else {
            const colors = [
                {
                    offset: 0,
                    color: value || DEFAULT_COLOR,
                },
                {
                    offset: 1,
                    color: DEFAULT_COLOR,
                },
            ];
            if (type === COLOR_TYPE.LINEAR || type === COLOR_TYPE.CONIC) {
                onChange({
                    type,
                    angle: 0,
                    colors,
                });
            } else if (type === COLOR_TYPE.RADIAL) {
                onChange({
                    type,
                    colors,
                });
            }
        }

        setFormatType(type as any);
        setCurrent(0);
    };

    const handleGradientChange = (colors: GradientColorItem[]) => {
        if (isGradientColor(value)) {
            onChange?.(
                produce(value, (draft: GradientColor) => {
                    draft.colors = colors;
                })
            );
        }
    };

    const hanldeSingleColorChange = (color: SingleColor) => {
        if (!value || !onChange) return;
        else if (isGradientColor(value)) {
            onChange(
                produce(value, (draft: GradientColor) => {
                    draft.colors[current].color = color;
                })
            );
        } else {
            onChange(color);
        }
    };

    const handleAngleChange = (angle: number) => {
        if (isGradientColor(value) && hasAngleGradientColor(value)) {
            onChange?.(
                produce(value, draft => {
                    draft.angle = parseFloat(angle.toFixed(0));
                })
            );
        }
    };

    const handleCoordChange = ({ x, y }: { x: number; y: number }) => {
        if (isGradientColor(value) && hasCoordGradientColor(value)) {
            onChange?.(
                produce(value, draft => {
                    draft.x = x;
                    draft.y = y;
                })
            );
        }
    };

    const angleWidget = <Angle {...angleProps} value={angle} onChange={handleAngleChange} />;
    const coordWidget = <Coord {...coordProps} x={x} y={y} onChange={handleCoordChange} />;
    return (
        <div className={emsc()}>
            <div className={emsc('row', 'type')}>
                {select({
                    value: formatType,
                    onChange: handleFormatTypeChange,
                    options: colorTypeOptions,
                })}
            </div>
            {type === COLOR_TYPE.LINEAR ? (
                <div className={emsc('row', 'filter')}>{angleWidget}</div>
            ) : type === COLOR_TYPE.CONIC ? (
                <div className={emsc('row', ['filter', 'two'])}>
                    {angleWidget}
                    {coordWidget}
                </div>
            ) : type === COLOR_TYPE.RADIAL ? (
                <div className={emsc('row', 'filter')}>{coordWidget}</div>
            ) : null}
            {type !== COLOR_TYPE.SINGLE ? (
                <div className={emsc('row', 'gradientBar')}>
                    <GradientBar
                        {...GradientBarProps}
                        value={colors}
                        onChange={handleGradientChange}
                        current={current}
                        onCurrentChange={setCurrent}
                    />
                </div>
            ) : null}
            {children?.({
                value: singleColor,
                onChange: hanldeSingleColorChange,
            })}
        </div>
    );
}
