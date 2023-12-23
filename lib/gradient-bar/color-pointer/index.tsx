import { bem } from 'bem2';
import { GradientBarPointerParams } from '../interface';
import './index.scss';

const { es } = bem('color-pointer');

const ColorPointer = ({ color, isActive, isDragging }: GradientBarPointerParams) => {
    return (
        <div
            className={es(null, {
                active: isActive,
                dragging: isDragging,
            })}
        >
            <span
                className={es('block')}
                style={{
                    background: color.toString(),
                }}
            ></span>
        </div>
    );
};

export default ColorPointer;
