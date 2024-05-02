import Features from "@/components/features/Features";
import Master from "@/components/master/Master";
import Brands from "@/components/product/Brands";
import Categories from "@/components/product/Categories";
import Slider from "@/components/product/Slider";
import BrandsSkeleton from "@/skeleton/BrandsSkeleton";
import CategoriesSkeleton from "@/skeleton/CategoriesSkeleton";
import FeaturesSkeleton from "@/skeleton/FeaturesSkeleton";
import ProductsSkeleton from "@/skeleton/ProductsSkeleton";
import SliderSkeleton from "@/skeleton/SliderSkeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
      <Master>
          <Slider/>
          <Suspense fallback={<FeaturesSkeleton/>}>
            <Features/>
          </Suspense>
          <Suspense fallback={<CategoriesSkeleton/>}>
            <Categories/>
          </Suspense>
          <Suspense fallback={<BrandsSkeleton/>}>
            <Brands/>
          </Suspense>
          
      </Master>
  );
}
