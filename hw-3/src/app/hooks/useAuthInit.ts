import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  setUser,
  setInitialized,
  logout,
  useLazyGetMeQuery,
} from "@/features/auth";

export function useAuthInit() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [triggerGetMe] = useLazyGetMeQuery();

  const initAuth = useCallback(async () => {
    if (!token) {
      dispatch(setInitialized());
      return;
    }

    try {
      const user = await triggerGetMe().unwrap();
      dispatch(setUser(user));
    } catch {
      dispatch(logout());
    }
  }, [token, triggerGetMe, dispatch]);

  useEffect(() => {
    initAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
