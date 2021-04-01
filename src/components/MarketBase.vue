<template>
    <div>
        <h1>Mahsulotlarni ro`haga olosh</h1>


        <el-row :gutter="20" style="">
            <el-col :span="7" style="margin: 5px; float: left;">
                <el-input
                        placeholder="Maxculad kodi"
                        v-model="productCode"
                        @keyup.enter.native="onEnter">
                </el-input>
            </el-col>
            <span v-if="hasProduct">
            <el-col :span="10"
                    style="border: 1px solid #ced7d7; float: left; width: 60%;  background-color: #fafafa; border-radius: 4px;   margin: 5px; height: 40px; padding-top: 5px;  ">
                 {{product.name}}
            </el-col>

            <el-col :span="4" style=" margin: 5px; float: left; ">
                <el-input placeholder="Miqdori" v-model="marketBase.quantity">Soni</el-input>
            </el-col>

            <el-col :span="5" style=" margin: 5px; float: left; ">
                <el-date-picker type="date" placeholder="Pick a date" v-model="marketBase.date"
                                style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="5" style=" margin-top: 5px; float: left; ">
                <el-input placeholder="Olish narhi" v-model="marketBase.price">Soni</el-input>
            </el-col>
            <el-col :span="5" style=" margin: 5px; float: left; ">
                <el-input placeholder="Sotish narhi" v-model="marketBase.currentPrice"
                          @keyup.enter.native="addMarketBase">Soni</el-input>
            </el-col>
                <el-button plain @click="addMarketBase" style="margin-right: 79px; margin-top: 5px">OK</el-button>
            </span>
        </el-row>
        <el-button type="primary" plain style="float:right;" @click="saveDate">Bazaga saqlqsh</el-button>
        <el-table
                :data="marketBaseList"
                border
                height="350px"
                :summary-method="getSummaries"
                show-summary
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="product.code"
                    label="Kodi"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="product.name"
                    label="Mahsulotlarni nomi"
                    width="210">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="Soni"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Yaroqlilik mudati">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="Olish narhi (so`m)">
            </el-table-column>
            <el-table-column
                    prop="currentPrice"
                    label="Sotish narhi (so`m)">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "MarketBase",
        data() {

            return {
                marketBaseList: [],
                marketBase: {
                    quantity: null,
                    price: null,
                    currentPrice: null,
                    date: '',
                    product: {
                        id: null,
                        name: null,
                        code: null,
                    }
                },

                hasProduct: false,
                productCode: null,
                product: null,
            };
        },

        methods: {
            getProduct() {
                axios
                    .get(`api/product/code?code=${this.productCode}`)
                    .then(res => {
                        if (res.data != null && res.data != undefined && res.data != '') {
                            this.hasProduct = true;
                            this.product = res.data;
                        }
                    })
            },
            onEnter() {
                this.getProduct();
                console.log("onEnter")
            },

            addMarketBase() {
                this.marketBase.product = this.product;
                this.marketBaseList.push(this.marketBase);
                this.marketBase = {}
                this.productCode = ''
                this.hasProduct = false;
            },
            saveDate() {
                axios
                    .post("api/market-base/list", this.marketBaseList)
                    .then(res => {
                        console.log(res)
                        this.marketBaseList = []
                    })
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {

        border: 1px dashed #615f5f;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>