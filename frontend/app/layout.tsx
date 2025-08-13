import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unimart - Your Fashion Destination",
  description:
    "Discover the latest fashion trends at Unimart. Shop clothing, accessories and more with cash on delivery.",
  keywords: "fashion, clothing, shopping, unimart, online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
