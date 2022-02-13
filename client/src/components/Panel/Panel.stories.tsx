import { ComponentStory, ComponentMeta } from "@storybook/react";

import Panel from "./Panel";

export default {
	title: "Panel",
	component: Panel,
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
	overlay: false,
};
