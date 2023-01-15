<template>
  <div class="article-container">
    <div class="article-main-container">
      <h1 class="title">{{ articleObj.title }}</h1>
      <div class="autor-container">
        <div class="autor">{{ articleObj.author_id }}</div>
        <div class="pub-time">
          {{ dayjs(articleObj.pub_date).format('YYYY年MM月DD日 HH：mm') }}
        </div>
      </div>
      <img class="cover-img" :src="articleObj.cover_img" alt="" />
      <div id="viewer" ref="viewerRef" class="viewer"></div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
// Step 1. Import prismjs
import Prism from 'prismjs'
// Step 2. Import language files of prismjs that you need
import 'prismjs/components/prism-clojure.js'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'

export default {
  data() {
    return {
      dayjs,
      articleObj: {
        Id: 0,
        author_id: 0,
        cate_id: 0,
        content: '',
        cover_img: '',
        pub_date: '',
        title: '',
      },
      viewer: null,
    }
  },
  watch: {
    viewer(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.viewer.setMarkdown(this.articleObj.content)
        }, 1000)
      }
    },
  },
  created() {
    this.getArticle(this.$route.params.article)
  },
  mounted() {
    this.contentWrite()
  },
  methods: {
    getArticle(id) {
      this.$axios
        .$get(`${process.env.BASE_URL}/web/articleContent/${parseInt(id)}`)
        .then((res) => {
          this.articleObj = res
        })
        .catch((err) => {
          console.error(err)
        })
    },
    contentWrite() {
      this.$nextTick(() => {
        this.viewer = new Viewer({
          el: this.$refs.viewerRef,
          height: '600px',
          initialValue: '',
          plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        })
      })
    },
  },
}
</script>
<style lang="scss">
.article-container {
  width: 100%;
  margin-top: 100px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  .article-main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 820px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .title {
      margin-bottom: 20px;
    }
    .autor-container {
      margin-bottom: 20px;
      width: 100%;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      .autor {
        font-size: 20px;
        font-weight: 500;
        color: #515767;
      }
      .pub-time {
        margin-top: 5px;
        font-size: 14px;
        color: #8a919f;
      }
    }
    .cover-img {
      margin-bottom: 20px;
      width: 100%;
      height: 425px;
      object-fit: cover;
    }
    .viewer {
      width: 100%;
    }
  }
}
</style>
