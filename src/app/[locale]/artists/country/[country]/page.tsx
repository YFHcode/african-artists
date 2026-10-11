import { hubRoute } from '@/lib/routes';

const route = hubRoute('country');

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
