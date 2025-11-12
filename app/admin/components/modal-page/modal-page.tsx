import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal-page.module.scss";

interface ModalPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  onSubmit ?: () => void; // ✅ tambah ini
}

const ModalPage: React.FC<ModalPageProps> = ({
  open,
  onOpenChange,
  children,
  onSubmit, // ✅ tambahkan ini
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <div className={styles.overlay} />
      <Dialog.Content className={styles.modal}>
        <div className={styles.modalHeader}>
          <Dialog.Title asChild>
            <span className={styles.title}>Job Opening</span>
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className={styles.closeBtn} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </Dialog.Close>
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}>
          <button
            className="button button--md button--primary"
            style={{ marginLeft: "auto" }}
            onClick={onSubmit} // ✅ panggil fungsi submit dari luar
          >
            Publish Job
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default ModalPage;
