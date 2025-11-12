import React from "react";
import Header from "./components/header/header";
import SearchBar from "./components/search-bar/search-bar";
import Menu from "./components/menu/menu";
import JobCard from "./components/job-card/job-card";
import styles from "./page.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.mainContent}>
        {/* Kolom kiri */}
        <div className={styles.leftColumn}>
          <div className={styles.topBar}>
            <SearchBar />
          </div>

          <div className={styles.scrollArea}>
            {[...Array(20)].map((_, i) => (
              <div key={i}>
                <JobCard />
              </div>
            ))}
          </div>
        </div>

        {/* Kolom kanan */}
        <div className={styles.rightColumn}>
          <Menu />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
