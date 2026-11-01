import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('instruments');

export const generateMetadata = route.generateMetadata;
export default route.Page;
