import React from 'react';
import type { Page } from 'payload/generated-types';
import { Content } from '~/components/Blocks/Content';
import { Image } from '~/components/Blocks/Image';
import { Gallery } from '~/components/Blocks/Gallery';
import { Instagram } from '~/components/Blocks/Instagram';
import { CallToAction } from '~/components/Blocks/CallToAction';

type Layout = Page['layout'];

type Props = {
  layout: Layout
  className?: string
}

const Blocks: React.FC<Props> = ({
  layout, className,
}) => (
  <div className={className}>
    {layout?.map((block, i) => (
      <section key={i} className={block.blockType}>
        { (() => {
          switch (block.blockType) {
            case 'content':
              return <Content {...block} />;

            case 'image':
              return <Image {...block} />;

            case 'gallery':
              return <Gallery {...block} />;

            case 'instagram':
              return <Instagram {...block} />;

            case 'callToAction':
              return <CallToAction {...block} />;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Blocks;