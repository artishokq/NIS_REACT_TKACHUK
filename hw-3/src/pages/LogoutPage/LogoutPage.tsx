import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { Loader } from "@/shared/ui";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  return <Loader fullPage />;
}
