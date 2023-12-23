import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { DraggableChange } from '@/draggable';
import Color from 'color';
import { SingleColor } from '..';

export type IDir = 'horizontal' | 'vertical' | 'all';

export function useCoord({
    dir,
    value,
    onChange: innerChange,
    updatePositionX,
    updatePositionY,
}: {
    dir: IDir;
    value?: SingleColor;
    onChange?: (
        color: Color,
        precent: number,
        coord: { precentX: number; precentY: number }
    ) => void;
    updatePositionX: (color: Color) => number;
    updatePositionY: (color: Color) => number;
}) {
    const color = useMemo(() => (value instanceof Color ? value : Color(value)), [value]);
    const [precentX, setPrecentX] = useState<number>(0);
    const [precentY, setPrecentY] = useState<number>(0);

    const enableX = useMemo(() => ['horizontal', 'all'].includes(dir), [dir]);
    const enableY = useMemo(() => ['vertical', 'all'].includes(dir), [dir]);

    /// 事件 --> 颜色
    const onChange = useCallback<DraggableChange>(
        ({ precentX, precentY }) => {
            innerChange?.(color, enableX ? precentX : precentY, {
                precentX,
                precentY,
            });
        },
        [enableX, innerChange, color]
    );

    /// 颜色 --> 位置
    useEffect(() => {
        enableX && setPrecentX(updatePositionX(color));
        enableY && setPrecentY(updatePositionY(color));
    }, [enableX, enableY, color, dir, updatePositionX, updatePositionY]);

    /// 位置 --> UI
    const pointerStyle = useMemo<CSSProperties>(
        () => ({
            display: 'inline-flex',
            position: 'absolute',
            left: (enableX ? precentX : 0) * 100 + '%',
            top: (enableY ? precentY : 0) * 100 + '%',
            [enableX ? 'height' : 'width']: '100%',
        }),
        [precentX, precentY, enableX, enableY]
    );

    return {
        onChange,
        pointerStyle,
    };
}
