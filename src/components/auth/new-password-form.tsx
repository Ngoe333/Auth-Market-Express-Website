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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage


} from '@/components/ui/form'
import { NewPasswordSchema } from '../../../schemas';
import { useState, useTransition } from 'react';
import { newPassword } from '../../../action/new-password';
import { useSearchParams } from 'next/navigation';

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');


  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [ isPending, starttransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    newPassword(values, token).then((data) => {
      setError(data?.error);
      setSuccess(data?.success)

    })

  }

  return (

    <div className=' mt-24'>
      <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login ?"
        backButtonHref="/login"
      >
        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='******'
                        type='password'
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
              Reset password
            </Button>

          </form>

        </Form>

      </CardWrapper>
    </div>


  )
}

