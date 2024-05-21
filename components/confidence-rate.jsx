export default function ConfidenceRate({ percentage = 0 }) {
  return (
    <div className="max-w-md w-full space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-800">Confidence Rate</span>
        <span className="text-gray-800 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-gray-700 h-2.5 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
