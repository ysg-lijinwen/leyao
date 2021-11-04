<!--
 * @Description:
 * @Version: 1.0.0
 * @Author: Kevin.Lee
 * @Date: 2020-12-07 10:32:41
 * @LastEditors: Kevin.Lee
 * @LastEditTime: 2021-05-19 22:07:37
 * @FilePath: /cx/Users/lijinwen/study-p/vue-demo/leyao/src/views/index.vue
 * Copyright (C) 2021 Kevin.Lee. All rights reserved.
-->
<template>
  <div class="base-layer" v-waterMarker="{text:'乐心瑶版权所有',textColor:'rgba(180, 180, 180, 0.4)'}">
    <div class="demo-row">
      <!-- 使用指令时，指令参数如果时函数，只能传入函数名，不可带括号，否则会立即执行函数体。 -->
      <button v-debounce="goToCustomDirectDemo">自定义指令Demo</button>
      <br>
      <br>
      <input v-model="targetArticleUrl" placeholder="请输入目标文章链接" style="width: 40vw;">
      <br>
      <br>
      <button v-debounce="reptileYngfkgjDemo">云南国防科工局文章</button>
      <button v-debounce="reptileGjgfkgjDemo" style="margin-left: 10px;">国家国防科工局文章</button>
      <br>
      <br>
      <br>
      <input v-model="targetSiteCategoryUrl" placeholder="请输入目标链接" style="width: 40vw;">
      <br>
      <br>
      <button v-debounce="reptileYngfkgjListDemo">云南国防科工局文章列表</button>
      <button v-debounce="reptileGjgfkgjDemo" style="margin-left: 10px;">国家国防科工局文章列表</button>
      <br>
      <br>
      开始下标：<input v-model="startIndex" placeholder="请输入开始下标，默认0">
      <br>
      <br>
      <button v-debounce="reptileYngfkgjBatchDemo">批量获取云南国防科工局文章内容列表</button>
      <button v-debounce="" style="margin-left: 10px;">批量获取国家国防科工局文章内容列表</button>
      <br>
      <button style="margin-top: 20px;" v-debounce="goToFullScreenDemo">实现进入全屏</button>
      <br>
      <button style="margin-top: 20px;" v-debounce="goToRegionDemo">行政区域</button>
      <br>
      <span v-if="nodeData">网站名称：{{ nodeData.siteName }}</span>
      <br>
      <span v-if="nodeData">转载地址：{{ nodeData.articleUrl }}</span>
      <br>
      <span v-if="nodeData">来源：{{ nodeData.source }}</span>
      <br>
      <span v-if="nodeData">来源发布时间：{{ nodeData.sourceReleaseTime }}</span>
      <br>
      <span v-if="nodeData" v-html="nodeData.articleTitle"></span>
      <br>
      <span v-if="nodeData" v-html="nodeData.articleContentNode"
        style="background-color: red;"></span>
    </div>
    <div class="more-operations" v-draggable>
      <a :href="'https://github.com/ysg-lijinwen/leyao'" target="_blank">示例代码</a>
    </div>
  </div>
</template>

<script>
import { reptileYngfkgjContent, reptileYngfkgjList, reptileYngfkgjContentBatch, reptileGjgfkgjContent } from '@/api'
export default {
  name: "index",
  components: {},
  data () {
    return {
      targetArticleUrl: '',
      targetSiteCategoryUrl: '',
      articleUrlListYngfkgj: [],
      startIndex: 0,
      nodeData: null,
      domainNameYngfkgj: 'http://www.yngfkgj.gov.cn',
      domainNameGjgfkgj: 'http://www.sastind.gov.cn'
    }
  },
  mounted () {
  },
  methods: {
    // http://www.yngfkgj.gov.cn/default.aspx // 国防科工局首页
    // http://www.yngfkgj.gov.cn/NewsView.aspx?NewsID=6e1e8cb2-6590-468b-b3f6-f73d08051b64 // 国防科工局具体文章（无图）
    // http://www.yngfkgj.gov.cn/NewsView.aspx?NewsID=6eee8e03-b324-4903-80f9-bab1ed088469 // 国防科工局具体文章（单图）
    // http://www.yngfkgj.gov.cn/NewsView.aspx?NewsID=6d31cecc-f0b8-4773-84cd-0f4b4d3a6b3a // 国防科工局具体文章(多图)
    async reptileYngfkgjDemo () {
      if (this.targetArticleUrl && this.targetArticleUrl.startsWith(this.domainNameYngfkgj)) {
        const res = await reptileYngfkgjContent({
          targetUrl: this.targetArticleUrl,
          domainName: this.domainNameYngfkgj
        })
        console.log(res)
        if (res.status === 'success') {
          this.nodeData = res.resData
        }
      } else {
        console.log('请输入有效的目标文章链接')
      }
    },
    // http://www.yngfkgj.gov.cn/NewsList.aspx?ClassID=6175f5d8-6930-446d-ad24-1a563f5723d7 // 国防科工局新闻中心
    async reptileYngfkgjListDemo () {
      if (this.targetSiteCategoryUrl && this.targetSiteCategoryUrl.startsWith(this.domainNameYngfkgj)) {
        const res = await reptileYngfkgjList({
          targetUrl: this.targetSiteCategoryUrl,
          domainName: this.domainNameYngfkgj
        })
        console.log(res)
        if (res.status === 'success') {
          if (res.resData && res.resData.articleList) {
            this.articleUrlListYngfkgj = res.resData.articleList.map((item) => {
              return item.articleUrl
            })
          }
        }
      } else {
        console.log('请输入有效的目标文章链接')
      }
    },
    async reptileYngfkgjBatchDemo () {
      if (this.articleUrlListYngfkgj && this.articleUrlListYngfkgj.length > 0) {
        let tempList = null
        if (this.startIndex !== 0 || this.startIndex < this.articleUrlListYngfkgj.length - 1) {
          tempList = JSON.parse(JSON.stringify(this.articleUrlListYngfkgj.slice(this.startIndex, this.articleUrlListYngfkgj.length)))
        } else {
          tempList = JSON.parse(JSON.stringify(this.articleUrlListYngfkgj))
        }
        const res = await reptileYngfkgjContentBatch({
          targetUrls: tempList,
          domainName: this.domainNameYngfkgj
        })
        console.log(res)
        if (res.status === 'success') {
          this.nodeData = res.resData
        }
      } else {
        console.log('请先获取文章列表')
      }
    },
    async reptileGjgfkgjDemo () {
      if (this.targetArticleUrl && this.targetArticleUrl.startsWith(this.domainNameGjgfkgj)) {
        const res = await reptileGjgfkgjContent({
          targetUrl: this.targetArticleUrl,
          domainName: this.domainNameGjgfkgj
        })
        console.log(res)
        if (res.status === 'success') {
          this.nodeData = res.resData
        }
      } else {
        console.log('请输入有效的目标文章链接')
      }
    },
    parseYngfkgjArticleAbout (originalData) {
      // 去除空格
      console.log(originalData)
      // originalData = originalData.replace(/\s/g, '')
      // console.log(originalData)
      // 文章来源：本站 发布时间：2021/11/1 16:10:34 阅读次数：139[ 打印 ][ 关闭 ]
      let source = originalData.substring(originalData.indexOf('文章来源：') + 5, originalData.indexOf('发布时间：'))
      let releaseTime = originalData.substring(originalData.indexOf('发布时间：') + 5, originalData.indexOf('阅读次数：'))
      console.log(source, releaseTime)
    },
    goToNextPage (path, params) {
      return this.$router.push({
        path: path,
        query: params
      })
    },
    goToCustomDirectDemo () {
      this.goToNextPage('/customDirect')
    },
    goToFullScreenDemo () {
      this.goToNextPage('/fullScreen')
    },
    goToRegionDemo () {
      this.goToNextPage('/region')
    }
  }
}
</script>

<style scoped>
.base-layer {
  min-height: 100vh;
}

.demo-row {
  margin-top: 10px;
}

.more-operations {
  background-color: rgba(0, 195, 255, 0.5);
  /*必须设置固定宽度，否者拖动会变形。*/
  width: 100px;
  height: auto;
  padding: 10px 20px;
  border-radius: 10px;
  /*fixed总是以body为定位时的对象，总是根据浏览器的窗口来进行元素的定位，通过"left"、 "top"、 "right"、 "bottom" 属性进行定位。*/
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 2;
}
</style>
