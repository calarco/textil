import { ComponentStory, ComponentMeta } from "@storybook/react";

import View from "./View";

export default {
	title: "View",
	component: View,
} as ComponentMeta<typeof View>;

const Template: ComponentStory<typeof View> = (args) => <View {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
