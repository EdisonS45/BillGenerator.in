import { forwardRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const THEMES: Record<string, { primary: string; label: string; logo: string }> =
  {
    classic: {
      primary: "#4F46E5",
      label: "Scan & Pay",
      logo: "/logos/upi-generic.png",
    },
    phonepe: {
      primary: "#5f259f",
      label: "PhonePe",
      logo: "/logos/phonepe.png",
    },
    gpay: {
      primary: "#1A73E8",
      label: "Google Pay",
      logo: "/logos/gpay.png",
    },
    paytm: {
      primary: "#00baf2",
      label: "Paytm",
      logo: "/logos/paytm.png",
    },
  };

interface UPIPreviewProps {
  data: {
    upiId: string;
    payeeName: string;
    amount: number;
    note: string;
    theme: string;

    showLogo: boolean; // <--- NEW
    logoUrl: string | null; // <--- NEW (user uploaded logo)
  };
}

export const UPIPreview = forwardRef<HTMLDivElement, UPIPreviewProps>(
  ({ data }, ref) => {
    const theme = THEMES[data.theme] || THEMES.classic;

    // UPI URL
    let upiString = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(
      data.payeeName
    )}&cu=INR`;

    if (data.amount > 0) {
      upiString += `&am=${data.amount}&tn=${encodeURIComponent(data.note)}`;
    }

    return (
      <div className="w-full flex justify-center bg-gray-200/40 p-8">
        <div
          ref={ref}
          className="relative flex flex-col items-center shadow-2xl"
          style={{
            width: "360px",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            className="w-full flex flex-col items-center py-6"
            style={{ background: theme.primary }}
          >
            {/* Only show logo if toggle is true */}
            {data.showLogo && (
              <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-2 overflow-hidden">
                <Image
                  src={data.logoUrl || theme.logo}
                  width={60}
                  height={60}
                  alt="logo"
                  className="object-contain"
                />
              </div>
            )}

            <h1 className="text-white text-xl font-bold tracking-wider ">
              {theme.label}
            </h1>
          </div>

          {/* QR CODE */}
          <div className="bg-white p-5 rounded-2xl shadow-xl -mt-4 z-10">
            <QRCodeCanvas
              value={upiString}
              size={230}
              level="H"
              includeMargin
            />
          </div>

          {/* DETAILS */}
          <div className="text-center px-6 mt-4 mb-6 space-y-2">
            <div className="flex justify-center items-center gap-2 text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="font-semibold">Verified UPI Merchant</span>
            </div>

            <p className="text-sm font-medium text-gray-700">
              {data.payeeName}
            </p>

            <p className="font-mono font-bold bg-gray-100 py-1 px-4 rounded inline-block">
              {data.upiId}
            </p>

            {data.amount > 0 && (
              <div className="mt-4">
                <p className="text-xs uppercase text-gray-500">Fixed Amount</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{data.amount}
                </p>
              </div>
            )}
          </div>

          {/* Supported Apps */}
          <div className="w-full px-6 pb-4">
            <p className="text-xs text-gray-500 mb-2 text-center">
              Works With All UPI Apps
            </p>
            <div className="flex justify-center gap-4 opacity-90">
              <Image src="/logos/gpay.svg" width={50} height={50} alt="gpay" />
              <Image src="/logos/phonepe.svg" width={75} height={75} alt="pp" />
              <Image src="/logos/paytm.svg" width={50} height={50} alt="ptm" />
            </div>
          </div>

          {/* Footer */}
          <div
            className="w-full py-3 flex justify-center items-center gap-2 text-xs font-bold"
            style={{
              background: "linear-gradient(90deg, #FF671F, #FFFFFF, #046A38)",
            }}
          >
            <span className="text-gray-800 tracking-wider">
              BHIM • UPI • SECURE PAY
            </span>
          </div>
        </div>
      </div>
    );
  }
);

UPIPreview.displayName = "UPIPreview";
