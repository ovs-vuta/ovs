import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserDetailsQuery } from "../services/authService";
import {
  setUserInfo,
  clearToken,
  clearUserInfo,
} from "../store/slice/authSlice";

const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const { data: userDetails, error, isLoading } = useFetchUserDetailsQuery();
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    if (userDetails) {
      dispatch(setUserInfo(userDetails));
    } else if (error) {
      dispatch(clearUserInfo());
      dispatch(clearToken());
    }
  }, [userDetails, error, dispatch]);

  return { userDetails, error, isLoading, token };
};

export default useFetchUserInfo;
