export const metadata = {
  title: "Terms & Disclaimer | BillGenerator.in",
  description:
    "Legal disclaimer — bills generated are for replacement, proforma and mock-up purposes only.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6">
        Terms & Disclaimer
      </h1>

      <p className="text-gray-700">
        BillGenerator.in provides tools to **recreate misplaced receipts and generate proforma billing templates for reimbursement submission**.
      </p>

      <div className="mt-6 space-y-4 leading-relaxed">
        <p>By using this website, you agree that:</p>
        <ul className="list-decimal ml-6 space-y-2">
          <li>All inputs are provided by the user.</li>
          <li>The platform does not verify or validate invoice content.</li>
          <li>Documents must be used responsibly and lawfully.</li>
          <li>We do not impersonate any bank, GST portal or government entity.</li>
          <li>No real GST filing or payment is processed on this platform.</li>
        </ul>

        <p className="mt-4 font-semibold text-red-600">
          Misuse of generated invoices for fraud is strictly prohibited.
        </p>
      </div>
    </div>
  );
}
