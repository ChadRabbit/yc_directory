import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'


console.log("Sanity Write Token:", token);
export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to true agar after 60 second refresh chahiye,Set to false if statically generating pages, using ISR or tag-based revalidation
    token,
})

if(!writeClient.config().token)
{
    throw new Error("WRITE TOKEN NOT FOUND")
}