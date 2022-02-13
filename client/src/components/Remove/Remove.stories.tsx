import { ComponentStory, ComponentMeta } from "@storybook/react";

import Remove from "./Remove";

export default {
	title: "Remove",
	component: Remove,
} as ComponentMeta<typeof Remove>;

const Template: ComponentStory<typeof Remove> = (args) => <Remove {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = { isActive: true };
