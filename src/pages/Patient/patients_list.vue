<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"

      item-key="id"
      hide-default-footer
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :loading="info_list_loading"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>用户信息</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-switch
            style="margin-left: 10%"
            v-model="switch_search"
            inset
            label="高级搜索"
            hide-details

          ></v-switch>
          <v-spacer style="max-width: 60%"></v-spacer>
          <div style="max-width: 400px;width: 300px;margin-right:50px ">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="姓名"
              single-line
              hide-details
              @click:append="searchName()"
            ></v-text-field>
          </div>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                style="margin-right:40px ;margin-left: 20px"
              >
                新建
              </v-btn>
              <v-btn
                color="primary"
                dark
                class="mb-2"
              >
                导入
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="姓名"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.age"
                        label="年龄"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.gender"
                        :items="['male','female']"
                        label="性别"
                      ></v-select>
                      <!--                    <v-text-field-->
                      <!--                      v-model="editedItem.gender"-->
                      <!--                      label="性别"-->
                      <!--                    ></v-text-field>-->
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="editedItem.type"
                        :items="[0,1,2,3]"
                        label="类别"
                      ></v-select>
                      <!--                    <v-text-field-->
                      <!--                      v-model="editedItem.type"-->
                      <!--                      label="类别"-->
                      <!--                    ></v-text-field>-->
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.height"
                        label="身高 (cm)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  取消
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">确认删除此用户？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-expand-transition>
          <v-card v-show="switch_search">
            <v-form v-model="search_info.valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="2"
                  >
                    <v-text-field
                      v-model="search_info.firstname"
                      hide-details
                      label="First name"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="2"
                  >
                    <v-text-field
                      v-model="search_info.lastname"
                      label="Last name"
                      hide-details
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="2"
                  >
                    <v-text-field
                      v-model="search_info.email"
                      hide-details
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn>
                      <v-icon
                        @click=""
                      >
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </v-col>


                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-expand-transition>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          color="blue"
          small
          @click="toUserDetailsItem(item)"
        >
          详情
        </v-btn>
        <v-icon
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          重置
        </v-btn>
      </template>
    </v-data-table>
    <v-row class="text-center pt-2">
      <v-text-field
        class="col-4 pl-8"
        :value="itemsPerPage"
        label="个数"
        type="number"
        min="1"
        max="15"
        style="max-width: 100px"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>

      <v-pagination
        class="col-6 offset-2"
        v-model="page"
        :length="pageCount"
        total-visible="5"
      ></v-pagination>

    </v-row>
  </v-container>
</template>


<script>
import {getInfoByPage, addInfo, deleteInfoByName, importDate, searchInfoByPage} from '../../api/'

export default {
  data: () => ({
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    info_list_loading: true,

    switch_search: false,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: '姓名', value: 'name'},
      {text: '年龄', value: 'age'},
      {text: '性别', value: 'gender'},
      {text: '身份 ', value: 'isPatient'},
      {text: '腿长 ', value: 'legLength'},
      {text: '腰宽 ', value: 'crotchWidth'},
      {text: '身高 ', value: 'height'},
      {text: '体重 ', value: 'weight'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      // id: '',//随机id
      name: '',//随机名称
      age: 0,//随机昵称
      // crotchWidth: 0,//随机电话号码
      gender: '',//随机地址
      height: '',//随机邮箱
      // isPatient: '',//随机性别
      // legLength: '',//创建时间
      type: '',
      // weight:'',
    },
    defaultItem: {
      id: '',//随机id
      name: '',//随机名称
      age: '',//随机昵称
      crotchWidth: 0,//随机电话号码
      gender: '',//随机地址
      height: '',//随机邮箱
      isPatient: '',//随机性别
      legLength: '',//创建时间
      type: '',
      weight: '',
    },
    search_info: {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新建' : '编辑'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    page (val) {
      console.log('页码变化了')
      this.getInfoByPage_()
    },
    itemsPerPage (val) {
      console.log('大小变化了')
      this.getInfoByPage_()
    },
  },

  created () {
    this.getInfoByPage_()
  },

  methods: {
    // 获取病人分页列表
    async getInfoByPage_ () {
      this.info_list_loading = true
      try {
        const result = await getInfoByPage(this.page, this.itemsPerPage)
        console.log(result)

        if (result.total > 0) {
          this.info_list_loading = false
          this.desserts = result.data
          console.log(result.data)
          this.pageCount = Math.ceil(Number(result.total) / this.itemsPerPage)
          for (var i = 0; i < this.desserts.length; i++) {
            if (this.desserts[i].weight === null) {
              this.desserts[i].weight = '/'
            }

            if (this.desserts[i].isPatient === 0) {
              this.desserts[i].isPatient = '否'
            } else {
              this.desserts[i].isPatient = '是'
            }
          }

        }
      } catch (error) {
        console.log(error)
      }
    },
    initialize () {
      this.desserts = this.getInfoByPage_()
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    toUserDetailsItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      console.log(this.desserts, this.editedIndex)
      this.$router.replace('/patient_info/' + this.desserts[this.editedIndex].id)
    },

    deleteItemConfirm () {
      try {
        const result = deleteInfoByName(this.desserts[this.editedIndex].id)
        console.log(result)
        if (result.msg === '删除成功！') {
          console.log('delete_ok')
          this.getInfoByPage_()
        }

      } catch (e) {

      }
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async searchName () {
      try {
        const result = await searchInfoByPage(this.page, this.itemsPerPage, {name: this.search})
        console.log(result)
        if (result.total > 0) {
          this.info_list_loading = false
          this.desserts = result.data
          console.log(result.data)
          this.pageCount = Math.ceil(Number(result.total) / this.itemsPerPage)
          for (var i = 0; i < this.desserts.length; i++) {
            if (this.desserts[i].weight === null) {
              this.desserts[i].weight = '/'
            }

            if (this.desserts[i].isPatient === 0) {
              this.desserts[i].isPatient = '否'
            } else {
              this.desserts[i].isPatient = '是'
            }
          }

        }
      } catch (e) {

      }

    },

    async save () {
      console.log(this.editedItem)
      try {
        const result = await addInfo(this.editedItem)
        console.log(result.msg)
        if (result.msg === '添加成功！') {
          this.getInfoByPage_()
        }
      } catch (e) {
        console.log(e)
      }
      this.close()
    },
  },
}
</script>
