<template>
    <div>
        <H1>MAXSULOTLAR JADVALI.</H1>

        <el-button type="warning" style="float: right" @click="dialogFormVisible = true">Maxsilot qo`shish</el-button>

        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Id"
                    prop="id"
                    width="50">
            </el-table-column>

            <el-table-column
                    label="NOMI"
                    prop="name">
            </el-table-column>

            <el-table-column
                    label="CODI"
                    prop="code">
            </el-table-column>

            <el-table-column
                    label="O`LCHOVI"
                    prop="type">
            </el-table-column>

            <el-table-column
                    label="TURI"
                    prop="directive">
            </el-table-column>

            <el-table-column
                    label="STATUSI"
                    prop="status">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="{}">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Nomi bo`ycha qidirish"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="Maxsulot kiritish" :visible.sync="dialogFormVisible" style="background-color: #8c939d">
            <el-form :model="product">
                <el-form-item label="Maxsulot nomi" :label-width="formLabelWidth">
                    <el-input v-model="product.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Maxsulot kodi" :label-width="formLabelWidth">
                    <el-input v-model="product.code" autocomplete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="14">
                        <el-form-item label="Maxsulot o`lchovi" :label-width="formLabelWidth"
                                      style="width: 400px; margin-right: 10px">
                            <el-select v-model="product.type" placeholder="Ulchov birligi">
                                <el-option label="KILOGRAM" value="KG"></el-option>
                                <el-option label="LITER" value="L"></el-option>
                                <el-option label="DONA" value="DONA"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Maxsulot turi" :label-width="formLabelWidth"
                                      style="width: 400px; margin-right: 10px">
                            <el-select v-model="product.directive" placeholder="Maxsulot turi">
                                <el-option label="MEVA" value="MEVA"></el-option>
                                <el-option label="SABZAVOT" value="SABZAVOT"></el-option>
                                <el-option label="SHIRINLIK" value="SHIRINLIK"></el-option>
                                <el-option label="GOSHT" value="GOSHT"></el-option>
                                <el-option label="NON" value="NON"></el-option>
                                <el-option label="BOSHQA" value="BOSHQA"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Maxsulot statusi" :label-width="formLabelWidth "
                                      style="width: 400px; margin-right: 10px">
                            <el-select v-model="product.status" placeholder="statusi">
                                <el-option label="FAOL" value="ACTIVE"></el-option>
                            </el-select>
                            <el-col :span="10"
                                    style="float: left; width: 95%; font-family: 'Code 128';font-size: 400%;    margin: 5px; height: 30px; padding-top: 5px;  ">
                                {{product.code}}
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" style="">
                        <el-upload style=" margin-right: 5px;
                        width: 150px;
                        height: 170px;
                        float: right;
                                          border: 1px dashed #d9d9d9;
                                          border-radius: 6px;
                                          cursor: pointer;
                                          position: relative;
                                          overflow: hidden;"
                                   class="avatar-uploader"
                                   action="http://localhost:8082/api/upload"
                                   :show-file-list="false"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload">

                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                        </el-upload>
                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
               <el-button @click="closeModal">Chiqish</el-button>
               <el-button type="primary" @click="save" :loading="loadingButton">Saqlqsh</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Product",
        data() {
            return {
                tableData: [],
                search: '',
                dialogFormVisible: false,
                loadingButton: false,
                product: {
                    id: null,
                    name: null,
                    code: null,
                    type: null,
                    status: null,
                    directive: null
                },
                formLabelWidth: '180px',
                imageUrl: '',
                file: '',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.product = row;
                this.dialogFormVisible = true;
            },
            handleDelete(index, row) {
                this.$confirm('O`chirishga ishonchingiz komilmi?', 'Delete', {
                    confirmButtonText: 'O`chirish',
                    cancelButtonText: 'Bekor qilish',
                    type: 'error'
                }).then(() => {
                    this.deleteProduct(row.id);
                    this.$message({
                        type: 'success',
                        message: 'O`chirildi'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'O`chirilmadi'
                    });
                });

            },
            save() {
                this.loadingButton = true;

                axios.post("api/product", this.product)
                    .then(res => {
                        this.loadingButton = false;
                        this.dialogFormVisible = false;
                        this.loadData();

                        this.$message({
                            type: 'success',
                            message: 'Saqlqndi'
                        });

                        console.log(res)
                    })
                this.dialogFormVisible = false;
                this.product = {}
            },
            loadData() {
                axios
                    .get("api/product")
                    .then(res => {
                        this.tableData = res.data.content;
                    })
            },
            closeModal() {
                this.dialogFormVisible = false;
                this.product = {}
            },
            deleteProduct(id) {
                axios
                    .delete(`api/product/${id}`)
                    .then(res => {
                        console.log(res)
                        this.loadData();
                    })

            },
            handleAvatarSuccess(res, file) {
                 this.imageUrl = URL.createObjectURL(file.raw);
                console.log(file.raw)


            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('Avatar picture must be JPG format!');
                }
                if (!isLt2M) {
                    this.$message.error('Avatar picture size can not exceed 2MB!');
                }
                return isJPG && isLt2M;

            }


        },
        created() {
            this.loadData();

        }

    }
</script>


<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
        width: 150px;
        height: 170px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 150px;
        height: 170px;
        display: block;
    }

</style>