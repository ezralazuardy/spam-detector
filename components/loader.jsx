export default function Loader(props) {
  const show = props?.show ?? true;

  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-white absolute ${show ? `visible` : `invisible`}`}
    >
      <div className="flex items-center space-x-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-700 border-t-transparent" />
        <div className="text-gray-500">
          <span className="animate-cycle-text">Analyzing your text...</span>
        </div>
      </div>
    </div>
  );
}
