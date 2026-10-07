import { textPageRoute } from '@/lib/routes';

const route = textPageRoute('privacy');

export const generateMetadata = route.generateMetadata;
export default route.Page;
