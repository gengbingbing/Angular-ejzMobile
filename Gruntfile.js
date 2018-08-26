module.exports = function(grunt){
    require('load-grunt-tasks')(grunt); //加载所有的任务
    require('time-grunt')(grunt); //如果要使用 time-grunt 插件
    var config={
        app:'www'
    };
    //读取package.json的内容，形成个json数据
   
    grunt.initConfig({
    config: config,
    
    pkg: grunt.file.readJSON('package.json'),

    //启动服务
    connect: {
        options: {
            port: 9080,
            hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
            livereload: 35729  //声明给 watch 监听的端口
        },
        server: {
            options: {
                open: true, //自动打开网页 http://
                base: [
                    '<%= config.app %>'  //主目录
                ]
            }
        }
    },
    //监听文件
    watch: {
        livereload: {
            options: {
                livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
            },
            //tasks: ['concurrent'],
            files: [  //下面文件的改变就会实时刷新网页
                '<%= config.app %>/**'
            ]
        }
    },

    });
 
    grunt.registerTask('serve', [
        
        'connect:server',
        'watch'
    ]);
}