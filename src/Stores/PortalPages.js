import { Client } from '../Client.js';
import { SortOrder } from '@kentico/kontent-delivery';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
  portalPages: initLanguageCodeObject()
});
let { portalPages  } = resetStore();

class PortalPages extends BaseStore {
  constructor() {
    super();
  }

  // Actions
  providePortalPages(portalSitemap, language) {
    if(!portalSitemap)
      return;

    let query = Client.items()
      .type('portal_page')
      .orderParameter('elements.publications_date', SortOrder.desc)
      .containsFilter('elements.sitemap',[ portalSitemap ]);

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

  // Methods
  getPortalPages(count, language) {
    if (language) {
      return portalPages[language].slice(0, count);
    }
    else {
      return portalPages[defaultLanguage].slice(0, count);
    }
  }

}

let PortalPagesStore = new PortalPages();

export { PortalPagesStore, resetStore }
