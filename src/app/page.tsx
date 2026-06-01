"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Download, Printer, LayoutDashboard, Settings, UserCircle, Bell, Search, PlusCircle } from "lucide-react";
import FeeForm from "@/components/FeeForm";
import VoucherPreview from "@/components/VoucherPreview";

// Initial state
const initialState = {
  studentName: "",
  fatherName: "",
  courseName: "Full Stack Development",
  batchTiming: "",
  contactNumber: "",
  studentId: "",
  courseFee: 0,
  lateFine: 3000,
  discount: 0,
  previousDues: 0,
  dueDate: "",
  applyLateFine: false,
  totalAmount: 0,
  voucherId: "",
};

export default function Home() {
  const [formData, setFormData] = useState(initialState);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize random IDs on client side to prevent hydration mismatches
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      studentId: prev.studentId || "SL-" + Math.floor(100000 + Math.random() * 900000),
      voucherId: prev.voucherId || "V-" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    }));
  }, []);

  // Auto-calculate Total Amount
  const calculateTotal = useCallback(() => {
    const { courseFee, lateFine, discount, previousDues, applyLateFine } = formData;
    const fine = applyLateFine ? (lateFine || 0) : 0;
    const total = (courseFee || 0) + fine + (previousDues || 0) - (discount || 0);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.courseFee, formData.lateFine, formData.discount, formData.previousDues, formData.applyLateFine]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("voucher-to-print");

    if (!element) {
      console.error("Print element not found");
      setIsGenerating(false);
      return;
    }

    const opt: any = {
      margin: 0,
      filename: `Softtech_Voucher_${formData.studentId}.pdf`,
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#000000",
        logging: false,
        letterRendering: true,
        onclone: (clonedDoc: Document) => {
          // your existing code 그대로
        }
      },
      jsPDF: {
        unit: "px",
        format: [794, 1123] as [number, number],
        orientation: "portrait"
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    try {
      // Use the promise-based API correctly
      const worker = (html2pdf() as any).set(opt).from(element);
      await worker.save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-lg leading-none">S</div>
            <span className="font-black tracking-tighter text-lg uppercase">
              Softtech <span className="text-primary italic">Labs</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
            <nav className="flex gap-1">
              <NavBtn icon={<LayoutDashboard size={16} />} label="Fee Voucher" active />
              <NavBtn icon={<PlusCircle size={16} />} label="Receipt" />
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-gray-400">
            <Search size={14} />
            <input type="text" placeholder="Search students..." className="bg-transparent border-none text-xs focus:outline-none w-32" />
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-black" />
          </button>
          <div className="h-8 w-px bg-white/10" />
          <UserCircle size={32} className="text-primary" />
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-6 mt-10">
        <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            FEE <span className="text-primary">MANAGEMENT</span>
          </h1>
          <p className="text-gray-500 font-medium tracking-[0.2em] text-xs uppercase">
            SOFTTECH LABS &bull; ENTERPRISE V4.0
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Form */}
          <div className="lg:col-span-5 xl:col-span-4 h-fit sticky top-24">
            <FeeForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Right Side: Preview & Actions */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-red rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Selected Student</span>
                  <span className="text-sm font-bold">{formData.studentName || "Enter student details"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark rounded-xl text-sm font-black flex items-center gap-2 transition-all active:scale-95 shadow-[0 0 20px rgba(255,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={18} className={isGenerating ? "animate-bounce" : ""} />
                  {isGenerating ? "Processing..." : "Generate PDF"}
                </button>
              </div>
            </div>

            {/* Voucher Preview Container */}
            <div className="bg-black/40 rounded-3xl p-6 border border-white/5 relative group overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/20" />
                  <span className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="w-2 h-2 rounded-full bg-primary/60" />
                </div>
              </div>

              <VoucherPreview formData={formData} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #voucher-to-print, #voucher-to-print * {
            visibility: visible;
          }
          #voucher-to-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 2cm !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
            color: black !important;
          }
          /* Custom print overrides for colors */
          #voucher-to-print .text-white { color: black !important; }
          #voucher-to-print .bg-black { background: white !important; }
          #voucher-to-print .text-primary { color: #ff0000 !important; }
          #voucher-to-print .bg-primary { background: #ff0000 !important; color: white !important; }
          #voucher-to-print .border-red-900\/30 { border-color: #eee !important; }
          #voucher-to-print .border-white\/5 { border-color: #ddd !important; }
          #voucher-to-print .text-gray-500, #voucher-to-print .text-gray-600 { color: #666 !important; }
        }
      `}</style>
    </main>
  );
}

function NavBtn({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-primary text-white shadow-[0 0 15px rgba(255,0,0,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      {label}
    </button>
  );
}