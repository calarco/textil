import { ComponentStory, ComponentMeta } from "@storybook/react";

import Expand from "./Expand";

export default {
	title: "Expand",
	component: Expand,
} as ComponentMeta<typeof Expand>;

const Template: ComponentStory<typeof Expand> = (args) => <Expand {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = { isActive: true, height: 4 };
