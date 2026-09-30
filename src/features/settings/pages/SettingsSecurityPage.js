"use client";
import { useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

import SettingsSecurity from "../components/Settings/SettingsSecurity";
export default function SettingsSecurityPage() {
  const [open, setOpen] = useState(false);
  const { data, router, deleteAccount } = useAuth();

  return (
    <SettingsSecurity
      open={open}
      setOpen={setOpen}
      data={data}
      router={router}
      deleteAccount={deleteAccount}
    />
  );
}
