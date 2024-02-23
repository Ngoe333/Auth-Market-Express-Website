'use client'

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '../../../../hooks/use-current-user';

export const UserInfo = () => {
    const user = useCurrentUser();



    return (
        <div>
            <Link href='#' className=' cursor-pointer'>
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