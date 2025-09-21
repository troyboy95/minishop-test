"use client";

import { useState, useEffect, useMemo } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import SkeletonProductCard from "@/components/SkeletonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"default" | "low" | "high">("default");

  useEffect(() => {
    const timerID = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timerID);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchItem.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchItem, category, sort]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          disabled={isLoading}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search for electronics, essentials..."
          className=" sm:w-1/3"
        />
        
        <Select
          disabled={isLoading}
          value={category}
          onValueChange={(val) => setCategory(val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Art">Art</SelectItem>
          </SelectContent>
        </Select>

        <Select
          disabled={isLoading}
          value={sort}
          onValueChange={(val: "default" | "low" | "high") => setSort(val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="low">Price: Low → High</SelectItem>
            <SelectItem value="high">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProductCard key={`skeleton-${i}`} />
            ))
          : visibleProducts.length > 0 ? visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          :
          <p className="sm:text-2xl text-xl text-black/50 text-center m-auto">No relevant items found!</p>
          }
      </div>

      {!isLoading && visibleCount < filteredProducts.length && (
        <div className="flex justify-center">
          <Button
            onClick={() => setVisibleCount((p) => p + 6)}
            className="px-4 py-2"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
