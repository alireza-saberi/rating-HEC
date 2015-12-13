module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			targert: {
				options:{'-W083': true},
				src:['*.js', 'routes/*.js', 'app/js/*.js']
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
	grunt.registerTask('default', ['jshint']);
};