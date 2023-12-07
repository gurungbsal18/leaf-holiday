import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import NavBar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom-style.scss";
import Footer from "@/components/Footer";
import Cart from "@/components/PackageCard";

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
          <NavBar />
          <main className="main-container">{children}</main>
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
}
