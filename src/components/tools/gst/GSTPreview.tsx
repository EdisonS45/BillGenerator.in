import React, { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { numToWords } from "@/lib/numToWords";

interface InvoiceItem {
  id: string;
  desc: string;
  hsn?: string;
  qty: number;
  rate: number;
  tax: number;
}

interface GSTPreviewProps {
  data: {
    logoUrl?: string | null;
    companyName: string;
    companyAddress: string;
    companyGstin?: string;
    clientName: string;
    clientAddress: string;
    clientGstin?: string;
    invoiceNo: string;
    date: string;
    supplyType: "intra" | "inter";
    items: InvoiceItem[];
    signatory?: string;
    discount?: number;
    
    // Payment Specifics
    paymentMode: "upi" | "bank"; // New Toggle
    upiId?: string;
    bankName?: string;
    accountNo?: string;
    ifsc?: string;
  };
}

export const GSTPreview = forwardRef<HTMLDivElement, GSTPreviewProps>(({ data }, ref) => {
  
  // --- SMART QR LOGIC ---
  let qrValue = "";
  const payeeName = encodeURIComponent(data.companyName.substring(0, 20)); // URL safety

  if (data.paymentMode === "upi" && data.upiId) {
    // Option 1: Standard UPI VPA
    qrValue = `upi://pay?pa=${data.upiId}&pn=${payeeName}&cu=INR`;
  } else if (data.paymentMode === "bank" && data.accountNo && data.ifsc) {
    // Option 2: Bank Account QR (Special NPCI Format)
    // Format: AccountNo@IFSC.ifsc.npci
    const bankVpa = `${data.accountNo}@${data.ifsc}.ifsc.npci`;
    qrValue = `upi://pay?pa=${bankVpa}&pn=${payeeName}&cu=INR`;
  } else {
    // Fallback
    qrValue = data.invoiceNo; 
  }

  // ---- Calculations (Same as before) ----
  let taxable = 0;
  let totalTax = 0;

  const rows = data.items.map((it) => {
    const amount = it.qty * it.rate;
    const taxAmount = +(amount * (it.tax / 100));
    taxable += amount;
    totalTax += taxAmount;
    return { ...it, amount, taxAmount };
  });

  const discount = Number(data.discount || 0);
  const taxableAfterDiscount = Math.max(0, taxable - discount);
  const taxScale = taxable > 0 ? taxableAfterDiscount / taxable : 1;
  const scaledTax = +(totalTax * taxScale);

  const cgst = data.supplyType === "intra" ? +(scaledTax / 2).toFixed(2) : 0;
  const sgst = data.supplyType === "intra" ? +(scaledTax / 2).toFixed(2) : 0;
  const igst = data.supplyType === "inter" ? scaledTax : 0;

  const grandTotal = +(taxableAfterDiscount + scaledTax).toFixed(2);

  return (
    <div className="w-full flex justify-center bg-gray-200 py-6">
      <div
        ref={ref}
        className="bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          width: "595px",
          minHeight: "842px",
          padding: "24px",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* HEADER */}
        <div className="rounded-lg text-white p-6 mb-6" style={{ background: "linear-gradient(90deg,#2563EB,#4F46E5)" }}>
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              {data.logoUrl ? (
                <img src={data.logoUrl} className="h-16 w-16 rounded-md object-contain bg-white/10 p-2" alt="Logo" />
              ) : (
                <div className="h-16 w-16 bg-white/20 rounded flex items-center justify-center font-bold text-white">LOGO</div>
              )}
              <div>
                <h1 className="text-xl font-bold">{data.companyName}</h1>
                <p className="text-white/80 text-sm mt-1">{data.companyAddress}</p>
                {data.companyGstin && <p className="font-semibold mt-1">GSTIN: {data.companyGstin}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">Invoice No</div>
              <div className="text-lg font-bold">{data.invoiceNo}</div>
              <div className="text-sm mt-1">Date: {data.date}</div>
            </div>
          </div>
        </div>

        {/* BILL TO / FROM */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50/40 rounded-lg border border-blue-100">
            <h3 className="text-sm font-bold text-blue-700 uppercase">Billed By</h3>
            <p className="font-semibold mt-2">{data.companyName}</p>
            <p className="text-sm text-gray-600 mt-1">{data.companyAddress}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 uppercase">Billed To</h3>
            <p className="font-semibold mt-2">{data.clientName}</p>
            <p className="text-sm text-gray-600 mt-1">{data.clientAddress}</p>
            {data.clientGstin && <p className="text-sm mt-1">GSTIN: {data.clientGstin}</p>}
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm border border-gray-200 rounded-lg mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 text-left">#</th>
              <th className="py-2 px-2 text-left">Description</th>
              <th className="py-2 px-2 text-center">HSN</th>
              <th className="py-2 px-2 text-center">Qty</th>
              <th className="py-2 px-2 text-right">Rate</th>
              <th className="py-2 px-2 text-right">GST%</th>
              <th className="py-2 px-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-t text-gray-700">
                <td className="py-2 px-2">{i + 1}</td>
                <td className="py-2 px-2 font-medium">{r.desc}</td>
                <td className="py-2 px-2 text-center">{r.hsn || "-"}</td>
                <td className="py-2 px-2 text-center">{r.qty}</td>
                <td className="py-2 px-2 text-right">{r.rate.toFixed(2)}</td>
                <td className="py-2 px-2 text-right">{r.tax}%</td>
                <td className="py-2 px-2 text-right font-semibold">{r.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS & QR */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Left: Totals */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-bold mb-2">Invoice Summary</h3>
            <div className="flex justify-between text-sm py-1"><span>Taxable</span><span>{taxableAfterDiscount.toFixed(2)}</span></div>
            {data.supplyType === "intra" ? (
              <>
                <div className="flex justify-between text-sm py-1"><span>CGST</span><span>{cgst.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm py-1"><span>SGST</span><span>{sgst.toFixed(2)}</span></div>
              </>
            ) : (
              <div className="flex justify-between text-sm py-1"><span>IGST</span><span>{igst.toFixed(2)}</span></div>
            )}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg text-blue-700">
              <span>Total</span>
              <span>₹ {grandTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">({numToWords(grandTotal)})</p>
          </div>

          {/* Right: QR & Bank */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center text-center">
            {/* Conditional QR Render */}
            <QRCodeCanvas 
                value={qrValue} 
                size={100} 
                level={"M"}
                className="border p-1 rounded bg-white mb-2" 
            />
            
            <p className="text-xs text-gray-500 mb-2">
               Scan to pay via {data.paymentMode === 'upi' ? 'UPI ID' : 'Bank Transfer'}
            </p>

            <div className="w-full text-xs text-gray-700 text-left space-y-1 bg-gray-50 p-2 rounded">
              {data.paymentMode === 'bank' ? (
                 <>
                    <p><b>Bank:</b> {data.bankName || '-'}</p>
                    <p><b>A/C:</b> {data.accountNo || '-'}</p>
                    <p><b>IFSC:</b> {data.ifsc || '-'}</p>
                 </>
              ) : (
                 <>
                    <p><b>Pay to UPI:</b></p>
                    <p className="font-mono text-blue-600 truncate">{data.upiId || '-'}</p>
                 </>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-xs text-gray-600 border-t pt-4">
          <p className="mt-4 text-right font-semibold">{data.signatory || "Authorized Signatory"}</p>
        </div>
      </div>
    </div>
  );
});

GSTPreview.displayName = "GSTPreview";