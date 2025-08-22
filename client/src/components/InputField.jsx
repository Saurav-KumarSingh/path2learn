
const InputField = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  name, 
  required = false 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="text-sm font-medium text-[var(--color-orange)]"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="px-4 py-2 rounded-lg bg-[var(--color-dark)] text-white 
                   border border-[var(--color-blackish)] 
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]"
      />
    </div>
  );
};

export default InputField;
