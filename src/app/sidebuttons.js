"use client";
// src/components/sidebuttons.js
import React from 'react';
import Link from 'next/link';

export default function SideButtons({ title, to, imageSrc, isActive, onClick }) {
  return (
    <Link 
      href={to}
      className={`flex flex-col items-center space-y-2 p-2 rounded transition-colors duration-300 ${isActive ? 'bg-[#1ed7b5] text-white' : 'hover:bg-[#1ed7b5]'} ${isActive ? 'font-bold' : ''}`}
      onClick={onClick}
    >
      <img src={imageSrc} alt={title} className="w-12 h-12 object-contain" />
      <span className="text-sm">{title}</span>
    </Link>
  );
}
