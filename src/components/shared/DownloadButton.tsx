'use client';

import React, { useState, RefObject } from 'react';
import { Download, Loader2, Printer, Image as ImageIcon } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import clsx from 'clsx'; // Make sure this is imported

interface DownloadButtonProps {
  billRef: RefObject<HTMLDivElement | null>; // Corrected type to allow null
  fileName: string;
  outputMode?: 'receipt' | 'invoice'; 
}

export function DownloadButton({ billRef, fileName, outputMode = 'receipt' }: DownloadButtonProps) {
  const [loadingState, setLoadingState] = useState<'idle' | 'pdf' | 'img' | 'print'>('idle');

  // --- PDF DOWNLOAD LOGIC ---
  const handleDownloadPDF = async () => {
    if (!billRef.current) return;
    setLoadingState('pdf');

    try {
      // Use toPng for lossless quality, with a very high pixel ratio
      const imgData = await toPng(billRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 4, // <-- THE "CRYSTAL CLEAR" FIX (4x Resolution)
      });

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const imgProps = pdf.getImageProperties(imgData);

      if (outputMode === 'invoice') {
        // --- INVOICE MODE (Full Page A4) ---
        const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pdfHeight, undefined, 'FAST');
      } else {
        // --- RECEIPT MODE (Small Slip on A4) ---
        const receiptWidth = 80; 
        const receiptHeight = (imgProps.height * receiptWidth) / imgProps.width;
        const x = (pageWidth - receiptWidth) / 2; // Center
        const y = 20;
        pdf.addImage(imgData, 'PNG', x, y, receiptWidth, receiptHeight, undefined, 'FAST');
      }

      pdf.save(fileName.replace('.png', '.pdf'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState('idle');
    }
  };

  // --- JPG DOWNLOAD LOGIC (Crystal Clear) ---
  const handleDownloadImage = async () => {
    if (!billRef.current) return;
    setLoadingState('img');
    try {
      const dataUrl = await toJpeg(billRef.current, {
        quality: 1.0,           // 100% Quality
        backgroundColor: '#ffffff',
        pixelRatio: 3            // 3x Resolution
      });
      const link = document.createElement('a');
      link.download = fileName.replace('.pdf', '.jpg');
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState('idle');
    }
  };
  
  // --- PRINT LOGIC (High Quality) ---
  const handlePrint = async () => {
    if (!billRef.current) return;
    setLoadingState('print');
    try {
      const imgData = await toPng(billRef.current, { 
        cacheBust: true, 
        backgroundColor: '#ffffff',
        pixelRatio: 3 // High-res for printing
      });

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Print Bill</title></head>
            <body style="margin:0; display:flex; justify-content:center;">
              <img src="${imgData}" style="max-width:100%;" />
              <script>
                window.onload = () => { window.print(); window.close(); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Print error:', error);
    } finally {
      setLoadingState('idle');
    }
  };

  return (
    <div className="w-full">
      {/* 2+1 Grid Layout */}
      <div className="grid grid-cols-2 gap-3 w-full mb-2">
         {/* PDF Button (Spans 2 columns) */}
         <button 
            onClick={handleDownloadPDF} 
            disabled={loadingState !== 'idle'} 
            className="col-span-2 flex items-center justify-center py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
         >
            {loadingState === 'pdf' ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
            Download PDF
         </button>
         
         {/* Image Button */}
         <button 
            onClick={handleDownloadImage} 
            disabled={loadingState !== 'idle'} 
            className="col-span-1 flex items-center justify-center py-2.5 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
         >
            {loadingState === 'img' ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <ImageIcon className="mr-2 h-4 w-4" />}
            Save Image
         </button>

         {/* Print Button */}
         <button 
            onClick={handlePrint} 
            disabled={loadingState !== 'idle'} 
            className="col-span-1 flex items-center justify-center py-2.5 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
         >
            {loadingState === 'print' ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Printer className="mr-2 h-4 w-4" />}
            Print
         </button>
      </div>
      
      {/* Trust Badge */}
      <div className="flex justify-center items-center gap-1.5 opacity-60">
         <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
         <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
            100% Free • No Watermark
         </p>
      </div>
    </div>
  );
}