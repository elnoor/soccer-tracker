export default function TextArea({ className = "", ...rest }) {
  return (
    <textarea
      className={`bg-white/60 text-gray-700 border border-gray-300 focus:border-teal-500 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-40 ${className}`}
      {...rest}
    />
  );
}
