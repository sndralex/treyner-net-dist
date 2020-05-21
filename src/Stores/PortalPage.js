import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
    portalPage: initLanguageCodeObject(),

});
let { portalPage } = resetStore();

class PortalPage extends BaseStore {
  constructor() {
    super();
  }

  // Actions
  providePortalPage(pageId, language) {
    let query = Client.items()
      .type('portal_page')
      .equalsFilter('system.id', pageId)

    if (language) {
      query.languageParameter(language);
    }

    query.toObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
            portalPage[language][pageId] = response.items[0];
        } else {
            portalPage[defaultLanguage][pageId] = response.items[0];
        }
        this.notifyChange();
      });
  }

  // Methods
  getPortalPage(pageId, language) {
    if (language) {
      return portalPage[language][pageId];
    } else {
      return portalPage[defaultLanguage][pageId];
    }
  }

}

let pageStore = new PortalPage();

export { pageStore, resetStore }
