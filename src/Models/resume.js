
import { ContentItem, Elements } from '@kentico/kontent-delivery';
import {  resolveContentLink } from '../Utilities/ContentLinks';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 
 */
export class Resume extends ContentItem {
        constructor() {
        super({
            propertyResolver: ((elementName) => {
                if (elementName === 'link_linkedin') {
                    return 'linkLinkedin';
                }
                if (elementName === 'resume_title') {
                    return 'resumeTitle';
                }
                if (elementName === 'job_title') {
                    return 'jobTitle';
                }
                if (elementName === 'untitled_url_slug') {
                    return 'untitledUrlSlug';
                }
                if (elementName === 'link_facebook') {
                    return 'linkFacebook';
                }
                if (elementName === 'link_youtube') {
                    return 'linkYoutube';
                }
                if (elementName === 'resume_short_description') {
                    return 'resumeShortDescription';
                }
                if (elementName === 'resume_body') {
                    return 'resumeBody';
                }
                if (elementName === 'link_instagtam') {
                    return 'linkInstagtam';
                }
                return elementName;
            }),
            linkResolver: (link) => resolveContentLink(link)
        });
    }
}
