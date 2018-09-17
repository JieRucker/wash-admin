<style lang="scss">
  @import "login.scss";
</style>

<template>
  <div class="auth-login auth-resetpassword" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="auth-login__content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          重置密码
        </p>
        <div class="auth-login__content--form">
          <Form ref="resetPasswordForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入手机号">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="vericode">
              <Row>
                <Col span="15">
                  <Input type="text" v-model="form.vericode" placeholder="请输入验证码">
                  <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                  </span>
                  </Input>
                </Col>
                <Col span="4" offset="1">
                  <Button type="ghost" :disabled="vaildcode" @click="getCode($event)">发送验证码</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" v-model="form.passwd" placeholder="密码（六位数以上）">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="passwdCheck">
              <Input type="password" v-model="form.passwdCheck" placeholder="确认密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>确定重置</Button>
            </FormItem>
          </Form>
          <div class="auth-login__content--footer">
            <a href="javascript:;" class="register-tip" @click="handleLogin">登录</a>
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
    name: 'resetPassword',
    data() {
      const validatePass = (rule, value, callback) => {
        if (this.$Global.isBlank(value)) {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码必须大于六位'));
        } else {
          if (!this.$Global.isBlank(this.form.passwdCheck)) {
            // 对第二个密码框单独验证
            this.$refs.resetPasswordForm.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (this.$Global.isBlank(value)) {
          callback(new Error('请再一次输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码必须大于六位'));
        } else if (value !== this.form.passwd) {
          callback(new Error('两次密码输入不一致'));
        } else {
          callback();
        }
      };

      return {
        form: {
          phoneNum: '',
          vericode: '',
          passwd: '',
          passwdCheck: ''
        },
        rules: {
          phoneNum: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          vericode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ]
        },
        time: 10, //验证码倒计时时间
        vaildcode: false
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
      // 发送验证码
      getCode(e) {
        let reg = /^(\+?0?86\-?)?1[3456789]\d{9}$/;

        if (this.$Global.isBlank(this.form.phoneNum)) {
          return this.$Message.info('请输入手机号！');
        } else if (!reg.test(this.form.phoneNum)) {
          return this.$Message.info('请输入正确的手机号！');
        } else {
          this.$axios.post(`${this.$api.isRegisted}`, $.param({
            loginName: this.form.phoneNum
          })).then((res) => {
            if (res.data.success) {

              if (res.data.retCode == 1) {
                this.$Message.info('此手机号未注册过，请换一个重试！');
              } else if (res.data.retCode == 2) {
                this.$axios.post(`${this.$api.sendVerifyCode}`, $.param({
                  loginName: this.form.phoneNum,
                  type: 1
                })).then((res) => {
                  if (res.data.success) {
                    this.$Message.info(res.data.retMsg);
                    this.vaildcode = true;
                    let timer = setInterval(() => {
                      this.time--;
                      e.target.innerText = this.time + 's重新获取';

                      if (this.time == 0) {
                        e.target.innerText = '重新获取';
                        clearInterval(timer);
                        this.time = 60;
                        this.vaildcode = false;
                      }
                    }, 1000)
                  } else {
                    this.$Message.info(res.data.retMsg);
                  }
                }).catch((err) => {
                  console.log(err)
                });
              }
            } else {
              this.$Message.info(res.data.retMsg);
            }
          }).catch((err) => {
            console.log(err)
          });
        }
      },
      handleSubmit() {
        this.$refs.resetPasswordForm.validate((valid) => {
          if (valid) {
            this.$axios.post(`${this.$api.reSetPassword}`, $.param({
              loginName: this.form.phoneNum,
              password: MD5.hex_md5(this.form.passwdCheck),
              vericode: this.form.vericode
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('密码修改成功！');
                this.$router.push({
                  name: 'login'
                });
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        });
      },
      handleLogin() {
        this.$router.push({
          name: 'login'
        });
      }
    }
  };
</script>
