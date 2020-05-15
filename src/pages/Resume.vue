<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('/img/IMG_0611.jpeg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img
                  v-if="resumeData.photo"
                      :alt="'Resume '  + resumeData.title"
                      class="rounded-circle img-fluid img-raised"
                      :src="resumeData.photo"
                      :title="'Resume ' + resumeData.title"
                />
        </div>
        <h3 class="title">{{resumeData.title}}</h3>
        <p class="category">{{resumeData.job_title}}</p>
        <!--div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div-->
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
          <a v-if="resumeData.link_youtube" :href="resumeData.link_youtube" target="_blank" 
                  class="btn btn-default btn-lg btn-icon btn-round"
                  rel="tooltip"
                  title="Follow me on Youtube"
                  >
                  <i class="fab fa-youtube"></i>
          </a>
          <a v-if="resumeData.link_instagtam" :href="resumeData.link_instagtam" target="_blank" 
                  class="btn btn-default btn-lg btn-icon btn-round"
                  rel="tooltip"
                  title="Follow me on Instagram"
                  ><i class="fab fa-instagram"></i>
          </a>
          <a v-if="resumeData.link_facebook" :href="resumeData.link_facebook" target="_blank" 
                  class="btn btn-default btn-lg btn-icon btn-round"
                  rel="tooltip"
                  title="Follow me on Facebook"
                  ><i class="fab fa-facebook"></i>
          </a>
          <a v-if="resumeData.link_linkedin" :href="resumeData.link_linkedin" target="_blank" 
                  class="btn btn-default btn-lg btn-icon btn-round"
                  rel="tooltip"
                  title="Follow me on LinkedIn"
                  ><i class="fab fa-linkedin"></i>
          </a>
        </div>
        <h3 class="title">About me</h3>
          <RichTextElement
              v-if="resumeData.resume_body"
              :element="resumeData.resume_body"
          />

      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane } from '@/components';
import { Button, FormGroupInput } from '@/components';
import { ResumeStore } from '../Stores/Resume';
import RichTextElement from '../components/RichTextElement.vue';
import _ from 'lodash';
//import { EventBus } from '../Utilities/EventBus';

export default {
    name: 'resume',
  props: ['language'],
  bodyClass: 'profile-page',

  data: () => ({
      resume: null,
  }),
  computed: {
    resumeData: function () {
      return {
          title: _.get(this.resume, 'resumeTitle.value') || '--',
          short_description: _.get(this.resume, 'resumeShortDescription.value') || '--',
          resume_body: _.get(this.resume, 'resumeBody') || null,
          job_title: _.get(this.resume, 'jobTitle.value') || '--',
          photo: _.get(this.resume, 'photo.value[0].url') || '',
          link_instagtam: _.get(this.resume, 'linkInstagtam.value') || '' ,
          link_facebook: _.get(this.resume, 'linkFacebook.value') || '' ,
          link_youtube: _.get(this.resume, 'linkYoutube.value') || '' ,
          link_linkedin: _.get(this.resume, 'linkLinkedin.value') || ''
      }
    }
  },
  watch: {
    language: function () {
      //console.log('watch language, provide Resume: ' + this.$route.params.resumeId);
      ResumeStore.provideResume(this.$route.params.resumeId,this.language);
    }
  },
  methods: {
    onChange: function () {
      //console.log('onchane, get Resume: ' + this.$route.params.resumeId);
      this.resume = ResumeStore.getResume(this.$route.params.resumeId,this.language);
    }
  },
  mounted: function () {
    ResumeStore.subscribe();
    ResumeStore.addChangeListener(this.onChange);
    ResumeStore.provideResume(this.$route.params.resumeId,this.language);
    //console.log('mounted, provide Resume: ' + this.$route.params.resumeId);
    this.resume = ResumeStore.getResume(this.$route.params.resumeId,this.language);
    //console.log(this.resume);
  //  EventBus.$emit('i-got-clicked', this.clickCount);
  },
  beforeUpdate: function(){
    //console.log('before update, get Resume: ' + this.$route.params.resumeId);
    this.resume = ResumeStore.getResume(this.$route.params.resumeId, this.language);
  },
  beforeDestroy: function() {
    ResumeStore.unsubscribe();
  },
  destroyed: function () {
    ResumeStore.removeChangeListener(this.onChange);
  },
  components: {
    RichTextElement,
    Tabs,
    TabPane
  }
}
</script>
<style>
</style>