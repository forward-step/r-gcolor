import { ColorObj } from '@/index';
import { formatterColor } from '@/utils';
import { PropsWithChildren } from 'react';

export function Preview({
    color,
    children,
}: PropsWithChildren<{
    color: ColorObj;
}>) {
    return (
        <div
            style={{
                display: 'flex',
                gap: 12,
            }}
        >
            <div>{children}</div>
            <div>
                <div
                    style={{
                        width: 200,
                        height: 200,
                        background: formatterColor(color),
                    }}
                ></div>
                <p>background: {formatterColor(color)};</p>
            </div>
        </div>
    );
}
