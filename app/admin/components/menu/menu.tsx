"use client";
import React, { useState } from "react";
import styles from "./menu.module.scss";
import ModalPage from "../../modal-page/modal-page";
import TextField from "@/components/text-field/text-field";
import { UilAngleDown } from "@iconscout/react-unicons"; // Pastikan sudah install: npm i @iconscout/react-unicons
import Dropdown from "@/components/dropdown/dropdown";
import TextArea from "@/components/text-area/text-area";
import { TextFieldOnly } from "@/components/text-field-only/text-field-only";
import Chip from "@/components/chip/chip";

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

const Menu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [profileState, setProfileState] = useState(initialProfileState);

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

      <ModalPage open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TextFieldOnly
            label="Job Name"
            placeholder="Ex. Frontend Engineer"
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
          />
          <TextArea
            label="Job Description"
            placeholder="Describe the job role, responsibilities, and requirements..."
            required
          />
          <TextFieldOnly
            label="Number of Candidate Needed"
            placeholder="Ex. 2"
            required
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
              borderTop: "1px dashed #9E9E9E", // neutral-60
              marginBottom: 12,
              width: "100%",
            }}
          />
          <span className="text-s-m">Job Salary </span>
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
                placeholder="Rp 7.000.000"
                required
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
                placeholder="Rp 8.000.000"
                required
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
                    {/* Mandatory */}
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
                    {/* Optional */}
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
                    {/* Off */}
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
