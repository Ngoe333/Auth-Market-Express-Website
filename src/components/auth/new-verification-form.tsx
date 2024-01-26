'use client'

import React from 'react'
import  {BeatLoader} from 'react-spinners';
import { CardWrapper } from '@/components/ui/card-wrapper'
import { useState } from 'react';


export function NewVerificationForm() {
  const [color, setColor] = useState('#a3ffbc')
  return (

    <CardWrapper
      headerLabel='Comfirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/login'
    >

        <div className=' flex w-full items-center justify-center'>
          <BeatLoader />
        </div> 
    </CardWrapper>

    
    
  )
}

