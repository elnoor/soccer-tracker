export default function Modal({
  open,
  onClose,
  children,
  showCloseButton = true,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed z-10 top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-75 transition-all"
      role="dialog"
    >
      <div className="flex min-h-full justify-center p-2 items-center">
        <div className="transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-lg">
          {showCloseButton && (
            <span
              onClick={onClose}
              className="absolute right-0 top-0 mr-1 -mt-1 text-3xl"
            >
              &times;
            </span>
          )}
          <div className="bg-gray-200 p-3 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
