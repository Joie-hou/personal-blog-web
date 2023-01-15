<template>
    <div class="page404">
        <svg-icon class="svg-icon-404" icon-class="404" />
        <nuxt-link to="/">
            <el-button type="primary" round>回到首页</el-button>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
<style lang="scss">
.page404{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    margin-top: 100px;
    .svg-icon-404 {
        width: 500px;
        height: 500px;
    }
}
</style>