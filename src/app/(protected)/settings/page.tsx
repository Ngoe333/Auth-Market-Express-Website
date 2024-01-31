'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseCurrentUser } from '../../../../hooks/use-current-user';
import { signOut } from 'next-auth/react';
import { ExitIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '../../../../action/settings';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { SettingsSchema } from '../../../../schemas';
import { useState } from 'react';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
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
  const user = UseCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update();
            setSuccess(data.success)
          }

        }).catch(() => setError('Something went wrong!'));


    });

  }

  const onClick = () => {
    signOut();
  }

  return (
    <Card className=' max-w[400px] text-center mt-32'>
      <CardHeader>
        <h2 className='text-2xl text-green-500 font-semibold'>Settings</h2>
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

                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type='submit'>
              Save
            </Button>

          </form>

        </Form>

      </CardContent>

      <button onClick={onClick} type='submit' className=' bg-slate-300 px-4 py-2 shadow-md mx-auto mt-4 text-black cursor-pointer text-sm rounded flex items-center justify-center h-full w-[150px]'>
        <ExitIcon className=' h-4 w-4 mr-2' />
        Sign-out
      </button>


    </Card>

  )



}

export default SettingsPage;