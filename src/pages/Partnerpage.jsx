import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PartnerPage() {
  const [tier, setTier] = useState("gold");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const partnerLogos = Array.from({ length: 12 }).map((_, i) => `/partners/logo_${i + 1}.png`);

  const tiers = [
    { id: "strategic", title: "Strategic Partner", price: "Invite-Only", perks: ["Joint GTM", "Priority engineering", "Co-marketing & IP"] },
    { id: "gold", title: "Gold Partner", price: "Custom Program", perks: ["Technical enablement", "Marketing support", "Preferential SLA"] },
    { id: "silver", title: "Silver Partner", price: "Custom Program", perks: ["Partner portal access", "Training credits", "Quarterly reviews"] },
  ];

  const stats = [
    { label: "Deployed Pods", value: "1,200+" },
    { label: "MW Under Management", value: "320+" },
    { label: "Global Partners", value: "85" },
  ];

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Partner inquiry", { tier, ...form });
    alert("Thanks! Your partner inquiry was submitted.");
    setForm({ name: "", company: "", email: "", message: "" });
  }

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* HERO */}
  <section className="relative w-full overflow-hidden">

  {/* ✅ BACKGROUND VIDEO */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="src/assets/background.mp4" type="video/mp4" />
  </video>

  {/* ✅ DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* ✅ CONTENT */}
  <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center py-20 px-6 gap-12">

    {/* LEFT CONTENT */}
    <div>
      <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
        The power
        <br /> of partners
      </h1>

      <p className="mt-6 text-lg text-gray-200 leading-relaxed">
        We’re driving innovation for the world’s leading enterprises and 
        service providers. Our global partner program enables partners to 
        leverage our platform and proven solution methodology to create a 
        stronger ecosystem.
      </p>
    </div>

  </div>
</section>


    </div>
  );
}
