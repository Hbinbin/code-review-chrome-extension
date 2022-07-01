import { useDefineComponent, useState } from '@lt/vue-hooks';
import './index.scss';

// interface
interface IProps {
    colors?: string[];
}

const prefixClass = 'color-picker-history';
const ColorPickerHistory = useDefineComponent<IProps>({
    props: ['colors'],
    setup(props) {
        return () => {
            console.log('colors:', props.colors);
            return (
                <div class={prefixClass}>
                    {props.colors?.map((color) => {
                        return <div class={`${prefixClass}-item`} style={{ background: color }} />;
                    })}
                </div>
            );
        };
    },
});

export default ColorPickerHistory;
