import Vue from 'vue';
import Router from 'vue-router';
import Landing from './pages/Landing.vue';
import Resume  from './pages/Resume.vue';
import Portal from './pages/Portal.vue';
//import PortalPage from './pages/PortalPage.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
import StarterNavbar from './layout/StarterNavbar.vue';
import StarterFooter from './layout/StarterFooter.vue';
import { onErrorResumeNext } from 'rxjs';

Vue.use(Router);

export default new Router({
  //mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/:lang?',
      name: 'index',
      components: { default: Landing, header: StarterNavbar, footer: StarterFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/:lang?/resumes/:resumeId',
      name: 'resume',
      components: {default: Resume, header: StarterNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/:lang?/portals/:portalId/:pageId?',
      name: 'portal',
      components: {default: Portal, header: StarterNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
    /*,
    {
      path: '/:lang?/portals/:portalSlug/:pageId',
      name: 'page',
      components: {default: PortalPage, header: StarterNavbar, footer: StarterFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }*/
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
