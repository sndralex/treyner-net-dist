<template>
    <div class="row justify-content-center">
        <span class="badge badge-Primary">My Servers:</span>
        <div v-for="( item , index) in serverData.serversJson" :key="index">
            <el-popover
            popper-class="popover"
            placement="bottom"
            width="200"
            trigger="hover"
            >
                <button slot="reference"
                    v-bind:class="[ 'badge', item.online ? 'badge-success': 'badge-danger' ]"
                >
                {{item.hostname}}:{{item.port}}
                </button>
                <div class="popover-body">
                    <ul slot="raw-content" class="list-group list-group-flush">
                        <li class="badge badge-default list-group-item">{{item.ip}}</li>
                        <li v-if="item.players" class="badge badge-default list-group-item">{{item.software}} {{item.version}}</li>
                        <li v-bind:class="[ 'badge', item.online ? 'badge-success': 'badge-danger', 'list-group-item' ]"
                            v-if="item.players"
                        >
                        players {{item.players.online}} of {{item.players.max}}:
                            <ul slot="raw-content" class="list-group list-group-flush">
                                <li class="badge-success list-group-item" v-for="(player, pindex) in item.players.list" :key="pindex">
                                    {{player}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </el-popover>
        </div>
        
    </div>
</template>

<script>
import { Button, FormGroupInput } from '@/components';
import { Popover } from 'element-ui';
import _ from 'lodash';

export default {
    name: 'mcstatus',
    props:[],
    data: () => ({
      servers: [
          'nas.treyner.net',
          'nas.treyner.net:28565'
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
    },
    components: {
        Button, 
        FormGroupInput,
        [Popover.name]: Popover
    }
}
</script>