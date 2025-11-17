export const metadata = {
  title: "About Us | BillGenerator.in",
  description:
    "BillGenerator.in is India's #1 free bill, receipt and invoice generator suite. Generate compliant bills for reimbursement, LTA, travel claims and accounting instantly.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14 text-gray-800">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
        About BillGenerator<span className="text-blue-600">.in</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        BillGenerator.in is a client-side tool suite designed to help
        professionals, employees, students and freelancers generate accurate and
        compliant receipts instantly—without apps, accounts or uploads.
      </p>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          The platform was built to solve a real-world problem: **lost receipts,
          reimbursement delays and manually creating bills in Excel**. Our tools help
          recreate petrol bills, restaurant bills, taxi receipts, LTA flight
          invoices, broadband bills and more — within seconds.
        </p>

        <p>
          All generators run **100% locally on your browser**, meaning we never store
          your personal data, travel details, invoices or receipts. Your privacy
          and security come first.
        </p>

        <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-900">
          Mission: Make billing and reimbursement stress-free, fast and
          reliable for every professional in India.
        </div>

        <h2 className="text-2xl font-bold mt-10">Who Uses BillGenerator.in?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Corporate employees submitting reimbursement</li>
          <li>Sales & marketing staff traveling frequently</li>
          <li>Students and interns claiming TA</li>
          <li>Taxi & logistics professionals</li>
          <li>Freelancers and consultants</li>
        </ul>

        <p className="pt-6 text-gray-600">
          BillGenerator.in is proudly built in India 🇮🇳 and used across more
          than <span className="font-bold text-blue-600">2,00,000+</span>{" "}
          receipts every month.
        </p>
      </div>
    </div>
  );
}
