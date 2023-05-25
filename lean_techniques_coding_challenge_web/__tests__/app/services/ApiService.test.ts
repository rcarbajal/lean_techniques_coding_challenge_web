import ApiService from "@/app/services/ApiService";
import mockAxios from "../../../test/mockAxios";
import { UniversalTestData } from "../../../test/UniversalTestData";


jest.mock('@/app/services/ApiService.ts', () => {
    return {
        __esModule: true,
        ...jest.requireActual('@/app/services/ApiService'),
    };
});

describe('ApiService', () => {
    let api: ApiService

    beforeEach(() => {
        api = new ApiService();
    });

    it('should return photo album', async () => {
        mockAxios.get.mockResolvedValueOnce({
            data: [UniversalTestData.Photo],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: null as any
            },
        });
        
        const response = await api.getPhotoAlbum(1);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(response.data).toEqual([UniversalTestData.Photo]);
    });

    it('should return error message on unsuccessful API call', async () => {
        const errorMessage = "Error message";

        mockAxios.get.mockResolvedValueOnce({
            data: errorMessage,
            status: 400,
            statusText: 'Bad Request',
            headers: {},
            config: {
                headers: null as any
            },
        });
        
        const response = await api.getPhotoAlbum(1);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(response.message).toBe(errorMessage);
    });
});