ENVIRONMENT_NAME=pro
CACHED_BUILD=$1

if [[ -n "$CACHED_BUILD" ]]; then
    cat ./documents/environments/pro.env > ./.env;
else
    cat ./documents/environments/uat.env > ./.env;
fi

echo "Done!!"