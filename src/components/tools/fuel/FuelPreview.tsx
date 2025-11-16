import React, { forwardRef, useEffect, useState } from "react";
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
   volume?: string | number; // 👈 ADD THIS

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
    const [safeInvoice, setSafeInvoice] = useState(data?.invoiceNo);

    useEffect(() => {
      if (!data?.invoiceNo) {
        setSafeInvoice("TXN" + Math.floor(Math.random() * 900000 + 100000));
      }
    }, []);

    const safeAmount = Number(data?.amount) || 0;
    const safeRate = Number(data?.rate) || 1;
    const quantity = data?.volume
      ? Number(data.volume).toFixed(2)
      : (safeAmount / safeRate).toFixed(2);

    const amountStr = safeAmount.toFixed(2);
    const rateStr = safeRate.toFixed(2);

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
          marginBottom: 2,
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
          <div style={{ textAlign: "center", marginBottom: 6, marginTop: 20 }}>
            {getLogo()}
          </div>

          {/* --- Station Info --- */}
          <div
            style={{
              textAlign: "left",
              fontWeight: 700,
              marginBottom: 9,
              paddingLeft: 10,
              marginTop: 28,
            }}
          >
            {data?.stationName || "CITY FUELS NH8 GGN."}
            <br />
            <div style={{ width: 180, wordWrap: "break-word" }}>
              {data.address ||
                "Marathahalli Bridge, HAL Road, Bengaluru – 560037"}
            </div>
            TIN. 06463800124
            <br />
            PH. 9212529333
          </div>

          {/* --- Data rows --- */}
          <div
            style={{
              textAlign: "left",
              fontWeight: 700,
              marginBottom: 6,
              paddingLeft: 10,
            }}
          >
            <Row label="Bill No" value={safeInvoice} />
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
              marginTop: 6,
            }}
          >
            Thank You! Visit Again
          </div>

          {/* --- Barcode --- */}
          <div className="pt-1 pb-2">
            <Barcode
              value={safeInvoice || "123456"}
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
      </div>
    );
  }
);

FuelPreview.displayName = "FuelPreview";
export default FuelPreview;
