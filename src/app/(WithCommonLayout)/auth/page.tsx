import React, { Suspense, lazy } from "react";

import AuthTabs from "./authcomponent";

const AuthPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <AuthTabs />
    </Suspense>
  );
};

export default AuthPage;
