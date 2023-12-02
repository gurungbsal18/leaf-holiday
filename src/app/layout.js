import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom-style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leaf Holiday",
  description:
    "Trek the Himalayas with us! Authentic routes, expert guides, and unforgettable adventures await.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex min-h-screen flex-col mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
