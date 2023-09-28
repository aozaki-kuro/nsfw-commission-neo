const kebabCase = (str: string) =>
  str.toLowerCase().replace(/&|\s+|[^a-z-_]+/g, (match: string) => {
    if (match === '&') return ''
    if (match === ' ') return '-'
    return ''
  })

export default kebabCase
