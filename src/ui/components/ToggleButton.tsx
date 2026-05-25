import { useState } from "react";

function ToggleButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? "translate-x-9" : "translate-x-1"
          }`}
        />
      </button>

      <span className="ml-4 text-lg font-medium text-gray-700">
        {enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}

export default ToggleButton;