"use client";

import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

import { Billboard } from "@/type";
import { index } from "@/actions/get-billboard";
import { useStoreContext } from "@/providers/store-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  categoryId?: string | null;
}

const BillboardDashboard = ({ categoryId }: Props) => {
  const { currentStore } = useStoreContext();
  const [billboards, setBillboards] = useState<Billboard[]>([]);

  const plugin = useRef(
    Autoplay({
      delay: 2500,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnLastSnap: false,
      stopOnMouseEnter: false,
    })
  );

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await index(currentStore.id);
      setBillboards(res);
    };
    fetch();
  }, [currentStore, categoryId]);

  if (!billboards || !billboards.length) return <div className="mb-10" />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 select-none">
      <Carousel
        className="w-full rounded-lg overflow-hidden"
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {billboards.map((billboard) => (
            <CarouselItem
              key={billboard.id}
              className="!rounded-xl !overflow-hidden"
            >
              <div
                className="rounded-xl relative aspect-square md:aspect-[5/1] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${billboard.imageUrl})` }}
              >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                  <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                    {billboard.label}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BillboardDashboard;
