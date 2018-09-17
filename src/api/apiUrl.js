const build = {
  staticUrl: 'http://wash.westlakevr.cn/', // 静态资源路径
  commonUrl: 'http://wash.qimiaowa.com',
  authUrl: 'http://washauth.qimiaowa.com'
};
const build_dev = {
  staticUrl: 'http://wash.westlakevr.cn:8001/', // 静态资源路径
  commonUrl: 'http://wash.qimiaowa.com:8001',
  authUrl: 'http://washauth.qimiaowa.com:9002'
};

module.exports = {build, build_dev};
