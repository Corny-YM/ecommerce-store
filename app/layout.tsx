import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { StoreContextProvider } from "@/providers/store-provider";

import "./globals.css";
import getStores from "@/actions/get-stores";
import { UserContextProvider } from "@/providers/user-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stores = await getStores();

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          <ToastProvider />
          <UserContextProvider />
          <StoreContextProvider stores={stores}>
            <Navbar />
            {children}
            <Footer />
          </StoreContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
