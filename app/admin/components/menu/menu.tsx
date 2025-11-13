"use client";
import React, { useState } from "react";
import styles from "./menu.module.scss";
import ModalPage from "../modal-page/modal-page";
import TextField from "@/components/text-field/text-field";
import { UilAngleDown } from "@iconscout/react-unicons";
import Dropdown from "@/components/dropdown/dropdown";
import TextArea from "@/components/text-area/text-area";
import { TextFieldOnly } from "@/components/text-field-only/text-field-only";
import Chip from "@/components/chip/chip";
import { supabase } from "@/lib/supabaseClient";

const profileFields = [
  { label: "Full name", key: "fullName", type: "fixed" },
  { label: "Photo Profile", key: "photoProfile", type: "fixed" },
  { label: "Gender", key: "gender", type: "selectable" },
  { label: "Domicile", key: "domicile", type: "selectable" },
  { label: "Email", key: "email", type: "fixed" },
  { label: "Phone number", key: "phoneNumber", type: "selectable" },
  { label: "Linkedin link", key: "linkedin", type: "selectable" },
  { label: "Date of birth", key: "dob", type: "selectable" },
];

const initialProfileState = {
  gender: "mandatory",
  domicile: "mandatory",
  phoneNumber: "mandatory",
  linkedin: "mandatory",
  dob: "mandatory",
};

interface MenuProps {
  onJobCreated?: () => void;
}

const Menu: React.FC<MenuProps> = ({ onJobCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [candidatesNeeded, setCandidatesNeeded] = useState(0);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [profileState, setProfileState] = useState(initialProfileState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!jobName || !jobType || !jobDescription || candidatesNeeded <= 0 || salaryMin <= 0 || salaryMax <= 0) {
      alert("❌ Please fill all required fields");
      return;
    }

    if (salaryMin >= salaryMax) {
      alert("❌ Maximum salary must be greater than minimum salary");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([
          {
            job_name: jobName,
            job_type: jobType,
            job_description: jobDescription,
            candidates_needed: candidatesNeeded,
            salary_min: salaryMin,
            salary_max: salaryMax,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      console.log("Supabase insert response:", { data, error }); // Tambahkan ini

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Job created successfully:", data);
      alert("✅ Job berhasil dipublish!");
      setIsModalOpen(false);

      // Reset form
      setJobName("");
      setJobType("");
      setJobDescription("");
      setCandidatesNeeded(0);
      setSalaryMin(0);
      setSalaryMax(0);
      setProfileState(initialProfileState);

      // Refresh jobs di parent component
      if (onJobCreated) {
        onJobCreated();
      }
    } catch (err) {
      console.error("Error inserting job:", err);
      alert("❌ Gagal membuat job: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileChipClick = (key: string, value: string) => {
    setProfileState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h3 className={styles.title}>Recruit the best candidates</h3>
          <p className={styles.subtitle}>
            Create jobs, invite, and hire with ease
          </p>
          <button
            className={`${styles.button} button button--primary button--md`}
            onClick={() => setIsModalOpen(true)}
          >
            Create a new job
          </button>
        </div>
      </div>

      <ModalPage
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TextFieldOnly
            label="Job Name"
            value={jobName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setJobName(e.target.value)
            }
            required
          />
          <Dropdown
            label="Job Type"
            required
            options={[
              "Fulltime",
              "Contract",
              "Part-time",
              "Internship",
              "Freelance",
            ]}
            value={jobType}
            onSelect={(selected: string) => {
              setJobType(selected);
            }}
          />
          <TextArea
            label="Job Description"
            placeholder="Describe the job role, responsibilities, and requirements..."
            required
            value={jobDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
          />
          <TextFieldOnly
            label="Number of Candidate Needed"
            placeholder="Ex. 2"
            type="number"
            required
            value={candidatesNeeded || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCandidatesNeeded(Number(e.target.value) || 0)}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            paddingTop: 24,
          }}
        >
          <hr
            style={{
              border: "none",
              borderTop: "1px dashed #9E9E9E",
              marginBottom: 12,
              width: "100%",
            }}
          />
          <span className="text-s-m">Job Salary</span>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <div style={{ flex: 1 }}>
              <TextFieldOnly
                label="Minimum Estimated Salary"
                placeholder="7000000"
                type="number"
                required
                value={salaryMin || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryMin(Number(e.target.value) || 0)}
              />
            </div>
            <div
              style={{
                width: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9E9E9E",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              &ndash;
            </div>
            <div style={{ flex: 1 }}>
              <TextFieldOnly
                label="Maximum Estimated Salary"
                placeholder="10000000"
                type="number"
                required
                value={salaryMax || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryMax(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #EDEDED",
            borderRadius: 8,
            padding: 16,
            width: "100%",
            background: "#fff",
            marginTop: 24,
          }}
        >
          <span className="text-m-bold">
            Minimum Profile Information Required
          </span>
          <div style={{ marginTop: 16 }}>
            {profileFields.map((field, idx) => (
              <div key={field.key}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                  }}
                >
                  <span className="text-m-regular" style={{ flex: 1 }}>
                    {field.label}
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Chip
                      label="Mandatory"
                      state={
                        field.type === "fixed"
                          ? "active"
                          : profileState[field.key as keyof typeof profileState] ===
                            "mandatory"
                          ? "active"
                          : "rest"
                      }
                      onClick={
                        field.type === "selectable"
                          ? () => handleProfileChipClick(field.key, "mandatory")
                          : undefined
                      }
                    />
                    <Chip
                      label="Optional"
                      state={
                        field.type === "fixed"
                          ? "disabled"
                          : profileState[field.key as keyof typeof profileState] ===
                            "optional"
                          ? "active"
                          : "rest"
                      }
                      onClick={
                        field.type === "selectable"
                          ? () => handleProfileChipClick(field.key, "optional")
                          : undefined
                      }
                    />
                    <Chip
                      label="Off"
                      state={
                        field.type === "fixed"
                          ? "disabled"
                          : profileState[field.key as keyof typeof profileState] ===
                            "off"
                          ? "active"
                          : "rest"
                      }
                      onClick={
                        field.type === "selectable"
                          ? () => handleProfileChipClick(field.key, "off")
                          : undefined
                      }
                    />
                  </div>
                </div>
                {idx < profileFields.length - 1 && (
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #EDEDED",
                      margin: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </ModalPage>
    </div>
  );
};

export default Menu;
