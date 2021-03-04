<template>
    <div>
        <el-container>
            <el-aside width="200px" style="background-color: rgb(246, 242, 238); font-family: 'Forte'"
                      v-if="hashAnyAuth('ROLE_ADMIN') && authenticated">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-info"></i>Ma`lumotlar</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="/product">Maxsulotlar</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/market-base">Ro`yhatga olish</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="/market-base/list">Ombordagi maxsulot</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item index="1-3">
                            <router-link to="/payment_list">Sotuv qismi</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
                        <el-menu-item-group>
                            <template slot="title">Group 1</template>
                            <el-menu-item index="2-1">Option 1</el-menu-item>
                            <el-menu-item index="2-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="2-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                            <template slot="title">Option 4</template>
                            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
                        <el-menu-item-group>
                            <template slot="title">Group 1</template>
                            <el-menu-item index="3-1">Option 1</el-menu-item>
                            <el-menu-item index="3-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="3-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                            <template slot="title">Option 4</template>
                            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
        </el-container>
    </div>
</template>
<script>
    import AccountService from "../account/account.service";

    export default {
        name: "Aside",
        data() {
            return {
                hasAnyAuthorityValue: false
            }
        },
        computed: {
            authenticated() {
                return this.$store.getters.authenticated;
            }
        },
        methods: {
            hashAnyAuth(authorities) {
                new AccountService(this.$router, this.$store)
                    .hasAnyAuthorityAndAuth(authorities)
                    .then(value => {
                        this.hasAnyAuthorityValue = value;
                    });
                return this.hasAnyAuthorityValue;
            }
        }

    }
</script>
<style scoped>
    .el-aside {
        /*background-color: #063363;*/
        color: rgb(49, 8, 124);
        text-align: center;
        line-height: 200px;
    }
</style>