<template>
  <div class="artcate-index-container">
    <el-empty v-if="articlesList.length === 0" description="暂无数据" :image-size="400"></el-empty>
    <el-card v-for="item in articlesList" :key="item.Id" class="article-item-card" shadow="hover">
        <el-image
      style="width: 280px; height: 200px"
      :src="item.cover_img"
      fit="cover"></el-image>
      <div class="right-content">
        <nuxt-link :to="'/article/'+item.Id">
          <div class="title"><h2>{{ item.title }}</h2></div>
        </nuxt-link>
        <div class="right-content-footer">
          <div class="pub-time">{{ dayjs(item.pub_date).format('YYYY-MM-DD HH:mm') }}</div>
          <div class="author">{{ item.author_id }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs"
export default {
  name: 'IndexPage',
  data() {
    return {
      dayjs,
      articlesList: [],
      articleQuery: {
        page: 1,
        pageSize: 10,
      },
    }
  },
  created() {
    this.getArticleList(this.$route.query.id)
  },
  methods: {
    // 获取文章
    getArticleList(id) {
      this.$axios
        .$get(`${process.env.BASE_URL}/web/articleList/${parseInt(id)}`, {
          params: this.articleQuery,
        })
        .then((res) => {
           this.articlesList = res.articlesList
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss">
.artcate-index-container {
  width: 100%;
  height: calc(100% - 100px);
  height: 2000px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
