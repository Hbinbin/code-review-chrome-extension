import { VNode, watchEffect } from 'vue';
import { useDefineComponent, useState } from '@lt/vue-hooks';
import { useChildren } from '@lt/vue-hooks';
import './index.scss';

export interface ICheckboxEvent<T = unknown> extends Event {
    target: Event['target'] & { value: T; checked: boolean };
}
export interface ICheckboxProps {
    label?: string | VNode;
    value?: string;
    /** 受控组件时的传值 */
    checked?: boolean;
    /** 默认状态 */
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (e: ICheckboxEvent) => void;
}
const Checkbox = useDefineComponent<ICheckboxProps>({
    props: ['value', 'checked', 'defaultChecked', 'disabled', 'onChange'],
    setup(props, { slots }) {
        const defaultChecked = !!props.defaultChecked; // 只用作默认值，不做响应式处理
        const initialChecked = props.checked ?? defaultChecked; // checkd的默认值
        const [checked, setChecked] = useState(initialChecked);

        // 监听props传入的checked
        watchEffect(() => {
            setChecked(!!props.checked);
        });

        // 处理change事件
        const handleChange = (e: ICheckboxEvent) => {
            if (props.disabled) return;
            const value = e.target!.checked;
            // 如果checked没有从外部传入，走内部赋值控制
            props.checked ?? setChecked(value);
            props.onChange?.(e);
        };

        return () => {
            const children = useChildren(slots);
            return (
                <label class="tool-component-checkbox flex items-center text-left my-1 text-font-p  hover:text-font-h1">
                    <input
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 opacity-0 absolute"
                        value={props.value}
                        checked={checked.value}
                        disabled={props.disabled}
                        onChange={handleChange}
                    />
                    <div class="bg-transparent border border-font-h1 w-4 h-4 flex flex-shrink-0 justify-center items-center focus-within:bg-primary checked:border-primary">
                        <svg
                            class="hidden"
                            width="9"
                            height="7"
                            viewBox="0 0 7 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.39915 0.531399C6.59567 0.72798 6.60596 1.04022 6.43006 1.24891L6.39902 1.2827L3.21132 4.46927C3.01475 4.66577 2.70254 4.67607 2.49384 4.50021L2.46006 4.46918L0.866513 2.87543C0.65906 2.66795 0.659082 2.33158 0.866561 2.12413C1.06312 1.9276 1.37536 1.91727 1.58407 2.09314L1.61786 2.12418L2.83594 3.3421L5.64785 0.531265C5.84444 0.334753 6.15668 0.324464 6.36537 0.500359L6.39915 0.531399Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    {children?.length ? <span class="px-2">{children}</span> : null}
                </label>
            );
        };
    },
});

export default Checkbox;
