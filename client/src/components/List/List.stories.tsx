import { ComponentStory, ComponentMeta } from "@storybook/react";

import List from "./List";

export default {
	title: "List",
	component: List,
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
	loading: false,
};
