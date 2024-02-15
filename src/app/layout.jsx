import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/variable.scss";
import "./scss/custom-style.scss";
import GlobalState from "@/context";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "primereact/resources/themes/lara-light-cyan/theme.css";

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
          <div>
            {children}
            <SpeedInsights />
          </div>
        </GlobalState>
      </body>
    </html>
  );
}
