<template>
  <div>
    <mn-section>
      <mn-card>
        <!-- id-->
        <mn-card-item v-if="data.type!=='button'">
          <mn-card-prefix>
            <mn-label>
            id:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.id"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- col-->
        <mn-card-item v-if="data.type==='products'">
          <mn-card-prefix>
            <mn-label>
            一行几列:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.col"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item v-if="data.type==='product'">
          <mn-card-prefix>
            <mn-label>
            图左文右:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-radio :data="option.value"
              v-model="data.right"
              v-for="(option, key) in radioOptions"
              :key="key">{{ option.label }}</mn-radio>
          </mn-card-body>
        </mn-card-item>
        <!-- 按钮 -->
        <!-- <mn-card-item v-if="data.backTopIcon!==undefined">
          <mn-card-prefix>
            <mn-label>
            购物车按钮:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-radio :data="option.value"
              v-model="data.backTopIcon"
              v-for="(option, key) in btnOptions"
              :key="key">{{ option.label }}</mn-radio>
          </mn-card-body>
        </mn-card-item> -->
        <mn-card-item v-if="data.type==='button'">
          <mn-card-prefix>
            <mn-label>
            返回顶部按钮:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-radio :data="option.value"
              v-model="data.cartIcon"
              v-for="(option, key) in btnOptions"
              :key="key">{{ option.label }}</mn-radio>
          </mn-card-body>
        </mn-card-item>
        <!-- sku-->
        <mn-card-item v-if="data.type==='product'">
          <mn-card-prefix>
            <mn-label>
            sku:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.sku"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- tip-->
        <mn-card-item v-if="data.type==='product'">
          <mn-card-prefix>
            <mn-label>
            tip:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.tip"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- color-->
        <mn-card-item v-if="data.type==='tab'">
          <mn-card-prefix>
            <mn-label>
            默认颜色:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.color"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- color-->
        <mn-card-item v-if="data.type==='tab'">
          <mn-card-prefix>
            <mn-label>
            选中颜色:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.activeColor"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- margin-->
        <mn-card-item v-if="data.type!=='button'&&data.type!=='tab'">
          <mn-card-prefix>
            <mn-label>
            外边距:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.margin"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- padding-->
        <mn-card-item v-if="data.type!=='button'&&data.type!=='tab'">
          <mn-card-prefix>
            <mn-label>
            内边距:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.padding"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- url-->
        <mn-card-item v-if="data.type==='image'">
          <mn-card-prefix>
            <mn-label>
            链接:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="data.url"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- 图片-->
        <mn-card-item v-if="data.type==='image'">
          <mn-card-prefix>
            <mn-label >
            图片:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
              <mn-input v-model="data.src"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- background-->
        <div v-if="data.type==='products'||data.type==='products'" style="border-top: solid 1px rgba(0, 0, 0, 0.1);">
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              bc-color:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.color"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              bc-image:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.image"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              bc-size:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.size"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              bc-position:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.position"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              bc-repeat:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.repeat"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </div>
        <!-- 多图 -->
        <div v-if="data.type!=='image'&&data.type!=='button'">
          <div v-for="item of data.items" style="border-top: solid 1px rgba(0, 0, 0, 0.1);">
            <!-- intro-->
            <mn-card-item v-if="item.intro!==undefined">
              <mn-card-prefix>
                <mn-label >
                  介绍:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.intro"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- url-->
            <mn-card-item v-if="item.url!==undefined">
              <mn-card-prefix>
                <mn-label>
                url:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.url"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- 图片-->
            <mn-card-item v-if="item.src!==undefined">
              <mn-card-prefix>
                <mn-label >
                  图片:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.src"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- 链接-->
            <mn-card-item v-if="item.target!==undefined">
              <mn-card-prefix>
                <mn-label >
                  链接:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.target"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- tab名-->
            <mn-card-item v-if="item.text!==undefined">
              <mn-card-prefix>
                <mn-label >
                  tab名:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.text"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- sku-->
            <mn-card-item v-if="item.sku!==undefined">
              <mn-card-prefix>
                <mn-label >
                  sku:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.sku"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <!-- tip-->
            <mn-card-item v-if="item.tip!==undefined">
              <mn-card-prefix>
                <mn-label >
                  tip:
                </mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="item.tip"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </div>
          <mn-card-item>
            <mn-card-body>
              <mn-icon :name="icons.plus"></mn-icon>
              <a href="javascript:void(0)" @click="addMore()">新增</a>
            </mn-card-body>
          </mn-card-item>
        </div>
        <mn-card-item>
          <mn-card-body>
            <mn-btn theme="primary" size="sm" @click.native="cancel">删除</mn-btn>
            <mn-btn theme="primary" size="sm" @click.native="save">保存</mn-btn>
            <mn-btn theme="primary" size="sm" @click.native="addAbove">在上方增加模块</mn-btn>
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </mn-section>
  </div>
</template>

<script>
import core from 'vue-human/suites/core'
import input from 'vue-human/suites/input'
import radio from 'vue-human/suites/radio'
import FileUpload from 'vue-upload-component'

export default {
  data () {
    return {
      imgs: [],
      icons: {
        arrowLeft: require('vue-human-icons/js/ios/arrow-left'),
        plus: require('vue-human-icons/js/ios/plus-empty'),
        arrowDown: require('vue-human-icons/js/ios/arrow-down'),
        arrowUp: require('vue-human-icons/js/ios/arrow-up')
      },
      radioOptions: [
        {
          label: '图左文右',
          value: false
        },
        {
          label: '图右文左',
          value: true
        }
      ],
      btnOptions: [
        {
          label: '有',
          value: true
        },
        {
          label: '无',
          value: false
        }
      ]
    }
  },
  components: {
    ...core.map(),
    ...input.map(),
    ...radio.map(),
    FileUpload
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('save')
    },
    addMore () {
      this.$emit('addMore')
    },
    addAbove () {
      this.$emit('addAbove')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
