import { Fira_Sans } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/app/components/Navbar";

const firaSans = Fira_Sans({ style: "normal", weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Trendall Archive",
  description: "Explore and view vase records.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firaSans.className}>
      <body className="bg-stone-50">
        <Navbar></Navbar>
        <div className="m-4">
            {children}
        </div>
      </body>
    </html>
  );
}
