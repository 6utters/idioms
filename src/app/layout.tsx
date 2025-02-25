import type { Metadata } from "next";
import { Roboto_Slab, Roboto } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const roboto = Roboto({
  weight: ["400", "100", "300", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Easy Idioms",
  description: "Easy Idioms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
