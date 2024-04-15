import Link from "next/link";

import getStores from "@/actions/get-stores";
import getCategories from "@/actions/get-categories";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import StoreSwitcher from "@/components/store-switcher";

const Navbar = async () => {
  const categories = await getCategories();
  const stores = await getStores();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <StoreSwitcher className="mr-4" items={stores} />
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
