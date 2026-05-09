interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepTitles,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            backgroundColor: "#1a5c2e",
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {stepTitles.map((title, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-brand-green text-white"
                    : isCurrent
                    ? "border-2 border-brand-green text-brand-green bg-white"
                    : "border-2 border-gray-200 text-gray-400 bg-white"
                }`}
              >
                {isCompleted ? "✓" : step}
              </div>
              <span
                className={`text-xs text-center hidden sm:block ${
                  isCurrent ? "text-brand-green font-medium" : "text-gray-400"
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
