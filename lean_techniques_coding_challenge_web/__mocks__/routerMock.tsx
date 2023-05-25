const mockUseRouter = {
    push: jest.fn(),
    replace: jest.fn(),
};

jest.mock('next/navigation', () => ({
    push: jest.fn(),
    back: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    useRouter: jest.fn(() => mockUseRouter),
    usePathname: jest.fn(),
}));