<template>
<div>
    <div class="page-header page-header-small clear-filter" filter-color="green">
        <parallax
            class="page-header-image"
            v-bind:style="{ 'background-image': 'url(' + portalData.imageLink +')'}">
        </parallax>
        <div class="content-bottom">
            <div class="container">
                <mcstatus v-if="portalData.portalSlug==='minecraft'"/>
            </div>
        </div>
    </div>
<portalpages :key="pageListKey" :language="this.language" :sitemap="portalData.portalSitemap" :portalSlug="portalData.portalSlug" />
</div>
</template>

<script>
//import { Button, FormGroupInput } from '@/components';
import { PortalStore } from '../Stores/Portal';
import RichTextElement from '../components/RichTextElement.vue';
import mcstatus from '../components/mcstatus.vue';
import portalpages from './components/PortalPages.vue';
import _ from 'lodash';

export default {
    name: 'portal',
    props: ['language'],

    data: () => ({
      portal: null,
      pageListKey: 0
  }),
  computed: {
    portalData: function () {
      return {
          title: _.get(this.portal, 'portalTitle.value') || '--',
          imageLink: _.get(this.portal, 'banner.value[0].url') || '--url--',
          portalSlug: _.get(this.portal, 'portalSlug.value'),
          portalSitemap: _.get(this.portal, 'sitemap.value[0].codename')      
        }
    }
  },
  watch: {
    language: function () {
      //console.log('watch language, provide portal: ' + this.$route.params.portalId);
      PortalStore.providePortal(this.$route.params.portalId,this.language);
    }
  },
  methods: {
    onChange: function () {
      //console.log('onchane, get Resume: ' + this.$route.params.resumeId);
      this.portal = PortalStore.getPortal(this.$route.params.portalId,this.language);
      //console.log(this.portal);
      this.pageListKey += 1;
    }
  },
  mounted: function () {
    PortalStore.subscribe();
    PortalStore.addChangeListener(this.onChange);
    PortalStore.providePortal(this.$route.params.portalId,this.language);
    //console.log('mounted, provide Portal: ' + this.$route.params.portalId);
    this.portal = PortalStore.getPortal(this.$route.params.portalId,this.language);
    //console.log(this.portal);
  //  EventBus.$emit('i-got-clicked', this.clickCount);
  },
  beforeUpdate: function(){
    //console.log('before update, get Resume: ' + this.$route.params.resumeId);
    this.portal = PortalStore.getPortal(this.$route.params.portalId, this.language);
  },
  beforeDestroy: function() {
    PortalStore.unsubscribe();
  },
  destroyed: function () {
    PortalStore.removeChangeListener(this.onChange);
  },
  components: {
    RichTextElement,
    mcstatus,
    portalpages
  }

}
</script>