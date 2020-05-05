<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        v-bind:style="{ 'background-image': 'url(' + homeData.imageLink +')'}"
      >
      </parallax>
      <!--div class="content-top">
        <div class="container">
          <h4 class="title"></h4>
        </div>
      </div-->
    </div>
    <div class="section-team text-center">
      <div class="container">
        <h2 class="title">{{homeData.title}}</h2>
        <h5 class="description">
              <RichTextElement
                    v-if="homeData.memoElement.resolveHtml()"
                    class="article-detail-content"
                    :element="homeData.memoElement"
                />
            </h5>
        <div class="team">
          <div class="row">
          <template  v-for="(resume) in homeData.resumesMap">
           <div :key="resume.id" class="col-md-3">
              <div class="team-player">
                <img
                  v-if="resume.photo"
                      :alt="'Resume '  + resume.title"
                      class="rounded-circle img-fluid img-raised"
                      :src="resume.photo"
                      :title="'Resume ' + resume.title"
                />
                <h4 class="title">{{resume.title}}</h4>
                <p class="category text-primary">{{resume.job_title}}</p>
                <p class="description">{{resume.short_description}}
                </p>
                <a v-if="resume.link_youtube" :href="resume.link_youtube" target="_blank" 
                  class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-youtube"></i></a>
                <a v-if="resume.link_instagtam" :href="resume.link_instagtam" target="_blank" 
                  class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-instagram"></i></a>
                <a v-if="resume.link_facebook" :href="resume.link_facebook" target="_blank" 
                  class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-facebook"></i></a>
                  <a v-if="resume.link_linkedin" :href="resume.link_linkedin" target="_blank" 
                  class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </template> 
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
          <div class="row justify-content-end">
            <div class="col-md-2 team-player">
              <img
                  v-if="homeData.wwordImage"
                    :alt="homeData.wwordSignature"
                    class="rounded-circle img-fluid img-raised"
                    :src="homeData.wwordImage"
                    :title="homeData.wwordSignature"
                />
            </div>
            <div class="col-md-6">
                <!-- First image on the left side -->
                <p class="blockquote blockquote-primary">
                  <RichTextElement
                    v-if="homeData.wwordElement.resolveHtml()"
                    :element="homeData.wwordElement"
                />
                  <small>{{homeData.wwordSignature}}</small>
                </p>
            </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Button, FormGroupInput } from '@/components';
import { HomeStore } from '../Stores/Home';
import RichTextElement from '../components/RichTextElement.vue'
import _ from 'lodash';

export default {
  name: 'landing',
  props: ['language'],
  bodyClass: 'landing-page',
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data: () => ({
      home: null,
      resumes: [],
      form: {
        firstName: '',
        email: '',
        message: ''
      }
    }),
  computed: {
    homeData: function () {
      return {
        resumesMap: this.resumes.map(r=>({
          title: _.get(r, 'resume_title.value') || '--',
          short_description: _.get(r, 'resume_short_description.value') || '--',
          job_title: _.get(r, 'job_title.value') || '--',
          photo: _.get(r, 'photo.value[0].url') || '',
          link_instagtam: _.get(r, 'link_instagtam.value') || '' ,
          link_facebook: _.get(r, 'link_facebook.value') || '' ,
          link_youtube: _.get(r, 'link_youtube.value') || '' ,
          link_linkedin: _.get(r, 'link_linkedin.value') || ''
        })),
        
        title: _.get(this.home, 'title.value') || '==title==',  //this.home.title.value || '==title==',
        memoElement: _.get(this.home, 'memo') || '--memo--',
        imageLink: _.get(this.home, 'heroBanner.value[0].url') || '--url--',
        wwordElement: _.get(this.home, 'wiseword.value[0].wiseword') || '----',
        wwordSignature: _.get(this.home, 'wiseword.value[0].signature.value') || '----',
        wwordImage: _.get(this.home, 'wiseword.value[0].imageperson.value[0].url') || '---'
      }
    }
  },
  watch: {
    language: function () {
      HomeStore.provideHome(this.language);
    }
  },
  methods: {
    onChange: function () {
      this.home = HomeStore.getHome(this.language);
      this.resumes = _.get(this.home,'resumes.value') || [];
    }
  },
  mounted: function () {
    HomeStore.subscribe();
    HomeStore.addChangeListener(this.onChange);
    HomeStore.provideHome(this.language);
    this.home = HomeStore.getHome(this.language);
    this.resumes = _.get(this.home,'resumes') || [];
  },
  beforeDestroy: function() {
    HomeStore.unsubscribe();
  },
  destroyed: function () {
    HomeStore.removeChangeListener(this.onChange);
  },
  components: {
    RichTextElement,
  }
};
</script>
<style></style>
