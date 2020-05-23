<template>
<div class="row justify-content-center">
  <div class="col-md-8">
      <card class="card-nav-tabs text-center" header-classes="card-header-warning">
          <n-button type="primary" link ><router-link :to="pageData.portalLink">Back...</router-link></n-button>
          <h2 class="card-title">{{pageData.title}}</h2>
          <p class="card-text p-left-align">
            
              <RichTextElement
                      v-if="pageData.bodyElement"
                      :element="pageData.bodyElement"
                  />
          </p>
          <n-button type="primary" link ><router-link :to="pageData.portalLink">Back...</router-link></n-button>
          <div slot="footer" class="card-footer text-muted mb-2">
              {{pageData.publicationsDate}}
          </div>
      </card>
  </div>
</div>
</template>

<script>

//import { Button, FormGroupInput } from '@/components';
import dateFormat from 'dateformat';
import {Card, Button} from '@/components';
import { pageStore } from '../../Stores/PortalPage';
import RichTextElement from '../../components/RichTextElement.vue';

import _ from 'lodash';

export default {
    name: 'portalpage',
    props: ['language', 'pageId'],

    data: () => ({
      page: null,
  }),
  computed: {
    pageData: function () {
      return {
          title: _.get(this.page, 'pageTitle.value') || '--',
          bodyElement: _.get(this.page, 'pageBody'),
          publicationsDate: this.formatDate(_.get(this.page, 'publicationsDate.value')),
          portalLink: `/${this.language}/portals/${this.$route.params.portalId}`      
        }
    }
  },
  watch: {
    language: function () {
      //console.log('watch language, provide portal: ' + this.$route.params.portalId);
      pageStore.providePortalPage(this.pageId,this.language);
    }
  },
  methods: {
    formatDate: function(value){
      return value ? dateFormat(value, 'longDate') : '';
    },
    onChange: function () {
      //console.log('onchane, get Resume: ' + this.$route.params.resumeId);
      this.page = pageStore.getPortalPage(this.pageId,this.language);
      //console.log(this.portal);
      document.title = this.page.pageTitle.value;
    }
  },
  mounted: function () {
    pageStore.subscribe();
    pageStore.addChangeListener(this.onChange);
    pageStore.providePortalPage(this.pageId,this.language);
    //console.log('mounted, provide Portal: ' + this.$route.params.portalId);
 //   this.page = pageStore.getPortalPage(this.$route.params.pageId,this.language);
    //console.log(this.portal);
  //  EventBus.$emit('i-got-clicked', this.clickCount);
  },
  beforeUpdate: function(){
    //console.log('before update, get Resume: ' + this.$route.params.resumeId);
    this.page = pageStore.getPortalPage(this.pageId, this.language);
  },
  beforeDestroy: function() {
    pageStore.unsubscribe();
  },
  destroyed: function () {
    pageStore.removeChangeListener(this.onChange);
  },
  components: {
    RichTextElement,
    Card,
    [Button.name]: Button
  }

}
</script>
