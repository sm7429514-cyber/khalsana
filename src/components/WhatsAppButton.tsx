"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export default function WhatsAppButton({
  message,
  label = "تواصل عبر واتساب",
  size = "md",
}: WhatsAppButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 font-medium text-white transition-all hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-600/25 ${sizeClasses[size]}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}