<template>
  <mn-scroller>
    <mn-section>
      <mn-letter>
        <h1>模板列表</h1>
      </mn-letter>
    </mn-section>

    <mn-section>
      <mn-card>
        <mn-card-item>
          <mn-card-body>
            <mn-columns>
              <mn-column desktop="6">
                <controller-bar class="has-two-margin-bottom">
                  <label slot="prefix">名称:</label>
                  <mn-input v-model="searchForm.name" placeholder="名称搜索"></mn-input>
                </controller-bar>
              </mn-column>
              <mn-column desktop="6">
                <controller-bar class="has-two-margin-bottom">
                  <label slot="prefix">地址:</label>
                  <mn-input v-model="searchForm.address" placeholder="地址搜索"></mn-input>
                </controller-bar>
              </mn-column>
            </mn-columns>
            <mn-columns>
              <mn-column desktop="6">
                <controller-bar class="has-two-margin-bottom">
                  <label slot="prefix">创建人:</label>
                  <mn-input v-model="searchForm.createBy" placeholder="搜索"></mn-input>
                </controller-bar>
              </mn-column>
              <mn-column desktop="6">
                <controller-bar class="has-two-margin-bottom">
                  <label slot="prefix">创建人:</label>
                  <div>
                    <mn-datetime-picker :display="`${searchForm.startDate} 至 ${searchForm.endDate}`" @openPicker="onOpenRange"></mn-datetime-picker>
                  </div>
                </controller-bar>
              </mn-column>
            </mn-columns>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-body>
            <mn-btn theme="primary" size="sm" @click="clickSearch" margin>搜索</mn-btn>
            <mn-btn size="sm" @click="reset" theme="secondary-outline" margin >重置</mn-btn>
            <mn-btn theme="secondary-outline" margin size="sm" @click="createtemplate">新增模版</mn-btn>
          </mn-card-body>
        </mn-card-item>
      </mn-card>
      <!-- 表格展示 -->
      <mn-cell :contents="tableData" :hideSelections="true" v-if="tableData">
        <template scope="scope">
          <mn-card-item :item="scope.item">
            <mn-card-body>
              <mn-columns>
                <mn-column desktop="2">
                  <div>名称: {{ scope.item.Title }}</div>
                </mn-column>
                <mn-column desktop="2">
                  <div>地址: {{ scope.item.address }}</div>
                </mn-column>
                <mn-column desktop="2">
                  <div>创建人: {{ scope.item.CreatedBy }}</div>
                </mn-column>
                 <mn-column desktop="3">
                  <div>创建时间: {{ scope.item.CreatedAt }}</div>
                </mn-column>
                 <mn-column desktop="3">
                  <div>更新时间: {{ scope.item.UpdatedAt }}</div>
                </mn-column>
                <mn-column desktop="2">
                  <div>
                    <mn-btn theme="primary" size="sm" @click.native="editTemplate(scope.item)">编辑</mn-btn>
                    <mn-btn theme="primary" size="sm" @click.native="viewTemplate(scope.item)">预览</mn-btn>
                  </div>
                </mn-column>
              </mn-columns>
            </mn-card-body>
          </mn-card-item>
        </template>
      </mn-cell>
      <mn-card v-else>
        <mn-card-item>
          <mn-card-body class="has-center-text">
            <mn-loading-icon></mn-loading-icon>
            正在加载中...
          </mn-card-body>
        </mn-card-item>
      </mn-card>
      <!-- 分页 -->
      <mn-paginate v-model="currentPage" :total="total" @input="changePageNum"></mn-paginate>
    </mn-section>
  </mn-scroller>
</template>

<script>
  import coreSuits from 'vue-human/suites/core'
  import selectSuits from 'vue-human/suites/select'
  import inputSuits from 'vue-human/suites/input'
  import paginateSuits from 'vue-human/suites/paginate'
  import controllerBar from './controller-bar'
  import datetime from 'vue-human/suites/datetime'
  import DatetimeRange from 'vue-human/utils/DatetimeRange'
  import cell from 'vue-human/suites/cell'

  export default {
    data () {
      return {
        searchForm: {
          name: '',
          address: '',
          createBy: '',
          startDate: '2017-05-20 08:30:00',
          endDate: '2017-12-20 08:30:00'
        },
        fixForm: {},
        currentPage: 1,
        loading: false,
        tableData: undefined,
        total: 10
      }
    },
    components: {
      ...coreSuits.map(),
      ...selectSuits.map(),
      ...inputSuits.map(),
      ...paginateSuits.map(),
      ...datetime.map(),
      ...cell.map(),
      controllerBar
    },
    methods: {
      onOpenRange () {
        DatetimeRange.fromAt({ default: this.searchForm.startDate })
          .toAt({ default: this.searchForm.endDate })
          .show()
          .change(formats => {
            this.searchForm.startDate = formats.from
            this.searchForm.endDate = formats.to
          })
      },
      reset () {
        Object.keys(this.searchForm).forEach(key => {
          if (key === 'startDate') {
            this.searchForm[key] = '2017-05-20 08:30:00'
          } else if (key === 'endDate') {
            this.searchForm[key] = '2017-12-20 08:30:00'
          } else {
            this.searchForm[key] = ''
          }
        })
      },
      clickSearch () {
        this.currentPage = 1
        this.fixForm = Object.assign({}, this.searchForm)
        this.search()
      },
      search () {
        let params = {}
        params.size = 10
        params.pagenum = this.currentPage - 1

        Object.keys(this.fixForm).forEach(key => {
          this.fixForm[key] && (params[key] = this.fixForm[key])
        })

        this.loading = true
        this.$store.dispatch('template.listTemplates', params)
        .then(response => {
          this.tableData = response.data
          console.log(this.tableData)
          this.loading = false
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      changePageNum (val) {
        this.currentPage = val
        this.search()
      },
      editTemplate (data) {
        console.log(data)
      },
      viewTemplate (data) {

      },
      createtemplate () {
        this.$router.push({path: '/createTemplate'})
      }
    },
    mounted () {
      this.search()
    }
  }
</script>

<style lang="scss">

</style>
