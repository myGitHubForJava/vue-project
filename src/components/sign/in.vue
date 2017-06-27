<template>
  <mn-form :validate="$v" @success="success">
    <mn-section>
      <mn-card>
        <mn-card-item>
          <mn-card-prefix>
            <mn-label :validate="$v.models.username">Username</mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input v-model="models.username" placeholder="Phone / Email / Username"></mn-input>
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            <mn-label :validate="$v.models.password">Password</mn-label>
          </mn-card-prefix>
          <mn-card-body>
            <mn-input type="password" v-model="models.password" placeholder="Password"></mn-input>
          </mn-card-body>
        </mn-card-item>
      </mn-card>

      <mn-section-note>
        Your username (phone, email or username)
        <mn-helper :validate="$v.models.username">
          <mn-helper-item name="required">Require username</mn-helper-item>
          <mn-helper-item name="minLength">username need to be more than 4</mn-helper-item>
          <mn-helper-item name="maxLength">username need to be less then 100</mn-helper-item>
        </mn-helper>
        <mn-helper :validate="$v.models.password">
          <mn-helper-item name="required">Require password</mn-helper-item>
          <mn-helper-item name="minLength">Password need to be more than 6</mn-helper-item>
          <mn-helper-item name="maxLength">Password need to be less then 20</mn-helper-item>
        </mn-helper>
      </mn-section-note>
    </mn-section>

    <mn-section>
      <mn-section-btn>
        <mn-btn theme="primary" ref="submit" margin>Sign in</mn-btn>
      </mn-section-btn>
    </mn-section>
  </mn-form>
</template>

<script>
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'
  import input from 'vue-human/suites/input'
  import Message from 'vue-human/utils/Message'

  export default {
    components: {
      ...input.map()
    },
    validations: {
      models: {
        username: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(100)
        },
        password: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(20)
        }
      }
    },
    data () {
      return {
        models: {
          username: undefined,
          password: undefined
        }
      }
    },
    methods: {
      success ($event, form) {
        form.loading = true
        this.$refs.submit.loading = true

        this.$store.dispatch('user.signIn', this.models)
          .then(response => {
            console.log(1)
            form.loading = false
            this.$refs.submit.loading = false
            Message.create({type: 'success', message: '登录成功'}).show()

            setTimeout(() => {
              this.$router.push({path: '/template'})
            }, 500)
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status !== 404) {
                this.$message({
                  type: 'error',
                  message: error.response.data.message
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '找不到接口, 请联系开发部门'
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: '服务断掉了哦~',
                type: 'error',
                duration: 0
              })
            }
          })
      }
    }
  }
</script>
