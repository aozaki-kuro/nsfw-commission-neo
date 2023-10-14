import { commissionData } from '#data/commissionData' // Adjust the path if necessary
import { staleData } from '#data/staleData' // Adjust the path if necessary
import { writeFileSync } from 'fs'

const isStale = process.argv.includes('--stale')

const dataToSort = isStale ? staleData : commissionData

// Function to extract the date from the fileName
const getDate = (fileName: string): string => fileName.slice(0, 8)

// Sort the data array from latest to oldest
const sortedData = dataToSort.sort((a, b) => {
  const dateA = getDate(a.fileName)
  const dateB = getDate(b.fileName)
  return dateB.localeCompare(dateA) // Sort in descending order
})

// Prepare the sorted data for output
const outputData = `
import { Props } from "#data/types";
${isStale ? '' : 'import { staleData } from "#data/staleData"'}

export const ${isStale ? 'staleData' : 'commissionData'}: Props[] = ${JSON.stringify(
  sortedData,
  null,
  2,
)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/\\n/g, '\n')};

`

// Write the sorted data to a new file
writeFileSync(`./data/${isStale ? 'sortedStaleData.ts' : 'sortedCommissionData.ts'}`, outputData)

console.log(`Sorted data written to ${isStale ? 'sortedStaleData.ts' : 'sortedCommissionData.ts'}`)
