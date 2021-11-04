<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2021-05-19 21:39:40
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-05-28 09:24:44
 * @FilePath: /cx/Users/lijinwen/study-p/vue-demo/leyao/src/views/region-demo.vue
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
-->
<template>
  <div class="base-layout">
    <div class="operation-btn-layout">
      <el-button type="primary" v-debounce="getRegionOrgData">获取原始数据，并处理</el-button>
      <el-button type="primary" v-debounce="printTreeData">打印省市区树结构数据</el-button>
      <el-button type="primary" v-debounce="getTownshipStreetFiles">获取县级行政区划对应的乡镇区划文件列表</el-button>
      <el-button type="primary" v-debounce="checkData">看看缺少那些县城</el-button>
      <el-button type="primary" v-debounce="testTool">测试工具</el-button>
      <el-button type="primary" v-debounce="compareData">比较regionList和regionOrgJson，看看少了哪些数据
      </el-button>
      <el-button type="primary" v-debounce="createSqlInsertFullPathUnID">生成sql插入语句</el-button>
    </div>
    <div class="show-data-layout">
      <div class="area-title-layout">
        <span class="area-title">全国行政区划区域树</span>
        <div class="tree-data-area">
          <el-tree :data="treeData" :props="treeProps" @node-click="handleNodeClick"
            :accordion="true"></el-tree>
          <div>
            {{ getCountyFileData }}
          </div>
        </div>
      </div>
      <div class="area-title-layout">
        <span class="area-title">省级行政区划直辖的县级行政区划(含直辖市下的县区)</span>
        <div class="tree-data-area">
          <el-tree :data="countyLevelCities" :props="treeProps" @node-click="handleNodeClick2"
            :accordion="true">
          </el-tree>
          <div>
            {{ getCountyFileData2 }}
          </div>
        </div>
      </div>
      <div class="area-title-layout">
        <span class="area-title">行政区划选择</span>
        <div class="cascader-data-area">
          <el-cascader-panel :options="treeData" :props="cascaderPanelProps"></el-cascader-panel>
          <el-cascader :options="treeData" :props="cascaderProps" @change="handleChange"
            style="margin-top: 10px;">
          </el-cascader>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import regionOrgJson from '../assets/region/list.json'
import regiones from '../assets/region/list/regiones.json'
import region3Level from '../assets/region/tree/region3level.json'
// import regionTreeParentFullPath from '../assets/region/tree/region-tree-parent-fullPath.json'
import regionTreeParentFullPathName from '../assets/region/tree/region-tree-parent-fullPath-name.json'
import countyLevelCity from '../assets/region/tree/county-level-city.json' // 省级行政区划直辖的县级行政区划(包含了直辖市下的县区行政区划)共计个-树结构
import { saveAs } from 'file-saver';

export default {
  components: {
  },
  data () {
    return {
      fullscreen: false,
      regionList: [],
      provinces: [], // 目前中国有34个省级行政区，即4个直辖市、23个省、5个自治区、2个特别行政区
      cities: [],
      counties: [],
      // specialHandlingCode: ['11','12','31','50','71','81','82','83'] // ‘71’是台湾省，‘83’是台湾特别行政区，目前国标上是‘71’，但是实际使用基本都使用的‘83’，估计以后会修改国标。本应用中的数据也是‘83’。
      // specialHandlingCode: ['11', '12', '31', '50', '81', '82'],// 北京市、天津市、上海市、重庆市、香港特别行政区和澳门特别行政区，这几个只有两级，没有地级行政区划，直接就到县级行政区划，需要特殊处理。
      countyLevelCity: [], // 省直辖县级市
      treeData: region3Level,// 全国省市县树结构数据
      countyLevelCities: countyLevelCity, // 省级行政区划直辖的县级行政区划(包含了直辖市下的县区行政区划)共计个-树结构
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
      countyFileData: null,
      countyFileData2: null,
      regionesList: regiones,
      sqlTemplate: ''
    }
  },
  computed: {
    getTreeData: function () {
      return this.treeData
    },
    getCountyFileData: function () {
      return this.countyFileData ? JSON.stringify(this.countyFileData) : '没有乡镇数据'
    },
    getCountyFileData2: function () {
      return this.countyFileData2 ? JSON.stringify(this.countyFileData2) : '没有乡镇数据'
    }
  },
  methods: {
    /** 创建可直接插入数据库的sql语句，带父编码 */
    createSqlInsert () {
      console.log(this.regionesList.length)
      this.sqlTemplate = ''
      for (let index = 0, length = this.regionesList.length; index < length; index++) {
        const vo = this.regionesList[index]
        this.sqlTemplate = this.sqlTemplate + `INSERT INTO \`m_common_region\` (ID, PARENT_REGION_CODE, REGION_CODE, REGION_NAME) VALUES (${index + 1}, '${vo.parentCode ? vo.parentCode : ''}', '${vo.code}', '${vo.name}');`
        if (index < length - 1) {
          this.sqlTemplate = this.sqlTemplate + '\r\n'
        }
      }
      const sqlRes = new Blob([this.sqlTemplate], { type: 'text/plain;charset=utf-8' })
      saveAs(sqlRes, `region-insert.sql`)
      console.log(this.sqlTemplate)
    },
    //regionTreeParentFullPath
    /** 创建可直接插入数据库的sql语句，数据带有父编码和全路径 */
    createSqlInsertFullPath () {
      this.sqlTemplate = ''
      this.analysisChildren(regionTreeParentFullPathName)
      const sqlRes = new Blob([this.sqlTemplate], { type: 'text/plain;charset=utf-8' })
      saveAs(sqlRes, `region-insert-fullPath.sql`)
      console.log(this.sqlTemplate)
    },
    analysisChildren (regionData) {
      for (let index = 0, length = regionData.length; index < length; index++) {
        const region = regionData[index]
        this.sqlTemplate = this.sqlTemplate + `INSERT INTO \`m_common_region\` (ID, PARENT_REGION_CODE, REGION_CODE, REGION_NAME, FULL_PATH, FULL_NAME) VALUES (${index + 1}, '${region.parentCode ? region.parentCode : ''}', '${region.code}', '${region.name}', '${region.fullPath}', '${region.fullName}');`
        this.sqlTemplate = this.sqlTemplate + '\r\n'
        if (region.children && region.children.length > 0) {
          this.getChildrenData(region.children)
        }
      }
    },
    /** 创建可直接插入数据库的sql语句，数据带有父编码和全路径，不带ID */
    createSqlInsertFullPathUnID () {
      this.sqlTemplate = ''
      this.analysisChildren_2(regionTreeParentFullPathName)
      // const lastEsIndex = this.sqlTemplate.lastIndexOf('\r\n')
      // console.log(this.sqlTemplate.length)
      // console.log(lastEsIndex)
      // this.sqlTemplate = this.sqlTemplate.substring(0, lastEsIndex + 1)
      const sqlRes = new Blob([this.sqlTemplate], { type: 'text/plain;charset=utf-8' })
      saveAs(sqlRes, `region-insert-fullPath-name-unID.sql`)
      console.log(this.sqlTemplate)
    },
    analysisChildren_2 (regionData) {
      for (let index = 0, length = regionData.length; index < length; index++) {
        const region = regionData[index]
        this.sqlTemplate = this.sqlTemplate + `INSERT INTO \`m_common_region\` (PARENT_REGION_CODE, REGION_CODE, REGION_NAME, FULL_PATH, FULL_NAME) VALUES ('${region.parentCode ? region.parentCode : ''}', '${region.code}', '${region.name}', '${region.fullPath}', '${region.fullName}');`
        this.sqlTemplate = this.sqlTemplate + '\r\n'
        if (region.children && region.children.length > 0) {
          this.analysisChildren_2(region.children)
        }
      }
    },
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
    handleNodeClick2 (data) {
      if (!this.countyFiles || this.countyFileNames.length === 0) {
        this.getTownshipStreetFiles()
      }
      if (this.countyFileNames.includes(data.code)) {
        let key = `./${data.code}.json`
        // console.log(this.countyFiles(key))
        this.countyFileData2 = this.countyFiles(key)
      } else {
        console.log('没有乡镇数据')
        this.countyFileData2 = null
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
      this.regionList = []
      this.provinces = []
      this.cities = []
      this.counties = []
      // console.log(JSON.stringify(regionOrgJson))
      const keys = Object.keys(regionOrgJson)
      console.log(`原始数据总长：${keys.length}`)
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
      console.log(`省市县三级数据条数：${this.provinces.length + this.cities.length + this.counties.length}`)
      // 已有归属的县区
      let ascriptionedCountyList = []
      // 组织为树结构数据
      for (let index = 0, length = this.cities.length; index < length; index++) {
        const childrenCounties = this.counties.filter(county => county.code.substr(0, 4) === this.cities[index].code.substr(0, 4))
        this.cities[index]['children'] = childrenCounties
        ascriptionedCountyList = ascriptionedCountyList.concat(childrenCounties)
      }
      // 设置省级数据
      for (let index = 0, length = this.provinces.length; index < length; index++) {
        /** 没必要在此处处理，而是放到处理未归属的县区时一并处理 */
        // if (this.specialHandlingCode.includes(this.provinces[index].code.substr(0, 2))) { // 处理直辖市数据
        //   const childrenCounties = this.counties.filter(county => county.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
        //   this.provinces[index]['children'] = childrenCounties
        //   ascriptionedCountyList = ascriptionedCountyList.concat(childrenCounties)
        // } else {
        //   const childrenCities = this.cities.filter(city => city.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
        //   this.provinces[index]['children'] = childrenCities
        // }
        const childrenCities = this.cities.filter(city => city.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
        this.provinces[index]['children'] = childrenCities
      }
      // 没有归属到地级市的县区（即，省直辖县级市）,直辖市下的区县数据也还未归属到直辖市下，此处统一处理
      const unAscriptionedCountyList = this.counties.filter(county => !(ascriptionedCountyList.find(ac => ac.code === county.code)))
      // 临时打印数据所用
      const tempPrintData = []
      // 将省直辖县级市挂到响应省级行政区划下
      for (let index = 0, length = this.provinces.length; index < length; index++) {
        const childrenCounties = unAscriptionedCountyList.filter(county => county.code.substr(0, 2) === this.provinces[index].code.substr(0, 2))
        // this.provinces[index]['children'] = childrenCounties
        if (childrenCounties && childrenCounties.length > 0) {
          if (this.provinces[index].children) {
            this.provinces[index].children = this.provinces[index].children.concat(childrenCounties)
          } else {
            this.provinces[index]['children'] = childrenCounties
          }
          tempPrintData.push({
            code: this.provinces[index].code,
            name: this.provinces[index].name,
            children: childrenCounties
          })
        }
      }
      console.log(`省级行政区划直辖的县级行政区划(包含了直辖市下的县区行政区划)共${unAscriptionedCountyList.length}个：${JSON.stringify(unAscriptionedCountyList)}`)
      console.log(`省级行政区划直辖的县级行政区划(包含了直辖市下的县区行政区划)共${unAscriptionedCountyList.length}个-树结构：${JSON.stringify(tempPrintData)}`)
      console.log(JSON.stringify(this.provinces))
      // this.getChildrenData(this.provinces, null)
      // this.getChildrenDataFullPath(this.provinces, null)
      this.getChildrenDataParentFullPathName(this.provinces, null, null, null)
      console.log(`组装后的list长度：${this.regionList.length}`)
      console.log(JSON.stringify(this.regionList))
      const sqlRes = new Blob([JSON.stringify(this.regionList)], { type: 'text/plain;charset=utf-8' })
      saveAs(sqlRes, `region-tree-parent-fullPath-name.json`)
    },
    /** 获取拥有父级编码的树机构数据
     * @param pCode 父级编码
    */
    getChildrenData (regionData, pCode) {
      for (let index = 0, length = regionData.length; index < length; index++) {
        const region = regionData[index]
        this.regionList.push({
          code: region.code,
          name: region.name,
          parentCode: pCode
        })
        if (region.children && region.children.length > 0) {
          this.getChildrenData(region.children, region.code)
        }
      }
    },
    /** 获取拥有全路径的树机构数据
     * @param pFullPath 父级全路径
     */
    getChildrenDataFullPath (regionData, pFullPath) {
      console.log(pFullPath)
      for (let index = 0, length = regionData.length; index < length; index++) {
        const region = regionData[index]
        this.regionList.push({
          code: region.code,
          name: region.name,
          fullPath: pFullPath ? `${pFullPath}&${region.code}` : region.code
        })
        if (region.children && region.children.length > 0) {
          this.getChildrenDataFullPath(region.children, pFullPath ? `${pFullPath}&${region.code}` : region.code)
        }
      }
    },
    /**
     * 获取拥有全路径、全名称和父级编码的树结构数据
     * @param pCode 父级编码
     * @param pFullPath 父级全路径
     */
    getChildrenDataParentFullPathName (regionData, pCode, pFullPath, pFullName) {
      for (let index = 0, length = regionData.length; index < length; index++) {
        const region = regionData[index]
        this.regionList.push({
          code: region.code,
          name: region.name,
          parentCode: pCode,
          fullPath: pFullPath ? `${pFullPath}&${region.code}` : region.code,
          fullName: pFullName ? `${pFullName}&${region.name}` : region.name
        })
        if (region.children && region.children.length > 0) {
          this.getChildrenDataParentFullPathName(region.children, region.code, pFullPath ? `${pFullPath}&${region.code}` : region.code, pFullName ? `${pFullName}&${region.name}` : region.name)
        }
      }
    },
    // 比较regionList和regionOrgJson，看看少了哪些数据
    compareData () {
      if (this.regionList.length === 0) {
        this.getRegionOrgData()
      }
      const keys = Object.keys(regionOrgJson)
      console.log(JSON.stringify(keys))
      console.log('原始key数量：' + keys.length)
      console.log('组装后长度：' + this.regionList.length)
      // 返回regionList中没有的数据
      const compareRes = keys.filter(key => !(this.regionList.find(region => region.code === key)))
      console.log(compareRes.length)
      const compareVo = []
      for (let index = 0, length = compareRes.length; index < length; index++) {
        const cr = compareRes[index]
        compareVo.push({
          code: cr,
          name: regionOrgJson[cr]
        })
      }
      console.log(JSON.stringify(compareVo))
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
.area-title-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.area-title {
  width: 100%;
  color: #070707;
  font-weight: bold;
  padding: 5px 0;
  margin-bottom: 5px;
  border-bottom: 1px dotted mediumaquamarine;
}
.tree-data-area {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.cascader-data-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
