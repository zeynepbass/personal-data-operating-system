"use client";

import { useState } from "react";

import columns from "@/mocks/data.json";
import fields from "@/mocks/fields.json";

export const useFeed = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState(columns);
  const [documents, setDocuments] = useState(fields);

  const [form, setForm] = useState({
    title: "",
    description: "",
    label: "",
    assignee: "",

    priority: "Medium",
    status: "Todo",
    startDate: "",
    dueDate: "",
    estimatedHours: "",

    type: "pdf",
    size: "",
    date: "",
    icon: "pdf",
    color: "red",
    favorite: false,
    shared: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onClose = () => {
    setOpen(false);

    setForm({
      name: "",
      type: "pdf",
      size: "",
      date: "",
      icon: "pdf",
      color: "red",
      favorite: false,
      shared: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newDocument = {
      id: Date.now().toString(),
      ...form,
    };

    setDocuments((prev) => [newDocument, ...prev]);

    onClose();
  };

  return {
    data,
    setData,

    documents,
    setDocuments,

    open,
    setOpen,

    form,
    handleChange,
    onSubmit,
    onClose,
  };
};
