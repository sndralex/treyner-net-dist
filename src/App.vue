<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view :language="language"/>
    </div>
    <router-view name="footer" />
  </div>
</template>

<script>
import {
  languageCodes,
  languageCodesLowerCase,
  getLanguageCode
} from './Utilities/LanguageCodes';

export default {
  
  name: 'app',
  computed: {
    language: function() {
      return this.$i18n.locale;
    }
  }
  
  ,created: function() {
    this.$i18n.locale = getLanguageCode(this.$route.path);
    //this.infoMessageText = this.getInfoMessage();
  },
   methods: {
     /*
    getInfoMessage: function() {
      return qs.parse(location.search.slice(1)).infoMessage;
    },
    */
    changeLang: function(newLanguage) {
      if (
        this.language === newLanguage ||
        languageCodes.indexOf(newLanguage) < 0
      ) {
        return;
      }

      const urlParts = this.$route.path.split('/');
      const currentLanguage = this.$route.path.split('/')[1];
      if (
        languageCodesLowerCase.indexOf(currentLanguage.toLocaleLowerCase()) > -1
      ) {
        urlParts[1] = newLanguage;
      } else {
        urlParts.splice(1, 0, newLanguage);
      }
      this.$router.push(urlParts.join('/'));
      this.$i18n.locale = newLanguage;
    }
  },
  watch: {
    $route: {
      deep: true,
      handler: function() {
        //this.infoMessageText = this.getInfoMessage();
        const newLanguage = this.$route.path.split('/')[1];
        if (
          this.language === newLanguage ||
          languageCodesLowerCase.indexOf(newLanguage.toLocaleLowerCase()) < 0
        ) {
          return;
        }
        if (
          languageCodesLowerCase.indexOf(newLanguage.toLocaleLowerCase()) > -1
        ) {
          this.$router.go(this.$route.path);
        }
      }
    }
  }
};

</script>
