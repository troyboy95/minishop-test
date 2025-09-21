'use client'
import CheckoutForm from '@/components/CheckoutForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cartStore'
import { HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const CheckoutPage = () => {

  const { items } = useCartStore()
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const router = useRouter();

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {

    const timerId = setTimeout(() => {
      if (items.length === 0) {
        toast.error("Your cart is empty.", {
          description: "Please add items to your cart before checking out.",
        });
        router.push('/');
      }
    }, 200)

    return () => clearTimeout(timerId);
  }, [items.length, router]);

  return (
    <div className='flex w-full flex-col sm:flex-row p-1'>
      {/* <Button variant="default" onClick={() => router.push("/")}>
        Back <HomeIcon />
      </Button> */}
      {
        !confirmed ?
        <div className='sm:w-1/2 w-full p-1 mt-5'>
          <h1 className='sm:text-2xl text-xl font-semibold mb-4 border-0 border-b border-b-black pb-1'>Cart Summary</h1>
          <div className='space-y-4 overflow-y-auto sm:max-h-1/2 max-h-1/4 my-3 mx-auto sm:mx-0'>
            {
              items.map((item) => (
                <div key={item.id} className='space-y-1'>
                  <p className='sm:text-lg '>{item.name}</p>
                  <p className='text-gray-400'>${item.price} x {item.quantity}</p>
                  <Separator className='my-1'/>
                </div>
              ))
            }
          </div>
          <div className='py-2'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Taxes (10%): ${tax.toFixed(2)}</p>
            </div>
            <p className='font-bold'>Totol Amount: {total.toFixed(2)}</p>
          </div>
        </div>
        : 
        (
          <p>
            Thank you for placing your order!
            <br />
            You&apos;ll receive a confirmation email shortly
          </p>
        )
      }
      <CheckoutForm
      setConfirmed={setConfirmed}
      confirmed={confirmed}  
      />
    </div>
  )
}

export default CheckoutPage