import { ComponentStory, ComponentMeta } from "@storybook/react";

import Section from "./Section";

export default {
	title: "Section",
	component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
	<Section {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
	overlay: false,
};
