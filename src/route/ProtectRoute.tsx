import useUserStore from "@/zustand/userStore";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute = (props: ProtectRouteProps) => {
  const { children } = props;
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};

export default ProtectRoute;
