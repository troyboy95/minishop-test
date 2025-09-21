'use client'
import { useParams, useRouter } from 'next/navigation'
import products from "@/data/products.json"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HomeIcon, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import AddToCartButton from '@/components/AddToCartButton'

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCartStore()
  const router = useRouter()

  const product = products.find((item) => item.id === Number(params.id))

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-muted-foreground">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:space-y-5 space-y-2">
      <Button variant="default" onClick={() => router.push("/")}>
        Back <HomeIcon />
      </Button>
      <Card className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-contain rounded-md"
          />
        </div>

        <div className="flex-1 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <p className="text-xl font-semibold">Net Price: ${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Ratings: ⭐ {product.rating}</p>
            <Separator />
            <p className='text-gray-500'> Description:</p>
            <ul className='list-disc pl-2 ms-3'>
              {product.description.split(",").map((item, i) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <AddToCartButton
            addItem={addItem}
            product={product}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
