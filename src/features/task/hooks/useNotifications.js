"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { markNotificationsReadAction } from "../actions/task.actions";

const NOTIFICATIONS_KEY = ["notifications"];

async function fetchNotifications() {
  const response = await fetch("/api/notifications?limit=20", { cache: "no-store" });
  if (!response.ok) throw new Error("Bildirimler yüklenemedi.");
  return response.json();
}

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: fetchNotifications,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });

  const markRead = useMutation({
    mutationFn: () => markNotificationsReadAction(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
  });

  return {
    notifications: query.data?.items ?? [],
    unread: query.data?.unread ?? 0,
    markAllRead: () => markRead.mutate(),
  };
}
