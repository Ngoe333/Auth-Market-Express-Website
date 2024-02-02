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
import toast from 'react-hot-toast';
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



function SettingsPage() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            adresse: undefined,
            phoneNumber: undefined,

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
        <Card className=' max-w[400px]  mt-32'>
            <CardHeader>
                <h2 className='text-2xl text-green-500 font-semibold text-center'>Settings</h2>
            </CardHeader>

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
                                                disabled={isPending}
                                                className={cn('bg-white')}
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
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input

                                                {...field}
                                                placeholder='237-657-899-435'
                                                disabled={isPending}
                                                className={cn('bg-white')}
                                                type='text'
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
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
                            />
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type='submit'>
                            Save
                        </Button>

                    </form>

                </Form>

            </CardContent>

            <button onClick={onClick} type='submit' className=' bg-slate-300 mb-2 px-4 py-2 shadow-md mx-auto mt-4 text-black cursor-pointer text-sm rounded flex items-center justify-center h-full w-[120px]'>
                <ExitIcon className=' h-4 w-4 mr-2' />
                Sign-out
            </button>


        </Card>

    )



}

export default SettingsPage;

