<template>
    <card class="card-nav-tabs text-center" header-classes="card-header-warning">
        <div slot="header" class="mt-2">
            Featured
        </div>
        <h2 class="card-title">{{pageData.title}}</h2>
        <p class="card-text">
            <RichTextElement
                    v-if="pageData.bodyElement"
                    :element="pageData.bodyElement"
                />
        </p>
        <n-button type="primary" link ><router-link :to="pageData.portalLink">Back...</router-link></n-button>
        <div slot="footer" class="card-footer text-muted mb-2">
            2 days ago
        </div>
    </card>
</template>

<script>

//import { Button, FormGroupInput } from '@/components';
import {Card, Button} from '@/components'
import { pageStore } from '../Stores/PortalPage';
import RichTextElement from '../components/RichTextElement.vue';

import _ from 'lodash';

export default {
    name: 'portalpage',
    props: ['language'],

    data: () => ({
      page: null,
  }),
  computed: {
    pageData: function () {
      return {
          title: _.get(this.page, 'pageTitle.value') || '--',
          bodyElement: _.get(this.page, 'pageBody')  ,
          portalLink: `/${this.language}/portals/${this.$route.params.portalSlug}/`    
        }
    }
  },
  watch: {
    language: function () {
      //console.log('watch language, provide portal: ' + this.$route.params.portalId);
      pageStore.providePortalPage(this.$route.params.pageId,this.language);
    }
  },
  methods: {
    onChange: function () {
      //console.log('onchane, get Resume: ' + this.$route.params.resumeId);
      this.page = pageStore.getPortalPage(this.$route.params.pageId,this.language);
      //console.log(this.portal);
    }
  },
  mounted: function () {
    pageStore.subscribe();
    pageStore.addChangeListener(this.onChange);
    pageStore.providePortalPage(this.$route.params.pageId,this.language);
    //console.log('mounted, provide Portal: ' + this.$route.params.portalId);
 //   this.page = pageStore.getPortalPage(this.$route.params.pageId,this.language);
    //console.log(this.portal);
  //  EventBus.$emit('i-got-clicked', this.clickCount);
  },
  beforeUpdate: function(){
    //console.log('before update, get Resume: ' + this.$route.params.resumeId);
    this.page = pageStore.getPortalPage(this.$route.params.pageId, this.language);
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
