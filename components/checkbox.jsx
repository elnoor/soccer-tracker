export default function CheckBox({
  className = "",
  children,
  checked,
  ...rest
}) {
  return (
    <label className={`flex items-center ${className}`}>
      <input
        checked={checked}
        type="checkbox"
        className="h-4 w-4 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        {...rest}
      />
      <span>{children}</span>
    </label>
  );
}
