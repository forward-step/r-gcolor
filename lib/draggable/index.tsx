import { useCallback, isValidElement, CSSProperties, useState, PropsWithChildren } from 'react';
import { isFunction, range } from '@/utils';
import { PointerElement } from '@/types';
import { useMouseMoveRef } from '@/hooks';

export type DraggableChange = (coord: {
    x: number;
    y: number;
    limitX: number;
    limitY: number;
    width: number;
    height: number;
    precentX: number;
    precentY: number;
}) => void;
export type DraggableProps = PropsWithChildren<{
    className?: string;
    style?: CSSProperties;
    onChange?: DraggableChange;
    pointerStyle?: CSSProperties;
    pointer?: PointerElement;
}>;
export default function Draggable({
    className,
    style,
    onChange,
    children,
    pointer,
    pointerStyle,
}: DraggableProps) {
    const [isDragging, setIsDragging] = useState(false);
    const callback = useCallback(
        (e: MouseEvent, dom: HTMLDivElement) => {
            const { left, top, width, height } = dom.getBoundingClientRect();
            const x = e.x - left;
            const y = e.y - top;
            const limitX = range(x, [0, width]);
            const limitY = range(e.y - top, [0, height]);
            onChange?.({
                x,
                y,
                limitX,
                limitY,
                width,
                height,
                precentX: limitX / width,
                precentY: limitY / height,
            });
        },
        [onChange]
    );

    const ref = useMouseMoveRef<void, HTMLDivElement>({
        start({ startE, dom }) {
            setIsDragging(true);
            callback(startE, dom);
        },
        move({ moveE, dom }) {
            callback(moveE, dom);
        },
        end() {
            setIsDragging(false);
        },
    });

    return (
        <div ref={ref} className={className} style={style}>
            {children}
            <div style={pointerStyle}>
                {isValidElement(pointer)
                    ? pointer
                    : isFunction(pointer)
                    ? pointer({ isDragging })
                    : pointer}
            </div>
        </div>
    );
}
