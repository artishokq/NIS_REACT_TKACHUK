import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Header />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
