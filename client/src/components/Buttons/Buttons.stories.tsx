import { ComponentStory, ComponentMeta } from "@storybook/react";

import Buttons from "./Buttons";

export default {
	title: "Buttons",
	component: Buttons,
} as ComponentMeta<typeof Buttons>;

const Template: ComponentStory<typeof Buttons> = (args) => (
	<Buttons {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {};
