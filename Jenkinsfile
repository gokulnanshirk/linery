pipeline {
   agent any
      environment {
         jenkins    ALL = NOPASSWD: /path/to/script
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
   stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
      }
   }
      
   stage('Android Build') {
   steps {
      sh 'ionic cordova build android --prod --release'
   }
  }

   stage('APK Sign') {
   steps {
      sh 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/gokulkrishnan/Downloads/my-release-key.keystore  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk nameApp  alias_name'
   }
   }

 }
}
