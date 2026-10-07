import { articleRoute } from '@/lib/routes';

const route = articleRoute('movements');

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
