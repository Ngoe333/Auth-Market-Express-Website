'use client'

import React from 'react'

import * as z from 'zod';
import { CardWrapper } from '@/components/ui/card-wrapper';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage


} from '@/components/ui/form'
import { RegisterSchema } from '../../../schemas';
import { useState, useTransition } from 'react';
import { register } from '../../../action/register'

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      adresse: "",
      phoneNumber: "",
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data?.error);
        }
  
        // This is For reset the FORM if the is a SUCCESS.
        if (data?.success) {
          form.reset();
          setSuccess(data?.success)
        }
      })
      .catch(() => setError('Something went wrong!'));

    })

   

  }

  return (
    <div className=' mt-24'>

      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account ?"
        backButtonHref="/login"
        showSocial
      >
        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >

            <div className='space-y-4'>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Lovett Essouma'
                        disabled={isPending}
                        type='text'
                        className={cn(' bg-white')}
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
                        placeholder='marketexpress@gmail.com'
                        disabled={isPending}
                        type='email'
                        className={cn(' bg-white')}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>

                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='*****'
                        disabled={isPending}
                        type='password'
                        className={cn(' bg-white')}
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
                        placeholder='Bonamoussadi'
                        disabled={isPending}
                        type='text'
                        className={cn(' bg-white')}
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
                        type='text'
                        className={cn(' bg-white')}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>

                )}
              />

            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full'>
              Create an account
            </Button>

          </form>

        </Form>

      </CardWrapper>

    </div>



  )
}

