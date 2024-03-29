'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { ExitIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '../../../../action/settings';
import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SettingsSchema } from '../../../../schemas';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '../../../../hooks/use-current-user';
import { Switch } from '@radix-ui/react-switch';
import { toast } from 'sonner';
import { UserRole } from '@prisma/client';
import { usePathname } from 'next/navigation';

// import { Toaster } from '@/components/ui/sonner';
import {
    Form,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    FormMessage,
    FormField,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { EditableImage } from '@/lib/editableImage';



function SettingsPage() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();
    const user = useCurrentUser();
    const path = usePathname();
    const [image, setImage] = useState('');

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            adresse: user?.adresse || undefined,
            phone: user?.phone || undefined,

        }
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                        toast.error(data.error)

                    }

                    if (data.success) {
                        update();
                        setSuccess(data.success)
                        toast.success(data.success)
                    }

                }).catch(() => setError('Something went wrong!'));


        });

    }

    const onClick = () => {
        signOut();
    }

    return (

        <>

            <div className=' flex flex-wrap space-y-2 gap-2 mx-auto justify-center mt-24 items-center'>

                <div className='flex flex-col items-center justify-center width[20px] height[20px] rounded-full space-y-2'>

                    {user?.role === UserRole.ADMIN ? '' : <div><EditableImage link={image} setLink={setImage} /> </div>}
                    
                </div>

                {user?.role === UserRole.ADMIN && (
                    <>
                        <Link href={'/settings'} className={path === '/settings' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Settings</Link>
                        <Link href={'/categories'} className={path === '/categories' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Categories</Link>
                        <Link href={'/menu-items'} className={path === '/menu-items' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Meun Items</Link>
                        <Link href={'/users'} className={path === '/users' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Users</Link>
                        <Link href={'/orders'} className={path === '/orders' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Orders</Link>
                        <Link href={'/new'} className={path === '/new' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>New menu</Link>
                    </>
                )}
            </div>

            {/* <div className='flex justify-center items-center h-full flex-col'>
                <Image className=' rounded-full mt-8 border-solid border-2 border-green-300' src={user?.image || ''} width={110} height={110} alt={'Avarta'} />
                <button className='mt-2 px-8 py-2 rounded-full bg-gray-200' type='button'>Edit</button>

            </div> */}

            <Card className=' max-w[400px] mt-8 py-4'>

                <CardContent>
                    <Form {...form}>
                        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>

                            <div className=' space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input

                                                    {...field}
                                                    placeholder='Market Express'
                                                    disabled={isPending}
                                                    className={cn('bg-white')}
                                                />
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
                                                <Input

                                                    {...field}
                                                    placeholder='Marketexpress@gmail.com'
                                                    disabled={true}
                                                    className={cn('bg-gray-300 text-gray-500 cursor-not-allowed')}
                                                    type='email'
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="adresse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse</FormLabel>
                                            <FormControl>
                                                <Input

                                                    {...field}
                                                    placeholder='Akwa'
                                                    disabled={isPending}
                                                    className={cn('bg-white')}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input

                                                    {...field}
                                                    placeholder='237-657-899-435'
                                                    disabled={isPending}
                                                    className={cn('bg-white')}

                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/* <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm '>
                                            <div className='space-y-0.5'>
                                                <FormLabel>
                                                    Two Factor Authentication
                                                </FormLabel>

                                                <FormDescription className='bg-white'>
                                                    Enable two factor uathentication for your account
                                                </FormDescription>

                                            </div>

                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                /> */}
                            </div>

                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button disabled={isPending} type='submit'>
                                Save
                            </Button>

                        </form>

                    </Form>

                </CardContent>
                <button onClick={onClick} type='submit' className='  bg-slate-300 mb-2 px-4 py-2 shadow-md mx-auto mt-4 text-black cursor-pointer text-sm rounded flex items-center justify-center w-[120px] right-4 -bottom-8 '>
                    <ExitIcon className=' h-4 w-4 mr-2' />
                    Sign-out
                </button>



            </Card>
        </>

    )



}

export default SettingsPage;

