
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
      const response = await apiService.getPhotoAlbum(albumId);
      if (response.data)
        photos = response.data;
      else
        errorMessage = response.message ?? 'An error occurred while attempting to retrieve photo album information';
    }
  }
  catch(err: any) {
    errorMessage = err.message;
  }

  return <Search albumId={albumId > 0 ? albumId.toString() : ''} photos={photos} error={errorMessage}></Search>
}
