import Master from "@/components/master/Master";
import BrandsSkeleton from "@/skeleton/BrandsSkeleton";
import CategoriesSkeleton from "@/skeleton/CategoriesSkeleton";
import FeaturesSkeleton from "@/skeleton/FeaturesSkeleton";
import ProductsSkeleton from "@/skeleton/ProductsSkeleton";
import SliderSkeleton from "@/skeleton/SliderSkeleton";
import Image from "next/image";

export default function Home() {
  return (
      <Master>
          <SliderSkeleton/>
          <FeaturesSkeleton/>
          <BrandsSkeleton/>
          <ProductsSkeleton/>
          <CategoriesSkeleton/>
      </Master>
  );
}
