import * as NextNavigation from 'next/navigation';

const mockRouter = NextNavigation as jest.Mocked<typeof NextNavigation>;
export default mockRouter;

export function resetRouter() {
    mockRouter.usePathname.mockClear();
    mockRouter.useRouter.mockClear();
}