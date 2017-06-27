<template>
  <div class="hot-items pointer" :style="calcStyle" @click="edit(data)">
      <div :class="['hot-item', {'hot-item-right' : data.right===true}]" style="padding: 0;margin: 0;">
        <div class="hot-item-img">
          <div class="item-tag">
            <span class="item-tag-text" >{{ data.tip }}</span>
          </div>
          <img src="http://images4sz-app.34580.com/images/ProductImages/SH_Image_46272_jpeg_100.jpeg">
        </div>
        <div class="hot-item-info">
          <div class="item-info-title">
            <h2>标题标题</h2>
          </div>
          <div class="item-info-subtitle">
            <ul v-for="list of data.items">
              <li v-if="list.intro">{{ list.intro }}</li>
            </ul>
          </div>
          <div class="item-info-price">
            <p class="old-price">原价 ￥ 00.00</p>
            <p class="new-price">活动价 ￥<span class="new-price-big">
            00</span>.00
            </p>
          </div>
          <div class="cart">
            <mn-icon :name="icons.cart" :scale="2"></mn-icon>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        icons: {
          cart: require('vue-human-icons/js/ios/cart')
        }
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      calcStyle (data, type) {
        let str = ''
        let arr = []
        if (data[type]) {
          arr = data[type].trim().split(' ')
          if (arr.length > 3) {
            str += `${type}: ${arr[0]}px ${arr[1]}px ${arr[2]}px ${arr[3]}px`
          }
        }
        return str
      },
      edit (data) {
        this.$emit('edit', data)
      }
    },
    computed: {
      calcStyle () {
        let str = ''
        let margin = []
        let padding = []
        if (this.data.margin) {
          margin = this.data.margin.trim().split(' ')
        }
        if (this.data.padding) {
          padding = this.data.padding.trim().split(' ')
        }
        if (margin.length > 3) {
          str += `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;`
        }
        if (padding.length > 3) {
          str += `padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`
        }
        // str += `background-color: ${this.data.background.color};`
        // str += `background-size: ${this.data.background.size};`
        // str += `background-position: ${this.data.background.position};`
        // str += `background-repeat: ${this.data.background.repeat};`
        // str += `background-image: url('${this.data.background.color}');`
        return str
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/style.scss'
</style>
