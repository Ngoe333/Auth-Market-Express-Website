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
import { ResetSchema } from '../../../schemas';
import { useState, useTransition } from 'react';
import { reset } from '../../../action/reset';


export function ResetForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    reset(values).then((data) => {
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

  }

  return (

    <div className=' mt-24'>
      <CardWrapper
        headerLabel="Forget your password"
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

            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full'>
              Send reset email
            </Button>

          </form>

        </Form>

      </CardWrapper>
    </div>


  )
}

