import middleware from './middleware';
import appIndex from './views/appIndex';

export default function(app) {
  middleware(app);
  appIndex(app);
}
