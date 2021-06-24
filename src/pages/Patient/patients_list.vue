<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
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
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>

        <!--        <v-spacer></v-spacer>-->
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
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="address"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.isMale"
                      label="isMale"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
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
      <v-form v-model="search_info.valid" >
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
</template>


<script>
import {getUserList,getInfoByPage,addInfo,deleteInfoByName,updateInfo,importDate} from '../../api/'

export default {
  data: () => ({
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
      {text: 'name', value: 'name'},
      {text: 'age', value: 'age'},
      {text: 'gender', value: 'gender'},
      {text: 'isPatient ', value: 'isPatient'},
      {text: 'legLength ', value: 'legLength'},
      {text: 'crotchWidth ', value: 'crotchWidth'},
      {text: 'height ', value: 'height'},
      {text: 'weight ', value: 'weight'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',//随机id
      name: '',//随机名称
      age: '',//随机昵称
      crotchWidth: 0,//随机电话号码
      gender: '',//随机地址
      height: '',//随机邮箱
      isPatient: '',//随机性别
      legLength: '',//创建时间
      type:'',
      weight:'',
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
      type:'',
      weight:'',
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
  },

  created () {
    this.getMockList()
  },

  methods: {
    // 获取病人分页列表
    async getMockList () {
      try {
        // const result = await getUserList()
        const result = await getInfoByPage(1,10)

        if (result.total > 0) {
          this.desserts = result.data
          console.log(this.desserts)
          for(var i = 0;i<this.desserts.length;i++){
            if(this.desserts[i].weight===null)
            {
              this.desserts[i].weight = '/'
            }

            if(this.desserts[i].isPatient===0)
            {
              this.desserts[i].isPatient = '否'
            }else {
              this.desserts[i].isPatient = '是'
            }
          }

        }
      } catch (error) {
        console.log(error)
      }
    },
    initialize () {
      this.desserts = this.getMockList()
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

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
