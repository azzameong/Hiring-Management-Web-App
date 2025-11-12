"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UilAngleDown } from "@iconscout/react-unicons";
import { useState, useRef, useLayoutEffect, useState as useReactState, useEffect } from "react";
import styles from "./dropdown.module.scss";

interface DropdownProps {
  label: string;
  required?: boolean;
  options: string[];
  value?: string; 
  onSelect?: (value: string) => void; 
}

export default function Dropdown({ label, required, options, value, onSelect }: DropdownProps) {
  const [selected, setSelected] = useState(value || "Pilih opsi");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = useReactState<number>();

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setMenuWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current]);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
  };

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
                onSelect={() => handleSelect(option)} 
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
