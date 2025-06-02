import React from 'react';
import InputMask from 'react-input-mask';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: any) => void;
    required?: boolean;
    error?: string;
    mask?: string; // Add this
}

const InputField: React.FC<InputFieldProps> = ({
                                                   id,
                                                   label,
                                                   type = 'text',
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                   required,
                                                   error,
                                                   mask,
                                               }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            {mask ? (
                <InputMask
                    mask={mask}
                    id={id}
                    value={value}
                    onChange={onChange}
                >
                    {(inputProps: any) => (
                        <input
                            {...inputProps}
                            type={type}
                            placeholder={placeholder}
                            className={`w-full px-4 py-2 border ${
                                error ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    )}
                </InputMask>
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full px-4 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default InputField;
