export default function Select({
  children,
  onChange,
  className = "",
  ...rest
}) {
  function change(e) {
    const selectedOnes = Object.values(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    onChange(selectedOnes);
  }
  return (
    <select
      multiple
      onChange={change}
      className={`bg-white/60 text-gray-700 border border-gray-300 focus:border-teal-500 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40 ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}
