import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'mb-5 px-2 py-1 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 block rounded-md w-full border-sky-600 border-2 ' +
                    className
                }
                ref={input}
            />
        </div>
    );
});
