import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('movements');

export const generateMetadata = route.generateMetadata;
export default route.Page;
