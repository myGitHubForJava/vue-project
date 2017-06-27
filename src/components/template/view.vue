<template>
  <div class="container" id="container">
    <div :class="['content']">
      <div :class="['items']" v-for="(item, index) of config.data" :key="index">
        <!-- image -->
        <div
          :class="['header-image']"
          v-if="item.type==='image'"
          :style="calcMargin(item)"
        >
          <a href="item.href" v-if="item.href" alt="headimage"><img :src="item.src"></a>
          <img :src="item.src" v-else alt="headimage">
        </div>
        <!-- banner -->
        <div class="banner" v-if="item.type==='banner'">
          <mn-carousel v-if="item.items.length>1">
            <mn-carousel-item v-for="data of item.items" :key="data">
              <a href="data.url" v-if="data.url"><img :src="data.src"></a>
              <img :src="data.src" v-else>
            </mn-carousel-item>
          </mn-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {showTemplate} from '../../axios/template'
  import NavMenu from './nav'
  import carousel from 'vue-human/suites/carousel'

  export default {
    data () {
      return {
        config: {},
        skusinfo: {}
      }
    },
    components: {
      NavMenu,
      ...carousel.map()
    },
    mounted () {
      return showTemplate(this.$route.query.id).then(response => {
        this.skusinfo = response.data.JsonData.skusinfo
        this.config = JSON.parse(response.data.JsonData.data)
        console.log(this.config)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      calcMargin (data) {
        let str = ''
        let margin = []
        let padding = []
        if (data.margin) {
          margin = data.margin.trim().split(' ')
        }
        if (data.padding) {
          padding = data.padding.trim().split(' ')
        }
        if (margin.length > 3) {
          str += `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;`
        }
        if (padding.length > 3) {
          str += `padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`
        }
        return str
      },
      goTo (val) {
        console.log(val)
      }
    }
}
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .content {
      max-width:  640px;
      margin: 0 auto;

      .items {
        width: 100%;
      }
    }
  }
</style>
