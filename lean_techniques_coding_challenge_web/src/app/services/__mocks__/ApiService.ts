import { UniversalTestData } from "../../../../test/UniversalTestData"

export const mockApi = {
    getPhotoAlbum: jest.fn((albumId: number = 0) => albumId === UniversalTestData.Photo.albumId
        ? { data: [UniversalTestData.Photo] }
        : null),
}

export function resetMockedApi() {
    for(const fn of Object.values(mockApi)) {
        fn.mockClear();
    }
}

export default class ApiService {
    getPhotoAlbum = mockApi.getPhotoAlbum;
}