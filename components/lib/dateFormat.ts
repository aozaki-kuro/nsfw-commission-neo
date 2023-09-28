/**
 * Transforms a date string from the "yyyyMMdd" format to the "yyyy/MM/dd" format.
 *
 * @param dateStr - The date string in the "yyyyMMdd" format.
 * @returns The date string in the "yyyy/MM/dd" format.
 */
const formatDate = (dateStr: string): string => {
  // Input validation
  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error('The provided date string does not match the "yyyyMMdd" format.')
  }

  // Formatting logic
  const year = dateStr.slice(0, 4)
  const month = dateStr.slice(4, 6)
  const day = dateStr.slice(6, 8)

  return `${year}/${month}/${day}`
}

export default formatDate
