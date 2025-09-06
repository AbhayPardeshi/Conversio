import Sidebar from "../components/Sidebar";
import Discover from "../components/Discover";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ showDiscover = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className=" bg-white shadow sticky top-0 z-10">
        <Navbar />
      </header>

      {/* Main section takes the rest of the space */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white border-r overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1  bg-[#f5f7fb] overflow-y-auto ">
          <Outlet />
        </main>

        {/* Conditionally render Discover sidebar */}
        {showDiscover && (
          <aside className="w-1/5 bg-white border-l hidden lg:block overflow-y-auto">
            <Discover />
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout;
