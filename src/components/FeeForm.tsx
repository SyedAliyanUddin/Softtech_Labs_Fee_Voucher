"use client";

import React from "react";
import { User, BookOpen, Clock, Phone, Hash, DollarSign, Percent, AlertCircle } from "lucide-react";

interface FeeFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function FeeForm({ formData, setFormData }: FeeFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "number" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleToggleFine = () => {
    setFormData({ ...formData, applyLateFine: !formData.applyLateFine });
  };

  return (
    <div className="space-y-8 p-6 glass-red rounded-2xl animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Student Information</h2>
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
          label="Father Name" 
          name="fatherName" 
          icon={<User className="w-4 h-4" />} 
          placeholder="Enter father's name" 
          value={formData.fatherName}
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
        <InputField 
          label="Contact Number" 
          name="contactNumber" 
          icon={<Phone className="w-4 h-4" />} 
          placeholder="+92 3XX XXXXXXX" 
          value={formData.contactNumber}
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
          </select>
        </div>
        <InputField 
          label="Batch Timing" 
          name="batchTiming" 
          icon={<Clock className="w-4 h-4" />} 
          placeholder="06:00 PM - 08:00 PM" 
          value={formData.batchTiming}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-3 border-b border-primary/20 pb-4 pt-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Fee Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField 
          type="number"
          label="Course Fee" 
          name="courseFee" 
          icon={<DollarSign className="w-4 h-4" />} 
          placeholder="0.00" 
          value={formData.courseFee}
          onChange={handleChange}
        />
        <InputField 
          type="number"
          label="Previous Dues" 
          name="previousDues" 
          icon={<AlertCircle className="w-4 h-4" />} 
          placeholder="0.00" 
          value={formData.previousDues}
          onChange={handleChange}
        />
        <InputField 
          type="number"
          label="Discount" 
          name="discount" 
          icon={<Percent className="w-4 h-4" />} 
          placeholder="0.00" 
          value={formData.discount}
          onChange={handleChange}
        />
        <InputField 
          type="date"
          label="Due Date" 
          name="dueDate" 
          icon={<Clock className="w-4 h-4" />} 
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Apply Late Fine</p>
            <p className="text-xs text-gray-400">Regular fine of 3000 will be added</p>
          </div>
        </div>
        <button 
          onClick={handleToggleFine}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.applyLateFine ? 'bg-primary' : 'bg-gray-700'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.applyLateFine ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      {formData.applyLateFine && (
        <InputField 
          type="number"
          label="Late Fine" 
          name="lateFine" 
          icon={<DollarSign className="w-4 h-4" />} 
          placeholder="3000" 
          value={formData.lateFine}
          onChange={handleChange}
          className="animate-in slide-in-from-top-2 duration-300"
        />
      )}

      <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300 uppercase tracking-[0.2em]">Total Payable Amount</span>
          <span className="text-2xl font-black text-primary neon-text">
            RS. {formData.totalAmount.toLocaleString()}
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
