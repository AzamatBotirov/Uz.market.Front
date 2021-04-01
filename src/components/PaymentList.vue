<template>
    <div>
        <el-row style="margin: 5px;">
            <el-col :span="14" style="border: 2px solid #928f8f;
             border-radius: 4px;  height: 80px; background-color: #f8c27f ;box-shadow: 12px 12px 2px 1px rgba(153,62,4,0.2);">
                <el-input style="width: 30%; margin-top: 20px; margin-right: 30%"
                          placeholder="Maxsulad kodi"
                          v-model="productCode"
                          @keyup.enter.native="onEnter">
                </el-input>
                <el-input style="width: 30%"
                          placeholder="Maxsulad miqdori"
                          v-model="cashQuantity"
                          @keyup.enter.native="onEnter">
                </el-input>
            </el-col>
            <el-col :span="9" style="border: 2px solid #a5a2a2; margin-left: 30px; height: 80px; border-radius: 4px;
             box-shadow: 12px 12px 2px 1px rgba(153,62,4,0.2);background-color: #fbfbfc;  ">


            </el-col>

        </el-row>

        <el-row style="margin: 5px;">
            <el-col :span="14"
                    style="margin-block-end: 10px; border: 2px solid #928f8f; border-radius: 4px;
                    box-shadow: 12px 12px 2px 1px rgba(153,62,4,0.2);  height: 400px;background-color: #fcfdfd ">
                <el-table
                        :data="paymentList"
                        border
                        show-summary
                        style="width: 100%; "
                        max-height="380">
                    <el-table-column
                            fixed
                            type="index"
                            label="No"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="product.name"
                            label="Nomi"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="Miqdori"
                            width="80">
                        <template>
                            <span>{{cashQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cPrice"
                            style=" font-size: 5px;"
                            label="Qimati">
                        <template #default="{row}">
                            <span>{{1}}{{row.product.type }}{{- row.currentPrice }}{{" so`m"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sum"

                            label="Summasi">
                        <template #default="{row}">
                            <span>{{row.currentPrice  * quantity}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="sum"
                            label="O`chirish"
                            width="60">
                        <template #default="{row}">
                            <el-button type="danger" icon="el-icon-delete" @click="deleteRoe(row)" circle
                                       v-if="hashAnyAuth('ROLE_ADMIN') && authenticated"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="9" style="border: 2px solid #a5a2a2; margin-left: 30px; height: 400px; border-radius: 4px;
             box-shadow: 12px 12px 2px 1px rgba(153,62,4,0.2);background-color: #fbfbfc;  ">


                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane label="Mevalar">
                        <el-button type="text" @click="centerDialogVisibl = true">Maxsuotni tanlang Mevalarlar rasimli
                            buttenlar
                        </el-button>

                        <el-dialog
                                title="Ogohlantirish!"
                                :visible.sync="centerDialogVisibl"
                                width="25%"
                                center
                                @keyup.enter.native="centerDialogVisibl = false">
                            <span style="float: contour">MAXSULOTNI TAROZIGA QO`YING!!!</span>
                            <span slot="footer" class="dialog-footer">
                              <el-button type="primary"  @click="centerDialogVisibl = false">Tastiqlang</el-button>
                            </span>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="Sabzovod">
                        <el-button type="text" @click="DialogVisible = true">Maxsuotni tanlang Sabzovodlar rasimli
                            buttenlar
                        </el-button>
                        <el-dialog
                                @keyup.enter.native="DialogVisible = false"
                                title="Ogohlantirish!"
                                :visible.sync="DialogVisible"
                                width="25%"
                                center>
                            <span style="float: contour">MAXSULOTNI TAROZIGA QO`YING!!!</span>
                            <span slot="footer" class="dialog-footer">
                               <el-button type="primary" @click="DialogVisible = false">Tastiqlang</el-button>
                             </span>
                        </el-dialog>
                    </el-tab-pane>
                    <el-tab-pane label="Shirinlik">
                        <el-button type="text" @click="cDialogVisible = true">Maxsuotni tanlang Shirinliklar
                            rasimli buttenlar
                        </el-button>
                        <el-dialog
                                title="Ogohlantirish!"
                                :visible.sync="cDialogVisible"
                                width="25%"
                                center>
                            <span style="float: contour">MAXSULOTNI TAROZIGA QO`YING!!!</span>
                            <span slot="footer" class="dialog-footer">
                               <el-button type="primary" @click="cDialogVisible = false">Tastiqlang</el-button>
                             </span>
                        </el-dialog>

                    </el-tab-pane>
                    <el-tab-pane label="Go`st ">
                        <el-button type="text" @click="cenDialogVisible = true">Maxsuotni tanlang Go`sht va Kalbasa<br>
                            maxculotlari rasimli buttenlar
                        </el-button>
                        <el-dialog
                                title="Ogohlantirish!"
                                :visible.sync="cenDialogVisible"
                                width="25%"
                                center>
                            <span style="float: contour">MAXSULOTNI TAROZIGA QO`YING!!!</span>
                            <span slot="footer" class="dialog-footer">
                               <el-button type="primary" @click="cenDialogVisible = false">Tastiqlang</el-button>
                             </span>
                        </el-dialog>

                    </el-tab-pane>
                    <el-tab-pane label="Boshqa ">
                        <el-button type="text" @click="centerDialogVisible = true">Maxsuotni tanlang Boshqa turdagi
                            maxculotlari rasimli buttenlar
                        </el-button>
                        <el-dialog
                                title="Ogohlantirish!"
                                :visible.sync="centerDialogVisible"
                                width="25%"
                                center>
                            <span style="float: contour">MAXSULOTNI TAROZIGA QO`YING!!!</span>
                            <span slot="footer" class="dialog-footer">
                               <el-button type="primary" @click="centerDialogVisible = false">Tastiqlang</el-button>
                             </span>
                        </el-dialog>

                    </el-tab-pane>
                </el-tabs>
            </el-col>


        </el-row>
        <el-row style="margin: 5px;">
            <el-col :span="24"
                    style="margin-block-end: 10px; width: 99%; border: 2px solid #928f8f; border-radius: 4px;
                     box-shadow: 12px 12px 2px 1px rgba(153,62,4,0.2);  height: 70px;background-color: #fcfdfd ">

            </el-col>
        </el-row>

    </div>
</template>

<script>
    import axios from 'axios'
    import AccountService from "../account/account.service";

    export default {

        name: "PaymentList",
        data() {
            return {
                paymentList: [],
                productCode: null,
                marketBase: {
                    quantity: null,
                    price: null,
                    currentPrice: null,
                    date1: '',
                    product: {
                        id: null,
                        name: name,
                        code: null,
                    }
                },

                quantity: null,
                cashQuantity: null,

                centerDialogVisible: false,
                cDialogVisible: false,
                centerDialogVisibl: false,
                DialogVisible: false,
                cenDialogVisible: false,
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
            },

            getProduct() {
                axios
                    .get(`api/market-base/code?code=${this.productCode}`)



                    .then(res => {
                        if (res.data == null || res.data == undefined || res.data == '') {
                            alert("Bunday maxsulot bazada yo`q!")
                            return
                        }
                        console.log(res)

                        this.marketBase = res.data;
                        const index = this.paymentList.indexOf(res.data);
                        if (index > -1) {
                            this.paymentList[index].cashQuantity += 1
                        } else {
                            this.paymentList.push(this.marketBase);
                        }

                        this.marketBase = {}
                        this.productCode = null;
                        this.quantity = null;


                    })
            },

            onEnter() {
                this.getProduct();
                console.log("onEnter")
            },
            deleteRoe(row) {
                const index = this.paymentList.indexOf(row)
                if (index > -1) {
                    this.paymentList.splice(index, 1);
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }

    }
</script>

<style scoped>


</style>