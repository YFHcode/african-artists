import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('museums');

export const generateMetadata = route.generateMetadata;
export default route.Page;
