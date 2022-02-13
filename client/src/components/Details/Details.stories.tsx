import { ComponentStory, ComponentMeta } from "@storybook/react";

import Details from "./Details";

export default {
	title: "Details",
	component: Details,
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = (args) => (
	<Details {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = { fixed: false };
