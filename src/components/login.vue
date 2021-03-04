<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" :offset="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="always" style="margin-top: 30%">

                        <el-input size="small" placeholder="Loginni kirining" v-model="loginVM.username"></el-input>

                        <el-input placeholder="Parolni koriting" v-model="loginVM.password" @keyup.enter.native="login" show-password ></el-input>
                        <el-checkbox v-model="checked" style="margin-right: 16%">Saqlash</el-checkbox>
                        <el-button type="primary" plain style="padding: 6px 12px;"  @click="login">Logen</el-button>
                    </el-card>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import axios from 'axios'
    import AccountService from "../account/account.service";

    export default {
        name: "Login",
        data() {
            return {
                loginVM: {
                    username: null,
                    password: null,

                },
                checked: true
            }
        },
        methods: {
            login() {
                axios.post('api/login', this.loginVM)
                    .then(res => {
                        const token = res.data.token;
                        if (this.checked) {
                            localStorage.setItem('market-token', token);
                        } else {
                            console.log(sessionStorage)
                            sessionStorage.setItem('market-token', token);
                        }
                        new AccountService(this.$route, this.$store).retrieveAccount();
                        this.$router.push('/payment_list')
                    })
            }
        }
    }
</script>
<style scoped>
    .el-input {
        margin: 5px;
    }

</style>