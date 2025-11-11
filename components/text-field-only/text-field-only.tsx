import * as React from "react";
import * as Label from "@radix-ui/react-label";
import styles from "./text-field-only.module.scss";

interface TextFieldOnlyProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const TextFieldOnly: React.FC<TextFieldOnlyProps> = ({
  label,
  required,
  id,
  ...props
}) => {
  return (
    <div className={styles["text-field-only"]}>
      <div className={styles["text-field-only__label-row"]}>
        <Label.Root
          className={styles["text-field-only__label"]}
          htmlFor={id}
        >
          {label}
          {required && <span className={styles["text-field-only__asterisk"]}>*</span>}
        </Label.Root>
      </div>
      <input
        className={styles["text-field-only__input"]}
        id={id}
        required={required}
        {...props}
      />
    </div>
  );
};