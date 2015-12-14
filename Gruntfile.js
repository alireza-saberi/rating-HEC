module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			client: {
				options:{
					'-W083': true,
					browser: true
				},
				src:['app/js/*.js']
			},
			server: {
				options:{
					'-W083': true,
					node:  true
				},
				src:['*.js', 'routes/*.js']				
			}
		},
		watch: {
		  scripts: {
		    		files: ['*.js', 'routes/*.js', 'app/js/*.js'],
		    		tasks: ['jshint'],
		   options: {
		      		spawn: false,
		    },
		  },
		},
		uglify:{
			build: {
				      files: {
       							'public/js/services/candidates.js': ['app/js/services/candidates.js'],
       							'public/js/services/languageFactory.js': ['app/js/services/languageFactory.js'],
       							'public/js/services/modal.js': ['app/js/services/modal.js'],
       							'public/js/rateApp.js': ['app/js/rateApp.js'],
       							'public/js/candidatescontroller.js': ['app/js/candidatescontroller.js'],
       							'public/js/candidecontroller.js': ['app/js/candidecontroller.js'],
       							'public/js/modalInstanceCtrl.js':['app/js/modalInstanceCtrl.js']
      						}
			}
		},
		sass: {                               
    			dist: {                            
      					options: {                        
        							style: 'expanded'
      							},
      			files: {                          
        				'public/css/main.css': 'app/css/main.scss'
      					}
    					}
  			 },
  		cssmin: {
  			target: {
  				files:{
  					'public/css/main.css':'public/css/main.css'
  				}
  			}
  		}
		// jasmine: {
		// 	targert:{
		// 		src: ['app/js/*.js', 'app/js/services/*.js']
		// 	}
		//  }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);
};