<template>
    <div>

        <h3>Omabrdagi mahsular ro`yhati</h3>

        <el-table
                :data="marketBaseList.filter(data => !search || data.product.name.toLowerCase().includes(search.toLowerCase()))"
                border
                height="403"
                show-summary
                style="width: 100%">

            <el-table-column
                    label="No"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Code"
                    prop="product.code"
                    width="100">
            </el-table-column>

            <el-table-column
                    label="Name"
                    prop="product.name">
            </el-table-column>

            <el-table-column
                    prop="quantity"
                    label="Mqdori"
                    width="100">

            </el-table-column>

            <el-table-column
                    label="Type"
                    prop="product.type"
                    width="80">
            </el-table-column>

            <el-table-column
                    prop="marketBase.creteDate"
                    label="Keltirilgan sanasi"
                    width="95">
            </el-table-column>

            <el-table-column
                    prop="date1"
                    label="Yaroqlilik  mudati"
                    width="95">
            </el-table-column>

            <el-table-column
                    prop="price"
                    label="Olish narhi (so`m)"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="currentPrice"
                    label="Sotish narhi (so`m)"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="{}">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                </template>


            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "MarketBaseList",
        data() {
            return {
                marketBaseList: [],
                search: '',
            }
        },
        methods: {
            loadData() {
                axios
                    .get("api/market-base")
                    .then(res => {
                        console.log(res)
                        this.marketBaseList = res.data.content;
                    })

            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },


        created() {
            this.loadData();
        }
    }
</script>

<style scoped>

</style>