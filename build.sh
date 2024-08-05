ENVIRONMENT_NAME=aab
CACHED_BUILD=$1

cat ./documents/store/store.gradle.properties > ./android/gradle.properties;

if [[ -n "$CACHED_BUILD" ]]; then
    cd android && ./gradlew bundleRelease && cd ..;
else
    cd android && ./gradlew assembleRelease && cd ..;
fi

cat ./documents/store/empty.store.gradle.properties > ./android/gradle.properties;

echo "Done!!"