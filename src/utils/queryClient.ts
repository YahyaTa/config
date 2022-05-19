import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            cacheTime: 20 * 60 * 1000,
            staleTime: 2 * 1000
        }
    }
});

export default queryClient;
