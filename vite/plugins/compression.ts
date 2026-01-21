import compression from 'vite-plugin-compression';
//预压缩，疑似比即时压缩好点，nginx需要开启配置'gzip_static on | off | always;'
export default (env: any) => {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin: any[] = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',');
    if (compressList.includes('gzip')) {
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      plugin.push(
        compression({
          ext: '.gz',
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
};
