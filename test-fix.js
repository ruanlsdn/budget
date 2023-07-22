const { withAppBuildGradle } = require("@expo/config-plugins");

module.exports = function withAndroidXWorkRuntimeFix(config) {

  return withAppBuildGradle(config, (c) => {
    c.modResults.contents = c.modResults.contents.replace(
      /dependencies\s?{/,
      `dependencies {
      // FIX FOR EXPO PendingIntent https://github.com/expo/expo/issues/17432
      def work_version = "2.5.0"

      // (Java only)
      implementation "androidx.work:work-runtime:$work_version"
      // Kotlin + coroutines
      implementation "androidx.work:work-runtime-ktx:$work_version"`,
    );

    return c;
  });
};