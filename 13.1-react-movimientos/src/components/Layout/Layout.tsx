import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#e5eaee" }}>{children}</div>
);
