<template>
  <div>
    <mn-section>
      <mn-card>
        <!-- id-->
        <mn-card-item v-if="data.type!=='button'&&data.type!=='other'">
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
        <mn-card-item v-if="data.type!=='button'&&data.type!=='tab'&&data.type!=='other'">
          <mn-card-prefix>
            <mn-label>
            外边距:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <div class="inputs" v-model="mar">
              <input v-model="margin[0]" placeholder="上" />
              <input v-model="margin[1]"  placeholder="右"  />
              <input v-model="margin[2]"  placeholder="下"  />
              <input v-model="margin[3]" placeholder="左" @blur="bindStyle('margin')" />
            </div>
          </mn-card-body>
        </mn-card-item>
        <!-- padding-->
        <mn-card-item v-if="data.type!=='button'&&data.type!=='tab'&&data.type!=='other'">
          <mn-card-prefix>
            <mn-label>
            内边距:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <div class="inputs" v-model="par">
              <input v-model="padding[0]" placeholder="上" />
              <input v-model="padding[1]"  placeholder="右"  />
              <input v-model="padding[2]"  placeholder="下"  />
              <input v-model="padding[3]" placeholder="左" @blur="bindStyle('padding')"  />
            </div>
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
        <mn-card-item v-if="data.type==='other'">
          <mn-card-prefix>
            <mn-label >
            项目名称:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
              <mn-input v-model="data.templateName"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- 标题-->
        <mn-card-item v-if="data.type==='other'">
          <mn-card-prefix>
            <mn-label >
            标题:
            </mn-label>
          </mn-card-prefix>
          <mn-card-body>
              <mn-input v-model="data.title"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <!-- background-->
        <div v-if="data.type==='products'||data.type==='products'||data.type==='other'" style="border-top: solid 1px rgba(0, 0, 0, 0.1);">
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              背景色:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.color"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              背景图片:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.image"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              背景图大小:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.size" placeholder="cover | contain"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              背景图位置:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="data.background.position"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>
              重复背景:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-select :options="bkRepeatOptions" v-model="data.background.repeat"></mn-select>
            </mn-card-body>
          </mn-card-item>
        </div>
        <!-- 多图 -->
        <div v-if="data.type!=='image'&&data.type!=='button'&&data.type!=='other'" style="border-top: solid 1px rgba(0, 0, 0, 0.1);">
          <!-- intro-->
          <mn-card-item v-if="data.type==='product'">
            <mn-card-prefix>
              <mn-label >
                介绍:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.intro" @keyup.enter="addMore()"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <!-- 图片-->
          <mn-card-item v-if="data.type==='banner'">
            <mn-card-prefix>
              <mn-label >
                图片:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.src"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <!-- url-->
          <mn-card-item v-if="data.type==='banner'">
            <mn-card-prefix>
              <mn-label>
              链接:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.url"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <!-- 链接-->
          <mn-card-item v-if="data.type==='tab'">
            <mn-card-prefix>
              <mn-label >
                链接:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-select :options="selectOptions" v-model="form.target" v-if="selectOptions.length>0"></mn-select>
            </mn-card-body>
          </mn-card-item>
          <!-- tab名-->
          <mn-card-item v-if="data.type==='tab'">
            <mn-card-prefix>
              <mn-label >
                tab名:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.text"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <!-- sku-->
          <mn-card-item v-if="data.type==='products'">
            <mn-card-prefix>
              <mn-label >
                sku:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.sku"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <!-- tip-->
          <mn-card-item v-if="data.type==='products'">
            <mn-card-prefix>
              <mn-label >
                tip:
              </mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="form.tip"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mn-icon :name="icons.plus"></mn-icon>
              <a href="javascript:void(0)" @click="addMore()">新增</a>
              <a href="javascript:void(0)" @click="update()" v-if="show" style="margin-left: 20px">修改</a>
            </mn-card-body>
          </mn-card-item>
        </div>
        <mn-card-item v-if="data.type!=='image'&&data.type!=='button'">
          <mn-card-body>
            <ul class="items-list" v-if="data.type==='banner'">
              <li v-for="(item, index) of data.items" v-if="item.src!==''||item.url!==''" :key="index">
              <div @click="editItem(index)" class="pointer" title="修改">
                [ 图片：{{ item.src.length>8?item.src.substring(0,8)+'...':item.src }}, 链接：{{ item.url.length>8?item.url.substring(0,8)+'...':item.url }} ]
              </div>
              <span @click="remove(index)"><mn-icon :name="icons.iosCloseOutline"></mn-icon></span>
              </li>
            </ul>
            <ul class="items-list" v-if="data.type==='product'">
              <li v-for="(item, index)  of data.items" v-if="item.intro!==''">
                <div @click="editItem(index)" class="pointer" title="修改">
                  [ 介绍：{{ item.intro.length>8?item.intro.substring(0,8)+'...':item.intro }}]
                </div>
                <span @click="remove(index)"><mn-icon :name="icons.iosCloseOutline"></mn-icon></span>
              </li>
            </ul>
            <ul class="items-list" v-if="data.type==='tab'">
              <li v-for="(item, index)  of data.items" v-if="item.target!==''||item.text!==''">
                <div @click="editItem(index)" class="pointer" title="修改">
                  [ 链接：{{ item.target.length>8?item.target.substring(0,8)+'...':item.target }}, tab名：{{ item.text.length>8?item.text.substring(0,8)+'...':item.text }} ]
                </div>
                <span @click="remove(index)"><mn-icon :name="icons.iosCloseOutline"></mn-icon></span>
              </li>
            </ul>
            <ul class="items-list" v-if="data.type==='products'">
              <li v-for="(item, index)  of data.items" v-if="item.sku!==''||item.tip!==''">
                <div @click="editItem(index)">
                  [ sku：{{ item.sku.length>8?item.sku.substring(0,8)+'...':item.sku }}, 标签：{{ item.tip.length>8?item.tip.substring(0,8)+'...':item.tip }}]
                </div>
                <span @click="remove(index)"><mn-icon :name="icons.iosCloseOutline"></mn-icon></span>
              </li>
            </ul>
          </mn-card-body>
        </mn-card-item>
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
import select from 'vue-human/suites/select'

export default {
  data () {
    return {
      icons: {
        arrowLeft: require('vue-human-icons/js/ios/arrow-left'),
        plus: require('vue-human-icons/js/ios/plus-empty'),
        arrowDown: require('vue-human-icons/js/ios/arrow-down'),
        arrowUp: require('vue-human-icons/js/ios/arrow-up'),
        iosCloseOutline: require('vue-human-icons/js/ios/close-outline')
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
      ],
      bkRepeatOptions: [
        {
          label: '请选择',
          value: undefined
        },
        {
          label: 'repeat',
          value: 'repeat'
        },
        {
          label: 'no-repeat',
          value: 'no-repeat'
        },
        {
          label: 'repeat-x',
          value: 'repeat-x'
        },
        {
          label: 'repeat-y',
          value: 'repeat-y'
        }
      ],
      padding: [],
      margin: [],
      index: undefined,
      show: false
    }
  },
  components: {
    ...core.map(),
    ...input.map(),
    ...radio.map(),
    ...select.map(),
    FileUpload
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    form: {
      type: Object,
      required: true
    },
    selectOptions: {
      type: Array,
      default: () => [{
        label: '暂无，请先添加商品',
        value: null
      }]
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
      console.log(this.form)
      this.$emit('addMore', this.form)
    },
    addAbove () {
      this.$emit('addAbove')
    },
    remove (index) {
      this.$emit('removeArr', index)
    },
    bindStyle (type) {
      this.data[type] = ''
      this[type].forEach(key => {
        this.data[type] += key.trim() + ' '
      })
    },
    editItem (index) {
      this.index = index
      this.show = true
      this.$emit('editItem', index)
    },
    update () {
      this.show = false
      this.$emit('update', this.index)
    }
  },
  computed: {
    mar () {
      if (this.data.margin) {
        this.margin = this.data.margin.trim().split(' ')
        return ''
      }
    },
    par () {
      if (this.data.padding) {
        this.padding = this.data.padding.trim().split(' ')
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .items-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;

      span {
        cursor: pointer;
      }
    }
  }

  .inputs {
    display: flex;
    flex-wrap: nowrap;

    input {
      outline: none;
      border: none;
      border-left: 1px solid rgba(0,0,0,0.2);
      height: 2rem;
      line-height: 2rem;
      width: 25%;
      padding-left: 3px;

      &::-webkit-input-placeholder {
        color: #e3e4e5;
        font-size: 12px;
        text-align: center;
      }

      &:focus {
        border-left-color: #3385ff;
      }
    }
  }

  .pointer {
    cursor: pointer;
  }
</style>
