<style lang="scss">
  @import "login.scss";
</style>

<template>
  <div class="auth-login" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="auth-login__content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          登录
        </p>
        <div class="auth-login__content--form">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入手机号">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="密码（六位数以上）">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="vericode" v-if="action.showVericode">
              <Input v-model="form.vericode" placeholder="请输入验证码">
              <span slot="append">
                 <img id="getCode" @click="getImgCode" src="/captcha-image"
                      style="width: 50px;height: 28px;vertical-align: middle;" alt="验证码"/>
                                </span>
              </Input>
            </FormItem>

            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <div class="auth-login__content--footer">
            <a href="javascript:;" class="register-tip" @click="handleRegister">注册</a>
            <a href="javascript:;" class="reset-tip" @click="handleResetPassword">重置密码</a>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import MD5 from '@/libs/md5/md5.js';

  export default {
    data() {
      return {
        form: {
          phoneNum: '',
          password: '',
          vericode: ''
        },
        action: {
          showVericode: false
        },
        rules: {
          phoneNum: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          vericode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      loginStyle() {
        return {
          backgroundImage: `url(${process.env.api.staticUrl}static/images/login/login_bg.jpg)`,
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$axios.post(`${this.$api.loginIn}`, $.param({
              loginName: this.form.phoneNum,
              password: MD5.hex_md5(this.form.password),
              vericode: this.form.vericode
            })).then((res) => {
              this.action.showVericode = res.data.data.hasShowVericode;
              if (res.data.success) {
                this.$Message.info('登录成功！');
                window.location.href = `${process.env.api.commonUrl}/wash/manager`;
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        });
      },
      /**
       * 获取图片验证码
       */
      getImgCode() {
        let getImgCode = document.getElementById("getCode");
        getImgCode.src = "/captcha-image?sid=" + Math.random();
      },
      handleRegister() {
        this.$router.push({
          name: 'register'
        });
      },
      handleResetPassword() {
        this.$router.push({
          name: 'resetPassword'
        })
      }
    }
  };
</script>
