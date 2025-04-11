import type  {Meta, StoryObj} from "@storybook/react";
import {Checkbox} from "@/shared/ui/сheckBoxGroup/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component:Checkbox,
  parameters:{
    layout:'centered',
  },
  tags:['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    checked: false,
    disabled: false,
    onChange: () => {
      console.log('Checkbox Clicked');
      alert('Checkbox Clicked');
    },
  },
};

export const Checked: Story = {
  args: {
    label: 'Option 2',
    checked: true,
    disabled: false,
    onChange: () => {
      console.log('Checkbox Clicked');
      alert('Checkbox Clicked');
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option 3',
    checked: true,
    disabled: true,
    onChange: () => {
      console.log('Checkbox Clicked');
      alert('Checkbox Clicked');
    },
  },
};


