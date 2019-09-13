# Lint check
npm run lint

# Icons generating
npm run generator:icons
# Themes generating
npm run generator:themes
# Adding generated files
git add src/assets/icons
git add src/components/icon/_icons.generated.ts
git add src/assets/scss/themes
