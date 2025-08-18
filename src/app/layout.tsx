import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext";


export const metadata: Metadata = {
  title: "Simply Crud",
  description: "Modern CRUD",
  icons: {
    icon: "/logoQ.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <UserProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </UserProvider>
      </body>
    </html>
  );
}
