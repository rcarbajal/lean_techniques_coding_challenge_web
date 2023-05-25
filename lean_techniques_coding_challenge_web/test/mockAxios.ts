import axios from "axios";

const mockAxios = axios as jest.Mocked<typeof axios>;
export default mockAxios;

export function resetAxios() {
    mockAxios.get.mockClear();
    mockAxios.put.mockClear();
    mockAxios.post.mockClear();
    mockAxios.delete.mockClear();
}