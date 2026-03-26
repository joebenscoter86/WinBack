"use client";

import { ProductHighlightCard } from "@/components/ui/product-card";
import { ShieldAlert, Package, AlertTriangle } from "lucide-react";

const playbooks = [
  {
    category: "Fraud",
    categoryIcon: <ShieldAlert className="h-4 w-4" />,
    title: "Unauthorized",
    description:
      "Prove the cardholder was present. IP match, AVS, 3DS results, device fingerprint, and prior purchase history.",
  },
  {
    category: "Delivery",
    categoryIcon: <Package className="h-4 w-4" />,
    title: "Not Received",
    description:
      "Shipping confirmation isn't enough. You need carrier tracking, delivery signature, and proof it went to the right address.",
  },
  {
    category: "Quality",
    categoryIcon: <AlertTriangle className="h-4 w-4" />,
    title: "Not as Described",
    description:
      "Match what you advertised to what you delivered. Product pages, terms of service, and communication logs win these cases.",
  },
];

export function PlaybookCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
      {playbooks.map((playbook) => (
        <ProductHighlightCard
          key={playbook.title}
          className="h-[180px] sm:h-[200px] w-full rounded-xl bg-surface-high border border-white/5"
          category={playbook.category}
          categoryIcon={playbook.categoryIcon}
          title={playbook.title}
          description={playbook.description}
        />
      ))}
    </div>
  );
}
