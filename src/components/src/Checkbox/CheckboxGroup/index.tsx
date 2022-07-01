// import React, { useEffect, useState } from 'react';
import { watchEffect } from 'vue';
import { useDefineComponent, useState } from '@lt/vue-hooks';
import Checkbox, {type ICheckboxEvent} from '../Checkbox';
import './index.scss';

export interface IOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface ICheckboxGroupProps {
    options: IOption[];
    label?: string;
    value?: string[];
    defaultValue?: string[];
    disabled?: boolean;
    onChange?: (checked: string[]) => void;
}

const CheckboxGroup = useDefineComponent<ICheckboxGroupProps>({
    props: ['options', 'label', 'value', 'defaultValue', 'disabled', 'onChange'],
    setup(props) {
        const defaultValue = props.defaultValue; // 只用作默认值，不做响应式处理
        const initialValue = props.value ?? defaultValue; // checkd的默认值
        const [values, setValues] = useState(initialValue);

        watchEffect(() => {
            setValues(props.value);
        });

        const handleChange = (e: ICheckboxEvent<string>) => {
            const { value: newValue, checked } = e.target;
            const valueSet = new Set(values.value);

            if (checked) {
                valueSet.add(newValue);
            } else {
                valueSet.delete(newValue);
            }
            setValues([...valueSet]);
            props.onChange?.([...valueSet]);
        };
        return () => {
            return (
                <div class="tool-component-checkbox-group flex flex-col">
                    {props.label && <label class="text-sm font-medium">{props.label}</label>}
                    <div class="tool-component-checkbox-group-item flex flex-col">
                        {props.options.map((option, index) => {
                            console.log();
                            const isChecked = values.value?.includes(option.value.toString());
                            const isDisabled = props.disabled || option.disabled;
                            return (
                                <Checkbox
                                    key={`${option.value}_${index}`}
                                    value={option.value}
                                    disabled={isDisabled}
                                    checked={isChecked}
                                    onChange={handleChange}
                                >
                                    {option.label}
                                </Checkbox>
                            );
                        })}
                    </div>
                </div>
            );
        };
    },
});

export default CheckboxGroup;
