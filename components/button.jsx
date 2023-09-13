export default function Button({
  children,
  className = "",
  secondary = false,
  disabled = false,
  loading = false,
  ...rest
}) {
  const _disabled = disabled || loading;
  return (
    <button
      {...rest}
      disabled={_disabled}
      className={`rounded-full shadow-sm hover:shadow-lg font-medium cursor-pointer transition-all duration-300 focus:outline-none px-4 py-2 ${
        secondary
          ? "bg-white/30 text-gray-600 ring-1 ring-gray-900/5"
          : "bg-teal-600 text-white"
      } ${_disabled ? "opacity-70 hover:cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? "Loading" : children}
    </button>
  );
}
