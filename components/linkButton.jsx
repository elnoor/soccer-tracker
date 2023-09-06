import Link from "next/link";

export default function LinkButton({
  href = "",
  children,
  className = "",
  secondary = false,
}) {
  return (
    <Link
      href={href}
      className={`rounded-full shadow-sm hover:shadow-lg font-medium hover:cursor-pointer transition-all duration-300 focus:outline-none px-4 py-2 ${
        secondary
          ? "bg-white/30 text-gray-600 ring-1 ring-gray-900/5"
          : "bg-teal-600 text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
