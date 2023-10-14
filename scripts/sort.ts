// sort.ts

import { commissionData } from '#data/commissionData' // Adjust the path if necessary
import { writeFileSync } from 'fs'

// Function to extract the date from the fileName
const getDate = (fileName: string): string => fileName.slice(0, 8)

// Sort the commissionData array from latest to oldest
const sortedCommissionData = commissionData.sort((a, b) => {
  const dateA = getDate(a.fileName)
  const dateB = getDate(b.fileName)
  return dateB.localeCompare(dateA) // Sort in descending order
})

// Prepare the sorted data for output
const outputData = `
import { Props } from "#data/types";
import { staleData } from "#data/staleData";

export const commissionData: Props[] = ${JSON.stringify(sortedCommissionData, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/\\n/g, '\n')};

`

// Write the sorted data to a new file
writeFileSync('./data/sortedCommissionData.ts', outputData)

console.log('Sorted data written to sortedCommissionData.ts')
