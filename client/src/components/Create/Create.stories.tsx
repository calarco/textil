import { ComponentStory, ComponentMeta } from "@storybook/react";

import Create from "./Create";

export default {
	title: "Create",
	component: Create,
} as ComponentMeta<typeof Create>;

const Template: ComponentStory<typeof Create> = (args) => <Create {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
	isActive: true,
};
