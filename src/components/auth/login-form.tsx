'use client'

import React from 'react'

import * as z from 'zod';
import { CardWrapper } from '@/components/ui/card-wrapper';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage


} from '@/components/ui/form'
import { LoginSchema } from '../../../schemas';
import { useState, useTransition } from 'react';
import { login } from '../../../action/login';

export function LoginForm() {
  const [ isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  // Thisn is for a USER that signup with PROVIDER and went to LOGIGN with the seem informations
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already use with a diffrent provider' : '';

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


    startTransition(() => {
      login(values).then((data) => {

        // This is For reset the FORM if the is and ERROR.
        if (data?.error) {
          form.reset();
          setError(data?.error);
        }
  
        // This is For reset the FORM if the is a SUCCESS.
        if (data?.success) {
          form.reset();
          setSuccess(data?.success)
        }
  
  
        // Were not gonna reset the form because USER need dose credentials if the have the 2FA code.
        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
  
      })
      .catch(() => setError('Something went wrong!'));

    })

   


  }

  return (

    <div className=' mt-24'>
      <CardWrapper
        headerLabel="Hi welcome back login to your account"
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
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code send to your email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='123456'
                          disabled={isPending}
                          className={cn('bg-white')}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>

                  )}
                />

              )}
              {!showTwoFactor && (
                <>
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

                        {/* Forget button password */}

                        <Button
                          size='sm'
                          variant='link'
                          asChild
                          className=' px-0 font-normal'
                        >
                          <Link href='/reset'>
                            Forget password?
                          </Link>
                        </Button>

                        <FormMessage />
                      </FormItem>

                    )}
                  />


                </>
              )}

            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full'>
              {showTwoFactor ? 'Confirm' : 'Login'}
            </Button>

          </form>

        </Form>

      </CardWrapper>
    </div>


  )
}

