module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: './app/main.js',
        dest: './public/scripts/main.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          './public/scripts/main.min.js': ['./public/scripts/main.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [ 'browserify' ]);
};
