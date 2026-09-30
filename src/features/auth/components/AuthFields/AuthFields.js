"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { Input } from "@/shared/components/atoms";

const FIELD_CLASS =
  "h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 transition focus:border-[#555A8A]";

export function IconInput({ icon: Icon, error, className = "", ...props }) {
  return (
    <div className="relative">
      <Icon
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-7 -translate-y-1/2 text-gray-400"
      />
      <Input error={error} className={`${FIELD_CLASS} pr-5 ${className}`} {...props} />
    </div>
  );
}

export function PasswordInput({ error, disabled, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-7 -translate-y-1/2 text-gray-400"
      />
      <Input
        type={visible ? "text" : "password"}
        error={error}
        disabled={disabled}
        className={`${FIELD_CLASS} pr-12`}
        {...props}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
        aria-pressed={visible}
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-4 top-7 -translate-y-1/2 text-gray-400 transition hover:text-[#555A8A] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {visible ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  );
}
