import { UserRole } from '@prisma/client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';


function CategoriesPage() {
    const path = usePathname();
    return (
        <section className=' max-w[500px] mt-24 flex mx-auto justify-center'>

            <div className=' flex flex-wrap  space-y-2 gap-2 tags mx-auto justify-center'>
                <Link href={'/settings'} className={path === '/settings' ? ' bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Settings</Link>
                {UserRole.ADMIN && (
                    <>
                        <Link href={'/categories'} className={path === '/categories' ? 'bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Categories</Link>
                        <Link href={'/menu-items'} className={path === '/menu-items' ? 'bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Meu Items</Link>
                        <Link href={'/users'} className={path === '/users' ? 'bg-green-500 text-white rounded-full py-2 px-4 ' : 'bg-gray-300 text-gray-700 rounded-full py-2 px-4 '}>Users</Link>
                    </>
                )}
            </div>

            <div>

            </div>

        </section>
    )
}

export default CategoriesPage