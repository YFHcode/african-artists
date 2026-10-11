import { hubRoute } from '@/lib/routes';

const route = hubRoute('contemporary');

export const generateMetadata = route.generateMetadata;
export default route.Page;
