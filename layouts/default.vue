<template>
  <div class="default-layout-container">
    <div class="nav-header-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="#000"
        active-text-color="#1e80ff"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuList.slice(0, 11)"
          :key="item.Id"
          :index="String(item.Id)"
          >{{ item.name }}</el-menu-item
        >
        <el-submenu v-if="menuList.slice(11, menuList.length).length > 0" index="null">
          <template slot="title">更多</template>
          <el-menu-item
            v-for="item in menuList.slice(11, menuList.length)"
            :key="item.Id"
            :index="String(item.Id)"
            >{{ item.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
    <el-backtop target=".default-layout-container"></el-backtop>
    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      menuList: [],
    }
  },
  created() {
    this.getArtcateList()
  },
  methods: {
    // 获取文章分类
    getArtcateList() {
      this.$axios
        .$get(`${process.env.BASE_URL}/web/cates`, {
          params: {
            status: 0,
            page: 1,
            pageSize: 1000,
          },
        })
        .then((res) => {
          this.menuList = res.artcateList
          this.activeIndex = String(res.artcateList[0].Id)
          this.$router.push({
            path: `/artcate/${res.artcateList[0].alias}`,
            query: {
              id: res.artcateList[0].Id,
            },
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key
      const result = this.menuList.filter((value) => {
        return value.Id === parseInt(key)
      })
      this.$router.push({
        path: `/artcate/${result[0].alias}`,
        query: {
          id: `${result[0].Id}`,
        },
      })
    },
  },
}
</script>
<style lang="scss">
.default-layout-container {
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  box-sizing: border-box;
  .nav-header-container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1500;
    width: 100%;
    box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    background-color: #fff;
    .el-menu-demo {
      .el-menu-item {
        &:hover {
          background-color: transparent;
          color: #1e80ff !important;
        }
      }
      .el-submenu__title {
        &:hover {
          background-color: transparent;
          color: #1e80ff !important;
        }
      }
    }
    .el-menu--horizontal {
      border-bottom: none;
    }
  }
}
.el-menu--horizontal {
  border-bottom: none;
  .el-menu {
    .el-menu-item {
      &:hover {
        background-color: transparent;
        color: #1e80ff !important;
      }
    }
  }
}
</style>
