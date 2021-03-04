<template>
    <div id="app">

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <Header> od</Header>
            </el-header>
            <el-container style="height: 600PX; border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(246, 242, 238)">
                    <Aside></Aside>
                </el-aside>
                <el-container>
                    <el-main style="padding: 5px">
                        <router-view></router-view>
                    </el-main>

                </el-container>
            </el-container>
<!--            <el-footer>Footer</el-footer>-->
        </el-container>
    </div>
</template>

<script>

    import Aside from './layout/aside'
    import Header from './layout/header'


    export default {
        name: 'App',
        components: {
            Header,
            Aside,

        }
    }
</script>

<style>

    #app {

      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #dfe5ec;
      /*margin-top: 60px;*/
    }

    .el-footer, .el-header {
        background-color: #f6b32e;
        color: #333;
        text-align: center;
        line-height: 40px;

    }


    .el-main {

        background-color: rgb(246, 242, 238);
        color: #333;
        text-align: center;
        /* line-height: 20px; */
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
