export function LogoFooter({
  className = "w-10 h-10",
  textSize = "text-2xl"
}: { className?: string; textSize?: string }) {
  return (
    <div className="flex items-center gap-3">
      
      {/* ICON (same as main version) */}
      <div className={`${className} relative flex-shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Background Gradient */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="url(#logo-gradient)"
          />

          {/* Receipt */}
          <path
            d="M12 10C12 8.89543 12.8954 8 14 8H26C27.1046 8 28 8.89543 28 10V32L24 29L20 32L16 29L12 32V10Z"
            fill="white"
          />

          {/* ₹ sign */}
          <path
            d="M18 15H23M18 18H22M18 18L22 24"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Checkmark Badge */}
          <circle cx="30" cy="30" r="7" fill="#10B981" stroke="white" strokeWidth="2" />
          <path
            d="M27 30L29 32L33 28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient */}
          <defs>
            <linearGradient
              id="logo-gradient"
              x1="2"
              y1="2"
              x2="38"
              y2="38"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BRAND TEXT (footer variant) */}
      <div className={`font-sans ${textSize} leading-none flex flex-col justify-center`}>
        <span className="font-black tracking-tighter text-white">
          Bill
          <span className="text-blue-500">Generator</span>
        </span>
        <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
          India
        </span>
      </div>
    </div>
  );
}
