
"use client";

import { useEffect, useState } from "react";

import meetingsRepository from "../meeting.container";
import columns from "../../../shared/mocks/event.json";
import fields from "../../../shared/mocks/fields.json";

export const useFeed = () => {
  const [open, setOpen] = useState(false);

  const [meetings, setMeetings] = useState([]);


  const [data, setData] = useState(columns);

  const [documents, setDocuments] = useState(fields);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const today = new Date().toISOString().split("T")[0];


  const fetchMeetings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await meetingsRepository.getAllMeetings();

      console.log("Meetings:", response);

      setMeetings(response ?? []);
    } catch (error) {
      console.error("Meetings error:", error);

      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const filteredMeeting = meetings.filter((item) => {
    if (!item.meetingCalendar) return false;

    const meetingDate = new Date(item.meetingCalendar)
      .toISOString()
      .split("T")[0];

    return meetingDate === today;
  });

  const filteredData =
    data?.filter((item) => item.start === today) ?? [];


  const [form, setForm] = useState({
    name: "",
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

  const resetForm = () => {
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


  const onClose = () => {
    setOpen(false);
    resetForm();
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
    filteredData,


    meetings,
    filteredMeeting,


    documents,
    setDocuments,

    loading,
    error,


    open,
    setOpen,


    form,
    handleChange,
    onSubmit,
    onClose,


    today,
  };
};