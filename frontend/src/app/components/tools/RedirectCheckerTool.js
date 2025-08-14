"use client";
import React from 'react';
import HttpHeadersTool from './HttpHeadersTool';

const RedirectCheckerTool = () => {
  return (
    <HttpHeadersTool
      title="Redirect Checker"
      description="Follow and analyze each hop in the redirect chain; expand any hop to see headers."
      mode="redirects"
    />
  );
};

export default RedirectCheckerTool;


