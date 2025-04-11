import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';



const meta: Meta<typeof RadioButton> = {
  title: 'RadioButton',
  component: RadioButton,
  parameters:{
    layout:'centered'
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    checked: false,
    disabled: false,
    onChange: () => {
      console.log('Radio Button Clicked');
      alert('Radio Button Clicked');
    },
  },
};

export const Checked: Story = {
  args: {
    label: 'Option 2',
    checked: true,
    disabled: false,
    onChange: () => {
      console.log('Radio Button Clicked');
      alert('Radio Button Clicked');
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option 3',
    checked: false,
    disabled: true,
    onChange: () => {
      console.log('Radio Button Clicked');
      alert('Radio Button Clicked');
    },
  },
};
