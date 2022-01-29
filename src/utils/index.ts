export const isUndefined = (index: any): index is boolean => {
  return typeof index === 'undefined'
}
