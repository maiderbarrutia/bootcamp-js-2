import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="container">{children}</div>
);
