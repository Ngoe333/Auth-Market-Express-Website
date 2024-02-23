
import Image from 'next/image';


export function EditableImage({ link, setLink }) {

    async function handleFileChange(event) {
        const files = event.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            await fetch('api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok){
                    return response.json().then(link => {
                        setLink(link);
                    })
                }
                
                throw new Error('Something went wrong when uploading!')
            });
        }

    }



    return (
        <>

            {link && (
                <Image className=" rounded-full w-[150px] h-[150px] mb-1" src={link} width={150} height={150} alt={'Avatar'} />
            )}

            {!link && (
                <div className=' bg-gray-200 p-4 rounded-full mb-1 text-center w-[50px] h-[50px]'>
                    No image
                </div>
            )}

            <label>
                <input type='file' className='hidden' onChange={handleFileChange} />
                <span className='block border border-gray-300 rounded-full p-2 text-center cursor-pointer'>Upload</span>
            </label>

        </>
    )

}