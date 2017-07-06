<template>
  <mn-scroller>
    <mn-section>
      <mn-letter>
        <h1>新增模版</h1>
      </mn-letter>
    </mn-section>

    <mn-section>
      <mn-columns>
        <mn-column desktop="6">
          <div :class="['view-box']">
              <div :class="['view-box-wrapper']">
                <div :class="['view-box-title']">
                  <mn-icon :name="icons.arrowLeft" :width="50" :height="50"></mn-icon>
                  <h1></h1>
                </div>
                <div :class="['view-box-content']" :style="calcBkground">
                  <draggable v-model="config.data" @start="drag=true" @end="drag=false">
                    <div :class="['view-items']" v-for="item of config.data">
                      <!-- tab -->
                      <div :class="['view-menu']" v-if="item.type==='tab'" @click="editModule(item)">
                        <div :class="['view-menu-content', {'isMore': item.items.length>4}]">
                          <ul>
                            <li v-for="(name, index) of item.items">
                              <div :class="['view-menu-text']" :style="activeColor(item, index)">{{ name.text }}</div>
                            </li>
                          </ul>
                          <div :class="['drop-down']" v-if="item.items.length>4">
                            <mn-icon :name="icons.arrowDown" :width="50" :height="50" :style="{'fill': item.activeColor}">
                            </mn-icon>
                          </div>
                        </div>
                      </div>
                      <!-- iamge -->
                      <div
                        :class="['view-image', 'pointer']"
                        v-if="item.type==='image'"
                        :style="calcMarAndPad(item)"
                        @click="editModule(item)">
                      </div>
                      <!-- banner -->
                      <div
                        :class="['view-banner', 'pointer']"
                        v-if="item.type==='banner'"
                        :style="calcMarAndPad(item)"
                        @click="editModule(item)">
                      </div>
                      <!-- product -->
                      <product :data="item" v-if="item.type==='product'" @edit="editModule(item)"></product>
                      <!-- products -->
                      <products :data="item" v-if="item.type==='products'" @edit="editModule(item)"></products>
                      <!-- button -->
                      <div :class="['to-top']" id="toTop" v-if="item.type==='button'&&item.cartIcon" style="display:block" @click="editModule(item)">
                        <mn-icon :name="icons.arrowUp" :width="30" :height="30"></mn-icon>
                      </div>
                    </div>
                  </draggable>
                </div>
              </div>
          </div>
        </mn-column>
        <mn-column desktop="6">
          <div :class="['edit-box']">
            <div :class="['edit-content']">
              <div :class="['edit-list']" v-if="listShow">
                <ul>
                  <li v-for="(list, index) of lists" :key="index" :class="[{'active': index === isActive}]" @click="addModule(index)">
                    <div :class="['list-text']">
                    {{ list.name }}
                    </div>
                  </li>
                </ul>
              </div>
              <div :class="['edit-form']" v-else>
                <div :class="['title']">
                  <h2>{{ title }}</h2>
                </div>
                <div :class="['form']">
                  <modules
                    :data="formData"
                    :isShow="!listShow"
                    :form="modulesForm"
                    :selectOptions="selectOptions"
                    @editItem="editItem"
                    @update="update"
                    @cancel="cancel"
                    @save="save"
                    @addMore="addMore"
                    @addAbove="addAbove"
                    @removeArr="removeArr">
                  </modules>
                </div>
              </div>
              <div :class="['btn-groups']">
                <mn-btn theme="secondary-outline" margin size="sm" @click.native="saveAll">保存</mn-btn>
                <mn-btn theme="secondary-outline" margin size="sm" @click.native="remove">删除</mn-btn>
                <mn-btn theme="secondary-outline" margin size="sm" @click.native="view">预览</mn-btn>
              </div>
            </div>
          </div>
        </mn-column>
      </mn-columns>
    </mn-section>
  </mn-scroller>
</template>

<script>
  import core from 'vue-human/suites/core'
  import select from 'vue-human/suites/select'
  import input from 'vue-human/suites/input'
  import cell from 'vue-human/suites/cell'
  import required from 'vuelidate/lib/validators'
  import radio from 'vue-human/suites/radio'
  import modules from './modules'
  import Message from 'vue-human/utils/Message'
  import draggable from 'vuedraggable'
  import product from './product'
  import products from './products'
  import Confirm from 'vue-human/utils/Confirm'

  import {createTemplate} from '../../axios/template'

  export default {
    data () {
      return {
        icons: {
          arrowLeft: require('vue-human-icons/js/ios/arrow-left'),
          plus: require('vue-human-icons/js/ios/plus-empty'),
          arrowDown: require('vue-human-icons/js/ios/arrow-down'),
          arrowUp: require('vue-human-icons/js/ios/arrow-up')
        },
        lists: [
          {
            name: '纯图片',
            data: {
              id: 0,
              type: 'image',
              src: '',
              url: '',
              margin: '',
              padding: ''
            }
          },
          {
            name: '广告图',
            data: {
              id: 0,
              type: 'banner',
              items: [
                {
                  src: '',
                  url: ''
                }
              ],
              margin: '',
              padding: ''
            }
          },
          {
            name: '按钮',
            data: {
              type: 'button',
              backTopIcon: false,
              cartIcon: false
            }
          },
          {
            name: '多个商品',
            data: {
              id: 0,
              type: 'products',
              col: '2',
              items: [
                {
                  sku: '',
                  tip: '' // 标签
                }
              ],
              background: {
                color: '#fff',
                image: '',
                size: 'cover',
                position: 'center',
                repeat: 'no-repeat'
              },
              margin: '',
              padding: ''
            }
          },
          {
            name: '单个商品',
            data: {
              id: 0,
              type: 'product',
              right: false,
              sku: '',
              tip: 'tip',
              background: {
                color: '#fff',
                image: null,
                size: 'cover',
                position: 'center',
                repeat: 'no-repeat'
              },
              items: [
                {
                  intro: ''
                }
              ],
              margin: '',
              padding: ''
            }
          },
          {
            name: 'tab栏',
            data: {
              id: 0,
              type: 'tab',
              items: [
                {
                  text: '',
                  target: ''
                }
              ],
              color: '#aaa',
              activeColor: '#ff718e'
            }
          },
          {
            name: '其他',
            data: {
              type: 'other',
              title: '',
              templateName: '',
              background: {
                color: '',
                image: '',
                size: '',
                position: '',
                repeat: ''
              }
            }
          }
        ],
        isActive: null,
        listShow: true,
        templateName: '',
        config: {
          data: []
        },
        skus: [],
        formData: {},
        title: '',
        text: '标题',
        isSaved: false,
        indexForAbove: null,
        modulesForm: {
          url: '',
          src: '',
          tip: '',
          sku: '',
          text: '',
          target: '',
          intro: ''
        }
      }
    },
    validations: {
      id: {
        required
      },
      margin: {
        required
      },
      padding: {
        required
      }
    },
    components: {
      ...core.map(),
      ...select.map(),
      ...input.map(),
      ...cell.map(),
      ...radio.map(),
      modules,
      Message,
      draggable,
      product,
      products
    },
    computed: {
      calcBkground () {
        if (this.formData.type === 'other') {
          return `background-color: ${this.formData.background.color};` +
            `background-image: url('${this.formData.background.image}')` +
            `background-size: ${this.formData.background.size};` +
            `background-position: ${this.formData.background.position};` +
            `background-repeat: ${this.formData.background.repeat};`
        } else {
          return ''
        }
      },
      selectOptions () {
        let arr = [
          {
            label: '请选择',
            value: null
          }
        ]
        this.config.data.forEach(key => {
          if (key.type === 'products') {
            let obj = Object.assign({}, {label: '', value: ''})
            obj.value = key.id
            obj.label = key.id
            arr.push(obj)
          }
        })
        return arr
      }
    },
    methods: {
      addModule (index) {
        this.isActive = index
        this.listShow = false
        this.isSaved = false
        this.title = this.lists[index].name
        this.formData = JSON.parse(JSON.stringify(this.lists[index].data))
        switch (this.formData.type) {
          case 'tab' : {
            this.config.data.unshift(this.formData)
            break
          }
          case 'other':
          case 'button': {
            if (!this.isExist()) {
              this.config.data.push(this.formData)
            }
            break
          }
          default: {
            if (this.indexForAbove !== null) {
              this.config.data.splice(this.indexForAbove, 0, this.formData)
            } else {
              this.config.data.push(this.formData)
            }
            break
          }
        }
        this.indexForAbove = null
      },
      editModule (data) {
        if (this.isSaved === false) {
          Message.create({type: 'warning', message: '数据未保存！请先保存'}).show()
        } else {
          this.lists.forEach((key, index) => {
            if (key.data.type === data.type) {
              this.isActive = index
              this.title = key.name
            }
          })
          this.formData = data
          this.listShow = false
        }
      },
      save () {
        if (this.formData.type !== 'other' && this.checkData() > 1) {
          Message.create({type: 'error', message: 'id已存在，请重新输入！'}).show()
        } else {
          this.listShow = true
          Message.create({type: 'success', message: '保存成功！'}).show()
          this.isSaved = true
        }
      },
      checkData () {
        if (this.formData.type === 'button') {
          return 0
        } else {
          let len = this.config.data.filter(key => key.id === this.formData.id).length
          return len
        }
      },
      cancel () {
        if (this.isSaved === false) {
          Message.create({type: 'warning', message: '数据未保存！请先保存'}).show()
        } else {
          this.config.data.forEach((key, index) => {
            if (key.id === this.formData.id) {
              this.config.data.splice(index, 1)
            }
          })
          this.listShow = true
          this.isSaved = true
        }
      },
      calcMarAndPad (data) {
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
      activeColor (data, index) {
        if (index === 0) {
          return `color: ${data.activeColor};border-bottom-color: ${data.activeColor}`
        } else {
          return `color: ${data.color}`
        }
      },
      addMore () {
        let obj = Object.assign({}, this.lists[this.isActive].data.items[0])
        let val = Object.assign({}, this.modulesForm)
        Object.keys(this.modulesForm).forEach(key => {
          this.modulesForm[key] = ''
        })
        Object.keys(obj).forEach(key => {
          obj[key] = val[key]
        })
        if (this.formData.items.length === 0) {
          if (obj.text || obj.src || obj.intro || obj.sku) {
            this.formData.items.splice(0, 1, obj)
          }
        } else {
          if (obj.text || obj.src || obj.intro || obj.sku) {
            this.formData.items.push(obj)
          }
        }
      },
      removeArr (index) {
        this.formData.items.splice(index, 1)
      },
      saveAll () {
        this.config.data.forEach(key => {
          if (key.type === 'product') {
            this.skus.push(key.sku)
          } else if (key.type === 'products') {
            key.items.forEach(val => {
              this.skus.push(val.sku)
            })
          } else if (key.type === 'other') {
            this.templateName = key.templateName
            this.moveToLast(key)
          } else if (key.type === 'button') {
            this.moveToLast(key)
          }
        })
        let data = {
          'Title': this.templateName,
          'JsonData': {
            'data': JSON.stringify(this.config),
            'skus': this.skus
          }
        }
        return createTemplate(data).then(() => {
          this.$router.push({ name: 'template' })
          Message.create({type: 'success', message: '保存成功'}).show()
        }).catch(error => {
          Message.create({type: 'error', message: error.response.data.Error}).show()
          console.log(error.response.data.Error)
        })
      },
      remove () {

      },
      view () {
        this.$router.push({path: '/view', params: {config: this.config}})
      },
      addAbove () {
        Confirm.create({description: '是否保存并添加'}).show()
          .$on('confirm', () => {
            if (this.checkData() > 1) {
              Message.create({type: 'error', message: 'id已存在，请重新输入！'}).show()
              return false
            } else {
              this.indexForAbove = this.config.data.indexOf(this.formData)
              this.listShow = true
              Message.create({type: 'success', message: '保存成功！'}).show()
              this.isSaved = true
            }
          })
      },
      isExist () {
        let str = false
        this.config.data.forEach(key => {
          if (this.formData.type === key.type) {
            this.formData = key
            str = true
          }
        })
        return str
      },
      moveToLast (data) {
        let index = this.config.data.indexOf(data)
        if (index !== -1) {
          this.config.data.splice(index, 1)
          this.config.data.push(data)
        }
      },
      editItem (index) {
        Object.keys(this.formData.items[index]).forEach(key => {
          this.modulesForm[key] = this.formData.items[index][key]
          console.log(this.modulesForm)
        })
      },
      update (index) {
        let obj = Object.assign({}, this.lists[this.isActive].data.items[0])
        let val = Object.assign({}, this.modulesForm)
        Object.keys(this.modulesForm).forEach(key => {
          this.modulesForm[key] = ''
        })
        Object.keys(obj).forEach(key => {
          obj[key] = val[key]
        })
        if (obj.text || obj.src || obj.intro || obj.sku) {
          this.formData.items.splice(index, 1, obj)
        }
        console.log(this.formData.items)
      }
    }
  }
</script>

<style lang="scss">

  .view-box {
    width: 320px;
    height: 568px;
    border: 1px solid #aaaaaa;
    margin: auto;

    &-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    &-content {
      height: calc(100% - 50px);
      overflow-y: auto;
    }

    &-title {
      width: 100%;
      height: 50px;
      text-align: center;
      background-color: #eeeeee;

      .mn-icon {
        float: left;
        fill: #aaaaaa;
      }

      h1 {
        display: inline-block;
        font-size: 30px;
        color: #aaaaaa;
        margin-left: -50px;
      }
    }
  }

  .edit-box {
    height: 568px;
    width: 440px;
    border-left: 1px solid #aaaaaa;
    position: relative;

    .edit-content {
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .edit-list {
      width: 100%;
      padding-left: 30px;

      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;

        li {
          width: 120px;
          height: 80px;
          border: 1px solid #aaa;
          text-align: center;
          margin-top: 1rem;
          cursor: pointer;

          .list-text {
            color: #aaa;
            line-height: 80px;
            font-size: 20px;
          }
        }
      }
    }

    .edit-form {

      .title {
        margin-bottom: 20px;
      }

      .form {
        padding-left: 30px;
        box-sizing: border-box;
      }
    }

    .btn-groups {
        width: 100%;
        height: 80px;
        background-color: #eee;
        text-align: center;
        line-height: 80px;
      }
  }
  .isActive {

    li {
      border-color: #47a4f2;
      background-color: #47a4f2;

      .list-text {
        color: #fff;
      }
    }
  }

  .view-box-content {
    width: 100%;
    overflow-y: auto;

    .view-items {

      .view-menu {

        &-content {
          width: 100%;
          height: 50px;
          overflow-x: auto;
          background-color: #fff;
          position: relative;

          &::-webkit-scrollbar {
            height: 0;
            width: 0;
          }

          ul {
            display: flex;
            position: relative;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            list-style: none;
            height: 100%;
            margin: 0;
            padding: 0;
            line-height: 50px;

            .view-menu-text {
              cursor: pointer;
              height: 100%;
              border-bottom: 1px solid #fff;
            }

            li {
              flex: 1 0 25%;
              text-align: center;
            }
          }
        }

        .isMore {

          ul {
            width: calc(100% - 50px)
          }

          .drop-down {
            width: 50px;
            height: 50px;
            top: 0;
            right: 0;
            position: absolute;
            border-left: 1px solid #eeeeee;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            z-index: 999;
            background-color: #fff;

            .mn-icon {
              fill: #ff718e;
            }
          }
        }
      }

      .view-image {
        width: 100%;
        height: 120px;
        background-color: #aaa;
      }

      .view-banner {
        width: 100%;
        height: 80px;
        background-color: #bbb;
      }

      .to-top {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        bottom: 5%;
        right: 5%;
        text-align: center;
        .mn-icon {
          fill: rgba(255,255,255,0.8);
          margin-top: 8px;
        }
      }
    }
  }

  .pointer {
    cursor: pointer;
  }
</style>
