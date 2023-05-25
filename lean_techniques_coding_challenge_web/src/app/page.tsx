
import ApiService from './services/ApiService';
import { Photo } from './models/Photo';
import Search from './components/Search';

export default async function Home({ params, searchParams }: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const albumId: number = searchParams['albumId'] ? parseInt(searchParams['albumId'] as string, 10) : 0;
  let photos: Photo[] = [];
  let errorMessage: string = '';

  try {
    if (!isNaN(albumId) && albumId > 0) {
      const apiService = new ApiService();
      photos = await apiService.getPhotoAlbum(albumId);
    }
  }
  catch(err: any) {
    errorMessage = err.message;
  }

  return <Search albumId={albumId > 0 ? albumId.toString() : ''} photos={photos} error={errorMessage}></Search>
}
