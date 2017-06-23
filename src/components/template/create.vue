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
                  <h1>标题</h1>
                </div>
                <div :class="['view-box-content']">
                  <draggable v-model="config.data" @start="drag=true" @end="drag=false">
                    <div :class="['view-items']" v-for="item of config.data">
                      <!-- tab -->
                      <div :class="['view-menu']" v-if="item.type==='tab'" :style="" @click="editModule(item)">
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
                      <div :class="['to-top']" id="toTop" v-if="item.type==='button'&&item.cartIcon" style="display:block">
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
                    @cancel="cancel"
                    @save="save"
                    @addMore="addMore"
                    @addAbove="addAbove">
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
              margin: '0 0 0 0',
              padding: '0 0 0 0'
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
              margin: '0 0 0 0',
              padding: '0 0 0 0'
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
                color: '#81CDFF',
                image: '123.png',
                size: 'cover',
                position: 'center',
                repeat: 'no-repeat'
              },
              margin: '  0 0 0 0',
              padding: '  0 0 0 0'
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
                  intro: 'intro'
                }
              ],
              margin: '   0 0 0 0',
              padding: '   0 0 0 0'
            }
          },
          {
            name: 'tab栏',
            data: {
              id: 0,
              type: 'tab',
              items: [
                {
                  text: 'tab1',
                  target: ''
                }
              ],
              color: '#aaa',
              activeColor: '#ff718e'
            }
          }
        ],
        isActive: null,
        listShow: true,
        config: {
          data: []
        },
        formData: {},
        title: '',
        isSaved: false,
        indexForAbove: null
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
    methods: {
      addModule (index) {
        this.isActive = index
        this.listShow = false
        this.isSaved = false
        this.title = this.lists[index].name
        this.formData = JSON.parse(JSON.stringify(this.lists[index].data))
        if (this.indexForAbove !== null) {
          this.config.data.splice(this.indexForAbove, 0, this.formData)
        } else {
          this.config.data.push(this.formData)
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
        if (this.checkData() > 1) {
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
        this.formData.items.push(obj)
      },
      saveAll () {

      },
      remove () {

      },
      view () {

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
      overflow-y: auto;
      position: relative;
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
      margin-left: 30px;
      margin-right: 50px;
    }

    .edit-list {
      width: 100%;

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

      .form {
        overflow-y: auto;
        height: 440px;
      }
    }

    .btn-groups {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80px;
        background-color: #eee;
        margin-left: -30px;
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
