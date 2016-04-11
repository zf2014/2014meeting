

var baseRoot = '../ZJP-GRUNT-BASE/',
    develop = true
;


module.exports = {
    config: {
        options: {
            pretty: true,
            client: false,
            data: {
                mode: develop,  // true表示开发模式, false表示生产模式
                fileAdorn: develop ? '.debug' : '.min',
                cssFileAdorn: develop ? '.debug' : '.min'
            }
        },
        develop: {
            files: [
                {
                    expand: true,
                    cwd: 'jade/src',
                    src: ['**.jade', '**/*.jade'],
                    dest: 'view/',
                    ext: '.html'
                }
            ]
        }
    }
}
