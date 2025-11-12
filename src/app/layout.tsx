import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer'; // <-- NEW IMPORT
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Bill Generator India',
  description: 'Generate Fuel, Restaurant, and LTA bills for reimbursement.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ADD flex-col to body to push footer down */}
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}> 
        <Navbar />
        
        {/* Wrapper to make content area grow */}
        <div className="flex-grow"> 
          {children}
        </div>
        
        <Footer /> {/* <-- RENDER THE NEW FOOTER HERE */}
      </body>
    </html>
  );
}