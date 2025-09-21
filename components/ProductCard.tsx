"use client";
import { Product } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCartStore();

  return (
    <Link href={`/product/${product.id}`}>
    <Card className="hover:scale-105 transition delay-100 hover:shadow-xl">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <img src={product.image} alt={product.name} className="h-40 object-contain" />
        <p>${product.price}</p>
        <p className="text-sm text-muted-foreground">⭐ {product.rating}</p>
        <div className="flex">
          <AddToCartButton 
          addItem={addItem}
          product={product}
          />
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
