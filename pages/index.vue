<template>
  <div class="home-index-container">
    
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  created() {
    
  },
  methods: {
    // 获取文章
    getArticleList(id) {
      this.$axios
        .$get(`${process.env.BASE_URL}/web/articleList/${id}`, {params: this.articleQuery} )
        .then((res) => {
          console.log(res)
          // this.menuList = res.artcateList
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>
<style lang="scss">
.home-index-container {
  width: 100%;
  height: calc(100% - 100px);
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
