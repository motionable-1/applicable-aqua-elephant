import type { Meta, StoryObj } from '@storybook/react';
import {
  FlipTextStream,
  ZoomTextStream,
  BlurTextStream,
  ElasticStream,
  BlockStream,
  ChromaticStream,
  DynamicSizeStream,
  StompStream,
  SlotMachineStream,
  OutlineStream,
  SlicedStream,
  TurbulenceStream,
  NeonStream,
  SlideStream,
  SwipeStream,
  PushStream
} from '../../remotion/library/components/text/KineticStream';
import { RemotionWrapper } from '../helpers/RemotionWrapper';

const meta: Meta = {
  title: 'Text/KineticStream',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <RemotionWrapper
        durationInFrames={180}
        fps={30}
        width={800}
        height={450}
        backgroundColor="#111111"
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          <Story />
        </div>
      </RemotionWrapper>
    ),
  ],
};

export default meta;

type FlipStory = StoryObj<typeof FlipTextStream>;
type ZoomStory = StoryObj<typeof ZoomTextStream>;
type BlurStory = StoryObj<typeof BlurTextStream>;
type ElasticStory = StoryObj<typeof ElasticStream>;
type BlockStory = StoryObj<typeof BlockStream>;
type ChromaticStory = StoryObj<typeof ChromaticStream>;
type DynamicSizeStory = StoryObj<typeof DynamicSizeStream>;
type StompStory = StoryObj<typeof StompStream>;
type SlotMachineStory = StoryObj<typeof SlotMachineStream>;
type OutlineStory = StoryObj<typeof OutlineStream>;
type SlicedStory = StoryObj<typeof SlicedStream>;
type TurbulenceStory = StoryObj<typeof TurbulenceStream>;
type NeonStory = StoryObj<typeof NeonStream>;
type SlideStory = StoryObj<typeof SlideStream>;
type SwipeStory = StoryObj<typeof SwipeStream>;
type PushStory = StoryObj<typeof PushStream>;

const text = "Kinetic typography brings words to life through motion and timing";

export const Flip: FlipStory = {
  render: (args) => <FlipTextStream {...args} />,
  args: {
    text,
    fontSize: 80,
  },
};

export const FlipGrouped: FlipStory = {
  render: (args) => <FlipTextStream {...args} />,
  args: {
    text: "Reading in chunks is often faster and easier to comprehend",
    fontSize: 60,
    wordsPerGroup: 2,
  },
};

export const Zoom: ZoomStory = {
  render: (args) => <ZoomTextStream {...args} />,
  args: {
    text: "Experience the impact of flying through words",
    fontSize: 90,
  },
};

export const Blur: BlurStory = {
  render: (args) => <BlurTextStream {...args} />,
  args: {
    text: "Motion blur creates a sense of extreme speed",
    fontSize: 80,
    transitionDuration: 0.17,
  },
};

export const Elastic: ElasticStory = {
  render: (args) => <ElasticStream {...args} />,
  args: {
    text: "Bouncing words feel alive and energetic like rubber",
    fontSize: 80,
    transitionDuration: 0.5,
  },
};

export const Block: BlockStory = {
  render: (args) => <BlockStream {...args} />,
  args: {
    text: "Solid block reveal creates a modern professional look",
    fontSize: 70,
    blockColor: "#ff0055",
    transitionDuration: 0.5,
  },
};

export const Chromatic: ChromaticStory = {
  render: (args) => <ChromaticStream {...args} />,
  args: {
    text: "Glitchy chromatic aberration for cyber punk vibes",
    fontSize: 80,
    transitionDuration: 0.27,
  },
};

export const DynamicSize: DynamicSizeStory = {
  render: (args) => <DynamicSizeStream {...args} />,
  args: {
    text: "Pulsing sizes create a rhythmic and organic visual flow",
    fontSize: 80,
    transitionDuration: 0.33,
  },
};

export const Stomp: StompStory = {
  render: (args) => <StompStream {...args} />,
  args: {
    text: "STOMP STOMP IMPACT HEAVY LOUD",
    fontSize: 100,
    fontWeight: "900",
    transitionDuration: 0.4,
  },
};

export const SlotMachine: SlotMachineStory = {
  render: (args) => <SlotMachineStream {...args} />,
  args: {
    text: "Rolling reeling spinning winning jackpot",
    fontSize: 80,
    transitionDuration: 0.5,
  },
};

export const Outline: OutlineStory = {
  render: (args) => <OutlineStream {...args} />,
  args: {
    text: "Hollow fills solid empty becomes full",
    fontSize: 90,
    fontWeight: "900",
    transitionDuration: 0.65,
  },
};

export const Sliced: SlicedStory = {
  render: (args) => <SlicedStream {...args} />,
  args: {
    text: "SLICED CUT SEPARATED SPLIT DIVIDED",
    fontSize: 100,
    fontWeight: "900",
    transitionDuration: 0.5,
  },
};

export const Turbulence: TurbulenceStory = {
  render: (args) => <TurbulenceStream {...args} />,
  args: {
    text: "Wavy liquid distorted turbulence water",
    fontSize: 80,
    fontWeight: "bold",
    transitionDuration: 0.65,
  },
};

export const Neon: NeonStory = {
  render: (args) => <NeonStream {...args} />,
  args: {
    text: "NEON GLOW FLICKER LIGHT BRIGHT",
    fontSize: 90,
    fontWeight: "900",
    color: "#ffffff",
    neonColor: "#00ffcc",
    transitionDuration: 0.17,
  },
};

export const SlideAlternate: SlideStory = {
  render: (args) => <SlideStream {...args} />,
  args: {
    text: "Left Right Left Right Keep Moving",
    fontSize: 80,
    transitionDuration: 0.4,
    direction: 'alternate',
  },
};

export const SlideLeft: SlideStory = {
  render: (args) => <SlideStream {...args} />,
  args: {
    text: "Always entering from the left side",
    fontSize: 80,
    direction: 'left',
  },
};

export const Swipe: SwipeStory = {
  render: (args) => <SwipeStream {...args} />,
  args: {
    text: "Fast aggressive swipe transition",
    fontSize: 80,
    transitionDuration: 0.27,
  },
};

export const CustomDuration: FlipStory = {
  render: (args) => <FlipTextStream {...args} />,
  args: {
    text: "This animation finishes in 3.3 seconds regardless of total video length",
    fontSize: 60,
    duration: 3.33,
  },
  decorators: [
    (Story) => (
      <RemotionWrapper durationInFrames={200} backgroundColor="#111111">
         <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          <Story />
        </div>
      </RemotionWrapper>
    )
  ]
};

export const WithEndDelay: FlipStory = {
  render: (args) => <FlipTextStream {...args} />,
  args: {
    text: "This last word stays visible for a moment",
    fontSize: 70,
    delayAfterLastWord: 1.5,
  },
};

export const ZoomWithEndDelay: ZoomStory = {
  render: (args) => <ZoomTextStream {...args} />,
  args: {
    text: "Smooth ending with delay",
    fontSize: 90,
    delayAfterLastWord: 2,
  },
};

export const PushUp: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Words push upward creating momentum",
    fontSize: 80,
    direction: "up",
  },
};

export const PushDown: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Words falling down like rain",
    fontSize: 80,
    direction: "down",
  },
};

export const PushLeft: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Reading flow pushing left naturally",
    fontSize: 80,
    direction: "left",
  },
};

export const PushRight: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Reverse flow pushing right across",
    fontSize: 80,
    direction: "right",
  },
};

export const PushNoSkew: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Clean movement without motion blur skew",
    fontSize: 80,
    direction: "up",
    withSkew: false,
  },
};

export const PushGrouped: PushStory = {
  render: (args) => <PushStream {...args} />,
  args: {
    text: "Two words at a time push through",
    fontSize: 70,
    direction: "up",
    wordsPerGroup: 2,
  },
};
