import React, { Suspense, useEffect, useState } from "react";

// ** Router Import
import Router from "./router/Router";
import { getProfile } from "./utility/api/GetData/GetProfile/GetProfile";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
