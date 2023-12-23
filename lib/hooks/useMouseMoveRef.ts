import { useCallback, useEffect, useRef } from 'react';
import { useDisabledSelect } from './useDisabledSelect';
import { useRefValue } from './useRefValue';

export type MouseMoveConfig<Context = void, DOM extends HTMLElement = HTMLElement> = {
    start?: (e: { startE: MouseEvent; stop: () => void; dom: DOM }) => Context;
    move?: (e: { moveE: MouseEvent; startE: MouseEvent; dom: DOM; ctx: Context }) => void;
    end?: (e: { endE: MouseEvent; startE: MouseEvent; dom: DOM; ctx: Context }) => void;
    /**
     * move函数移动的容器
     * @default window
     */
    container?: HTMLElement | Document | Window;
    /**
     * 拖拽过程中是否禁用选取
     * @default true
     */
    disbaledSelect?: boolean;
    // options?: Parameters<HTMLElement['addEventListener']>[2];
};

export function useMouseMoveRef<Context, DOM extends HTMLElement = HTMLElement>(
    cfg: MouseMoveConfig<Context, DOM>
) {
    const startEv = useRef<MouseEvent | null>(null);
    const ctx = useRef<Context>();
    const dom = useRef<DOM | null>(null);
    const { disabled, reset } = useDisabledSelect();
    const startFn = useRefValue(cfg.start);
    const moveFn = useRefValue(cfg.move);
    const upFn = useRefValue(cfg.end);

    useEffect(() => {
        const { container = window } = cfg;
        function move(ev: MouseEvent) {
            if (startEv.current) {
                moveFn.current?.({
                    startE: startEv.current,
                    moveE: ev,
                    ctx: ctx.current!,
                    dom: dom.current!,
                });
            }
        }
        function up(ev: MouseEvent) {
            if (startEv.current) {
                upFn.current?.({
                    startE: startEv.current,
                    endE: ev,
                    dom: dom.current!,
                    ctx: ctx.current!,
                });
            }
            // clear
            reset();
            startEv.current = null;
        }
        container.addEventListener('mousemove', move as any);
        container.addEventListener('mouseup', up as any);
        return () => {
            container.removeEventListener('mousemove', move as any);
            container.removeEventListener('mouseup', up as any);
        };
    }, []);

    const down = useCallback((ev: MouseEvent) => {
        const { disbaledSelect = true } = cfg;
        startEv.current = ev;
        if (disbaledSelect) disabled();
        ctx.current = startFn.current?.({
            startE: ev,
            dom: dom.current!,
            stop() {
                startEv.current = null;
            },
        });
    }, []);

    return useCallback((node: DOM | null) => {
        if (!node) return;
        dom.current = node;
        node.removeEventListener('mousedown', down); // required
        node.addEventListener('mousedown', down);
    }, []);
}
