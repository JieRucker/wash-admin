<style lang="scss">
  .present-list-coupon-modal {
    .main-panel {
      .upload-image {
        margin-bottom: 0;
        .ivu-form-item-content {
          display: flex;
        }
        .upload-box {
          width: 150px;
          height: 80px;
          .content {
            padding: 10px 0;
            .plus-round {
              color: #3399ff;
              font-size: 13px;
              vertical-align: middle;
            }
            .upload-text {
              color: #3399ff;
              height: 20px;
              line-height: 20px;
              vertical-align: middle;
              display: inline-block;
            }
          }
        }
      }
      .text-tip {
        color: #f00;
        margin-left: 5px;
      }
      .shop-form {
        .ivu-form-item-content {
          margin-left: 72px;
        }
        .shop-list {
          li {
            float: left;
            margin-right: 5px;
            margin-bottom: 5px;
            &:last-child {
              margin: 2px 0;
            }
          }
        }
      }

      .url-address {
        margin-top: 10px;
      }
    }
  }
</style>

<template>
  <div>
    <Modal :title="modal.presentModal.modalTitle" v-model="modal.presentModal.show" width="650"
           class="present-list-coupon-modal" @on-ok="savePresentModal">
      <div class="main-panel">
        <Form :model="modal.presentModal" label-position="left" class="coupon-box">
          <FormItem label="门店：" :label-width="72" class="shop-form">
            <div class="shop-list">
              <ul class="clearfix">
                <li v-for="(item,index) in modal.presentModal.shopList" v-if="modal.presentModal.shopList.length">
                  <Tag type="dot" closable @on-close="deleteShop(index)">{{item.label}}</Tag>
                </li>
                <li v-if="!modal.presentModal.shopList.length">无</li>
                <li>
                  <Button type="dashed" long @click="addShopModal" icon="plus-round">添加门店</Button>
                </li>
              </ul>
            </div>
          </FormItem>
          <FormItem label="礼包名称：" :label-width="72">
            <Input v-model="modal.presentModal.couponName" placeholder="请输入" style="width: 150px"></Input>
          </FormItem>
          <FormItem label="礼包类型：" :label-width="72">
            <Select v-model="modal.presentModal.selectCouponType" placeholder="请选择" style="width:150px">
              <Option v-for="item in modal.presentModal.couponTypeList" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="活动时间：" :label-width="72">
            <DatePicker type="datetimerange" ref="dateTimeActivityRange" placeholder="请选择时间"
                        style="width: 280px"></DatePicker>
          </FormItem>
          <FormItem label="描述：" :label-width="72" class="upload-image">

            <div class="upload-list" v-for="item in uploadPic.uploadList" style="margin-right: 10px;">
              <!--<img :src="item.url" style="max-width: 100%;height: 100%;">-->
              <div class="upload-list-cover">{{item.name}}
                <!--<Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>-->
                <Icon type="ios-trash-outline" class="ios-trash-outline" size="16"
                      @click.native="handleRemove(item)"></Icon>
              </div>
            </div>

            <div v-show="!uploadPic.uploadList.length">
              <Upload
                ref="uploadPic"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                :data="uploadPic.uploadParams"
                type="drag"
                :action="`${$api.addGiftPacksPic}?uploadId=${uploadPic.uploadId}`" class="upload-box">
                <div class="content">
                  <Icon type="plus-round" size="20" class="plus-round"></Icon>
                  <p class="upload-text">添加图片</p>
                </div>
              </Upload>
            </div>

            <p class="text-tip">*建议尺寸：640px*320px,大小不超过1M</p>
          </FormItem>

          <FormItem>
            <Table :show-header="modal.presentModal.table.showHeader"
                   :height="modal.presentModal.table.body.length > 6 ? 315 : ''"
                   :size="modal.presentModal.table.tableSize"
                   :data="modal.presentModal.table.body"
                   :columns="modal.presentModal.table.header">
            </Table>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="3">
                <Button type="dashed" long @click="addSelectCouponModal" icon="plus-round">添加</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="URL地址：" :label-width="72" class="url-address">
            <Input v-model="modal.presentModal.urlAddress" placeholder="请输入" style="width: 250px"></Input>
            <p class="text-tip">*此处填写“#”时此模块只做顶部广告图使用不做跳转</p>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <shop-nature ref="shopNature"></shop-nature>
    <select-coupon-nature ref="selectCouponNature"></select-coupon-nature>
  </div>
</template>

<script>
  import shopNature from './shop-nature.vue';
  import selectCouponNature from './select-coupon-nature.vue';

  export default {
    name: "present-nature",
    components: {
      shopNature,
      selectCouponNature
    },
    data() {
      return {
        modal: {
          presentModal: {
            show: false,
            modalTitle: '添加礼包',
            couponName: '',
            selectCouponType: '',
            couponMount: '',
            urlAddress: '',
            couponTypeList: [
              {
                label: '通用礼包',
                value: '1'
              },
              {
                label: '新人礼包',
                value: '2'
              }
            ],
            shopList: [],
            table: {
              showHeader: true,
              fixedHeader: true,
              tableSize: 'small',
              header: [
                {
                  title: '类型',
                  key: 'couponTypeName',
                  align: 'center'
                },
                {
                  title: '价格（元）',
                  key: 'couponValue',
                  align: 'center'
                },
                {
                  title: '有效时间（月）',
                  key: 'validMonth',
                  align: 'center'
                },
                {
                  title: '操作',
                  key: 'todo',
                  align: 'center',
                  render: (h, params) => {
                    return h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          let index = params.index;
                          this.modal.presentModal.table.body.splice(index, 1);
                        }
                      }
                    }, '删除')
                  }
                }
              ],
              body: []
            }
          }
        },
        uploadPic: {
          uploadId: '',
          file: '',
          handleBeforeUploadStatus: false,
          uploadList: []
        }
      }
    },
    methods: {
      handleBeforeUpload(file) {
        this.uploadPic.uploadList = [];
        this.uploadPic.uploadList.push({
          name: file.name,
          url: ''
        });
        this.uploadPic.file = file;
        console.log(this.uploadPic.file)

        return this.uploadPic.handleBeforeUploadStatus;
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式不正确，请选择jpg或png'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件太大，不超过2M.'
        });
      },
      handleRemove(file) {
        this.uploadPic.uploadList.splice(0, 1);
      },
      handleSuccess(resolve, file, fileList) {
        if (resolve.success) {
          let shopIdList = [];
          let couponIdList = [];
          this.modal.presentModal.shopList.forEach((m) => {
            shopIdList.push(m.shopId)
          });

          this.modal.presentModal.table.body.forEach((m) => {
            couponIdList.push(m.couponId)
          });

          this.$axios.post(`${this.$api.endGiftPacksPic}`, $.param({
            uploadId: this.uploadPic.uploadId,
            couponIdList: JSON.stringify(couponIdList),
            shopIdList: JSON.stringify(shopIdList),
            startDate: this.$refs.dateTimeActivityRange.publicStringValue[0],
            endDate: this.$refs.dateTimeActivityRange.publicStringValue[1],
            giftPacksDesc: '',
            giftPacksId: '',
            giftPacksName: this.modal.presentModal.couponName,
            giftPacksType: this.modal.presentModal.selectCouponType,
            giftPacksUrl: this.modal.presentModal.urlAddress,
          })).then((res) => {
            if (res.data.success) {
              this.$Message.info('成功');
              this.$parent.listPresent();
              this.uploadPic.handleBeforeUploadStatus = true;
            } else {
              this.$Message.info(res.data.retMsg);
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      addShopModal() {
        this.$refs.shopNature.$refs.addressPicker.listProvince();
        this.$refs.shopNature.listShop();
        this.$refs.shopNature.modal.shopModal.show = true;
      },
      addSelectCouponModal() {
        this.$refs.selectCouponNature.listCoupon();
        this.$refs.selectCouponNature.modal.selectCouponModal.show = true;
      },
      deleteShop(index) {
        this.modal.presentModal.shopList.splice(index, 1);
      },
      savePresentModal() {
        console.log(this.$refs.dateTimeActivityRange)

        this.getUpload();
      },
      getUpload() {
        this.$axios.post(this.$api.createUploadId).then((res) => {
          if (res.data.success) {
            this.uploadPic.uploadId = res.data.data;

            if (this.$Global.isBlank(this.modal.presentModal.selectCouponType)) {
              return this.$Message.info('请选择礼包类型！');
            } else if (this.$Global.isBlank(this.$refs.dateTimeActivityRange.publicStringValue[0]) || this.$Global.isBlank(this.$refs.dateTimeActivityRange.publicStringValue[1])) {
              return this.$Message.info('请选择活动时间！');
            }

            console.log(this.$refs.uploadPic)


            setTimeout(() => {
              this.uploadPic.handleBeforeUploadStatus = true;
              this.$refs.uploadPic.upload(this.uploadPic.file);
            }, 100)

          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>
