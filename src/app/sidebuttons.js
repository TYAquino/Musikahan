"use client";
// src/components/sidebuttons.js
import React from 'react';
import Link from 'next/link';

export default function SideButtons({ title, to, imageSrc, isActive, onClick }) {
  return (
    <Link 
      href={to}
      className={`flex flex-col items-center space-y-2 p-2 rounded transition-colors duration-300 ${isActive ? 'bg-[#7827a3] text-white' : 'hover:bg-[#c15fe5]'} ${isActive ? 'font-bold' : ''}`}
      onClick={onClick}
    >
      <img src={imageSrc} alt={title} className="w-8 h-8 object-contain" />
      <span className="text-sm">{title}</span>
    </Link>
  );
}
