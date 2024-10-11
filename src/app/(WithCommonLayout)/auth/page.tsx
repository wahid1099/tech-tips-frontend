"use client";
import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@nextui-org/react";

import AuthTabs from "./authcomponent";

const AuthPage = () => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <Suspense
      fallback={
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          showValueLabel={true}
        />
      }
    >
      <AuthTabs />
    </Suspense>
  );
};

export default AuthPage;
