import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  title: "WeatherNext Admin",
  description: "Telegram Weather Bot Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={`font-sans bg-gray-50 antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
