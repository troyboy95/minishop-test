"use client";

import { useCartStore } from "@/store/cartStore";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RotateCcw, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export function CartSheet() {
  const { items, increment, decrement, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Cart <ShoppingCartIcon className={`${items.length > 0 ? 'text-green-500' : 'text-red-500'}`} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          {items.length > 0 && (
            <Button onClick={() => clearCart()} className="mt-2">
              Clear cart <RotateCcw />
            </Button>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          {items.length === 0 ? (
            <p className="text-sm text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center py-1 px-2">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex lg:gap-3 md:gap-2 md:flex-row flex-col md:items-center">
                      <div className="gap-1 flex">
                        <Button size="sm" onClick={() => decrement(item.id)}>-</Button>
                        <Button size="sm" onClick={() => increment(item.id)}>+</Button>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full md:w-fit"
                        onClick={() => {
                          removeItem(item.id)
                        }}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t pt-4 mt-4 bg-background sticky bottom-0">
          {items.length > 0 && (
            <div className="w-full space-y-2">
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (10%): ${tax.toFixed(2)}</p>
              </div>
              <p className="font-bold">Total: ${total.toFixed(2)}</p>
              <SheetClose asChild>
                <Button asChild className="w-full mt-4"> 
                  <a href="/checkout">Checkout</a>
                </Button>
              </SheetClose>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>


  );
}
