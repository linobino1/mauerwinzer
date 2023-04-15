import React from 'react';
import type { Page, Post } from 'payload/generated-types';
import { Content } from '~/components/Blocks/Content';
import { Image } from '~/components/Blocks/Image';
import { Gallery } from '~/components/Blocks/Gallery';
import { PostsList } from '~/components/Blocks/PostsList';

type Layout = Page['layout'];

type Props = {
  layout: Layout
  className?: string
  posts?: Post[]
}

const Blocks: React.FC<Props> = ({
  layout, className, posts,
}) => (
  <div className={className}>
    {layout?.map((block, i) => (
      <section key={i} className={block.blockType}>
        { (() => {
          switch (block.blockType) {
            case 'postsList':
              return <PostsList {...block} posts={posts as Post[]} />;

            case 'image':
              return <Image {...block} />;

            case 'gallery':
              return <Gallery {...block} />;

            case 'content':
              return <Content {...block} />;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Blocks;