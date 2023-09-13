export default function Button({
  children,
  className = "",
  secondary = false,
  disabled = false,
  ...rest
}) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`rounded-full shadow-sm hover:shadow-lg font-medium cursor-pointer transition-all duration-300 focus:outline-none px-4 py-2 ${
        secondary
          ? "bg-white/30 text-gray-600 ring-1 ring-gray-900/5"
          : "bg-teal-600 text-white"
      } ${disabled ? "opacity-70 hover:cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
