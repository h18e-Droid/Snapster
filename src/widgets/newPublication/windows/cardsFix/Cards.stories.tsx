import type { Meta, StoryObj } from '@storybook/react';
import { Cards } from './Card';

const meta: Meta<typeof Cards> = {
  title: 'Cards',
  component: Cards,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Card',
    children: <p>This is the default card content.</p>,
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Long Content Card',
    children: (
      <p>
        This card has a longer content that goes beyond what is typically expected.
        It can be used to demonstrate how the component handles longer text and wraps correctly.
      </p>
    ),
  },
};

export const WithoutContent: Story = {
  args: {
    title: 'Empty Card',
    children: null,
  },
};