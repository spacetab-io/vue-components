import { storiesOf } from "@storybook/vue";
import { rangeStoriesData } from "./range.stories";
import { singleStoriesData } from "./single.stories";
import { rangeInlineStoriesData } from "./range-inline.stories";
import { singleInlineStoriesData } from "./single-inline.stories";

storiesOf('Components|Datepicker', module).add(
    rangeStoriesData.name,
    rangeStoriesData.vueData,
    rangeStoriesData.additionalData,
).add(
    rangeInlineStoriesData.name,
    rangeInlineStoriesData.vueData,
    rangeInlineStoriesData.additionalData,
).add(
    singleStoriesData.name,
    singleStoriesData.vueData,
    singleStoriesData.additionalData,
).add(
    singleInlineStoriesData.name,
    singleInlineStoriesData.vueData,
    singleInlineStoriesData.additionalData,
);
