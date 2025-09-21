import { CartItem, Product } from '@/lib/types'
import React from 'react'
import { Button } from './ui/button'
import { ShoppingCartIcon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface AddToCartButtonProps {
    addItem: (item: CartItem) => void
    product: Product;
}

const AddToCartButton = (props: AddToCartButtonProps) => {

    const {items} = useCartStore()

    return (
        <Button className="z-10 hover:cursor-pointer hover:text-black hover:bg-white transition delay-75 hover:ring-1 hover:ring-black" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation()
            props.addItem(props.product as CartItem)
        }}>
            Add to <ShoppingCartIcon className={`${(items.find((item) => item.id === props.product.id)) && 'text-green-500'}`} />
        </Button>
    )
}

export default AddToCartButton