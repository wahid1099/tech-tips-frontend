"use client";
import React, { Suspense } from "react";
import { CircularProgress } from "@nextui-org/react";

import ModernAuth from "@/src/components/UI/ModernAuth";

const AuthPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            color="primary"
            showValueLabel={true}
          />
        </div>
      }
    >
      <ModernAuth />
    </Suspense>
  );
};

export default AuthPage;
