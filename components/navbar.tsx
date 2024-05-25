import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import StoreSwitcher from "@/components/store-switcher";

const Navbar = async () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white shadow-lg">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <StoreSwitcher className="mr-2 lg:mr-4" />
          <Link href="/" className="hidden md:flex md:ml-4 lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
