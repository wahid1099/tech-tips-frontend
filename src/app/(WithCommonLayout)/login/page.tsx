"use client";

import { Suspense } from "react";

import LoginComponent from "./login";

const LoginPage = () => {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <LoginComponent />
    </Suspense>
  );
};

export default LoginPage;
