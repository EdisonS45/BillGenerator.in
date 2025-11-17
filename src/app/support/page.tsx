export const metadata = {
  title: "Support | BillGenerator.in",
  description:
    "Get help with bill generation, reimbursement receipts, LTA invoices and broadband/taxi/fuel bill tools.",
};

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-3">Support</h1>
      <p className="text-gray-600 mb-10">
        Need help using our tools? We’re here to assist.
      </p>

      <div className="space-y-6 text-gray-700">
        <p>
          Since BillGenerator.in does not store any user data, we cannot retrieve
          previously generated receipts. All bills are generated only on your
          device for privacy protection.
        </p>

        <h2 className="text-2xl font-bold mt-8">Contact & Help</h2>
        <p className="text-gray-600">Email Support: <span className="font-semibold text-blue-600">support@billgenerator.in</span></p>
        <p className="text-gray-600">Response time: 24–48 working hours</p>

        <div className="mt-6 p-5 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-yellow-900">
          ⚠ We do not create real GST invoices or modify any legally issued invoice.
        </div>
      </div>
    </div>
  );
}
