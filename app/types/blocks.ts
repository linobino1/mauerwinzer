import type { Page } from 'payload/generated-types';

export type Block = Required<Page>['layout'][0];

export type PostsListBlock = Extract<Block, { blockType: 'postsList' }>;

export function isPostsList(item: Block): item is PostsListBlock {
  return item.blockType === 'postsList';
}

export type ScreeningsListBlock = Extract<Block, { blockType: 'screeningsList' }>;