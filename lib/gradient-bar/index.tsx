import { useCallback, useMemo, useRef, useState, MouseEvent } from 'react';
import { bem } from 'bem2';
import ColorPointer from './color-pointer';
import { formatNumber, formatterColor, isFunction, overflow, range } from '@/utils';
import { produce } from 'immer';
import { TransparentCells } from '@/transparent-cells';
import { DEFAULT_COLOR } from '@/config';
import type { GradientColorItem } from '@/types';
import type { GradientBarProps } from './interface';
import { InputNumber } from '@/input-number';
import { useRefValue, useMouseMoveRef } from '@/hooks';
import './index.scss';

export * from './interface';

const { emsc, es, ec } = bem('gradient-bar');
const RANGE: [number, number] = [0, 1];
const DECIMAL_PLACES = 2;

export function GradientBar({
    className,
    style,
    value,
    onChange,
    current: outsideCurrent,
    onCurrentChange,
    pointer,
    appendMode = 'button',
    appendColor = DEFAULT_COLOR,
    appendOffset = 1,
    focusWhenAppend = true,
    deleteWhenOverflow = false,
    input = true,
}: GradientBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const background = useMemo<string>(() => {
        return formatterColor({
            type: 'linear',
            angle: 90,
            colors: value || [],
        });
    }, [value]);
    const [innerCurrent, setInnerCurrent] = useState<number>(outsideCurrent ?? 0);
    const current = useMemo(() => outsideCurrent ?? innerCurrent, [outsideCurrent, innerCurrent]);

    const handleCurrentChange = useCallback(
        (index: number) => {
            setInnerCurrent(index);
            onCurrentChange?.(index);
        },
        [onCurrentChange]
    );

    const addColor = (item: GradientColorItem) => {
        onChange?.(
            produce(value || [], (draft: GradientColorItem[]) => {
                draft.push(item);
            })
        );
        if (focusWhenAppend) {
            handleCurrentChange((value ?? []).length);
        }
    };

    const appendColorByButtonMode = () => {
        if (appendMode !== 'button') return;
        addColor({ color: appendColor, offset: appendOffset });
    };

    const appendColorByClickMode = (e: MouseEvent) => {
        if (appendMode !== 'click') return;
        const { width, x } = e.currentTarget.getBoundingClientRect();
        const offset = range((e.pageX - x) / width, RANGE);
        addColor({ color: appendColor, offset });
    };

    const removeColor = () => {
        if (typeof current !== 'number' || !value || value.length <= 2) return;
        onChange?.(
            produce(value || [], draft => {
                draft.splice(current, 1);
            })
        );
        handleCurrentChange(range(current - 1, [0, current]));
    };

    const handleChange = (index: number, offset: number) => {
        onChange?.(
            produce(value || [], draft => {
                if (!draft[index]) return;
                if (deleteWhenOverflow && draft.length > 2 && overflow(offset, RANGE)) {
                    draft[index].offset = formatNumber(offset, DECIMAL_PLACES);
                } else {
                    draft[index].offset = formatNumber(range(offset, RANGE), DECIMAL_PLACES);
                }
            })
        );
    };

    const handleChangeFinish = (index: number, offset: number) => {
        if (deleteWhenOverflow && value && value.length > 2 && overflow(offset, RANGE)) {
            onChange?.(
                produce(value, draft => {
                    draft.splice(index, 1);
                })
            );
            handleCurrentChange(range(index - 1, [0, index]));
        }
    };

    // 指针容器
    const ColorPointerContainer = useCallback(
        ({
            isActive,
            gcolor,
            onChange,
            onFinish,
        }: {
            /**
             * 是否激活
             */
            isActive: boolean;
            /**
             * 颜色块对象
             */
            gcolor: GradientColorItem;
            onChange?: (offset: number) => void;
            onFinish?: (offset: number) => void;
        }) => {
            const [isDragging, setIsDragging] = useState(false);
            const onChangeRef = useRefValue(onChange);
            const onFinishRef = useRefValue(onFinish);
            const ref = useMouseMoveRef<DOMRect>({
                start({ stop }) {
                    if (!barRef.current) {
                        stop();
                        return null as any;
                    }
                    setIsDragging(true);
                    return barRef.current.getBoundingClientRect();
                },
                move({ moveE, ctx: { x, width } }) {
                    const offset = (moveE.x - x) / width;
                    onChangeRef.current?.(offset);
                },
                end({ endE, ctx: { x, width } }) {
                    setIsDragging(false);
                    const offset = (endE.x - x) / width;
                    onFinishRef.current?.(offset);
                },
            });

            return (
                <div ref={ref}>
                    {isFunction(pointer) ? (
                        pointer({
                            isActive,
                            isDragging,
                            color: gcolor.color,
                            offset: gcolor.offset,
                        })
                    ) : (
                        <ColorPointer
                            isActive={isActive}
                            isDragging={isDragging}
                            color={gcolor.color}
                            offset={gcolor.offset}
                        />
                    )}
                </div>
            );
        },
        []
    );

    // input
    let inputWidget = null;
    const inputValue = formatNumber(value![current!].offset * 100, DECIMAL_PLACES + 2);
    const inputChange = (val: number) => {
        typeof current === 'number' && handleChange(current, val / 100);
    };
    if (input === true) {
        inputWidget = (
            <InputNumber
                value={inputValue}
                unit="%"
                onChange={inputChange}
                min={0}
                max={100}
                step={1}
            />
        );
    } else if (typeof input === 'function') {
        inputWidget = input({
            value: inputValue,
            onChange: inputChange,
        });
    }

    return (
        <div className={ec(null, className)} style={style}>
            <div className={emsc('container')}>
                <div className={emsc('colors')}>
                    {value?.map((item, index) => {
                        const isActive = current === index;
                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    transform: `translateX(-50%) translateY(-100%)`,
                                    left: item.offset * 100 + '%',
                                    zIndex: isActive ? 2 : 1, // keep active is above
                                }}
                                onMouseDown={() => handleCurrentChange(index)}
                            >
                                <ColorPointerContainer
                                    isActive={isActive}
                                    gcolor={item}
                                    onChange={offset => handleChange(index, offset)}
                                    onFinish={offset => handleChangeFinish(index, offset)}
                                />
                            </div>
                        );
                    })}
                </div>
                <div
                    className={emsc('bar', appendMode)}
                    ref={barRef}
                    onClick={appendColorByClickMode}
                >
                    <TransparentCells background={background}></TransparentCells>
                </div>
            </div>
            {appendMode === 'button' ? (
                <>
                    <span role="button" className={es('btn')} onClick={appendColorByButtonMode}>
                        +
                    </span>
                    <span
                        role="button"
                        className={es('btn', {
                            disabled: !value || value.length <= 2,
                        })}
                        onClick={removeColor}
                    >
                        -
                    </span>
                </>
            ) : null}
            {inputWidget}
        </div>
    );
}
