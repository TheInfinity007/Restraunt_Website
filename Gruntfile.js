'use strict'

module.exports = function(grunt){

	require('time-grunt')(grunt);	//time plugin
		//load all grunt plugins
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		sass: {
			dest: {
				files: {
					'css/style.css': 'css/style.scss'
				}
			}
		},
		watch: {
			files: 'css/*.scss',
			tasks: ['sass']
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css', '*.html', 'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'
					}
				}
			}
		},
		copy: {
			html: {
				files: [{
					expand: true,
					dot:true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					dot:true,
					cwd: 'node_modules/font-awesome',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},
		clean: {
			build: {
				src: ['dist/']
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					src: ['img/*.{png, jpg, gif}'],
					dest: 'dist'
				}]
			}
		},
		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['contactus.html', 'aboutus.html', 'index.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block){
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0, 
									rebase: false
								};
							}
						}]
					}
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dest: {}
		},
		uglify: {
			dest: {}
		},
		cssmin: {
			dest: {}
		},
		filerev: {
			options: {
				encoding: 'utf-8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css'
					]
				}]
			}
		},
		usemin: {
			html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/contactus.html'],
			options: {
				assetsDirs: ['dist', 'dist/css', 'dist/js']
			}
		},
		htmlmin: {
			dest: {
				options: {
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.html',
					'dist/contactus.html': 'dist/contactus.html',
					'dist/aboutus.html': 'dist/aboutus.html',
				}
			}
		}
	});
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean', 'copy', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin'
	]);
}