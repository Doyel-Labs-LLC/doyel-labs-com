const steps = [
  { title: "Talk", body: "Tell us what you need." },
  { title: "Plan", body: "Agree on scope, price, and timing." },
  { title: "Build", body: "See progress and review it with us." },
  { title: "Launch", body: "Take ownership, with support available." },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="border-t border-line2 pt-5">
          <span className="font-mono text-xs text-accent">0{index + 1}</span>
          <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-mute">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
