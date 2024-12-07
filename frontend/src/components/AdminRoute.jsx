import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = () => {
  const user = useSelector((state) => state.auth);
  const { userInfo } = user;
  return (
    <>
      {userInfo && userInfo.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}; 

export default AdminRoute;
