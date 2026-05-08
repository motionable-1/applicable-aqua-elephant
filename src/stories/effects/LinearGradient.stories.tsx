import type { Meta, StoryObj } from '@storybook/react';
import { LinearGradient } from '../../remotion/library/components/effects/LinearGradient';
import { RemotionWrapper } from '../helpers/RemotionWrapper';

const meta: Meta<typeof LinearGradient> = {
  title: 'Effects/LinearGradient',
  component: LinearGradient,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <RemotionWrapper 
        durationInFrames={300} 
        fps={30} 
        width={1280} 
        height={720}
      >
        <Story />
      </RemotionWrapper>
    ),
  ],
  argTypes: {
    direction: {
      control: 'select',
      options: ['to-top', 'to-bottom', 'to-left', 'to-right', 'to-top-left', 'to-top-right', 'to-bottom-left', 'to-bottom-right'],
    },
    animationType: {
      control: 'select',
      options: ['shift', 'rotate', 'pulse', 'breathe', 'wave'],
    },
    speed: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
    },
    noise: {
      control: { type: 'range', min: 0, max: 0.2, step: 0.01 },
    },
    blur: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinearGradient>;

// Purple Aurora style (like the reference image)
export const PurpleAurora: Story = {
  args: {
    colors: [
      { color: '#0a0a0f', position: 0 },
      { color: '#1a0a2e', position: 25 },
      { color: '#4a1a7a', position: 50 },
      { color: '#7b3fa0', position: 75 },
      { color: '#b794d4', position: 100 },
    ],
    direction: 'to-bottom',
  },
};

// Simple two-color gradient
export const SimpleGradient: Story = {
  args: {
    colors: ['#000000', '#4a1a7a'],
    direction: 'to-bottom',
  },
};

// Three colors evenly distributed
export const ThreeColors: Story = {
  args: {
    colors: ['#000000', '#4a1a7a', '#b794d4'],
    direction: 'to-bottom',
  },
};

// Custom positions
export const CustomPositions: Story = {
  args: {
    colors: [
      { color: '#000000', position: 0 },
      { color: '#2d1b4e', position: 40 },
      { color: '#5c3d7a', position: 65 },
      { color: '#c9b8e0', position: 100 },
    ],
    direction: 'to-bottom',
  },
};

// Ocean gradient
export const Ocean: Story = {
  args: {
    colors: [
      { color: '#000510', position: 0 },
      { color: '#001830', position: 30 },
      { color: '#003060', position: 60 },
      { color: '#0066a0', position: 85 },
      { color: '#40a0d0', position: 100 },
    ],
    direction: 'to-bottom',
  },
};

// Sunset gradient
export const Sunset: Story = {
  args: {
    colors: [
      { color: '#0f0520', position: 0 },
      { color: '#2d1040', position: 20 },
      { color: '#6b2050', position: 40 },
      { color: '#c04060', position: 60 },
      { color: '#f07050', position: 80 },
      { color: '#ffa060', position: 100 },
    ],
    direction: 'to-bottom',
  },
};

// Horizontal gradient
export const Horizontal: Story = {
  args: {
    colors: ['#1a0a2e', '#4a1a7a', '#b794d4'],
    direction: 'to-right',
  },
};

// Diagonal gradient
export const Diagonal: Story = {
  args: {
    colors: ['#000000', '#4a1a7a', '#b794d4'],
    direction: 'to-bottom-right',
  },
};

// Custom angle
export const CustomAngle: Story = {
  args: {
    colors: ['#000000', '#4a1a7a', '#b794d4'],
    direction: 135,
  },
};

// With animation - breathe
export const AnimatedBreathe: Story = {
  args: {
    colors: [
      { color: '#0a0a0f', position: 0 },
      { color: '#1a0a2e', position: 25 },
      { color: '#4a1a7a', position: 50 },
      { color: '#b794d4', position: 100 },
    ],
    animate: true,
    animationType: 'breathe',
    speed: 0.3,
  },
};

// With animation - wave
export const AnimatedWave: Story = {
  args: {
    colors: ['#000510', '#001830', '#003060', '#0066a0', '#40a0d0'],
    animate: true,
    animationType: 'wave',
    speed: 0.3,
  },
};

// With animation - rotate
export const AnimatedRotate: Story = {
  args: {
    colors: ['#000000', '#4a1a7a', '#b794d4'],
    animate: true,
    animationType: 'rotate',
    speed: 0.1,
  },
};

// With noise overlay
export const WithNoise: Story = {
  args: {
    colors: [
      { color: '#0a0a0f', position: 0 },
      { color: '#1a0a2e', position: 25 },
      { color: '#4a1a7a', position: 50 },
      { color: '#b794d4', position: 100 },
    ],
    noise: 0.05,
  },
};

// With content
export const WithContent: Story = {
  args: {
    colors: [
      { color: '#0a0a0f', position: 0 },
      { color: '#1a0a2e', position: 25 },
      { color: '#4a1a7a', position: 50 },
      { color: '#b794d4', position: 100 },
    ],
    animate: true,
    animationType: 'breathe',
    speed: 0.2,
  },
  render: (args) => (
    <LinearGradient {...args}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <h1 style={{ 
          fontSize: 72, 
          fontWeight: 700, 
          margin: 0,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          Custom Gradient
        </h1>
        <p style={{ 
          fontSize: 24, 
          opacity: 0.8,
          marginTop: 16,
        }}>
          Fully customizable colors
        </p>
      </div>
    </LinearGradient>
  ),
};
