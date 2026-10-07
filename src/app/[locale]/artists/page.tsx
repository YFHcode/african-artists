import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('artists');

export const generateMetadata = route.generateMetadata;
export default route.Page;
