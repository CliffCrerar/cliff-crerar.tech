const grunt = require('grunt');
grunt.loadNpmTasks('grunt-shell')

grunt.initConfig({
    shell: {
        build:'npm run build',
        clearS3:'aws s3 rm --recursive s3://cliffcrerar.tech --profile personal-cli',
        deployDist: 'aws s3 cp dist s3://cliffcrerar.tech --recursive  --profile personal-cli'
        }
});
 
grunt.registerTask('deploy', ['shell:build','shell:clearS3','shell:deployDist']);

module.exports = grunt