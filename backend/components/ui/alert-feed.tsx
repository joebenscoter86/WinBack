"use client";

import React from "react";
import { AlertTriangle, CheckCircle, Clock, ShieldAlert } from "lucide-react";

const alerts = [
  {
    icon: <ShieldAlert className="h-3.5 w-3.5 text-primary-container shrink-0" />,
    title: "New dispute filed",
    detail: "$247.00 — Visa 13.1",
    time: "Just now",
  },
  {
    icon: <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />,
    title: "Deadline approaching",
    detail: "dp_9xK2m — 3 days left",
    time: "2m ago",
  },
  {
    icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />,
    title: "Evidence submitted",
    detail: "dp_7aR4n — $182.00",
    time: "8m ago",
  },
  {
    icon: <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />,
    title: "Urgent: 24hrs remaining",
    detail: "dp_2bQ8x — $519.00",
    time: "12m ago",
  },
];

export function AlertFeed() {
  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-surface-high/40 border border-white/5 transition-colors duration-200 hover:bg-surface-high/80 cursor-default"
        >
          <div className="mt-0.5">{alert.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-slate-200 leading-tight">
              {alert.title}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {alert.detail}
            </p>
          </div>
          <span className="text-[9px] text-slate-500 whitespace-nowrap mt-0.5">
            {alert.time}
          </span>
        </div>
      ))}
    </div>
  );
}
