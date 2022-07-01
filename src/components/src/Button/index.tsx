import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'vue';
import { useDefineComponent, useChildren } from '@lt/vue-hooks';
import './index.scss';

export type TButtonType = 'primary' | 'default';
interface IButtonProps extends Omit<ButtonHTMLAttributes, 'type'> {
    /** 按钮类型: 后续会扩展类型值  */
    type?: TButtonType;
    onClick?: (e: MouseEvent) => void;
}

const prefixClass = 'tool-component-btn';
const Button = useDefineComponent<IButtonProps>({
    props: ['type', 'onClick'],
    setup(props, { slots, attrs }) {
        // 处理点击事件
        const handleClick = (e: MouseEvent) => {
            props.onClick?.(e);
        };

        return () => {
            const children = useChildren(slots);
            const btnType = `${prefixClass}-${props.type || 'primary'}`;

            return (
                <button {...attrs} class={classNames(prefixClass, btnType)} onClick={handleClick}>
                    {children}
                </button>
            );
        };
    },
});

export default Button;
