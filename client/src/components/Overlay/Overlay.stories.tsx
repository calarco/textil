import { ComponentStory, ComponentMeta } from "@storybook/react";

import Overlay from "./Overlay";

export default {
	title: "Overlay",
	component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => (
	<Overlay {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = { overlay: false, long: false };
