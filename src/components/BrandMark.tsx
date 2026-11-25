import React from "react";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      width="32"
      height="32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Crisp architectural house frame adapted in monochrome from NextProp4U mark */}
      <path
        d="M5 15L18 4L25 9.8V6.5H28.5V12.7L31 15V31H19.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M5 15V31H15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      {/* Diagonal structural bars inside silhouette */}
      <line x1="9" y1="20" x2="24" y2="12" stroke="currentColor" strokeWidth="2.2" />
      <line x1="9" y1="25" x2="27" y2="15.5" stroke="currentColor" strokeWidth="2.2" />
      <line x1="12" y1="29.5" x2="27" y2="21.5" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}
