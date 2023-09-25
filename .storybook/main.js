/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../stories/pages/autocomplete/default.stories.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
