import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";

const firaSans = Fira_Sans({ style: "normal", weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Trendall Archive",
  description: "Explore and view vase records.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firaSans.className + " h-full"}>
      <body className="flex h-full flex-col bg-stone-50">
        <Navbar></Navbar>
        <div className="m-4 grow">
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
