import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  placeholder,
  options,
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
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } focus:border-blue-500 focus:ring-2 focus:ring-opacity-30 transition-all duration-200 outline-none appearance-none bg-white`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SelectField;