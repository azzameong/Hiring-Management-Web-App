"use client";
import React, { useState } from "react";
import styles from "./menu.module.scss";
import ModalPage from "../../modal-page/modal-page";
import TextField from "@/components/text-field/text-field";
import { UilAngleDown } from "@iconscout/react-unicons"; // Pastikan sudah install: npm i @iconscout/react-unicons
import Dropdown from "@/components/dropdown/dropdown";
import TextArea from "@/components/text-area/text-area";
import { TextFieldOnly } from "@/components/text-field-only/text-field-only";

const Menu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");

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
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <TextFieldOnly
            label="Job Name"
            placeholder="Ex. Frontend Engineer"
            required
          />
          <Dropdown
            label="Job Type"
            required
            options={["Fulltime", "Contract", "Part-time", "Internship", "Freelance"]}
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
      </ModalPage>
    </div>
  );
};

export default Menu;
