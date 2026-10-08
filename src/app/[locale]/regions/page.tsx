import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('regions');

export const generateMetadata = route.generateMetadata;
export default route.Page;
