

var baseRoot = '../ZJP-GRUNT-BASE/',
    develop = true,
    fs = require('fs'),
    path = require('path')
;


module.exports = {
    config: {
        options: {
            banner: '/** 浙江电子口岸压缩样式 author:zhangF(qzzf1987@gmail.com); time:<%= grunt.template.today("yyyy年mm月dd日 HH:MM:ss") %> **/',
            report: 'min',              // [false, 'min', 'gzip'] 分析压缩效果
            keepSpecialComments: 0,     // 是否保留样式注释
            compatibility: 'ie7',
        },
        develop: {
            files: [
                {
                    expand: true,
                    cwd: 'css/',
                    src: ['*.debug.css', '*/*.debug.css'],
                    dest: 'css_min/',
                    filter: function(file){
                        var 
                            // ext = this.ext,
                            // bname = path.basename(file, '.debug.css'),
                            minFile
                        ;
                        minFile = file.replace('css' + path.sep, 'css_min' + path.sep);

                        if(hasChange(file, minFile)){
                            console.log('已有文件发生了变化, 压缩后的文件名:[%s]', minFile);
                            return true;
                        }

                        return false
                    },
                    ext: '.debug.css'
                }
            ]
        }
    }
}

function hasChange(srcfile, minfile){
    if(!fs.existsSync(minfile)){
        return true;
    }
    return fs.statSync(srcfile).mtime.getTime() > fs.statSync(minfile).mtime.getTime();
}