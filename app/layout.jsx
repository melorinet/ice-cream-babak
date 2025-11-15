import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Berkeh",
  description: "Berkeh ice-cream",
};

export default function RootLayout({
  children,
}) {
  return (
    <html dir="rtl" lang="fa">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
