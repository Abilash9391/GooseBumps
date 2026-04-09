import { Providers } from "@/components/Providers";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "GooseBumps",
  description: "A thrilling adventure game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
               <Providers>{children}</Providers>
      </body>
    </html>
  );
}