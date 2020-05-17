import { Client } from '../Client.js';
import { SortOrder } from '@kentico/kontent-delivery';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
  portal: initLanguageCodeObject()
//  portalLockedPages: initLanguageCodeObject(),
//  portalPages: initLanguageCodeObject()
});
let { portal /*, portalLockedPages, portalPages */ } = resetStore();

class Portal extends BaseStore {
  constructor() {
    super();
  }

  // Actions
  providePortal(portalId, language) {
    let query = Client.items()
      .type('portal')
      .equalsFilter('elements.portal_slug', portalId)

    if (language) {
      query.languageParameter(language);
    }

    query.toObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          portal[language][portalId] = response.items[0];
        } else {
          portal[defaultLanguage][portalId] = response.items[0];
        }
        this.notifyChange();
      });
  }

  /*
  providePortalPages(portalId, language) {
    let _portal=null;
    if(language)
      _portal = portal[language][portalId];
    else
      _portal = portal[defaultLanguage][portalId];

    if(!_portal)
      return;

    let query = Client.items()
      .type('portal_page')
      .orderParameter('elements.publication_date', SortOrder.desc);
      //.filter(`elements.sitemap=${_portal.sitemap}`);

    if (language) {
      query.languageParameter(language);
    }

    query.toObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          portalPages[language] = response.items;
        } else {
          portalPages[defaultLanguage] = response.items
        }
        this.notifyChange();
      });
  }
*/
  // Methods
  getPortal(portalId, language) {
    if (language) {
      return portal[language][portalId];
    } else {
      return portal[defaultLanguage][portalId];
    }
  }
/*
  getPortalPages(count, language) {
    if (language) {
      return portalPages[language].slice(0, count);
    }
    else {
      return portalPages[defaultLanguage].slice(0, count);
    }
  }
*/
}

let PortalStore = new Portal();

export { PortalStore, resetStore }
