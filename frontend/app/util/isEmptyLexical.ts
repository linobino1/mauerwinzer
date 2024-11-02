/**
 * check if given content JSON coming from lexical is empty
 */
export const isEmptyLexical = (content: any): boolean => {
  if (!content.root.children.length) return true
  const { root } = content
  if (
    root.children.length === 1 &&
    root.children[0].type === 'paragraph' &&
    root.children[0].children.length === 0
  )
    return true
  return false
}
