'use client';

import React, { useState, RefObject } from 'react';
import { Download, Loader2, Printer, Image as ImageIcon } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  billRef: RefObject<HTMLDivElement | null>;
  fileName: string;
}

export function DownloadButton({ billRef, fileName }: DownloadButtonProps) {
  const [loadingState, setLoadingState] = useState<'idle' | 'pdf' | 'img' | 'print'>('idle');

  // 1. DOWNLOAD PDF (Standard A4 centered)
  const handleDownloadPDF = async () => {
    if (!billRef.current) return;
    setLoadingState('pdf');

    try {
      const imgData = await toPng(billRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });

      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const receiptWidth = 75; // 75mm matches standard thermal paper better
      const receiptHeight = (imgProps.height * receiptWidth) / imgProps.width;
      const x = (pageWidth - receiptWidth) / 2;

      pdf.addImage(imgData, 'PNG', x, 20, receiptWidth, receiptHeight);
      pdf.save(fileName.replace('.png', '.pdf'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState('idle');
    }
  };

  // 2. DOWNLOAD IMAGE (New Feature!)
  const handleDownloadImage = async () => {
    if (!billRef.current) return;
    setLoadingState('img');

    try {
      // Generate High Quality JPEG
      const dataUrl = await toJpeg(billRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2
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

  return (
    <div className="grid grid-cols-2 gap-3 w-full pt-4">
      {/* PDF Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={loadingState !== 'idle'}
        className="col-span-2 flex justify-center items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-all"
      >
        {loadingState === 'pdf' ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2 h-5 w-5" />}
        Download PDF
      </button>

      {/* Image Button */}
      <button
        onClick={handleDownloadImage}
        disabled={loadingState !== 'idle'}
        className="flex justify-center items-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-all"
      >
        {loadingState === 'img' ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon className="mr-2 h-5 w-5" />}
        Save Image
      </button>

      {/* Print Button */}
      <button
        disabled={loadingState !== 'idle'}
        className="flex justify-center items-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-all"
      >
        <Printer className="mr-2 h-5 w-5" />
        Print
      </button>
    </div>
  );
}