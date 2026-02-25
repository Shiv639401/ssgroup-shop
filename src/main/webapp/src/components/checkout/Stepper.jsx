import React from "react";

const steps = ["Cart", "Address", "Payment", "Review"];

export default function Stepper({ currentStep = 0, onStepClick }) {
  return (
    <div className="bg-white border rounded-2xl shadow-card p-4">
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={label} className="flex-1">
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm transition
                      ${
                        isDone
                          ? "bg-green-600 text-white"
                          : isActive
                          ? "bg-accent text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isActive ? "text-primary" : "text-muted"
                      }`}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isDone ? "Completed" : isActive ? "In progress" : "Pending"}
                    </p>
                  </div>
                </div>
              </button>

              {/* line */}
              {index !== steps.length - 1 && (
                <div
                  className={`h-[2px] mt-3 mx-2 transition ${
                    isDone ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
