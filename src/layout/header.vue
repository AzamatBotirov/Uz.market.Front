<template xmlns:text-align="http://www.w3.org/1999/xhtml">

    <div>
        <el-container >
            <el-header style="text-align: right; font-size: 12px">
                <img style="width: 160px; height: 50px; float: left;"
                     src="../assets/Uz.gif">
                <el-dropdown>

                    <i class="el-icon-user-solid" style="margin-right: 5px; color: rgb(255,255,255)"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>View</el-dropdown-item>
                        <el-dropdown-item v-if="!authenticated"><span @click="login">Kirish</span></el-dropdown-item>
                        <el-dropdown-item v-else-if="authenticated"><span @click="logout">Chiqish</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span style="margin-right: 5px; color: rgb(232,8,8); font-family: 'Miama Nueva'">{{firstName}}</span>
            </el-header>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "Header",
        computed: {

            authenticated() {
                return this.$store.getters.authenticated;
            }

        },
        data() {
            return {

                firstName: this.$store.getters.account.firstName
            }
        },
        methods: {
            login() {
                this.$router.push("/login")
            },
            logout() {
                localStorage.removeItem("market-token")
                sessionStorage.removeItem("request-url")
                this.$store.commit("logout")
                this.$router.replace('/login')
            }
        }
    }
</script>
<style scoped>
    .i.el-icon-user-solid.el-dropdown {
        color: honeydew;
        margin-right: 3px;
    }

    .el-header {
        /*background-color: #4c98f6;*/
        /*color: rgb(146, 138, 190);*/
        text-align: center;
        line-height: 60px;
    }
</style>