<template>
    <div class="row justify-content-center">
        <template v-for="(pPage) in pagesData.pagesMap">
        <card style="width: 20rem;" class="col-md-4" :key="pPage.pageId">
            <!--img slot="image" class="card-img-top" :src="imgSrc" alt="Card image cap"-->
            <div>
            <h3 class="card-title">{{pPage.pageTitle}}</h3>
            <p class="card-text">
                <RichTextElement
                    v-if="pPage.shortDescription"
                    :element="pPage.shortDescription"
                />
            </p>
            <div slot="footer" class="card-footer text-muted mb-2">
                {{pPage.publicationsDate}}
            </div>
            <n-button type="primary" link><router-link :to="pPage.link">read more...</router-link></n-button>
            </div>
        </card>
        </template>
    </div>
</template>
<script>

import dateFormat from 'dateformat';
import {Card, Button} from '@/components';
import { PortalPagesStore } from '../../Stores/PortalPages';
import RichTextElement from '../../components/RichTextElement.vue';
import _ from 'lodash';

export default {
    name: 'portalpages',
    props: ['language','sitemap', 'portalSlug'],

    data: () => ({
      portalPages: []
  }),
  computed: {
    pagesData: function () {
      return {
            pagesMap: this.portalPages.map(r=>({
            pageId: _.get(r, 'system.id'),
            pageTitle: _.get(r, 'pageTitle.value') || '--',
            shortDescription: _.get(r, 'shortDescription') || '--',
            publicationsDate: this.formatDate(_.get(r, 'publicationsDate.value')),
            //photo: _.get(r, 'photo.value[0].url') || '',
            link: `/${this.language}/portals/${this.portalSlug}/${_.get(r, 'system.id')}`
        })),
        }
    }
  },
  watch: {
    language: function () {
      //console.log('watch language, provide portal: ' + this.$route.params.portalId);
      PortalPagesStore.providePortalPages(this.sitemap,this.language)
    },
    sitemap: function () {
      //console.log('watch sitemap, provide portal: ' + this.$route.params.portalId);
      PortalPagesStore.providePortalPages(this.sitemap,this.language)
    }

  },
  methods: {
    formatDate: function(value){
      return value ? dateFormat(value, 'longDate') : '';
    },
    onChange: function () {
      //console.log('onchane, get Resume: ' + this.$route.params.resumeId);
      this.portalPages = PortalPagesStore.getPortalPages(100,this.language);
    }
  },
  mounted: function () {
    PortalPagesStore.subscribe();
    PortalPagesStore.addChangeListener(this.onChange);
    PortalPagesStore.providePortalPages(this.sitemap,this.language)
    //console.log('mounted, provide PortalPages: ' + this.sitemap);
    this.portalPages = PortalPagesStore.getPortalPages(100,this.language);
    //console.log(this.portalPages);
  //  EventBus.$emit('i-got-clicked', this.clickCount);
  },
  beforeUpdate: function(){
    //console.log('before update, get Resume: ' + this.$route.params.resumeId);
    this.portalPages = PortalPagesStore.getPortalPages(100,this.language);
  },
  beforeDestroy: function() {
    PortalPagesStore.unsubscribe();
  },
  destroyed: function () {
    PortalPagesStore.removeChangeListener(this.onChange);
  },
  components: {
    RichTextElement,
    Card,
    [Button.name]: Button
  }

}
</script>