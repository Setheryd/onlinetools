"use client";
import React from 'react';
import HttpHeadersTool from './HttpHeadersTool';

const RedirectCheckerTool = () => {
  return (
    <HttpHeadersTool
      title="Redirect Checker"
      description="Follow and analyze each hop in the redirect chain; expand any hop to see headers. Powered by the Tool Guru API (server-side)."
      mode="redirects"
      apiEndpoint="/api/redirect-check"
    />
  );
};

export default RedirectCheckerTool;


