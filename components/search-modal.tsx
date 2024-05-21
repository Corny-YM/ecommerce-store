"use client";

import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Terminal } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import getProducts from "@/actions/get-products";
import { Product } from "@/type";
import { useStoreContext } from "@/providers/store-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import NoImg from "@/public/no-img.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  productName: z.string().min(1),
});

const SearchModal = ({ open, onClose }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { productName: "" },
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const { currentStore } = useStoreContext();
  const [errMessage, setErrMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["search", "products"],
    mutationFn: ({ storeId, name }: { storeId: string; name: string }) =>
      getProducts(storeId, { name }),
    onSuccess(res) {
      if (res?.length) form.reset();
      setProducts(res || []);
    },
    onError() {
      toast.error("Something went wrong");
    },
  });

  const onSubmitValid = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const storeId = currentStore?.id;
      if (!storeId) return;
      mutate({ storeId, name: values.productName });
    },
    [currentStore, mutate]
  );

  const onSubmitInvalid = useCallback((values: any) => {
    const mes = values?.productName?.message;
    if (!mes) return;
    setErrMessage(mes);
  }, []);

  const handleModalClose = useCallback(() => {
    onClose();
    setProducts([]);
  }, [onClose]);

  const handleClickProduct = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLDivElement;
      const id = target.dataset.id;
      if (!id) return;
      router.push(`/product/${id}`);
      onClose();
    },
    [router, onClose]
  );

  return (
    <Modal open={open} onClose={handleModalClose}>
      <div className="flex flex-col w-full">
        <div className="text-2xl font-semibold">Search Products</div>
        <Form {...form}>
          <form
            className="w-full mt-4"
            onSubmit={form.handleSubmit(onSubmitValid, onSubmitInvalid)}
          >
            <div className="w-full flex items-center gap-x-2">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Searching..."
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
        {/* {errMessage && <div className="text-rose-400 mt-2">{errMessage}</div>} */}

        {/* List products */}
        <div className="w-full flex flex-col gap-1 mt-2">
          {!products.length && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle className="font-bold">Oops! 🔍🔍🔍</AlertTitle>
              <AlertDescription className="font-semibold">
                No data found with keywords "{form.getValues("productName")}"
              </AlertDescription>
            </Alert>
          )}
          {products.map((product) => {
            const img = product.images[0].url ?? NoImg;
            return (
              <Link
                key={product.id}
                className="flex w-full items-center p-2 hover:bg-slate-400 rounded-lg overflow-hidden transition"
                href={`/product/${product.id}`}
                data-id={product.id}
                onClick={handleClickProduct}
              >
                <div className="w-10 h-10 relative flex justify-center items-center rounded-lg overflow-hidden mr-2">
                  <Image
                    className="absolute w-full h-full"
                    fill
                    src={img}
                    alt={product.name}
                  />
                </div>
                <div className="max-w-full line-clamp-1 font-medium">
                  {product.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
