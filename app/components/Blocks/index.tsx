import React from 'react';
import type { Page, Post } from 'payload/generated-types';
import { Content } from '~/components/Blocks/Content';
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