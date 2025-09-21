'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const checkoutSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.email({ message: 'Please enter a valid email address.' }),
    address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
    city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
    postal: z.string().regex(/^\d{5,6}$/, { message: 'Please enter a valid postal code.' }),
    country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm(props: any) {

    const [submittedData, setSubmittedData] = useState<CheckoutFormValues | null>(null);
 
    const {confirmed, setConfirmed} = props

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: '',
            email: '',
            address: '',
            city: '',
            postal: '',
            country: '',
        },
    });


    const onSubmit = (data: CheckoutFormValues) => {
        setSubmittedData(data);
        setConfirmed(true);

        toast.success('Order placed successfully!', {
            description: `Thanks ${data.name}, your order has been confirmed.`,
        });

        form.reset();
    };

    if (confirmed && submittedData) {
        return (
            <Card className="sm:max-w-lg w-full min-w-3xs mx-auto mt-5">
                <CardHeader>
                    <CardTitle className='text-center sm:text-2xl text-xl'>Order Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Address:</strong> {submittedData.address}</p>
                    <p><strong>City:</strong> {submittedData.city}</p>
                    <p><strong>Postal:</strong> {submittedData.postal}</p>
                    <p><strong>Country:</strong> {submittedData.country}</p>
                    <Button className="mt-4 w-full" onClick={() => setConfirmed(false)}>
                        Place Another Order
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="sm:max-w-lg mx-auto mt-5 sm:w-1/2 w-full">
            <CardHeader>
                <CardTitle className="mx-auto text-2xl">Checkout</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Anytown" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="United States" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Place Order
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}