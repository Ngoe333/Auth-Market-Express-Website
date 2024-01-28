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
import { useState } from 'react';
import { register } from '../../../action/register'

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    register(values).then((data) => {
      setError(data.error);
      setSuccess(data.success)
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
                        type='text'
                        className={cn(' bg-slate-100')}
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
                        type='email'
                        className={cn(' bg-slate-100')}
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
                        type='password'
                        className={cn(' bg-slate-100')}
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

