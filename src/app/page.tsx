"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Download, LayoutDashboard, PlusCircle, Bell, Search, UserCircle } from "lucide-react";
import FeeForm from "@/components/FeeForm";
import VoucherPreview from "@/components/VoucherPreview";

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      studentId: prev.studentId || "SL-" + Math.floor(100000 + Math.random() * 900000),
      voucherId: prev.voucherId || "V-" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    }));
  }, []);

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
    
    try {
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");
      
      const element = document.getElementById("voucher-to-print");
      
      if (!element) {
        console.error("Print element not found");
        setIsGenerating(false);
        return;
      }

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        style: {
          transform: 'none',
          boxShadow: 'none',
        }
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [794, 1123]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 794, 1123);
      pdf.save(`Softtech_Voucher_${formData.studentId}.pdf`);
      
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#000000", color: "#ffffff", paddingBottom: "80px" }} className="selection:bg-red-500 selection:text-white">
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(239, 68, 68, 0.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="bg-black/80 backdrop-blur border-b border-red-500/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div style={{ width: "32px", height: "32px", backgroundColor: "#ef4444", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px", lineHeight: "0" }}>S</div>
            <span style={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: "18px", textTransform: "uppercase" }} className="font-black tracking-tighter text-lg uppercase">
              Softtech <span style={{ color: "#ef4444", fontStyle: "italic" }} className="text-red-500 italic">Labs</span>
            </span>
          </div>

          <div style={{ display: "none", gap: "4px", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "4px", border: "1px solid rgba(255,255,255,0.05)" }} className="hidden lg:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
            <nav className="flex gap-1">
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", backgroundColor: "#ef4444", color: "#ffffff", boxShadow: "0 0 15px rgba(255,0,0,0.2)" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-red-500 text-white">
                <LayoutDashboard size={16} />
                Fee Voucher
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#9ca3af", transition: "all 0.2s" }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5">
                <PlusCircle size={16} />
                Receipt
              </button>
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ display: "none", alignItems: "center", gap: "8px", padding: "6px 12px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.05)", color: "#9ca3af" }} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-gray-400">
            <Search size={14} />
            <input type="text" placeholder="Search students..." style={{ backgroundColor: "transparent", border: "none", fontSize: "12px", outline: "none", width: "128px" }} className="bg-transparent border-none text-xs focus:outline-none w-32" />
          </div>
          <button style={{ padding: "8px", color: "#9ca3af", transition: "all 0.2s", borderRadius: "9999px", position: "relative" }} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
            <Bell size={20} />
            <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", backgroundColor: "#ef4444", borderRadius: "9999px", border: "2px solid #000000" }} className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
          </button>
          <div style={{ height: "32px", width: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} className="h-8 w-px bg-white/10" />
          <UserCircle size={32} style={{ color: "#ef4444" }} className="text-red-500" />
        </div>
      </nav>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 24px", marginTop: "40px" }} className="max-w-[1600px] mx-auto px-6 mt-10">
        <header style={{ marginBottom: "40px" }} className="mb-10">
          <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "8px" }} className="text-4xl font-black tracking-tighter mb-2">
            FEE <span style={{ color: "#ef4444" }} className="text-red-500">MANAGEMENT</span>
          </h1>
          <p style={{ color: "#6b7280", fontWeight: 500, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase" }} className="text-gray-500 font-medium tracking-[0.2em] text-xs uppercase">
            SOFTTECH LABS • ENTERPRISE V4.0
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "40px" }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div style={{ gridArea: "lg:col-span-5 xl:col-span-4", height: "fit-content", position: "sticky", top: 96 }} className="lg:col-span-5 xl:col-span-4 h-fit sticky top-24">
            <FeeForm formData={formData} setFormData={setFormData} />
          </div>

          <div style={{ gridArea: "lg:col-span-7 xl:col-span-8", display: "flex", flexDirection: "column", gap: "24px" }} className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "16px", backgroundColor: "rgba(127, 29, 29, 0.2)", borderRadius: "16px", border: "1px solid rgba(239, 68, 68, 0.2)" }} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-red-900/20 rounded-2xl border border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em" }} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Selected Student</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }} className="text-sm font-bold">{formData.studentName || "Enter student details"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  style={{ padding: "10px 24px", backgroundColor: isGenerating ? "#ef4444" : "#dc2626", borderRadius: "12px", fontSize: "14px", fontWeight: 900, display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s", opacity: isGenerating ? 0.5 : 1, cursor: isGenerating ? "not-allowed" : "pointer" }}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={18} className={isGenerating ? "animate-bounce" : ""} />
                  {isGenerating ? "Processing..." : "Generate PDF"}
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "24px", padding: "24px", border: "1px solid rgba(255,255,255,0.05)", position: "relative" }} className="bg-black/40 rounded-3xl p-6 border border-white/5 relative group overflow-hidden">
              <VoucherPreview formData={formData} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #voucher-to-print, #voucher-to-print * { visibility: visible; }
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
          #voucher-to-print .text-white { color: black !important; }
          #voucher-to-print .bg-black { background: white !important; }
          #voucher-to-print .text-red-500 { color: #ff0000 !important; }
          #voucher-to-print .bg-red-500 { background: #ff0000 !important; color: white !important; }
          #voucher-to-print .text-gray-500, #voucher-to-print .text-gray-600 { color: #666 !important; }
        }
      `}</style>
    </main>
  );
}