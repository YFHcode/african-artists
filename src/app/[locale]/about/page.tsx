import { textPageRoute } from '@/lib/routes';

const route = textPageRoute('about');

export const generateMetadata = route.generateMetadata;
export default route.Page;
