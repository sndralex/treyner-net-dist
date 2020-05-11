import { Client } from '../Client.js';
import { takeUntil } from 'rxjs/operators';
//import { SortOrder } from '@kentico/kontent-delivery';
import { initLanguageCodeObject, defaultLanguage } from '../Utilities/LanguageCodes';
import BaseStore from './Base';

const resetStore = () => ({
  resume: initLanguageCodeObject()
});
let { resume } = resetStore();

class Resume extends BaseStore {
  constructor() {
    super();
  }

  fetchResume(resumeId,language) {
    var query = Client.items()
    .type('resume')
    .equalsFilter('system.id', resumeId);

    if (language) {
      query.languageParameter(language);
    }

    query.toObservable()
      .pipe(takeUntil(this.observableUnsubscribe))
      .subscribe(response => {
        if (language) {
          resume[language][resumeId] = response.items[0];
        } else {
            resume[defaultLanguage][resumeId] = response.items[0];
        }
        console.log(resume);
        this.notifyChange();
      });
  }

  // Actions
  provideResume(resumeId,language) {
    console.log('store provide Resume ' + resumeId);
    this.fetchResume(resumeId,language);
  }

  // Methods
  getResume(resumeId,language) {
    if (language) {
      return resume[language][resumeId];
    }else{
      return resume[defaultLanguage][resumeId];
    }
  }
}

let ResumeStore = new Resume();

export { ResumeStore, resetStore }
