"use client";
// src/components/sidebuttons.js
import React from 'react';
import Link from 'next/link';

export default function SideButtons({ title, to, imageSrc }) {
  return (
    <Link href={to} className="flex items-center space-x-2 p-2 hover:bg-[#1ed7b5] rounded">
      <img src={imageSrc} alt={title} className="w-12 h-16" />
      <span>{title}</span>
    </Link>
  );
}
