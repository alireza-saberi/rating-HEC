module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			targert: {
				options:{'-W083': true},
				src:['*.js', 'routes/*.js', 'app/js/*.js']
			} 
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint']);
};