<template>
  <Modal :title="modal.companyModal.modalTitle" v-model="modal.companyModal.show" width="600"
         class="shop-list-company-modal" @on-ok="saveCompanyNature">
    <div class="main-panel">
      <Form :model="modal.companyModal" class="company-box">
        <FormItem label="公司名称：" :label-width="80">
          <Input v-model="modal.companyModal.companyName" placeholder="请输入" style="width: 200px"></Input>
          <Button type="primary" @click="companySearch">搜索</Button>
        </FormItem>
        <FormItem>
          <Table :columns="modal.companyModal.table.header" :data="modal.companyModal.table.body"
                 :size="modal.companyModal.table.tableSize"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="modal.companyModal.table.args.totalCount"
                    :current="modal.companyModal.table.args.currentPage"
                    :page-size="modal.companyModal.table.args.length"
                    show-total @on-change="changeCompanyListPage"></Page>
            </div>
          </div>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "company-nature",
    data() {
      return {
        modal: {
          companyModal: {
            show: false,
            modalTitle: '选择公司',
            companyName: '',
            table: {
              tableSize: 'small',
              header: [
                {
                  title: '选择',
                  key: 'selected',
                  align: 'left',
                  render: (h, params) => {
                    return h('Radio', {
                      props: {
                        value: params.row.selected
                      },
                      nativeOn: {
                        click: () => {
                          this.modal.companyModal.table.body.forEach((m) => {
                            m.selected = false;
                          });

                          this.modal.companyModal.table.body[`${params.index}`].selected = true;
                        }
                      }
                    })
                  }
                },
                {
                  title: '公司名称',
                  key: 'companyName',
                  align: 'center'
                }
              ],
              body: [
                {
                  companyName: 'JRucker',
                  companyAddress: '外星球',
                }
              ],
              args: {
                start: 0,
                length: 5,
                currentPage: 1,
                totalCount: 0
              }
            }
          },
        }
      }
    },
    mounted() {
      this.listCompany();
    },
    methods: {
      listCompany() {
        this.modal.companyModal.table.body = [];
        this.$axios.post(`${this.$api.listCompany}`, $.param({
          companyName: this.modal.companyModal.companyName,
          start: this.modal.companyModal.table.args.start,
          length: this.modal.companyModal.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.companyList.forEach((m) => {
              m.selected = false;
            });
            this.modal.companyModal.table.body = res.data.data.companyList;
            this.modal.companyModal.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      companySearch() {
        this.listCompany();
      },
      changeCompanyListPage(targetPage) {
        this.modal.companyModal.table.args.start = (targetPage - 1) * this.modal.companyModal.table.args.length;
        this.listCompany();
      },
      saveCompanyNature() {
        this.$parent.modal.shopModal.companyList = [];
        this.modal.companyModal.table.body.forEach((m) => {
          if (m.selected) {
            this.$parent.modal.shopModal.companyList.push({
              label: m.companyName,
              value: m.companyId
            })
          }
        });
      }
    }
  }
</script>
