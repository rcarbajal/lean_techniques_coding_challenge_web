'use client';

import Image from 'next/image'
import { Photo } from '../models/Photo';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from 'react-modal';

export default function Search({ albumId, photos, error }: { albumId: string, photos: Photo[], error: string }) {
    const [_albumId, setAlbumId] = useState(albumId);
    const path = usePathname();
    const { replace } = useRouter();
    const [_, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState<number>(-1);
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
    const [message, setMessage] = useState(error);

    const handleSearch = () => {
        const searchBox = document.getElementById('searchBox') as HTMLInputElement;
        const params = new URLSearchParams(window.location.search);

        if (searchBox) {
            const aID = parseInt(searchBox.value, 10);
            if (!isNaN(aID) && aID > 0) {
                params.set('albumId', searchBox.value);
                setAlbumId(searchBox.value);
                setMessage('');
                setPhotoIndex(-1);
            }
            else setMessage('Please enter a valid integer greater than 0');
        }
        else params.delete('albumId');

        startTransition(() => {
            replace(`${path}?${params.toString()}`);
        });
    }
  
    return (
        <main className="min-h-screen px-24 py-10">
            <h1 className='font-bold text-2xl'>Lean Techniques Showcase: Photo Album, web version</h1><br />
            <div className="w-full max-w-5xl items-center">
                <input type='text' id='searchBox' placeholder='Search by Album ID' defaultValue={_albumId} /> &nbsp;&nbsp;
                <input type='button' value='Search' className='bg-slate-400 text-white px-4' onClick={handleSearch} /> &nbsp;&nbsp;
                <span className='text-rose-600'>{message}</span>
            </div>
            <div className='flex-1 w-full mt-5'>
                <p className='mb-5'>Records found: {photos ? photos.length : 0}</p>
                {photos && photos.length > 0 && 
                    <table className='border border-slate-300'>
                        <thead>
                            <tr className='border-b-2 border-slate-300'>
                                <td className='px-4'>ID</td>
                                <td>Title</td>
                                <td>URL</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            photos.map((photo, index) => {
                                const idx = index;
                                const isEven: boolean = index % 2 === 0;
                                return (
                                    <tr 
                                        key={photo.id} 
                                        className={`${isEven ? 'bg-slate-100' : 'bg-white'} border-b-2 border-slate-300 cursor-pointer hover:bg-gray-200`} 
                                        onClick={() => {
                                            setPhotoIndex(idx);
                                            setIsModalOpen(true);
                                            setIsLoadingPhoto(true);
                                        }}
                                    >
                                        <td className='flex justify-center py-1'>{photo.id}</td>
                                        <td className='pr-4'>{photo.title}</td>
                                        <td className='pr-4'>{photo.url}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                }
            </div>
            {photoIndex >= 0 && 
                <Modal
                    isOpen={isModalOpen}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(200, 200, 200, 0.75)'
                        },
                        content: {
                            position: 'relative',
                            margin: '0px auto',
                            width: '640px',
                            height: '700px'
                        }
                    }}
                >
                    <button className='bg-slate-400 text-white px-4 mb-5' onClick={() => setIsModalOpen(false)}>Close</button> &nbsp;&nbsp;
                    {isLoadingPhoto && <span>Loading photo...</span>}
                    <p>{photos[photoIndex].title}</p>
                    <Image
                        src={photos[photoIndex].url}
                        width={600}
                        height={600}
                        alt='Placeholder'
                        onLoadingComplete={() => setIsLoadingPhoto(false)} />
                </Modal>
            }
        </main>
    )
}