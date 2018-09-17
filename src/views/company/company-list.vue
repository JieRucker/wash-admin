<style lang="scss">
  .company-list-panel {
    .button-panel {
      margin-bottom: 10px;
    }
  }
</style>

<template>
  <div class="company-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <FormItem label="公司名称" :label-width="70">
          <Input v-model="searchItem.companyName" placeholder="请输入名称" style="width: 150px"></Input>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="button-panel">
      <Button type="primary" @click="createCompany">添加公司</Button>
      <Button type="error" @click="multDeleteCompany">批量删除</Button>
    </div>
    <div class="table-panel">
      <Table ref="companyTable" :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeCompanyListPage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-list",
    data() {
      return {
        searchItem: {
          companyName: '',
        },
        table: {
          header: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '公司名称',
              key: 'companyName',
              align: 'left'
            },
            {
              title: '操作',
              key: 'todo',
              align: 'right',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>确定删除？</p>',
                          onOk: () => {
                            this.$axios.post(`${this.$api.deleteCompany}`, $.param({
                              companyIdList: JSON.stringify([`${params.row.companyId}`]),
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('删除成功！');
                                this.listCompany();
                              } else {
                                this.$Message.info(res.data.retMsg);
                              }
                            }).catch((err) => {
                              console.log(err)
                            })
                          },
                          onCancel: () => {

                          }
                        });
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          body: [
            {
              companyName: '公司'
            }
          ],
          args: {
            start: 0,
            length: 10,
            currentPage: 1,
            totalCount: 0
          }
        }
      }
    },
    mounted() {
      this.listCompany();
    },
    methods: {
      listCompany() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listCompany}`, $.param({
          companyName: this.searchItem.companyName,
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.companyList;
            this.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSearch() {
        this.listCompany();
      },
      createCompany() {
        this.$Modal.confirm({
          title: '添加公司',
          render: (h) => {
            return h('div', [
              h('Input', {
                style: {
                  marginTop: '10px'
                },
                props: {
                  value: this.companyName,
                  autofocus: true,
                  placeholder: '请输入公司名称'
                },
                on: {
                  input: (val) => {
                    this.companyName = val;
                  }
                }
              })
            ])
          },
          onOk: () => {
            this.$axios.post(`${this.$api.addCompany}`, $.param({
              companyName: this.companyName,
              companyAddress: this.companyAddress
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('成功');
                this.listCompany();
                this.companyName = '';
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            })
          },
          onCancel: () => {
            this.companyName = '';
          }
        });
      },
      multDeleteCompany() {
        if (this.$refs.companyTable.getSelection().length) {
          let companyIdList = [];
          this.$refs.companyTable.getSelection().forEach((m) => {
            companyIdList.push(m.companyId)
          });

          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.deleteCompany}`, $.param({
                companyIdList: JSON.stringify(companyIdList),
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('删除成功');
                  this.listCompany();
                } else {
                  this.$Message.info(res.data.retMsg);
                }
              }).catch((err) => {
                console.log(err)
              })
            },
            onCancel: () => {
            }
          });
        } else {
          this.$Message.info('请选择公司！');
        }
      },
      changeCompanyListPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listCompany();
      }
    }
  }
</script>
