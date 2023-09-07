export default function Input({
  name,
  type = "text",
  value = "",
  className = "",
  required = true,
  placeholder,
  disabled = false,
  readonly = false,
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      className={`bg-white text-gray-700 border focus:border-teal-500 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40 ${className}`}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
    />
  );
}
