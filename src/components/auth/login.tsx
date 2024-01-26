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
import { useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage


} from '@/components/ui/form'
import { LoginSchema } from '../../../schemas';
import { useState } from 'react';
import { login } from '../../../action/login'

export function LoginForm() {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
   ? 'Email already use with a diffrent provider': '';


  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    login(values).then((data) => {
      setError(data?.error);
      // TODO: add when we add 2FA 
      setSuccess(data?.success)

    })

  }

  return (

    <div className=' mt-24'>
      <CardWrapper
        headerLabel="Hi welcome back"
        backButtonLabel="Don't have an account ?"
        backButtonHref="/register"
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
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full'>
              Login
            </Button>

          </form>

        </Form>

      </CardWrapper>
    </div>


  )
}

