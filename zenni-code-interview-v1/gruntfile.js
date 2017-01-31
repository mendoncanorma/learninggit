module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({

    	projectname: "zenni",

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),


        csslint: {
            zenni: {
                options: {
                    csslintrc: 'less/.csslintrc'
                },
                src: ['css/zenni.css']
            }
        },

        less: {
            bootstrap: {
                src: 'less/zenni-bootstrap.less',
                dest: 'css/zenni-bootstrap.css'            	
            },
            zenni: {
            	options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'css/<%= projectname %>.css.map',
                    sourceMapFilename: 'css/<%= projectname %>.css.map'            		
            	},
                src: 'less/<%= projectname %>.less',
                dest: 'css/<%= projectname %>.css'            	
            }
        },

        watch: {
            less: {
               files: 'less/**/*.less',
               tasks: 'less'
            }
        },        
        
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('zenni-build', ['less', 'csslint']);

};