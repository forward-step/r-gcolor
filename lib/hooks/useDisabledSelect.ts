import { useRef } from 'react';

// error: 多次disabled将会失效
export function useDisabledSelect() {
    const originalOnSelectStart = useRef<any>(null);
    const isDisabled = useRef(false);
    return {
        disabled() {
            if (isDisabled.current === false) {
                isDisabled.current = true;
                originalOnSelectStart.current = document.onselectstart;
                document.onselectstart = () => false;
            }
        },
        reset() {
            if (isDisabled.current === true) {
                document.onselectstart = originalOnSelectStart.current;
                isDisabled.current = false;
            }
        },
    };
}
