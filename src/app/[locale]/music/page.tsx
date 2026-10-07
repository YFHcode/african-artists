import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('music');

export const generateMetadata = route.generateMetadata;
export default route.Page;
