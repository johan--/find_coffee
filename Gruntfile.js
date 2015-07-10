module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: './app/main.js',
        dest: './public/main.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          './public/main.min.js': ['./public/main.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [ 'browserify', 'uglify' ]);
};
