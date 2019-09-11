import { storiesOf } from "@storybook/vue";
import { rangeStoriesData } from "./range.stories";
import { singleStoriesData } from "./single.stories";

storiesOf('Components|Datepicker', module).add(
    rangeStoriesData.name,
    rangeStoriesData.vueData,
    rangeStoriesData.additionalData,
).add(
    singleStoriesData.name,
    singleStoriesData.vueData,
    singleStoriesData.additionalData,
);
