import Container from "@/components/ui/container";
import TabActions from "./components/tab-actions";

interface Props {
  children: React.ReactNode;
}

const CartLayout = ({ children }: Props) => {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <TabActions />
          {children}
        </div>
      </Container>
    </div>
  );
};

export default CartLayout;
