import React from "react";
import styles from "./text-field.module.scss";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  maxLength?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  mode?: "rest" | "filled" | "focus" | "active" | "error" | "disabled" | "success";
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder = "Placeholder",
  value = "",
  onChange,
  helperText,
  maxLength = 100,
  leftIcon,
  rightIcon,
  required = false,
  mode = "rest",
}) => {
  const inputClass = [
    styles.input,
    styles[`input--${mode}`],
    mode === "disabled" ? styles["input--disabled"] : ""
  ].join(" ");

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <input
          className={inputClass}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={mode === "disabled"}
        />
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </div>

      <div className={styles.helperRow}>
        <span className={styles.helperText}>{helperText}</span>
        <span className={styles.counter}>
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
};

export default TextField;
