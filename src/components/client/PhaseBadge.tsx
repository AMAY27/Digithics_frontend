import { Chip, ChipProps } from "@mui/material";
import React from "react";

interface PhaseBadgeProps extends ChipProps {
  isCompleted: boolean;
  isDarkPatternFree: boolean;
}

const PhaseBadge = ({
  isCompleted,
  isDarkPatternFree,
  ...rest
}: PhaseBadgeProps) => {
  if (isCompleted && isDarkPatternFree) {
    return <Chip label="Website Certified" color="success" {...rest} />;
  } else if (isCompleted && !isDarkPatternFree) {
    return <Chip label="Website Rejected" color="error" {...rest} />;
  } else {
    return (
      <Chip
        label="Certification in Progress"
        color="secondary"
        style={{ color: "#fff" }}
        {...rest}
      />
    );
  }
};

export default PhaseBadge;
