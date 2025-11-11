import styles from './text-area.module.scss';

type TextAreaProps = {
  label: string;
  required?: boolean;
  helperText?: string;
  counterText?: string;
  children?: React.ReactNode; // untuk konten opsional di bawah
  [x: string]: any;
};

export default function TextArea({
  label,
  required,
  helperText,
  counterText,
  children,
  ...props
}: TextAreaProps) {
  return (
    <div className={styles.textAreaWrapper}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {required && <span className={styles.required}>*</span>}
      </div>
      <textarea className={styles.textAreaInput} {...props} />
      <div className={styles.bottomRow}>
        <span className={styles.helperText}>{helperText}</span>
        <span className={styles.counterText}>{counterText}</span>
      </div>
      {children && <div className={styles.extraContent}>{children}</div>}
    </div>
  );
}