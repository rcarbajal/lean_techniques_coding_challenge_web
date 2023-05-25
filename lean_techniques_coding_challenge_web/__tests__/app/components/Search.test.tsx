import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from "@/app/components/Search";
import { act } from 'react-dom/test-utils';
import { UniversalTestData } from '../../../test/UniversalTestData';
import mockRouter from '../../../test/mockRouter';

describe('Search', () => {
    it('should render', async () => {
        await act(async () => {
            render(<Search
                albumId='1'
                photos={[UniversalTestData.Photo]}
                error='' />);
        });

        const title = await waitFor(() => screen.findByText(UniversalTestData.Photo.title));
        expect(title).toBeTruthy();
    });

    it('should attempt to search', async () => {
        await act(async () => {
            render(<Search
                albumId='1'
                photos={[UniversalTestData.Photo]}
                error='' />);
        });

        // enter album ID into search field
        const searchField = await waitFor(() => screen.findByPlaceholderText('Search by Album ID'));
        fireEvent.change(searchField, { target: { value: '1' }});

        // attempt to search
        const searchButton = await waitFor(() => screen.findByRole('button', { name: /Search/ }));
        fireEvent.click(searchButton);

        expect(mockRouter.useRouter().replace).toHaveBeenCalledWith(expect.stringContaining('albumId=1'));
    });
});