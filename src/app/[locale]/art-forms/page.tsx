import { collectionRoute } from '@/lib/routes';

const route = collectionRoute('art-forms');

export const generateMetadata = route.generateMetadata;
export default route.Page;
