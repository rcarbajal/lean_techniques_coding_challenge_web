import { resetAxios } from "./mockAxios"
import { mockIntersectionObserver } from "./mockIntersectionObserver";

beforeAll(() => {
    mockIntersectionObserver();
});

afterEach(() => {
    resetAxios();
});