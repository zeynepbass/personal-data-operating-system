"use client";

import { useState } from "react";
import meetings from "../../../shared/mocks/data.json";
import columns from "../../../shared/mocks/event.json";
import fields from "../../../shared/mocks/fields.json";

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
  const today = new Date().toISOString().split("T")[0];
  const filteredData=data.filter((item)=>item.start===today)
  const filteredMeeting=meetings.filter((item)=>item.meetingCalendar===today)
  console.log(today)
  console.log(filteredMeeting)
  return {
    data,
    setData,
    filteredData,
    documents,
    setDocuments,
    filteredMeeting,
    open,
    setOpen,

    form,
    handleChange,
    onSubmit,
    onClose,
  };
};
