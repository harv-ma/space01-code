import clsx from 'clsx';
import { FC, FormEvent } from 'react';

interface IProps {
    label?: string;
    name?: string;
    checked: boolean;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const Toggle: FC<IProps> = ({ label, checked, ...rest }) => {
    return (
        <label className="inline-flex items-center gap-4">
            {label && <span className="text-sm">{label}</span>}
            <span className="block bg-gray-300 w-11 h-6 rounded-full relative">
                <span
                    className={clsx(
                        'absolute left-1 top-1/2 translate-y-[-50%] rounded-full aspect-square h-5 w-5 bg-black transition-transform',
                        checked && 'translate-x-4'
                    )}
                ></span>
            </span>
            <input
                type="checkbox"
                checked={checked}
                readOnly
                {...rest}
                className="hidden"
            />
        </label>
    );
};

export default Toggle;
