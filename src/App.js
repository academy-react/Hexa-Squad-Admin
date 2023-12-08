import React, { Suspense, useEffect, useState } from "react";

// ** Router Import
import Router from "./router/Router";
import { getProfile } from "./utility/api/GetData/GetProfile";
import { MantineProvider } from "@mantine/core";
import { Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const getUserDetails = async () => {
    const user = await getProfile();
    user == false && navigate("/login");
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
