export const metadata = {
  title: "Privacy Policy | BillGenerator.in",
  description:
    "BillGenerator.in does not store user data. All bill generation happens securely inside your browser.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6">Privacy Policy</h1>

      <p className="text-gray-700 leading-relaxed">
        BillGenerator.in is a 100% client-side web application. We do not store
        or process any bill information on servers. All receipts are generated
        offline inside the user’s browser.
      </p>

      <div className="space-y-4 mt-8 leading-relaxed">
        <p>We do NOT store:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Vehicle numbers</li>
          <li>Travel routes</li>
          <li>Customer names or addresses</li>
          <li>Invoice details</li>
          <li>LTA & reimbursement information</li>
          <li>Broadband/taxi/restaurant usage</li>
        </ul>

        <p className="mt-6">
          Google Analytics is used only to track **total visits**, not personal
          data. No personally identifiable fields are collected or logged.
        </p>

        <p className="font-semibold text-green-700 mt-4">
          Your generated bills belong only to you — no syncing, no uploads, no accounts.
        </p>
      </div>
    </div>
  );
}
