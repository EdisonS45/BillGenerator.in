export const metadata = {
  title: "FAQ & Help | BillGenerator.in",
  description:
    "Frequently asked questions about fuel bill generator, taxi bill generator, restaurant bill generator and LTA invoice tools.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Is BillGenerator.in free?",
      a: "Yes. All tools are completely free to use — no login or app required.",
    },
    {
      q: "Do you store my bill details?",
      a: "No. All receipts are generated offline inside your browser.",
    },
    {
      q: "Are bills accepted for reimbursement?",
      a: "Yes — they contain all standard fields required for reimbursement submissions.",
    },
    {
      q: "Can I edit the invoice number and date?",
      a: "Yes. All fields are customizable before generating the PDF.",
    },
    {
      q: "Do you support Flight & LTA bills?",
      a: "Yes — flight ticket invoice generator & LTA bill generator are included.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6">FAQ & Help</h1>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            className="group bg-slate-100/60 border border-slate-300 rounded-lg p-4"
          >
            <summary className="cursor-pointer font-semibold text-gray-900 flex justify-between items-center">
              {item.q}
              <span className="text-blue-600 group-open:rotate-90 transition-transform">›</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
