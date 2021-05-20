<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2021-05-19 21:39:40
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-05-20 13:00:15
 * @FilePath: /cx/Users/lijinwen/study-p/vue-demo/leyao/src/views/region-demo.vue
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
-->
<template>
  <div class="base-layout">
    <div class="operation-btn-layout">
      <el-button type="primary" v-debounce="getRegionOrgData">获取原始数据，并处理</el-button>
      <el-button type="primary" v-debounce="printTreeData">打印省市区树状结构数据</el-button>
      <el-button type="primary" v-debounce="getTownshipStreetFiles">获取县级行政区划对应的乡镇区划文件列表</el-button>
      <el-button type="primary" v-debounce="checkData">看看缺少那些县城</el-button>
      <el-button type="primary" v-debounce="testTool">测试工具</el-button>
    </div>
    <div class="show-data-layout">
      <div class="tree-data-area">
        <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick"></el-tree>
        <div>
          {{ getCountyFileData }}
        </div>
      </div>
      <div class="cascader-data-area">
        <el-cascader-panel :options="treeData" :props="cascaderPanelProps"></el-cascader-panel>
        <el-cascader :options="treeData" :props="cascaderProps" @change="handleChange"
          style="margin-top: 10px;">
        </el-cascader>
      </div>
    </div>
  </div>
</template>
<script>
import regionOrgJson from '../assets/region/list.json'
import region3Level from '../assets/region/tree/region3level.json'
export default {
  components: {
  },
  data () {
    return {
      fullscreen: false,
      provinces: [], // 目前中国有34个省级行政区，即4个直辖市、23个省、5个自治区、2个特别行政区
      cities: [],
      counties: [],
      // specialHandlingCode: ['11','12','31','50','71','81','82','83'] // ‘71’是台湾省，‘83’是台湾特别行政区，目前国标上是‘71’，但是实际使用基本都使用的‘83’，估计以后会修改国标。本应用中的数据也是‘83’。
      specialHandlingCode: ['11', '12', '31', '50', '81', '82'],// 北京市、天津市、上海市、重庆市、香港特别行政区和澳门特别行政区，这几个只有两级，没有地级行政区划，直接就到县级行政区划，需要特殊处理。
      treeData: region3Level,
      treeProps: {
        children: 'children',
        label: 'name'
      },
      cascaderPanelProps: {
        multiple: false,
        value: 'code',
        label: 'name',
        children: 'children'
      },
      cascaderProps: {
        multiple: false,
        expandTrigger: 'hover',
        value: 'code',
        label: 'name',
        children: 'children'
      },
      countyFiles: null,
      countyFileNames: [],
      countyFileData: null
    }
  },
  computed: {
    getTreeData: function () {
      return this.treeData
    },
    getCountyFileData: function () {
      return this.countyFileData ? JSON.stringify(this.countyFileData) : '没有乡镇数据'
    }
  },
  methods: {
    testTool () {
      const str = '110000'
      const str1 = '112001'
      console.log(str.indexOf('0000'))
      console.log(str1.indexOf('00'))
    },
    handleNodeClick (data) {
      if (!this.countyFiles || this.countyFileNames.length === 0) {
        this.getTownshipStreetFiles()
      }
      if (this.countyFileNames.includes(data.code)) {
        let key = `./${data.code}.json`
        // console.log(this.countyFiles(key))
        this.countyFileData = this.countyFiles(key)
      } else {
        console.log('没有乡镇数据')
        this.countyFileData = null
      }
    },
    handleChange (value) {
      console.log(value);
    },
    checkData () {
      if (this.countyFileNames.length === 0) {
        this.getTownshipStreetFiles()
      }
      if (this.counties.length === 0) {
        this.getRegionOrgData()
      }
      const temp1 = this.counties.filter(county => !this.countyFileNames.includes(county.code))
      console.log(`没有乡镇数据的县区，共计${temp1.length}个：${JSON.stringify(temp1)}`)
      const temp2 = this.countyFileNames.filter(fileName => !this.counties.find(county => county.code === fileName))
      console.log(`没有县区对应的乡镇数据文件，共计${temp2.length}个：${JSON.stringify(temp2)}`)
    },
    getTownshipStreetFiles () {
      this.countyFileNames = []
      // 获取当前目录下所哟.ts文件
      const files = require.context('@/assets/region/code', false, /\.json$/)
      console.log(files.keys().length)
      this.countyFiles = files

      // 遍历，过滤并加载插件
      files.keys().forEach(key => {
        // console.log(key)
        // const fileName = key.substring(key.indexOf('./') + 1, key.indexOf('.json') + 1) // 字符串自带方法截取
        const fileName = key.match(/.\/(\S*).json/)[1] // 正则表达式匹配
        if (fileName) {
          this.countyFileNames.push(fileName)
        }
      })
      console.log(files('./110102.json'))
      console.log(this.countyFileNames)
    },
    printTreeData () {
      console.log(JSON.stringify(region3Level))
    },
    getRegionOrgData () {
      this.provinces = []
      this.cities = []
      this.counties = []
      // console.log(JSON.stringify(regionOrgJson))
      const keys = Object.keys(regionOrgJson)
      console.log(`数据总长：${keys.length}`)
      for (let index = 0, length = keys.length; index < length; index++) {
        const key = keys[index]
        if (key.lastIndexOf('0000') === 2) { // 注意不能紧紧匹配是否存在‘0000’，因为可能出现在中间比如重庆市500000
          this.provinces.push({
            code: key,
            name: regionOrgJson[key]
          })
        } else if (key.lastIndexOf('00') === 4) { // 最后一次出现的必须是4，不能使用indexOf，因为首次出现可能在中间，会把部分县级区划当成地市级区划
          this.cities.push({
            code: key,
            name: regionOrgJson[key]
          })
        } else {
          this.counties.push({
            code: key,
            name: regionOrgJson[key]
          })
        }
      }

      // console.log(`省级行政区划，共计${this.provinces.length}个：${this.provinces}`)
      // console.log(JSON.stringify(this.provinces))
      // console.log(`地级行政区划，共计${this.cities.length}个：${this.cities}`)
      // console.log(JSON.stringify(this.cities))
      // console.log(`县级行政区划（包括直辖市下的区），共计${this.counties.length}个：${this.counties}`)
      // console.log(JSON.stringify(this.counties))
      // console.log(this.counties.length)
      // console.log(JSON.stringify(this.counties))
      // console.log(this.provinces.length + this.cities.length + this.counties.length)
      // 组织为树结构数据
      for (let index = 0, length = this.cities.length; index < length; index++) {
        const childrenCounties = this.counties.filter(county => county.code.substr(0, 4) === this.cities[index].code.substr(0, 4))
        this.cities[index]['children'] = childrenCounties
      }
      for (let index = 0, length = this.provinces.length; index < length; index++) {
        if (this.specialHandlingCode.includes(this.provinces[index].code.substr(0, 2))) {
          const childrenCounties = this.counties.filter(county => county.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
          this.provinces[index]['children'] = childrenCounties
        } else {
          const childrenCities = this.cities.filter(city => city.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
          this.provinces[index]['children'] = childrenCities
        }
      }
      console.log(JSON.stringify(this.provinces))
    }
  }
}
</script>
<style type="text/css">
.base-layout {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
}
.operation-btn-layout {
  display: flex;
  width: 100%;
}
.show-data-layout {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.tree-data-area {
  flex: 1;
  display: flex;
}
.cascader-data-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
