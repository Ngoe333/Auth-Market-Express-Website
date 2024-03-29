
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/back-button';
import {

  Card,
  CardFooter,
  CardHeader

} from '@/components/ui/card'
import { CardWrapper } from '@/components/ui/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';


export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Oops! something when wrong!'
      backButtonHref='/login'
      backButtonLabel='Back to login'
    >

      <div className=' w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className=' text-destructive' />

      </div>
     


    </CardWrapper>
   
  );
};
