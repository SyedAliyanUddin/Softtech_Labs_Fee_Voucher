"use client";

import React from "react";
import { User, BookOpen, Clock, Phone, Hash, DollarSign, CreditCard, AlertCircle, Calendar } from "lucide-react";

interface ReceiptFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ReceiptForm({ formData, setFormData }: ReceiptFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "number" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <div className="space-y-8 p-6 glass-red rounded-2xl animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Student Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          label="Student Full Name" 
          name="studentName" 
          icon={<User className="w-4 h-4" />} 
          placeholder="Enter full name" 
          value={formData.studentName}
          onChange={handleChange}
        />
        <InputField 
          label="Student ID" 
          name="studentId" 
          icon={<Hash className="w-4 h-4" />} 
          placeholder="ST-2024-001" 
          value={formData.studentId}
          onChange={handleChange}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            Course Name
          </label>
          <select 
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
          >
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-primary/20 pb-4 pt-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Payment Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          type="number"
          label="Amount Paid" 
          name="amountPaid" 
          icon={<DollarSign className="w-4 h-4" />} 
          placeholder="0.00" 
          value={formData.amountPaid}
          onChange={handleChange}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" />
            Payment Method
          </label>
          <select 
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
          >
            <option value="Cash">Cash</option>
            <option value="Online Transfer">Online Transfer</option>
            <option value="Cheque">Cheque</option>
            <option value="Easypaisa">Easypaisa / JazzCash</option>
          </select>
        </div>
        <InputField 
          type="date"
          label="Payment Date" 
          name="paymentDate" 
          icon={<Calendar className="w-4 h-4" />} 
          value={formData.paymentDate}
          onChange={handleChange}
        />
        <InputField 
          type="number"
          label="Remaining Balance" 
          name="remainingBalance" 
          icon={<AlertCircle className="w-4 h-4" />} 
          placeholder="0.00" 
          value={formData.remainingBalance}
          onChange={handleChange}
        />
      </div>

      <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300 uppercase tracking-[0.2em]">Total Amount Paid</span>
          <span className="text-2xl font-black text-primary neon-text">
            RS. {formData.amountPaid.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, icon, placeholder, value, onChange, type = "text", className = "" }: any) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-primary/0 group-focus-within:border-primary/20 transition-all blur-[2px]" />
      </div>
    </div>
  );
}
