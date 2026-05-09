"use client";

interface Props {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function CalendarStep({ onNext, onBack, onSkip }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Connect your calendar
      </h2>
      <p className="text-gray-500 mb-8">
        Let your AI book appointments directly into your Google Calendar. Skip
        this and set it up later if you prefer.
      </p>

      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center mb-6">
        <div className="text-5xl mb-4">📅</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Connect your Google Calendar
        </h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          When a customer books an appointment, it will automatically appear in
          your calendar with their name, number, and the service they want.
        </p>
        <button
          onClick={onNext}
          className="btn-primary px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-1.5 17.25V6.75l7.5 5.25-7.5 5.25z" />
          </svg>
          Connect Google Calendar
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Coming soon:</span> Google Calendar
          integration is in final testing. Your AI will still take appointments
          and notify you — you&apos;ll just add them to your calendar manually
          until the integration is live.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 btn-outline py-4 rounded-xl text-lg"
        >
          ← Back
        </button>
        <button
          onClick={onSkip}
          className="flex-1 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
        >
          Set up later →
        </button>
      </div>
    </div>
  );
}
