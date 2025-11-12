import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { UilSearch } from "@iconscout/react-unicons";
import styles from "./search-bar.module.scss";

const SearchBar: React.FC = () => {
  return (
    <form role="search" className={styles.searchbar}>
      <Slot>
        <input
          type="search"
          placeholder="Search..."
          className={styles.input}
          aria-label="Search"
        />
      </Slot>
      <button
        type="submit"
        className={styles.iconButton}
        aria-label="Submit search"
      >
        <UilSearch size="24" color="#01959F" />
      </button>
    </form>
  );
};

export default SearchBar;