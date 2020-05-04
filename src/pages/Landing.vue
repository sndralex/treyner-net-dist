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
    <div class=" section-team text-center">
      <div class="container">
        <h2 class="title">{{homeData.title}}</h2>
        <div class="team">
          <div
              v-if="resumes.length === 0"
              class="row"
          >
          </div>
          <div 
            v-else 
            class="row"
          >
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
                  ><i class="fab fa-facebook-square"></i></a>
                  <a v-if="resume.link_linkedin" :href="resume.link_linkedin" target="_blank" 
                  class="btn btn-primary btn-icon btn-round"
                  ><i class="fab fa-linkedin-square"></i></a>
              </div>
            </div>
          </template> 
          </div>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{homeData.title}}</h2>
            <h5 class="description">
              <RichTextElement
                    v-if="homeData.memoElement.resolveHtml()"
                    class="article-detail-content"
                    :element="homeData.memoElement"
                />
            </h5>
          </div>
        </div>
        <div class="separator separator-primary"></div>
        <div class="section-story-overview">
          <div class="row">
            <div class="col-md-6">
              <div
                class="image-container1 image-left1"
                
              >
              <img
                  v-if="homeData.wwordImage"
                    :alt="homeData.wwordSignature"
                    class="rounded-circle img-fluid img-raised"
                    :src="homeData.wwordImage"
                    :title="homeData.wwordSignature"
                />
                <!-- First image on the left side -->
                <p class="blockquote blockquote-primary">
                  <RichTextElement
                    v-if="homeData.wwordElement.resolveHtml()"
                    class="article-detail-content"
                    :element="homeData.wwordElement"
                />
                  <br />
                  <br />
                  <small>{{homeData.wwordSignature}}</small>
                </p>
              </div>
              <!-- Second image on the left side of the article -->
              <div
                class="image-container"
                style="background-image: url('img/bg3.jpg')"
              ></div>
            </div>
            <div class="col-md-5">
              <!-- First image on the right side, above the article -->
              <div
                class="image-container image-right"
                style="background-image: url('img/bg1.jpg')"
              ></div>
              <h3>
                So what does the new record for the lowest level of winter ice
                actually mean
              </h3>
              <p>
                The Arctic Ocean freezes every winter and much of the sea-ice
                then thaws every summer, and that process will continue whatever
                happens with climate change. Even if the Arctic continues to be
                one of the fastest-warming regions of the world, it will always
                be plunged into bitterly cold polar dark every winter. And
                year-by-year, for all kinds of natural reasons, there’s huge
                variety of the state of the ice.
              </p>
              <p>
                For a start, it does not automatically follow that a record
                amount of ice will melt this summer. More important for
                determining the size of the annual thaw is the state of the
                weather as the midnight sun approaches and temperatures rise.
                But over the more than 30 years of satellite records, scientists
                have observed a clear pattern of decline, decade-by-decade.
              </p>
              <p>
                The Arctic Ocean freezes every winter and much of the sea-ice
                then thaws every summer, and that process will continue whatever
                happens with climate change. Even if the Arctic continues to be
                one of the fastest-warming regions of the world, it will always
                be plunged into bitterly cold polar dark every winter. And
                year-by-year, for all kinds of natural reasons, there’s huge
                variety of the state of the ice.
              </p>
            </div>
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
