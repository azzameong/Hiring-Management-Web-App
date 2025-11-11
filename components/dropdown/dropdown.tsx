"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UilAngleDown } from "@iconscout/react-unicons";
import { useState, useRef, useLayoutEffect, useState as useReactState } from "react";
import styles from "./dropdown.module.scss";

interface DropdownProps {
  label: string;
  required?: boolean;
  options: string[];
}

export default function Dropdown({ label, required, options }: DropdownProps) {
  const [selected, setSelected] = useState("Pilih opsi");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useReactState<number>();

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setMenuWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current]);

  return (
    <div className={styles.dropdown}>
      <label className={styles.dropdown__label}>
        {label}
        {required && <span>*</span>}
      </label>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={styles.dropdown__trigger}
          ref={triggerRef}
        >
          {selected}
          <UilAngleDown size="16" color="currentColor" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.dropdown__menu}
            sideOffset={8}
            style={menuWidth ? { width: menuWidth, zIndex: 1100 } : { zIndex: 1100 }}
          >
            {options.map((option) => (
              <DropdownMenu.Item
                key={option}
                className={styles.dropdown__item}
                onSelect={() => setSelected(option)}
              >
                {option}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
