import React from "react";

const TextInput = ({
  className,
  labelTitle,
  type,
  placeholder,
  value,
  onChange,
  accept,
}) => {
  return (
    <div className="input-filed">
      <label className={`${className}-label`} htmlFor={className}>
        {labelTitle}
      </label>
      <input
        className={className}
        id={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};

export default TextInput;
