"use client";

import React, { useState, useEffect } from "react";
import { Download, LayoutDashboard, PlusCircle, Bell, Search, UserCircle, CreditCard } from "lucide-react";
import IdCardForm from "@/components/IdCardForm";
import IdCardPreview from "@/components/IdCardPreview";
import Link from "next/link";

const initialState = {
  studentName: "",
  fatherName: "",
  studentId: "",
  contactNumber: "",
  courseName: "Full Stack Development",
  bloodGroup: "",
};

export default function IdCardPage() {
  const [formData, setFormData] = useState(initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      studentId: prev.studentId || "SL-" + Math.floor(100000 + Math.random() * 900000),
    }));
  }, []);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("idcard-to-print");
      if (!element) { setIsGenerating(false); return; }

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        width: 510,
        height: 810,
        style: {
          width: '510px',
          minWidth: '510px',
          height: '810px',
          minHeight: '810px',
          transform: 'none',
          boxShadow: 'none',
          margin: '0',
        }
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [510, 810]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 510, 810);
      pdf.save(`Softtech_IDCard_${formData.studentId}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#000000", color: "#ffffff", paddingBottom: "80px" }}>
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(239,68,68,0.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "32px", backgroundColor: "#ef4444", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px", color: "white" }}>S</div>
            <span style={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: "18px", textTransform: "uppercase" }}>
              Softtech <span style={{ color: "#ef4444", fontStyle: "italic" }}>Labs</span>
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "4px", border: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
            <nav style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#9ca3af", transition: "all 0.2s", textDecoration: "none" }}>
                <LayoutDashboard size={16} />Fee Voucher
              </Link>
              <Link href="/receipt" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", color: "#9ca3af", transition: "all 0.2s", textDecoration: "none" }}>
                <PlusCircle size={16} />Receipt
              </Link>
              <Link href="/idcard" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", backgroundColor: "#ef4444", color: "#ffffff", boxShadow: "0 0 15px rgba(255,0,0,0.2)", textDecoration: "none", borderRadius: "6px" }}>
                <CreditCard size={16} />ID Card
              </Link>
            </nav>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{ padding: "8px", color: "#9ca3af", borderRadius: "9999px", position: "relative", background: "none", border: "none", cursor: "pointer" }}>
            <Bell size={20} />
            <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", backgroundColor: "#ef4444", borderRadius: "9999px", border: "2px solid #000000" }} />
          </button>
          <div style={{ height: "32px", width: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <UserCircle size={32} style={{ color: "#ef4444" }} />
        </div>
      </nav>

      {/* Main content */}
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "40px 24px 0" }}>
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            ID CARD <span style={{ color: "#ef4444" }}>GENERATOR</span>
          </h1>
          <p style={{ color: "#6b7280", fontWeight: 500, letterSpacing: "0.2em", fontSize: "12px", textTransform: "uppercase" }}>
            SOFTTECH LABS • ENTERPRISE V4.0
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "40px" }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div style={{ height: "fit-content", position: "sticky", top: 96 }} className="lg:col-span-5 xl:col-span-4 h-fit sticky top-24">
            <IdCardForm formData={formData} setFormData={setFormData} photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
          </div>

          {/* Preview */}
          <div className="lg:col-span-7 xl:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Action bar */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "16px", backgroundColor: "rgba(127,29,29,0.2)", borderRadius: "16px", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div>
                <span style={{ fontSize: "10px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em", display: "block" }}>Student</span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>{formData.studentName || "Enter student details"}</span>
              </div>
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                style={{ padding: "10px 24px", backgroundColor: isGenerating ? "#ef4444" : "#dc2626", borderRadius: "12px", fontSize: "14px", fontWeight: 900, display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s", opacity: isGenerating ? 0.5 : 1, cursor: isGenerating ? "not-allowed" : "pointer", color: "white", border: "none" }}
              >
                <Download size={18} className={isGenerating ? "animate-bounce" : ""} />
                {isGenerating ? "Processing..." : "Download ID Card"}
              </button>
            </div>

            {/* Card preview */}
            <div style={{ backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "24px", padding: "24px", border: "1px solid rgba(255,255,255,0.05)", overflowX: "auto" }}>
              <div style={{ width: "fit-content", margin: "0 auto" }}>
                <IdCardPreview formData={formData} photoPreview={photoPreview} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
