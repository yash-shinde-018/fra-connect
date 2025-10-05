import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MapCanvas from './MapCanvas';

const meta: Meta<typeof MapCanvas> = {
  title: 'Components/MapCanvas',
  component: MapCanvas,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MapCanvas>;

export const Default: Story = {
  args: {},
  render: () => (
    <div style={{ height: '400px' }}>
      <MapCanvas />
    </div>
  ),
};