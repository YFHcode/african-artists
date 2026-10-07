import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('guides');

export const generateMetadata = route.generateMetadata;
export default route.Page;
