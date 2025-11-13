"use client";
import React, { useState } from "react";
import styles from "./job-card.module.scss";

const TOGGLE_STATES = ["Draft", "Active", "Inactive"] as const;
type ToggleState = typeof TOGGLE_STATES[number];

interface JobCardProps {
  jobTitle: string;
  salaryMin: number;
  salaryMax: number;
  startedOn: string;
  initialStatus?: ToggleState;
}

export default function JobCard({ 
  jobTitle, 
  salaryMin, 
  salaryMax, 
  startedOn, 
  initialStatus = "Draft" 
}: JobCardProps) {
  const [status, setStatus] = useState<ToggleState>(initialStatus);

  const handleToggle = () => {
    const currentIdx = TOGGLE_STATES.indexOf(status);
    const nextIdx = (currentIdx + 1) % TOGGLE_STATES.length;
    setStatus(TOGGLE_STATES[nextIdx]);
  };

  // Format salary sebagai currency Indonesia
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const salaryRange = `${formatCurrency(salaryMin)} - ${formatCurrency(salaryMax)}`;

  // Tentukan kelas toggle sesuai status
  const toggleClass =
    status === "Draft"
      ? "draft"
      : status === "Active"
      ? "active"
      : "inactive";

  return (
    <div className={styles.jobCard}>
      <div className={styles.toggleWrapper}>
        <button
          className={`${styles.toggleButton} ${styles[toggleClass]} text-m-bold`}
          onClick={handleToggle}
        >
          {status}
        </button>
        <span className={`${styles.startedLabel} text-m-regular`}>
          started on {startedOn}
        </span>
      </div>
      <div className={styles.contentRow}>
        <div className={styles.leftContent}>
          <div className={styles.jobTitle}>{jobTitle}</div>
          <div className={styles.salary}>{salaryRange}</div>
        </div>
        <div className={styles.rightContent}>
          <button className={`${styles.manageButton} button button--sm button--primary`}>
            Manage Job
          </button>
        </div>
      </div>
    </div>
  );
}