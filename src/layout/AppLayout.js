/* eslint-disable */
import React, { useEffect } from "react";
import { userActions } from "../action/userActions";
import { useDispatch } from "react-redux";


const AppLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginWithToken())
  }, [])

  return <>{children}</>;
};

export default AppLayout;
