import Link from "next/link";

const services = [
  { href: "/services/websites/", title: "Websites", body: "A professional website that brings customers to your business." },
  { href: "/services/payroll/", title: "Business tools & payroll", body: "Keep records, pay runs, and reporting in one place." },
  { href: "/services/custom-software/", title: "Custom software", body: "Apps and integrations built around your workflow." },
];

export function ServiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service) => (
        <Link key={service.href} href={service.href} className="group flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accentDim">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold leading-snug text-ink">{service.title}</h3>
            <span aria-hidden="true" className="text-accent">→</span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-mute">{service.body}</p>
        </Link>
      ))}
    </div>
  );
}
