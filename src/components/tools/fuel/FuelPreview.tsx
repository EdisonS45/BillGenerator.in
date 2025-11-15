import React, { forwardRef } from "react";
import { Droplets } from "lucide-react";
import Barcode from "react-barcode";

interface FuelPreviewProps {
  data: {
    stationName?: string;
    address?: string;
    fuelType?: string;
    amount?: number;
    rate?: number;
    date?: string;
    time?: string;
    vehicleNumber?: string;
    invoiceNo?: string;
    provider?: "iocl" | "bpcl" | "hp" | "shell" | "generic";
    mode: "basic" | "real";
    // Additional fields for Real Mode
    trnsId?: string;
    atndId?: string;
    receiptType?: string;
    fpId?: string;
    nozzleNo?: string;
    mobNo?: string;
    wrinkle?: "none" | "light" | "medium";

  };
}

export const FuelPreview = forwardRef<HTMLDivElement, FuelPreviewProps>(
  ({ data }, ref) => {
    const safeAmount = Number(data?.amount) || 0;
    const safeRate = Number(data?.rate) || 1;
    const qty = safeAmount / safeRate;
    const quantity = qty.toFixed(2);
    const amountStr = safeAmount.toFixed(2);
    const rateStr = safeRate.toFixed(2);

    // --- LOGO LOGIC FOR REAL MODE ---
    const getLogo = () => {
      const common = {
        className: "mx-auto mb-2",
        style: { width: 100, height: "auto" },
      };
      switch (data?.provider) {
        case "iocl":
          return <img src="/logos/indian.png" alt="IndianOil" {...common} />; // Ensure filename matches your public folder
        case "bpcl":
          return <img src="/logos/bpcl.svg" alt="BPCL" {...common} />;
        case "hp":
          return <img src="/logos/hp.png" alt="HP" {...common} />;
        case "shell":
          return null; // No logo for Shell as requested
        default:
          // Default Indian Oil Text Logo Fallback
          return (
            <div className="mx-auto w-[90px] h-[90px] rounded-full border-2 border-black flex flex-col items-center justify-center text-center mb-2">
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: "0.9" }}>
                इंडियनऑयल
              </div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>IndianOil</div>
            </div>
          );
      }
    };

    // --- HELPER ROW FOR REAL MODE ---
    const Row = ({
      label,
      value,
    }: {
      label: string;
      value?: string | number;
    }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
          marginBottom: 3,
          fontWeight: 700,
        }}
      >
        <div style={{ width: 65 }}>{label}</div>
        <div style={{ width: 12, textAlign: "left" }}>:</div>
        <div style={{ flex: 1 }}>{value}</div>
      </div>
    );
const getWrinkleTexture = () => {
  if (data?.wrinkle === "light") return "url('/logos/wrinkled.png')";
  if (data?.wrinkle === "medium") return "url('/logos/too-wrinkled.png')";
  return "none";
};
    return (
      <div className="w-full flex justify-center bg-gray-200/50 p-8">

        {/* ============================================================
            MODE: REAL (YOUR CUSTOM CODE)
           ============================================================ */}
        {data.mode === "real" ? (
          <div
            ref={ref}
            style={{
              width: 300,
              backgroundColor: "#fff",
              padding: "10px 14px",
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 12,
              color: "#000",
              lineHeight: 1.1,
              backgroundImage: getWrinkleTexture(),
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
              opacity: 0.96,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              position: "relative",
              transform: "rotate(-0.2deg)",
              borderRadius: "2px",
            }}
          >
            {/* --- Right Side HDFC Strip LOOP (Full correct pattern) --- */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: -3, // stays inside the receipt
                width: 24, // reserved area inside the receipt
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: "150px",
                padding: "6px 0",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    transform: "rotate(270deg)",
                    transformOrigin: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    fontSize: 8,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      opacity: 0.55,
                      color: "black",
                      letterSpacing: "0.4px",
                    }}
                  >
                    G-5001
                  </span>
                  <img
                    src="/logos/hdfc-logo1.svg"
                    alt="HDFC Bank"
                    style={{ height: 11 }}
                  />
                  <span
                    style={{
                      fontWeight: 500,
                      opacity: 0.55,
                      color: "black",
                      letterSpacing: "0.4px",
                    }}
                  >
                    A0312020
                  </span>
                </div>
              ))}
            </div>

            {/* --- Logo --- */}
            <div
              style={{ textAlign: "center", marginBottom: 6, marginTop: 20 }}
            >
              {getLogo()}
            </div>

            {/* --- Station Info --- */}
            <div
              style={{
                textAlign: "left",
                fontWeight: 700,
                marginBottom: 8,
                paddingLeft: 13,
                marginTop: 28,
              }}
            >
              {data?.stationName || "CITY FUELS NH8 GGN."}
              <br />
              TIN. 06463800124
              <br />
              PH. 9212529333
            </div>

            {/* --- Data rows --- */}
            <div
              style={{
                textAlign: "left",
                fontWeight: 700,
                marginBottom: 8,
                paddingLeft: 13,
              }}
            >
              <Row label="Bill No" value={data?.invoiceNo || "TXN939520"} />
              <Row label="Trns. ID" value={data?.trnsId || "30079760"} />
              <Row label="Atnd. ID" value={data?.atndId || "90418682"} />
              <Row
                label="Receipt"
                value={data?.receiptType || "Physical Receipt"}
              />
              <Row
                label="Vehi. No"
                value={data?.vehicleNumber || "MH 02 AB 1234"}
              />
              <Row label="Mob. No" value={data?.mobNo || "NotEntered"} />
              <Row label="Date" value={data?.date || "2025-11-12"} />
              <Row label="Time" value={data?.time || "10:30"} />
              <Row label="FP. ID" value={data?.fpId || "2"} />
              <Row label="Nozl. No" value={data?.nozzleNo || "2"} />
              <Row label="Fuel" value={data?.fuelType || "Petrol"} />
              <Row label="Rate" value={`Rs ${rateStr}`} />
              <Row label="Sale" value={`Rs ${amountStr}`} />
              <Row label="Volume" value={`${quantity} Ltr`} />
            </div>

            {/* --- Footer --- */}
            <div
              style={{
                textAlign: "center",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Thank You! Visit Again
            </div>

            {/* --- Barcode --- */}
            <div className="pt-1 pb-2">
              <Barcode
                value={data?.invoiceNo || "TXN939520"}
                height={30}
                width={1.5}
                displayValue={false}
                background="#ffffff"
                lineColor="#000000"
                margin={0}
                className="mx-auto"
              />
            </div>
          </div>
        ) : (
          /* ============================================================
            MODE: BASIC (GENERIC THERMAL STYLE)
           ============================================================ */
          <div
            ref={ref}
            className="bg-white text-black font-mono text-xs relative shadow-xl"
            style={{
              width: "320px",
              minHeight: "auto",
              fontFamily: '"Courier Prime", "Courier New", monospace',
              fontWeight: 600,
            }}
          >
            {/* Top Padding */}

            <div className="p-5 pb-2">
              {/* HEADER SECTION */}
              <div className="text-center border-b-2 border-dotted border-black pb-3 mb-3">
                <div className="flex justify-center mb-2">
                  <div className="border-2 border-black rounded-full p-1.5">
                    <Droplets className="w-6 h-6 text-black fill-current" />
                  </div>
                </div>
                <h1 className="text-lg font-bold uppercase tracking-wider leading-tight mb-1">
                  {data?.stationName || "FUEL STATION"}
                </h1>
                <p className="uppercase px-4 leading-tight mb-1">
                  {data?.address || "Highway Road, City Center"}
                </p>
                <p className="text-[10px]">GSTIN: 27AABCU9603R1ZM</p>
              </div>

              {/* METADATA GRID */}
              <div className="space-y-1.5 mb-3 pb-3 border-b-2 border-dotted border-black">
                <div className="flex justify-between">
                  <span>Invc No:</span>
                  <span className="font-bold">{data?.invoiceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date: {data?.date}</span>
                  <span>Time: {data?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vh.No:</span>
                  <span className="font-bold text-sm">
                    {data?.vehicleNumber?.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{data?.fuelType?.toUpperCase()}</span>
                </div>
              </div>

              {/* PRODUCT TABLE */}
              <div className="mb-3 pb-3 border-b-2 border-black">
                <div className="flex justify-between font-bold mb-1">
                  <span className="w-1/3">RATE/Ltr</span>
                  <span className="w-1/3 text-center">VOLUME</span>
                  <span className="w-1/3 text-right">AMOUNT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="w-1/3">₹ {rateStr}</span>
                  <span className="w-1/3 text-center">{quantity} L</span>
                  <span className="w-1/3 text-right font-bold">
                    ₹ {amountStr}
                  </span>
                </div>
              </div>

              {/* TOTALS SECTION */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-lg">NET AMT:</span>
                  <span className="font-bold text-xl border-b-2 border-black border-double">
                    ₹ {amountStr}
                  </span>
                </div>
                <p className="text-[10px] mt-1 uppercase">
                  (Rate inclusive of all taxes)
                </p>
              </div>

              {/* FOOTER & BARCODE */}
              <div className="text-center space-y-2">
                <p className="italic">*** SAVE FUEL, SAVE EARTH ***</p>
                <p className="text-[10px]">Thank you for visiting!</p>

                {/* CSS GENERATED BARCODE */}
                <div className="pt-1 pb-2">
                  <Barcode
                    value={data?.invoiceNo || "TXN939520"}
                    height={30}
                    width={1.5}
                    displayValue={true} // Show the number
                    fontSize={10} // Make it small
                    background="#ffffff"
                    lineColor="#000000"
                    margin={0}
                    className="mx-auto"
                  />
                </div>
                <p className="text-[8px] tracking-[0.3em]">{data?.invoiceNo}</p>
              </div>
            </div>

            {/* JAGGED PAPER EDGE EFFECT */}
            <div
              className="w-full h-2 mt-4"
              style={{
                background:
                  "linear-gradient(45deg, transparent 50%, #fff 50%), linear-gradient(-45deg, transparent 50%, #fff 50%)",
                backgroundSize: "10px 10px",
                backgroundRepeat: "repeat-x",
                backgroundColor: "#e5e7eb", // Gray background
                height: "10px",
              }}
            ></div>
          </div>
        )}
        
      </div>
    );
  }
);

FuelPreview.displayName = "FuelPreview";
export default FuelPreview;
