<template>
  <div class="artcate-index-container infinite-list-wrapper">
    <el-empty
      v-if="articlesList.length === 0"
      description="暂无数据"
      :image-size="400"
    ></el-empty>
    <div
      v-infinite-scroll="load"
      class="list"
      infinite-scroll-disabled="disabled"
    >
      <el-card
        v-for="item in articlesList"
        :key="item.Id"
        class="article-item-card"
        shadow="hover"
      >
        <el-image
          style="width: 280px; height: 200px"
          :src="item.cover_img"
          fit="cover"
        ></el-image>
        <div class="right-content">
          <nuxt-link :to="'/article/' + item.Id">
            <div class="title">
              <h2>{{ item.title }}</h2>
            </div>
          </nuxt-link>
          <div class="right-content-footer">
            <div class="pub-time">
              {{ dayjs(item.pub_date).format('YYYY-MM-DD HH:mm') }}
            </div>
            <div class="author">{{ item.author_id }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'IndexPage',
  data() {
    return {
      dayjs,
      loading: false,
      listLength: 0,
      articlesList: [],
      artcateId: 0,
      articleQuery: {
        page: 1,
        pageSize: 4,
      },
    }
  },
  computed: {
    noMore() {
      return this.listLength === 0
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  watch: {
    artcateId(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (newValue) {
        this.articlesList = []
      }
    }
  },
  created() {
    this.artcateId = this.$route.query.id
    this.getArticleList()
  },
  methods: {
    // 获取文章
    getArticleList() {
      this.$axios
        .$get(`${process.env.BASE_URL}/web/articleList/${parseInt(this.artcateId)}`, {
          params: this.articleQuery,
        })
        .then((res) => {
          // eslint-disable-next-line array-callback-return
          res.articlesList.map((e) => {
            this.articlesList.push(e)
          })
          this.listLength = res.articlesList.length
        })
        .catch((err) => {
          this.listLength = 0
          console.error(err)
        })
    },

    load () {
        this.loading = true
        setTimeout(() => {
          this.articleQuery.page += 1
          this.getArticleList()
          this.loading = false
        }, 500)
      }
  },
}
</script>
<style lang="scss">
.artcate-index-container {
  width: 100%;
  height: calc(100% - 100px);
  //height: 2000px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .list {
    .article-item-card {
      margin-bottom: 20px;
      .el-card__body {
        display: flex;
        .right-content {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 380px;
          height: 200px;
          padding: 10px 20px;
          .right-content-footer {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>
