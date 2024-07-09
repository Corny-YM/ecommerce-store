import "./globals.css";
import type { Metadata } from "next";
import { dark } from "@clerk/themes";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { StoreContextProvider } from "@/providers/store-provider";
import { UserContextProvider } from "@/providers/user-provider";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import getStores from "@/actions/get-stores";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
          <UserContextProvider>
            <StoreContextProvider stores={stores}>
              <ModalProvider />
              <ToastProvider />
              <Navbar />
              {children}
              <Footer />
            </StoreContextProvider>
          </UserContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
