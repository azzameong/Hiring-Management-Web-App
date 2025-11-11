import React from "react";
import Header from "./components/header/header";
import SearchBar from "./components/search-bar/search-bar";
import Menu from "./components/menu/menu";
import ModalPage from "./modal-page/modal-page";
import TextArea from "@/components/text-area/text-area";

import Dropdown from "@/components/dropdown/dropdown";

const AdminPage = () => {
  return (
    <div>
      <Header />
      <main>
        <SearchBar />
        <Menu />
        <Dropdown
        label="Pilih Kategori"
        required
        options={["Frontend", "Backend", "Fullstack"]}
      />
      </main>
    </div>
  );
};

export default AdminPage;