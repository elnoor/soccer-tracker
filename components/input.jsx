export default function Input({ className = "", ...rest }) {
  return (
    <input
      className={`bg-white/60 text-gray-700 border focus:border-teal-500 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40 ${className}`}
      {...rest}
    />
  );
}
