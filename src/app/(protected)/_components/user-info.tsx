'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { UseCurrentUser } from '../../../../hooks/use-current-user';

export const UserInfo = () => {
    const user = UseCurrentUser();



    return (
        <div>
            <Link href='/profile' className=' cursor-pointer'>
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className=' bg-green-400'>
                        <FaUser className=' text-white' />
                    </AvatarFallback>
                </Avatar>
            </Link>

        </div>

    )

}