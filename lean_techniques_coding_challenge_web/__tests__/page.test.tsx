import Home from "@/app/page";
import { mockApi } from "@/app/services/__mocks__/ApiService";
import { render } from "@testing-library/react";

describe('Home', () => {
    it('should render', async () => {
        render(await Home({ 
            params: { slug: '' }, 
            searchParams: { 'albumId': '1' }
        }));

        expect(mockApi.getPhotoAlbum).toHaveBeenCalled();
    });
});