"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const orbitItems = [
  { label: "Tax Strategist", initials: "TS", color: "bg-blue-600" },
  { label: "Business Attorney", initials: "BA", color: "bg-indigo-600" },
  { label: "Financial Advisor", initials: "FA", color: "bg-emerald-600" },
  { label: "Marketing Expert", initials: "ME", color: "bg-orange-500" },
  { label: "HR Consultant", initials: "HR", color: "bg-rose-500" },
  { label: "Real Estate Advisor", initials: "RE", color: "bg-violet-600" },
];

const RX = 320;
const RY = 150;
const DURATION = 36000;

export default function HeroSection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed % DURATION) / DURATION;

      orbitItems.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const angle = (progress + i / orbitItems.length) * Math.PI * 2;
        const x = RX * Math.cos(angle);
        const y = RY * Math.sin(angle);
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section className="h-[calc(100vh-65px)] flex items-center justify-center px-6 overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="orbit-container mb-6">
          <div className="orbit-ring" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-dark tracking-tight whitespace-nowrap">
              Cognito
            </h1>
          </div>
          {orbitItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="orbit-item-js"
            >
              <div
                className={`orbit-avatar w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-md cursor-default`}
              >
                <span className="text-white text-xs font-bold tracking-wide">
                  {item.initials}
                </span>
              </div>
              <span className="orbit-label">{item.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xl md:text-2xl text-secondary max-w-2xl mb-2">
          The marketplace for expert-trained AI agents
        </p>
        <p className="text-sm text-secondary max-w-xl mb-6">
          Experts deploy their knowledge. Businesses get instant access. Everyone wins.
        </p>
        <Link
          href="/agents"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Agents
        </Link>
      </div>
    </section>
  );
}
