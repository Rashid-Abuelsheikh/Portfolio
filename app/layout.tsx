import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rashid Abu Elsheikh",
  description:
    "Full-stack web developer in Amman. Next.js, React, Node.js, PostgreSQL, with a penetration-testing background.",
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231b3fa0'/%3E%3Ctext x='16' y='22' font-size='16' font-family='monospace' font-weight='700' fill='%23edeff3' text-anchor='middle'%3ER%3C/text%3E%3C/svg%3E",
  },
};

// Set the saved theme before paint to avoid a flash.
const noFlash = `(function(){try{var t=localStorage.getItem('th');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
