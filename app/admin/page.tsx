import React from "react";
import Header from "./components/header/header";
import SearchBar from "./components/search-bar/search-bar";
import Menu from "./components/menu/menu";
import ModalPage from "./modal-page/modal-page";

const AdminPage = () => {
  return (
    <div>
      <Header />
      <main>
        <SearchBar />
        <Menu />
      </main>
    </div>
  );
};

export default AdminPage;