import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import NavBar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/custom-style.scss";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leaf Holiday",
  description:
    "Trek the Himalayas with us! Authentic routes, expert guides, and unforgettable adventures await.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <div className="main-div">
            <NavBar />
            <main className="main-container">{children}</main>
            <Footer />
          </div>
        </GlobalState>
      </body>
    </html>
  );
}
