"use client";

import React, { useRef } from "react";
import { User, BookOpen, Phone, Hash, Heart, Camera, X } from "lucide-react";

interface IdCardFormProps {
  formData: any;
  setFormData: (data: any) => void;
  photoPreview: string | null;
  setPhotoPreview: (url: string | null) => void;
}

export default function IdCardForm({ formData, setFormData, photoPreview, setPhotoPreview }: IdCardFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-8 p-6 glass-red rounded-2xl animate-in fade-in slide-in-from-left-4 duration-700">
      {/* Photo Upload */}
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Camera className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Student Photo</h2>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          className="w-36 h-40 rounded-2xl border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden relative cursor-pointer group"
          style={{ backgroundColor: 'rgba(255,0,0,0.05)' }}
          onClick={() => fileInputRef.current?.click()}
        >
          {photoPreview ? (
            <>
              <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              <Camera className="w-10 h-10 text-primary/40 mx-auto mb-2" />
              <p className="text-xs text-gray-500 uppercase tracking-wider">Click to upload photo</p>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all uppercase tracking-wider"
          >
            Upload Photo
          </button>
          {photoPreview && (
            <button
              onClick={clearPhoto}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Student Info */}
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4 pt-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">Student Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Student Full Name" name="studentName" icon={<User className="w-4 h-4" />} placeholder="Enter full name" value={formData.studentName} onChange={handleChange} />
        <InputField label="Father Name" name="fatherName" icon={<User className="w-4 h-4" />} placeholder="Enter father's name" value={formData.fatherName} onChange={handleChange} />
        <InputField label="Student ID" name="studentId" icon={<Hash className="w-4 h-4" />} placeholder="SL-000001" value={formData.studentId} onChange={handleChange} />
        <InputField label="Contact Number" name="contactNumber" icon={<Phone className="w-4 h-4" />} placeholder="+92 3XX XXXXXXX" value={formData.contactNumber} onChange={handleChange} />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            Course Name
          </label>
          <select name="courseName" value={formData.courseName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-3.5 h-3.5" />
            Blood Group
          </label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, icon, placeholder, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-1.5">
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
