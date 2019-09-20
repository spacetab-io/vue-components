# run lint
npm run lint &&
# run generators
npm run generator:icons &&
npm run generator:themes &&
# add generated files
git add src/assets/icons &&
git add src/components/icon/_icons.generated.ts &&
git add src/assets/scss/themes &&
exit 0

exit 1
