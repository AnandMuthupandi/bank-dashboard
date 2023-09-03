import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";

export const withErrorWrapper = ({ Component }: any) => {
  const errorComp = withErrorBoundary(Component, {
    FallbackComponent: ErrorComponent,
    onError(error, info) {
      console.log("error");
    },
  });
  return errorComp;
};
