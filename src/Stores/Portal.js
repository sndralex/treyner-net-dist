import { Client } from '../Client.js';
import { SortOrder } from '@kentico/kontent-delivery';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
  portal: initLanguageCodeObject(),

});
let { portal } = resetStore();

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

  // Methods
  getPortal(portalId, language) {
    if (language) {
      return portal[language][portalId];
    } else {
      return portal[defaultLanguage][portalId];
    }
  }

}

let PortalStore = new Portal();

export { PortalStore, resetStore }
