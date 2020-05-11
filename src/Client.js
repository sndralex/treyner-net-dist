import Cookies from 'universal-cookie';
import { selectedProjectCookieName, defaultProjectId } from './Utilities/SelectedProject';

// Kentico Kontent
import { DeliveryClient, TypeResolver } from '@kentico/kontent-delivery';

const projectId = '51542068-3efd-00fe-cbb2-f935cce3ec65'; //process.env.VUE_APP_PROJECT_ID || '';
const previewApiKey = 'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjkyMzAxMjdiNTE2ZDQzZjk4OTZiNjU4MjVlZGNhNzBkIiwNCiAgImlhdCI6ICIxNTc4MDUxMDkwIiwNCiAgImV4cCI6ICIxOTIzNjUxMDkwIiwNCiAgInByb2plY3RfaWQiOiAiNTE1NDIwNjgzZWZkMDBmZWNiYjJmOTM1Y2NlM2VjNjUiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImF1ZCI6ICJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSINCn0.FxjV6khT13Zxic9lr5rqg7oY0Hw1R4PZYv0PeJVvdYM'; //process.env.VUE_APP_PREVIEW_API_KEY || '';

// models
import { Home } from './Models/Home'
import { Resume } from './Models/resume'

// configure type resolvers
let typeResolvers = [
  new TypeResolver('home', () => new Home()),
  new TypeResolver('resume', () => new Resume())
];

const cookies = new Cookies(document.cookies);
let currentProjectId = projectId || cookies.get(selectedProjectCookieName);
if (currentProjectId) {
  cookies.set(selectedProjectCookieName, currentProjectId, { path: '/' });
} else {
  currentProjectId = defaultProjectId;
}

const isPreview = () => previewApiKey !== '';

let Client = new DeliveryClient({
  projectId: currentProjectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey,
  enablePreviewMode: isPreview()
});


const resetClient = (newProjectId) => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    typeResolvers: typeResolvers,
    previewApiKey: previewApiKey,
    enablePreviewMode: isPreview()
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
}

export {
  Client,
  resetClient
};