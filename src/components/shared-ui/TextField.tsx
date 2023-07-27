import clsx from 'clsx';
import { HTMLProps, forwardRef } from 'react';

interface IProps extends HTMLProps<HTMLInputElement> {
    label?: string;
}

export type Ref = HTMLInputElement;

const TextField = forwardRef<Ref, IProps>(
    ({ label, type = 'text', className, ...rest }, ref) => {
        return (
            <label className="inline-flex items-center gap-2">
                {label && <span className="text-white text-sm">{label}</span>}
                <input
                    type={type}
                    ref={ref}
                    className={clsx(
                        className,
                        'text-black py-1 px-3 outline-none text-base placeholder:text-sm placeholder:text-gray-600'
                    )}
                    {...rest}
                />
            </label>
        );
    }
);

export default TextField;
