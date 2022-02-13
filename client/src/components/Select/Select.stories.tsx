import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from "./Select";

export default {
	title: "Select",
	component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
