<template>
    <div class="page500">
        <svg-icon class="svg-icon-500" icon-class="500" />
        <nuxt-link to="/">
            <el-button type="primary" round>回到首页</el-button>
        </nuxt-link>
    </div>
</template>

<style lang="scss">
.page500{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    margin-top: 100px;
    .svg-icon-500 {
        width: 500px;
        height: 500px;
    } 
}
</style>