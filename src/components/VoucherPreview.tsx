"use client";

import React from "react";
import { QrCode, ShieldCheck, MapPin, Globe, Mail } from "lucide-react";

interface VoucherPreviewProps {
  formData: any;
}

export default function VoucherPreview({ formData }: VoucherPreviewProps) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div 
      id="voucher-to-print" 
      className="bg-black text-white p-8 rounded-2xl border border-red-900/30 shadow-xl relative overflow-hidden flex flex-col mx-auto page-break"
      style={{ 
        width: '100%',
        maxWidth: '794px', 
        minHeight: '1123px', 
        boxSizing: 'border-box', 
        backgroundColor: '#000000', 
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Background Accents (Simplified for PDF) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 relative z-10 w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <div className="w-56 h-20 flex items-center justify-start py-1">
              <img 
                src="/softtechlogo-2 (1).png" 
                alt="Softtech Labs Logo"
                className="max-w-full max-h-full object-contain object-left"
              />
            </div>
          </div>
          <div className="space-y-2 text-[12px] text-gray-400 font-semibold ml-1">
            <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> House No R-293 Sector 9 , North Karachi</p>
            <p className="flex items-center gap-3"><Globe className="w-4 h-4 text-primary" /> softtech-development-creations.vercel.app</p>
            <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> softtech732@gmail.com</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/40 rounded-full mb-6">
            <span className="text-[14px] font-black text-primary tracking-[0.2em] uppercase">OFFICIAL FEE VOUCHER</span>
          </div>
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">TRANSACTION ID</p>
            <p className="text-xl font-mono font-black text-white uppercase tracking-tight">{formData.voucherId}</p>
          </div>
        </div>
      </div>

      {/* Main Content Sections (Using Table for perfect PDF alignment) */}
      <table className="w-full mb-8 relative z-10 border-t border-white/10 pt-8" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
        <tbody>
          <tr>
            <td className="w-1/2 align-top pr-10 border-r border-white/5">
              <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.3em] mb-4 pb-2 border-b border-red-900/40">Student Statistics</h3>
              <div className="space-y-4">
                <DetailItem label="Full Name" value={formData.studentName || "N/A"} />
                <DetailItem label="Father Name" value={formData.fatherName || "N/A"} />
                <DetailItem label="Institutional ID" value={formData.studentId || "N/A"} />
                <DetailItem label="Mobile Contact" value={formData.contactNumber || "N/A"} />
              </div>
            </td>
            <td className="w-1/2 align-top pl-10">
              <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.3em] mb-4 pb-2 border-b border-red-900/40">Registration Details</h3>
              <div className="space-y-4">
                <DetailItem label="Selected Program" value={formData.courseName} />
                <DetailItem label="Batch Designation" value={formData.batchTiming || "N/A"} />
                <DetailItem label="Generation Date" value={currentDate} />
                <DetailItem label="Submission Deadline" value={formData.dueDate || "N/A"} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Fee Structure Table */}
      <div className="flex-grow relative z-10 px-2 mt-4">
        <h3 className="text-[12px] font-black text-primary uppercase tracking-[0.3em] mb-4 pb-2 border-b border-red-900/40">Financial Statement</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[13px] uppercase tracking-widest text-gray-500 border-b border-white/20">
              <th className="text-left py-4 font-black">Description of Dues</th>
              <th className="text-right py-4 font-black">Gross Amount (PKR)</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-bold">
            <TableRow label="Academic Tuition Fee" amount={formData.courseFee} />
            <TableRow label="Previous Outstanding / Arrears" amount={formData.previousDues} />
            {formData.applyLateFine && <TableRow label="Late Surcharge (Penalty)" amount={formData.lateFine} isFine />}
            {formData.discount > 0 && <TableRow label="Scholarship Waiver / Discount" amount={-formData.discount} isDiscount />}
          </tbody>
          <tfoot>
            <tr className="border-t-4 border-primary/50">
              <td className="py-4">
                <div className="flex items-center gap-6">
                  <div className="px-5 py-2 bg-red-600/10 border border-red-600/50 rounded-xl text-[13px] font-black text-primary tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,0,0,0.1)]">
                    STATUS: UNPAID
                  </div>
                  <ShieldCheck className="w-6 h-6 text-primary opacity-40" />
                </div>
              </td>
              <td className="py-4 text-right">
                <p className="text-[12px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Total Payable Amount</p>
                <div className="text-5xl font-black text-white tracking-tighter flex justify-end items-baseline gap-2">
                  <span className="text-xl text-primary font-black">RS.</span>
                  <span style={{ color: '#ffffff' }}>{formData.totalAmount.toLocaleString()}</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Signature & Verification Footer */}
      <div className="mt-6 flex justify-between items-end relative z-10 border-t border-white/10 pt-6 pb-4">


       <div className="text-left">
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-2">Institute Payment Accounts</p>
            <p className="text-[14px] font-black text-white uppercase">Account Name : Syed Aliyan Uddin </p>
            <p className="text-[14px] font-black text-white uppercase">Account Number : 0310-2825994 </p>
            <p className="text-[14px] font-black text-white uppercase">Wallet Provider : Easypaisa </p>
  
          </div>
        
        <div className="flex items-center gap-10">
          <div className="text-right">
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-2">Authenticated by</p>
            <p className="text-[18px] font-black text-white uppercase tracking-tight leading-none">SOFTTECH LABS CMS</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-2xl">
            <QrCode className="w-16 h-16 text-black" strokeWidth={3} />
          </div>
        </div>

      </div>

      {/* Official Footnote */}
      <div className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] pb-2 mt-auto">
        <hr className="border-white/5 mb-4 w-1/3 mx-auto" />
        <p>This is a computer generated document and does not require an official stamp.</p>
        <p className="mt-1 text-primary/30 font-medium">Enterprise Management Suite v4.0 &bull; Secure ID: {formData.studentId}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-black text-primary/70 uppercase tracking-widest">{label}</p>
      <p className="text-[18px] font-black text-white leading-tight break-words" style={{ lineHeight: '1.2' }}>{value}</p>
    </div>
  );
}

function TableRow({ label, amount, isFine = false, isDiscount = false }: any) {
  if (amount === 0 && !isDiscount) return null;

  return (
    <tr className="border-b border-white/5">
      <td className="py-4 text-gray-300 font-bold text-[15px]">{label}</td>
      <td className={`py-4 text-right font-mono font-black text-[18px]`} style={{ color: isFine ? '#ff0000' : isDiscount ? '#22c55e' : '#ffffff' }}>
        {isDiscount && amount < 0 ? '-' : ''}
        {Math.abs(amount).toLocaleString()}
      </td>
    </tr>
  );
}
