<template>
  <v-container style="padding: 0">
    <v-row style="margin: 0">
      <div class="col-4" style="padding: 0;height: 100%">
        <v-card
          :loading="loading"
          class="mx-auto"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <div style="text-align: center" class="pa-5">
            <v-hover v-slot="{ hover }">
            <v-img class="pa-7 secondary rounded-circle d-inline-block"
                   height="200"
                   width="200"


                   src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            >
              <v-overlay
                :absolute="absolute"
                :value="hover"
              >
                <div>
                <v-icon
                @click="dialogFile=!dialogFile"
                >
                  mdi-camera
                </v-icon>
                </div>
                <span class="justify-center">更改</span>
              </v-overlay>
            </v-img>
            </v-hover>
          </div>
          <template>
            <form class="pa-6">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="20"
                    label="Name"
                    required

                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="age"
                    label="age"
                    required

                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="sex"

                    label="sex"
                    required

                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="isPatient"
                    label="身份"

                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="phoneNumber"
                    :error-messages="phoneNumberErrors"
                    label="phoneNumber"
                    required

                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="address"
                    label="address"
                    required

                  ></v-text-field>

                  <!--                  <v-text-field-->
<!--                    v-model="email"-->
<!--                    :error-messages="emailErrors"-->
<!--                    label="E-mail"-->
<!--                    required-->
<!--                    @input="$v.email.$touch()"-->
<!--                    @blur="$v.email.$touch()"-->
<!--                  ></v-text-field>-->
                </v-col>
              </v-row>



              <v-row>
                <v-col>
                  <v-text-field
                    v-model="height"
                    :error-messages="height_Errors"
                    label="身高/cm"
                    required

                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="legLength"
                    :error-messages="legLength_Errors"
                    label="腿长/cm"
                    required

                  ></v-text-field>

                </v-col>
                <v-col>
                  <v-text-field
                    v-model="weight"
                    :error-messages="weight_Errors"
                    label="体重/kg"
                    required

                  ></v-text-field>

                </v-col>
                <v-col>
                  <v-text-field
                    v-model="crotchWidth"
                    label="腰宽/cm"
                    required

                  ></v-text-field>

                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>上扣位置{{ up_site }}</p>
                </v-col>
                <v-col>
                  <p>下扣位置{{ down_site }}</p>

                </v-col>
              </v-row>
<!--              <v-checkbox-->
<!--                v-model="checkbox"-->
<!--                :error-messages="checkboxErrors"-->
<!--                label="Do you agree?"-->
<!--                required-->
<!--                @change="$v.checkbox.$touch()"-->
<!--                @blur="$v.checkbox.$touch()"-->
<!--              ></v-checkbox>-->
              <v-row justify="center">
              <v-btn
                color="green"
                class="mr-4"
                @click="submit"
              >
                提交
              </v-btn>
              <v-btn @click="reset" color="blue">
                刷新
              </v-btn>
              </v-row>
            </form>
          </template>

        </v-card>
      </div>
      <v-col class="col-8" style="padding: 0">
        <template>
          <div>
            <v-system-bar
              window
              light
            >
              <v-icon>mdi-message</v-icon>
              <span>治疗过程</span>
              <v-spacer></v-spacer>
            </v-system-bar>
          </div>
        </template>
        <template>
          <!--            :options.sync="options"-->
<!--                      :server-items-length="totalDesserts"-->
          <v-data-table
            v-model="selected"
            :single-select="singleSelect"
            show-select

            :headers="headers"
            :items="desserts"
            item-key="id"

            class="elevation-1"
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :loading="TFRLoading"
          >
<!--            @page-count="pageCount = $event"-->
            <template v-slot:top>
              <v-toolbar flat>

                <v-col class="col-4 pl-0">
                  <v-switch
                    v-model="singleSelect"
                    label="Single select"
                    hide-details
                  ></v-switch>
                </v-col>
                <v-col class="col-4 offset-4">
                  <v-row>
                    <v-col class="col-3 offset-6">
                      <v-btn
                        @click="deleteSelected"
                        color="red"
                      >删除
                      </v-btn>
                    </v-col>
                    <v-col class="col-3">
                      <v-btn
                        @click="addTFRecord"
                        class="primary"
                      >新增
                      </v-btn>
                    </v-col>

                  </v-row>

                </v-col>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">确认删除{{ selected.length }}条信息？</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialogDelete = !dialogDelete">取消</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogTFRecord" max-width="500px">
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
                              v-model="editedItem.id"
                              label="id"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.treatmentType"
                              label="treatmentType"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.startTime"
                              label="startTime"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.totalTime"
                              label="totalTime"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.effect"
                              label="effect"
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
                        @click="dialogAdd=dialogEdit=false"
                      >
                        取消
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveTRecord"
                      >
                        保存
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogFile" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">上传图片</v-card-title>
                    <v-card-text >
                      <div v-show="!up_image" class="text-center" style=" border: 1px solid #000;height: 200px;"
                         >
                        <v-file-input
                          :rules="fileRules"
                          hide-input
                          prepend-icon="mdi-cloud-upload"
                          accept="image/png, image/jpeg, image/bmp"
                          class="v-icon pa-md-16"
                          x-large
                          :value="head_image"
                        ></v-file-input>

                      </div>
                      <div
                        v-show="up_image" class="text-center" style="border: 1px solid #000;">

                      <v-img

                        class="pa-7 secondary rounded-circle d-inline-block"
                             height="200"
                             width="200"


                             src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                      ></v-img>
                      </div>
                      <div>
                        <small class="v-banner--single-line">上传图片文件:jpeg,png,bmp;</small>
                      </div>
                      <div>
                        <small>大小为200*200像素;<500kb</small>
                      </div>


                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="blue darken-1" text @click="dialogFile = !dialogFile">取消</v-btn>
                      <v-btn color="blue darken-1" text @click="fileConfirm">确认</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>


              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="blue"
                small
                @click="editItem(item)"
              >
                编辑
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
        </template>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {
  updateInfo,
  getDInfoByUid,
  deleteTreatmentRecord,
  addTreatmentRecord,
  updateTreatmentRecord,
  getTRecordsByPage,
  updateDInfo
} from '../../api/'
import {validationMixin} from 'vuelidate'
import {required, maxLength, email, between, numeric} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  mixins: [validationMixin],
  validations: {
    name: {required, maxLength: maxLength(20)},
    // email: {required, email},
    select: {required},
    checkbox: {
      checked (val) {
        return val
      },
    },
    height: {between: between(150, 200)},
    legLength: {required, between: between(50, 130)},
    weight: {required, between: between(30, 100)},
    phoneNumber: {numeric},

  },

  data: () => ({
    absolute: true,
    overlay: false,

    up_image:false,
    head_image:{},

    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialogDelete: false,
    dialogAdd: false,
    dialogEdit: false,
    dialogFile:false,
    singleSelect: false,
    editedIndex: -1,
    selected: [],

    totalDesserts: 0,
    TFRLoading: true,
    options: {},


    editedItem: {
      id: '',//随机id
      treatmentType: '',//随机名称
      startTime: '',//随机昵称
      totalTime: 0,//随机电话号码
      effect: '',//随机地址
    },
    oriTFRecordItem: {
      id: '',//随机id
      treatmentType: '',//随机名称
      startTime: '',//随机昵称
      totalTime: 0,//随机电话号码
      effect: '',//随机地址
    },

    loading: false,
    selection: 1,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: '治疗类型',
        align: 'start',
        sortable: false,
        value: 'treatmentType',
      },
      {text: '使用时间', value: 'startTime'},
      {text: '使用时长', value: 'totalTime'},
      {text: '效果', value: 'effect'},
      {text: 'Actions', value: 'actions', sortable: false},

    ],
    desserts: [],

    //个人详细信息
    name: '',
    sex: '',
    height: 180,
    legLength: 50,
    isPatient:0,
    weight: 50,
    age: null,
    address: '',
    up_site: 1,
    down_site: 1,
    phoneNumber: '',
    crotchWidth:'',
    regist_data:'',
    email: '',
    select: null,
    checkbox: false,

    fileRules: [
      value => !value || value.size < 200000 || 'Avatar size should be less than 2 MB!',
    ],
  }),
  computed: {
    weight_Errors () {
      const errors = []
      if (!this.$v.weight.$dirty) return errors
      !this.$v.weight.between && errors.push('Name must be < 100 and >30')
      !this.$v.weight.required && errors.push('Name is required.')
      return errors

    },
    height_Errors () {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.weight.between && errors.push('Name must be < 200 and >150')
      return errors

    },
    legLength_Errors () {
      const errors = []
      if (!this.$v.legLength.$dirty) return errors
      !this.$v.legLength.between && errors.push('Name must be < 100 and >30')
      !this.$v.legLength.required && errors.push('Name is required.')

      return errors

    },
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.numeric && errors.push('Must be number')
      return errors
    },
    formTitle () {
      if (this.dialogEdit) {
        return '编辑'
      }
      if (this.dialogAdd) {
        return '新增'
      }
    },
    dialogTFRecord(){
      return this.dialogEdit||this.dialogAdd
    }
  },

  methods: {
    fileConfirm(){
      this.dialogFile = false

    },
    async getDInfoByUid () {
      try {
        const result = await getDInfoByUid(this.$route.params.id)

        // const result = (await axios.get('/api/basic/detail/' + String(this.$route.params.id))).data
        console.log('getDInfoByUid',result)
        // if (result.code === 0) {
          const person_ = result
          // console.log(person_.desserts.list)
          this.name = person_.name
          this.sex = person_.sex!=="male" ? '男' : '女'
          this.height = person_.height
          this.legLength = person_.legLength
          this.weight = person_.weight
          this.age = person_.age
          this.address = person_.address
          this.up_site = person_.up_site
          this.down_site = person_.down_site
          this.phoneNumber = person_.number
          this.email = person_.email
        this.crotchWidth = person_.crotchWidth
        this.isPatient = person_.isPatient ? "病人":"正常人"
        this.regist_data = person_.date
          // this.desserts = person_.desserts.list
        // }
      } catch (error) {
        console.log(error)
      }
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    async submit () {
      var dinfo = {
        id:parseInt(this.$route.params.id),
        // uid:parseInt(this.$route.params.id),
        name: this.name,
        gender:this.sex==="男" ? "male":"female" ,
        height:this.height,
        legLength:this.legLength,
        weight:this.weight,
        age:this.age,
        type:0,
        address:this.address,
        number:this.phoneNumber,
        crotchWidth:this.crotchWidth,
        isPatient:this.isPatient==="病人"?1:0,
        date:this.regist_data,
      }
      try {
        const result = await updateDInfo(dinfo)
        const result1 = await updateInfo(dinfo)
        console.log(result,result1)
      }catch (error){
        console.log(error)
      }



    },
    reset () {
      this.getDInfoByUid()

      // this.$v.$reset()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    async deleteItemConfirm () {
      const idList = []
      for (let i = 0; i < this.selected.length; i++) {
        idList.push(this.selected[i].id)
      }
      console.log('idList',idList,idList.constructor===Array)
      try {
        const result = await deleteTreatmentRecord(idList[0])
        console.log(result)
        if (result.msg === "删除成功！") {
          console.log('删除成功')
          alert("删除成功")
          await this.setRecordsByPage_()
        }
      } catch (error) {
        console.log(error)
      }
      this.closeDelete()
    },
    deleteSelected () {
      console.log('selected',this.selected)
      this.dialogDelete = true

    },
    async saveTRecord () {
      // console.log(this.editedItem)
      if (this.dialogAdd) {
        try {
          this.editedItem['uid'] = this.$route.params.id
          const result = await addTreatmentRecord(this.editedItem)
          console.log(result)
          if (result.msg === '添加成功！') {
            await this.setRecordsByPage_()
            alert('新增了一条数据')
          }
        } catch (error) {
          console.log(error)
        }
        this.dialogAdd = false
      }
      if (this.dialogEdit) {
        console.log('编辑了一条数据')
        try {
          const result = await updateTreatmentRecord(this.editedItem)
          console.log(result)
          // if (result.code === 0) {
          //   console.log('新增了一条数据')
          // }
        } catch (error) {
          console.log(error)
        }
        this.dialogEdit = false
      }
    },
    editItem(item){
      // console.log(item)
      this.dialogEdit = true
      this.editedItem = item

    },
    addTFRecord(){
      this.dialogAdd=true
      this.editedItem = this.oriTFRecordItem
    },
    async setRecordsByPage_ () {
      this.TFRLoading = true
      try {
        const result = await getTRecordsByPage(this.page,this.itemsPerPage,null,this.$route.params.id)
        console.log("getDataFromApi",result)
        if (result.total >= 0) {
          this.desserts = result.data
          this.pageCount = Math.ceil(Number(result.total)/this.itemsPerPage)
          this.TFRLoading = false
          console.log('更新列表:', this.pageCount , this.TFRLoading)
        }
      } catch (error) {
        console.log(error)
      }
    },

  },
  created () {
    this.getDInfoByUid()
    this.setRecordsByPage_()
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
    page(val){
      console.log("页码变化了")
      this.setRecordsByPage_()
    },
    itemsPerPage(val){
      console.log("大小变化了")
      this.setRecordsByPage_()
    },
    head_image(val){
      console.log("图片的内容变化了",this.head_image)
    }
  },
  mounted () {
    // this.setRecordsByPage_()
  }
}
</script>

