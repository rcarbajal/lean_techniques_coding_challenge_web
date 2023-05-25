import { resetAxios } from "./mockAxios"
import { mockIntersectionObserver } from "./mockIntersectionObserver";
import { resetRouter } from "./mockRouter";

beforeAll(() => {
    mockIntersectionObserver();
});

afterEach(() => {
    resetAxios();
    resetRouter();
});