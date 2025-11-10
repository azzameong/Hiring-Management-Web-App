import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.menuLeft}>
        <span>Job List</span>
      </div>
      <div className={styles.profile}>
        <img
          src="/images/avatar.png" // ganti sesuai lokasi gambar kamu
          width={28}
          height={28}
          alt="Profile"
        />
      </div>
    </header>
  );
}
