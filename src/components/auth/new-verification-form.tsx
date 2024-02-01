'use client'

import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { CardWrapper } from '@/components/ui/card-wrapper'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { newVerificationToken } from '../../../action/new-verification'
import { useRouter } from 'next/navigation'
// import { useState } from 'react';
import { FormError } from '../../components/form-error'
import { FormSuccess } from '../../components/form-success'



export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();
  const searchParamas = useSearchParams();
  const token = searchParamas.get('token');

  const onSubmit = useCallback(() => {

    if (!token) {
      setError('Missing token!')
      return;
    }

    newVerificationToken(token).then((data) => {
      setSuccess(data.success);
      setTimeout(() => {
        router.push('/login')
      }, 2000)
     
      setError(data.error);
    }).catch(() => {
      setError('Something went wrong !')
    })
  }, [token])

  useEffect(() => {

    onSubmit();

  }, [onSubmit])
  return (

    <CardWrapper
      headerLabel='Comfirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >

      <div className=' flex w-full items-center justify-center'>
        {!success && !error && (

          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />

        )}


        <FormSuccess message={success} />
        <FormError message={error} />

      </div>
    </CardWrapper>



  )
}

