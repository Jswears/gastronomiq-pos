import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "button-shadow": "0 2px 4px rgba(0,0,0,0.25)",
        "section-shadow": "inset 0 4px 8px rgba(0,0,0,0.25)",
      },
      colors: {
        "primary-action-blue": "#007aff",
        "primary-secondary-blue": "#3c8edb",
        "feedback-error-red": "#e04a4a",
        "feedback-warning-amber": "#4a3a23",
        "background-base": "#181818",
        "background-main-dark": "#2a2a2a",
        "background-panel-gray": "#263238",
        "background-sidebar-gray": "#252525",
        "text-light-gray": "#d9d9d9",
        "text-secondary-light-gray": "#e0e0e0",
        "text-divider-gray": "#3a3a3a",
        "text-muted-dark-gray": "#4a4a4a",
        "text-white": "#ffffff",
        "state-disabled-gray": "#333333",
        "state-hover-blue": "#5aa6e5",
        "state-selected-blue": "#007aff",
        "muted-green": "#3b6644",
        "muted-red": "#944c4c",
        "muted-blue": "#3c8edb",
        "light-grey": "#e0e0e0",
        "light-background": "#f5f5f5",
        "medium-grey": "#757575",
        "softer-grey": "#D3D3D3",
      },
      fontSize: {
        "heading-h1": [
          "32px",
          { lineHeight: "1.25", letterSpacing: "0.32px", fontWeight: "700" },
        ],
        "heading-h2": [
          "24px",
          { lineHeight: "1.25", letterSpacing: "0.12px", fontWeight: "600" },
        ],
        "body-large": [
          "18px",
          { lineHeight: "1.5", letterSpacing: "0.1px", fontWeight: "400" },
        ],
        "heading-h3": [
          "18px",
          { lineHeight: "1.5", letterSpacing: "0.05px", fontWeight: "400" },
        ],
        "button-primary": [
          "16px",
          { lineHeight: "1.5", letterSpacing: "0.16px", fontWeight: "600" },
        ],
        "heading-h4": [
          "16px",
          { lineHeight: "1.5", letterSpacing: "0.16px", fontWeight: "600" },
        ],
        "body-medium": [
          "16px",
          { lineHeight: "1.5", letterSpacing: "0.05px", fontWeight: "400" },
        ],
        "body-text-large": [
          "16px",
          { lineHeight: "1.5", letterSpacing: "0.16px", fontWeight: "400" },
        ],
        "body-small": [
          "14px",
          { lineHeight: "1.5", letterSpacing: "0.04px", fontWeight: "400" },
        ],
        "caption-small": [
          "12px",
          { lineHeight: "1.5", letterSpacing: "0.06px", fontWeight: "400" },
        ],
        "heading-small": [
          "14px",
          { lineHeight: "1.5", letterSpacing: "0.173px", fontWeight: "400" },
        ],
      },
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        nunitoSans: ["var(--font-nunito-sans)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
