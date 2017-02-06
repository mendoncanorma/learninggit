module.exports = function(grunt){
    grunt.initConfig({
        traceur: {
            options: {
                experimental:true
            },
            custom: {
                files:{
                    'build/app.js': "js/app.js",
                    'build/ex2.js': "js/ex2.js",
                    'build/ex3.js': "js/ex3.js",
                    'build/ex4.js': "js/ex4.js",
                    'build/ex5.js': "js/ex5.js"
                }
            }
        },

        watch: {
            files:"js/**/*.js",
            tasks: "traceur"
        }
    });

    grunt.loadNpmTasks('grunt-traceur-latest');
    grunt.loadNpmTasks('grunt-contrib-watch');
}