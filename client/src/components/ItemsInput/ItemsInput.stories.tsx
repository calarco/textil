import { ComponentStory, ComponentMeta } from "@storybook/react";

import ItemsInput from "./ItemsInput";

export default {
	title: "ItemsInput",
	component: ItemsInput,
} as ComponentMeta<typeof ItemsInput>;

const Template: ComponentStory<typeof ItemsInput> = (args) => <ItemsInput {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
	length: 1,
};
