import React from 'react';
import type { Page, Post } from 'payload/generated-types';
import { Content } from '~/components/Blocks/Content';
import { Image } from '~/components/Blocks/Image';
import PostsList from './PostsList';

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

            default:
            case 'content':
              return <Content {...block} />;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Blocks;