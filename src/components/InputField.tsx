import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="mb-5">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } focus:border-blue-500 focus:ring-2 focus:ring-opacity-30 transition-all duration-200 outline-none`}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;