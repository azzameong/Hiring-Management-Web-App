import React from "react";
import Header from "./components/Header";

const AdminPage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Admin Dashboard</h1>
        <p>Selamat datang di halaman admin.</p>
        {/* Tambahkan konten admin lainnya di sini */}
      </main>
    </div>
  );
};

export default AdminPage;