"use client";
import React, { useState } from "react";
import styles from "./menu.module.scss";
import ModalPage from "../../modal-page/modal-page";
import TextField from "@/components/text-field/text-field";
import { UilAngleDown } from "@iconscout/react-unicons"; // Pastikan sudah install: npm i @iconscout/react-unicons

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
          <TextField
            label="Job Name"
            placeholder="Ex. Front End Engineer"
            value={jobName}
            onChange={e => setJobName(e.target.value)}
            required
          />
          <TextField
            label="Job Type"
            placeholder="Select Job Type"
            value={jobType}
            onChange={e => setJobType(e.target.value)}
            rightIcon={<UilAngleDown size={20} />}
            required
          />
        </div>
      </ModalPage>
    </div>
  );
};

export default Menu;
