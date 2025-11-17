import FuelBillSEOSection from "@/components/seo/FuelBillSEOSection";

export default function SeoPage() {
  return (
    // The mt-24 is now in the parent layout.tsx
    <section className="w-full bg-white"> 
      <div className="max-w-6xl mx-auto px-4">
        <FuelBillSEOSection />
      </div>
    </section>
  );
}