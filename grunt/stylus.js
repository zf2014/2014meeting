

var baseRoot = '../ZJP-GRUNT-BASE/'

    stylusPaths = [
        baseRoot + 'src/css/stylus/meta/',
        baseRoot + 'src/css/stylus/config/',
        baseRoot + 'src/css/stylus/nib/',
        'stylus/mutable'
    ],

    stylusImports = ['minx.styl', 'vendor.styl', 'site_var.styl', 'site_func.styl'],

    baseFiles = {
        expand: true,
        cwd: baseRoot + 'src/css/stylus/',
        src: ['*.styl'],
        dest: 'css/',
        ext: '.debug.css'
    },

    appsFiles = {
        expand: true,
        cwd: 'stylus/src',
        src: ['**.styl', '**/*.styl'],
        dest: 'css/',
        ext: '.debug.css'
    }

;

module.exports = Config;

function Config(){
    this.options = {
        compress: false,
        paths: stylusPaths,
        import: stylusImports,
        banner: '/**\n' +
            ' * 文件: .css \n' +
            ' * 公司: 浙江电子口岸\n' +
            ' * 作者: qzzf1987@gmail.com\n' +
            ' * 时间: <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n' +
            ' */\n'
    };

    this.develop = {
        files: []
    }
}

Config.prototype.set = function(theFile){
    var files = this.develop.files;
    files.push(theFile);
}

Config.prototype.def = function(){
    this.set(baseFiles);
    this.set(appsFiles);
    return this;
}

Config.prototype.app = function(){
    this.set(appsFiles);
    return this;
}

Config.prototype.base = function(){
    this.set(baseFiles);
    return this;
}



// module.exports = {
//     config: {
//         options: {
//             compress: false,
//             paths: stylusPaths,
//             import: stylusImports,
//             banner: '/**\n' +
//                 ' * 文件: .css \n' +
//                 ' * 公司: 浙江电子口岸\n' +
//                 ' * 作者: qzzf1987@gmail.com\n' +
//                 ' * 时间: <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>\n' +
//                 ' */\n'
//         },
//         develop: {
//             files: [
//                 // {'css/main.debug.css': [baseRoot + 'src/css/stylus/main.styl']},
                
//                 {
//                     expand: true,
//                     cwd: baseRoot + 'src/css/stylus/',
//                     src: ['*.styl'],
//                     dest: 'css/',
//                     ext: '.debug.css'
//                 },


//                 {
//                     expand: true,
//                     cwd: 'stylus/src',
//                     src: ['**.styl', '**/*.styl'],
//                     dest: 'css/',
//                     ext: '.debug.css'
//                 }
//             ]
//         }
//     }
// }
