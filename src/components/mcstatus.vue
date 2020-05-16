<template>
    <div>
        <ul id="example-2">
            <li v-for="item in serverData.serversJson" :key="item">
                {{item.ip}}
            </li>
        </ul>
        
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'mcstatus',
    props:[],
    data: () => ({
      servers: [
          'nas.treyner.net',
          'nas.treyner.nett:28565'
      ],
      serversJson: []
    }),
    computed: {
        serverData: function () {
            return {
                serversJson: this.serversJson
            }
        }
    },
    mounted: function() {
        this.search();
    },
    methods:{
        search: function () {
            /*
            let promiseArray = [];
            for( let el of this.servers){
                promiseArray.push(fetch(`https://api.mcsrvstat.us/2/${el}`)
                            .then(response => response.json()));
            }
            this.serversJson = Promise.all(promiseArray);
*/
            var texts = [];
            Promise.all(this.servers.map(url => fetch(`https://api.mcsrvstat.us/2/${url}`)
                .then(resp => resp.json()) 
                )).then(texts => {
                    this.serversJson = texts;
                })
        }
    }
}
</script>