import type React from "react";
import { Alert as MuiAlert } from "@mui/material";

interface IAlertProps {
    message: string;
    severity?: "error" | "warning" | "info" | "success";
}

export const Alert: React.FC<IAlertProps> = ({ message, severity = "error" }) => {
  return (
    <MuiAlert severity={severity}>
      {message}
    </MuiAlert>
  );
};
