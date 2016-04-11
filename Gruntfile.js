
var sc = new (require('./grunt/stylus.js'))(),
    jc = require('./grunt/jade.js'),
    cssmin = require('./grunt/cssmin.js'),
    sylType
;

module.exports = function(grunt) {

    sylType = grunt.option('syl');

    grunt.initConfig({
        product: {
            version: '1.0.0'
        },
        stylus: !!sc[sylType] ? sc[sylType]() : sc.def(),
        jade: jc.config,
        cssmin: cssmin.config,

        cachebreaker: {
            devJs: {
                options: {
                    match: ['zepto.debug.js'],
                    // position: 'append',
                    replacement: 'md5'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'view/',
                        src: ['**.html', '**/*.html'],
                        dest: 'view/',
                        ext: '.html'
                    }
                ]
            },

            devCss: {
                options: {
                    match: ['base.debug.css'],
                    // position: 'append',
                    replacement: 'md5'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'view/',
                        src: ['**.html', '**/*.html'],
                        dest: 'view/',
                        ext: '.html'
                    }
                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cache-breaker');

    // 支持以下四种命令：
    // grunt css
    // grunt css --syl=def
    // grunt css --syl=base
    // grunt css --syl=app
    grunt.registerTask('css', ['stylus:develop']);


    // 支持以下一种命令：
    // grunt html
    grunt.registerTask('html', ['jade:develop']);


    // 支持以下一种命令：
    // grunt cssm
    grunt.registerTask('cssm', ['cssmin:develop']);


    // grunt cached
    grunt.registerTask('cached', ['cachebreaker:devJs', 'cachebreaker:devCss']);
};