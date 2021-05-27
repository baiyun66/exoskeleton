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
            <v-img class="pa-7 secondary rounded-circle d-inline-block"
                   height="200"
                   width="200"
                   src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
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
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="age"
                    label="age"
                    required
                    @input="$v.age.$touch()"
                    @blur="$v.age.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="sex"

                    label="sex"
                    required
                    @input="$v.sex.$touch()"
                    @blur="$v.sex.$touch()"
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
                    @input="$v.phoneNumber.$touch()"
                    @blur="$v.phoneNumber.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>

                <v-text-field
                  v-model="address"
                  label="address"
                  required
                  @input="$v.address.$touch()"
                  @blur="$v.address.$touch()"
                ></v-text-field>



              <v-row>
                <v-col>
                  <v-text-field
                    v-model="height"
                    :error-messages="height_Errors"
                    label="身高"
                    required
                    @input="$v.height.$touch()"
                    @blur="$v.height.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="thigh_len"
                    :error-messages="thigh_len_Errors"
                    label="大腿长"
                    required
                    @input="$v.thigh_len.$touch()"
                    @blur="$v.thigh_len.$touch()"
                  ></v-text-field>

                </v-col>
                <v-col>
                  <v-text-field
                    v-model="shank_len"
                    :error-messages="shank_len_Errors"
                    label="小腿长"
                    required
                    @input="$v.shank_len.$touch()"
                    @blur="$v.shank_len.$touch()"
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
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn
                class="mr-4"
                @click="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
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
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="10"
            class="elevation-1"
          ></v-data-table>
        </template>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {getUserInfo} from '../../api/'
import {validationMixin} from 'vuelidate'
import {required, maxLength, email, between, numeric} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: {required, maxLength: maxLength(20)},
    email: {required, email},
    select: {required},
    checkbox: {
      checked (val) {
        return val
      },
    },
    height: {between: between(150, 200)},
    thigh_len: {required, between: between(30, 80)},
    shank_len: {required, between: between(30, 80)},
    phoneNumber: {numeric}

  },

  data: () => ({
    // person:{
    //   name:"小明",
    //   height:180,
    //   thigh_len:50,
    //   shank_len:50,
    //   age:30,
    //   up_site:1,
    //   down_site:1,
    // },

    loading: false,
    selection: 1,
    headers: [
      {
        text: '治疗类型',
        align: 'start',
        sortable: false,
        value: 'treatmentType',
      },
      {text: '使用时间', value: 'startTime'},
      {text: '使用时长', value: 'totalTime'},
      {text: '效果', value: 'effect'},
    ],

    desserts: [
      {
        'treatmentType': '脑电康复',
        'startTime': '2020/12/13',
        'totalTime': '162',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2021/2/9', 'totalTime': '227', 'effect': '好'}, {
        'treatmentType': '机械康复',
        'startTime': '2021/2/4',
        'totalTime': '72',
        'effect': '差'
      }, {'treatmentType': '脑电康复', 'startTime': '2019/6/3', 'totalTime': '41', 'effect': '好'}, {
        'treatmentType': '脑电康复',
        'startTime': '2021/1/4',
        'totalTime': '62',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2020/7/26', 'totalTime': '179', 'effect': '好'}, {
        'treatmentType': '机械康复',
        'startTime': '2019/8/7',
        'totalTime': '187',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2018/4/4', 'totalTime': '266', 'effect': '中'}, {
        'treatmentType': '脑电康复',
        'startTime': '2019/10/6',
        'totalTime': '77',
        'effect': '中'
      }, {'treatmentType': '机械康复', 'startTime': '2019/1/16', 'totalTime': '95', 'effect': '好'}, {
        'treatmentType': '机械康复',
        'startTime': '2021/3/23',
        'totalTime': '48',
        'effect': '好'
      }, {'treatmentType': '脑电康复', 'startTime': '2019/1/5', 'totalTime': '149', 'effect': '中'}, {
        'treatmentType': '脑电康复',
        'startTime': '2020/9/24',
        'totalTime': '130',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2020/4/13', 'totalTime': '85', 'effect': '中'}, {
        'treatmentType': '脑电康复',
        'startTime': '2021/2/25',
        'totalTime': '41',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2018/7/24', 'totalTime': '233', 'effect': '差'}, {
        'treatmentType': '脑电康复',
        'startTime': '2019/2/21',
        'totalTime': '251',
        'effect': '差'
      }, {'treatmentType': '脑电康复', 'startTime': '2021/1/1', 'totalTime': '122', 'effect': '中'}, {
        'treatmentType': '脑电康复',
        'startTime': '2021/9/1',
        'totalTime': '174',
        'effect': '好'
      }, {'treatmentType': '脑电康复', 'startTime': '2021/8/6', 'totalTime': '261', 'effect': '差'}, {
        'treatmentType': '机械康复',
        'startTime': '2018/6/26',
        'totalTime': '50',
        'effect': '中'
      }, {'treatmentType': '机械康复', 'startTime': '2018/5/6', 'totalTime': '199', 'effect': '中'}, {
        'treatmentType': '机械康复',
        'startTime': '2018/9/3',
        'totalTime': '83',
        'effect': '中'
      }, {'treatmentType': '脑电康复', 'startTime': '2020/3/13', 'totalTime': '57', 'effect': '差'}, {
        'treatmentType': '机械康复',
        'startTime': '2021/9/27',
        'totalTime': '179',
        'effect': '好'
      }, {'treatmentType': '机械康复', 'startTime': '2018/7/23', 'totalTime': '279', 'effect': '好'}, {
        'treatmentType': '机械康复',
        'startTime': '2018/3/5',
        'totalTime': '217',
        'effect': '中'
      }, {
        'treatmentType': '机械康复',
        'startTime': '2018/10/19',
        'totalTime': '119',
        'effect': '好'
      }, {'treatmentType': '机械康复', 'startTime': '2018/12/1', 'totalTime': '20', 'effect': '差'}, {
        'treatmentType': '机械康复',
        'startTime': '2020/3/10',
        'totalTime': '32',
        'effect': '差'
      }, {'treatmentType': '脑电康复', 'startTime': '2019/2/16', 'totalTime': '237', 'effect': '差'}, {
        'treatmentType': '脑电康复',
        'startTime': '2020/11/28',
        'totalTime': '106',
        'effect': '中'
      }, {'treatmentType': '机械康复', 'startTime': '2018/8/2', 'totalTime': '114', 'effect': '中'}, {
        'treatmentType': '机械康复',
        'startTime': '2021/11/24',
        'totalTime': '204',
        'effect': '好'
      }, {'treatmentType': '机械康复', 'startTime': '2018/7/7', 'totalTime': '132', 'effect': '好'}, {
        'treatmentType': '脑电康复',
        'startTime': '2018/2/4',
        'totalTime': '203',
        'effect': '差'
      }, {'treatmentType': '机械康复', 'startTime': '2021/7/22', 'totalTime': '65', 'effect': '好'}, {
        'treatmentType': '脑电康复',
        'startTime': '2020/4/10',
        'totalTime': '10',
        'effect': '差'
      }, {'treatmentType': '脑电康复', 'startTime': '2018/8/18', 'totalTime': '18', 'effect': '差'}, {
        'treatmentType': '机械康复',
        'startTime': '2019/12/26',
        'totalTime': '91',
        'effect': '差'
      }],

    name: '',
    sex: '',
    height: 180,
    thigh_len: 50,
    shank_len: 50,
    age: null,
    address: '',
    up_site: 1,
    down_site: 1,
    phoneNumber: '',
    email: '',
    select: null,
    checkbox: false,
  }),
  computed: {
    shank_len_Errors () {
      const errors = []
      if (!this.$v.shank_len.$dirty) return errors
      !this.$v.shank_len.between && errors.push('Name must be < 100 and >30')
      !this.$v.shank_len.required && errors.push('Name is required.')
      return errors

    },
    height_Errors () {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.shank_len.between && errors.push('Name must be < 200 and >150')
      return errors

    },
    thigh_len_Errors () {
      const errors = []
      if (!this.$v.thigh_len.$dirty) return errors
      !this.$v.thigh_len.between && errors.push('Name must be < 100 and >30')
      !this.$v.thigh_len.required && errors.push('Name is required.')

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
    }
  },

  methods: {
    async getMockList () {
      try {
        const result = await getUserInfo(this.$route.params.id)
        console.log(result)

        if (result.code === 0) {
          const person_ = result.data.data
          console.log(person_)

          this.name = person_.name
          this.sex = person_.sex ? '男':'女'
          this.height = person_.height
          this.thigh_len = person_.thigh_len
          this.shank_len = person_.shank_len
          this.age = person_.age
          this.address = person_.address
          this.up_site = person_.up_site
          this.down_site = person_.down_site
          this.phoneNumber = person_.phoneNumber
          this.email = person_.email

          // this.desserts = result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    submit () {
      console.log(this.$v)
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
  created () {
    this.getMockList()
  },

}
</script>
