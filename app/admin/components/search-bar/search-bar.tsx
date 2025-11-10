import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import styles from "./search-bar.module.scss";

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
      />
      <UilSearch size="24" color="#01959F" />
    </div>
  );
};

export default SearchBar;