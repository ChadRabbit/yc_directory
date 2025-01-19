import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to true agar after 60 second refresh chahiye,Set to false if statically generating pages, using ISR or tag-based revalidation
})
