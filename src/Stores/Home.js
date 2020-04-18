import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
  home: initLanguageCodeObject()
});
let { home } = resetStore();

class clsHome extends BaseStore {
  constructor() {
    super();
  }

  fetchHome(language) {
    var query = Client.item('treyner_net_home_site');

    if (language) {
      query.languageParameter(language);
    }

    query.toObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          home[language] = response.item;
        } else {
          home[defaultLanguage] = response.item;
        }
        this.notifyChange();
      });
  }

  // Actions
  provideHome(language) {
    this.fetchHome(language);
  }

  // Methods
  getHome(language) {
    if (language) {
      return home[language];
    }else{
      return home[defaultLanguage];
    }
  }
}

let HomeStore = new clsHome();

export { HomeStore, resetStore }