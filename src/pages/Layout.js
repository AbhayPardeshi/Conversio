import Sidebar from "../components/Sidebar";
import Discover from "../components/Discover";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className=" bg-white shadow sticky top-0 z-10">
        <Navbar />
      </header>

      {/* Main section takes the rest of the space */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white border-r overflow-hidden">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 bg-[#f5f7fb] overflow-y-auto scrollbar-hide min-h-0 h-full">
          <Outlet />
        </main>

        {/* Discover sidebar */}
        <aside className="w-1/5 bg-white border-l hidden lg:block overflow-hidden">
          <Discover />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
