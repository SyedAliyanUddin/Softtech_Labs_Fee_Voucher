"use client";

import React from "react";
import { MapPin, Globe, Mail, User } from "lucide-react";

interface IdCardPreviewProps {
  formData: any;
  photoPreview: string | null;
}

// Standard CR80 ID card dimensions at 96dpi: 2.125in x 3.375in → 204 x 324px
// Scaled up 2.5x for quality: 510 x 810px
const CARD_W = 510;
const CARD_H = 810;

export default function IdCardPreview({ formData, photoPreview }: IdCardPreviewProps) {
  return (
    <div
      id="idcard-to-print"
      style={{
        width: `${CARD_W}px`,
        minWidth: `${CARD_W}px`,
        height: `${CARD_H}px`,
        minHeight: `${CARD_H}px`,
        boxSizing: 'border-box',
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        border: '1px solid rgba(239,68,68,0.3)',
      }}
    >
      {/* Top red gradient bar */}
      <div style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 60%, #000 100%)',
        padding: '28px 28px 40px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', top: 10, right: 20, width: 60, height: 60, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
          <img 
            src="/softtechlogo-2 (1).png" 
            alt="Softtech Labs Logo"
            style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* STUDENT ID badge */}
        <div style={{ display: 'inline-block', marginTop: '8px', padding: '3px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ffffff' }}>STUDENT IDENTITY CARD</span>
        </div>
      </div>

      {/* Photo section — overlapping the header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-50px', position: 'relative', zIndex: 10, paddingBottom: '12px' }}>
        <div style={{
          width: '110px',
          height: '130px',
          borderRadius: '16px',
          border: '4px solid #dc2626',
          overflow: 'hidden',
          backgroundColor: '#111',
          boxShadow: '0 0 30px rgba(220,38,38,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {photoPreview ? (
            <img src={photoPreview} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User style={{ width: '48px', height: '48px', color: 'rgba(255,0,0,0.3)' }} />
          )}
        </div>

        {/* Name & ID */}
        <div style={{ textAlign: 'center', marginTop: '14px', padding: '0 28px' }}>
          <p style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 4px 0', lineHeight: 1.1 }}>
            {formData.studentName || 'Student Name'}
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,0,0,0.8)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
            {formData.studentId || 'SL-000000'}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 28px', borderTop: '1px solid rgba(255,255,255,0.08)' }} />

      {/* Details grid */}
      <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
        <DetailRow label="Father's Name" value={formData.fatherName || 'N/A'} />
        <DetailRow label="Program" value={formData.courseName || 'N/A'} />
        <DetailRow label="Contact" value={formData.contactNumber || 'N/A'} />
        {formData.bloodGroup && <DetailRow label="Blood Group" value={formData.bloodGroup} accent />}
      </div>

      {/* Divider */}
      <div style={{ margin: '0 28px', borderTop: '1px solid rgba(255,255,255,0.08)' }} />

      {/* Footer */}
      <div style={{ padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ fontSize: '8px', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 4px 0' }}>Institute Info</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin style={{ width: '10px', height: '10px', color: '#dc2626', flexShrink: 0 }} />
          <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>House No R-293 Sector 9, North Karachi</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe style={{ width: '10px', height: '10px', color: '#dc2626', flexShrink: 0 }} />
          <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>softtech-development-creations.vercel.app</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail style={{ width: '10px', height: '10px', color: '#dc2626', flexShrink: 0 }} />
          <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>softtech732@gmail.com</span>
        </div>
        <div style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: 'rgba(220,38,38,0.08)', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.15)', textAlign: 'center' }}>
          <p style={{ fontSize: '8px', color: 'rgba(255,0,0,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
            If found, please return to the institute
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,0,0,0.6)', margin: 0 }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 800, color: accent ? '#22c55e' : '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>{value}</p>
    </div>
  );
}
