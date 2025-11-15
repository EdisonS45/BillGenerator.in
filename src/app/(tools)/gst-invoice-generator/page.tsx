"use client";

import { useState, useRef, useEffect } from "react";
import { GSTPreview } from "@/components/tools/gst/GSTPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
import {
  Plus,
  Trash2,
  Upload,
  Briefcase,
  User,
  Wallet,
  Landmark,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Hand,
} from "lucide-react";

export default function GSTInvoicePage() {
  const billRef = useRef<HTMLDivElement>(null);

  // 🔵 Preview Zoom / Drag
  const [zoom, setZoom] = useState(0.65);
  const [handMode, setHandMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!handMode) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!handMode || !isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };
  const handleMouseUp = () => setIsDragging(false);

  // 🟢 ITEMS + FORM DATA
  const [items, setItems] = useState([
    { id: "1", desc: "Consulting Services", hsn: "9983", qty: 1, rate: 15000, tax: 18 },
  ]);

  const [formData, setFormData] = useState({
    logoUrl: null as string | null,
    companyName: "WebWonderWorks",
    companyAddress: "Kalapatti, Coimbatore - 641048",
    companyGstin: "29AAACH1234K1Z5",
    clientName: "Beta Retail Pvt Ltd",
    clientAddress: "Connaught Place, New Delhi",
    clientGstin: "",
    invoiceNo: "INV-001",
    date: new Date().toISOString().slice(0, 10),
    supplyType: "intra" as "intra" | "inter",
    signatory: "Alpha Designs",

    paymentMode: "upi" as "upi" | "bank",
    upiId: "business@okhdfcbank",
    bankName: "HDFC Bank",
    accountNo: "50100234567890",
    ifsc: "HDFC0000123",
  });

  // Logic
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      invoiceNo: `INV-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
    }));
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setFormData((prev) => ({ ...prev, logoUrl: ev.target?.result as string }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), desc: "", hsn: "", qty: 1, rate: 0, tax: 18 },
    ]);

  const updateItem = (id: string, field: string, value: any) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const removeItem = (id: string) =>
    items.length > 1 && setItems(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Free GST Invoice Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Create professional invoices with dynamic QR code for instant payment.
        </p>
      </div>

      {/* FULL INTERNET-STYLE WORKSPACE */}
<div className="flex flex-col lg:flex-row bg-[#F3F4F6] font-sans lg:h-[calc(100vh-64px)]">        {/* LEFT — EDITOR PANEL */}
<div className="w-full lg:w-[420px] bg-white border-r border-gray-200 flex flex-col shadow-sm h-full">          <div className="lg:flex-1  overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {/* Logo */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">Business Logo</span>
              <label className="cursor-pointer bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded text-xs font-bold flex items-center">
                <Upload className="w-3 h-3 mr-2" /> Upload
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </label>
            </div>

            {/* Business */}
            <BillInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Briefcase} />
            <BillInput label="Company GSTIN" name="companyGstin" value={formData.companyGstin} onChange={handleChange} />
            <BillInput label="Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />

            {/* Client */}
            <BillInput label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} Icon={User} />
            <BillInput label="Client Address" name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
            <BillInput label="Client GSTIN" name="clientGstin" value={formData.clientGstin} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <BillInput label="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
              <BillInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>

            {/* Items */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-900 uppercase">Items</h2>
                <button onClick={addItem} className="text-xs flex items-center bg-blue-600 text-white px-2 py-1 rounded">
                  <Plus className="w-3 h-3 mr-1" /> Add Row
                </button>
              </div>
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200 items-end">
                  <input className="col-span-4 text-xs border-gray-300 rounded px-2 py-1" placeholder="Item" value={item.desc} onChange={(e) => updateItem(item.id, "desc", e.target.value)} />
                  <input className="col-span-2 text-xs border-gray-300 rounded px-2 py-1" placeholder="HSN" value={item.hsn} onChange={(e) => updateItem(item.id, "hsn", e.target.value)} />
                  <input type="number" className="col-span-1 text-xs border-gray-300 rounded px-1 py-1" value={item.qty} onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))} />
                  <input type="number" className="col-span-2 text-xs border-gray-300 rounded px-2 py-1" value={item.rate} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} />
                  <select className="col-span-2 text-xs border-gray-300 rounded px-1 py-1" value={item.tax} onChange={(e) => updateItem(item.id, "tax", Number(e.target.value))}>
                    <option value="0">0%</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option>
                  </select>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 col-span-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4 mt-6">
              <span className="text-sm font-bold text-gray-900">Payment Method (QR)</span>
              <div className="flex gap-2">
                <button onClick={() => setFormData({ ...formData, paymentMode: "upi" })} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium ${formData.paymentMode === "upi" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-600"}`}>
                  <Wallet className="w-4 h-4" /> UPI
                </button>
                <button onClick={() => setFormData({ ...formData, paymentMode: "bank" })} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium ${formData.paymentMode === "bank" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-600"}`}>
                  <Landmark className="w-4 h-4" /> Bank
                </button>
              </div>
              {formData.paymentMode === "upi"
                ? <BillInput label="UPI ID" name="upiId" value={formData.upiId} onChange={handleChange} />
                : <>
                    <BillInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-3">
                      <BillInput label="Account No" name="accountNo" value={formData.accountNo} onChange={handleChange} />
                      <BillInput label="IFSC" name="ifsc" value={formData.ifsc} onChange={handleChange} />
                    </div>
                  </>
              }
            </div>
          </div>

          {/* Sticky Export */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">Export Options</p>
            <DownloadButton billRef={billRef} fileName={`Invoice_${formData.invoiceNo}.pdf`}
            outputMode="invoice"
            />
          </div>
        </div>

        {/* RIGHT — DRAGGABLE PREVIEW */}
        <div className="flex-1 relative bg-[#E5E7EB] flex flex-col overflow-hidden border-t lg:border-t-0 border-gray-300">
          {/* dotted bg */}
          <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

          {/* live badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur shadow-sm border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-700">Live Preview</span>
          </div>

          {/* main draggable preview */}
          <div
            className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-8 relative z-10 custom-scrollbar"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: handMode ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              onMouseDown={handleMouseDown}
              className="transition-transform duration-200 ease-out origin-top lg:origin-center shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <GSTPreview ref={billRef} data={{ ...formData, items }} />
            </div>
          </div>

          {/* zoom + hand toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-xl border border-white/10">

              {/* zoom out */}
              <button onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))} className="p-1.5 hover:bg-white/20 rounded-full">
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>

              {/* zoom in */}
              <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))} className="p-1.5 hover:bg-white/20 rounded-full">
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/20 mx-1"></div>

              {/* reset */}
              <button onClick={() => { setZoom(0.65); setPosition({ x: 0, y: 0 }); }} className="p-1.5 hover:bg-white/20 rounded-full">
                <RotateCcw className="w-3 h-3" />
              </button>

              {/* hand toggle */}
              <button onClick={() => setHandMode(!handMode)} className={`p-1.5 rounded-full transition ${handMode ? "bg-white/30" : "opacity-40"}`}>
                <Hand className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* 1. INTRO BLOCK */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      GST Invoice Generator for Businesses & Freelancers
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Creating GST-compliant invoices is essential for accounting, client billing, and
      tax filing. If you need a clean invoice format with proper GST breakup and payment
      options, our tool generates a valid tax invoice instantly with HSN, CGST, SGST,
      IGST, subtotal, grand total, and signature fields. You can also enable UPI / Bank
      QR code to receive payments from clients in seconds.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
        Service Providers
      </span>
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
        Freelancers
      </span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
        Product-Based Businesses
      </span>
      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">
        Invoice with QR Payment
      </span>
    </div>
  </div>

  {/* 2. THREE FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">GST Auto Calculation</h3>
      <p className="text-sm text-gray-500">
        CGST + SGST for Intra-State or IGST for Inter-State — calculated automatically.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">UPI / Bank QR Code</h3>
      <p className="text-sm text-gray-500">
        Auto-generate QR from UPI ID or Bank details for instant client payment.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Professional PDF Export</h3>
      <p className="text-sm text-gray-500">
        Share branded invoices with clients via WhatsApp or Email in one click.
      </p>
    </div>
  </div>

  {/* 3. Steps + FAQ SIDE BY SIDE */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">
    
    {/* LEFT: STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">
        How to create a GST invoice?
      </h3>
      <div className="space-y-6">
        {[
          "Enter your business GST details",
          "Fill client information and invoice number",
          "Add services/products with HSN, quantity & price",
          "Select supply type to auto-calculate CGST/SGST or IGST",
          "Enable payment QR for UPI / bank transfer",
          "Download the invoice as PDF"
        ].map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <p className="text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT: FAQ */}
    <div className="lg:col-span-5">
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 space-y-6">
        
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is this invoice accepted for GST filing?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. It includes HSN, GSTIN, CGST/SGST/IGST breakup and totals — compliant for filing.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Do freelancers need GST?
          </h4>
          <p className="text-xs text-gray-600">
            Many freelancers charge GST once turnover exceeds limits. This tool works for both products & services.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is my invoice data stored?
          </h4>
          <p className="text-xs text-gray-600">
            No. Everything runs inside your browser. We do not upload, store or log your invoice data.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>
    </div>
  );
}
