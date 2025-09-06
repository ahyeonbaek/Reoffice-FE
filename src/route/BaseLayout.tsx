import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="flex p-[20px] gap-[20px]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
