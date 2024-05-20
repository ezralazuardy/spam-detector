export default function Result(props) {
  const show = props?.show ?? true;
  const result = props?.result ?? {};
  const detection = result.detection ?? "Unknown";

  return (
    <>
      <div
        className={`flex h-screen w-screen items-center justify-center bg-white absolute ${show ? `visible` : `invisible`}`}
      >
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 font-inter">
              Detection Result
            </h2>
            <p className="text-gray-600 font-inter">
              Based on our analysis, your text content is categorized as{" "}
              <b>{detection}</b>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
