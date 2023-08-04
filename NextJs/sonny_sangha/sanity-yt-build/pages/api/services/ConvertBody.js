import {Schema} from "@sanity/schema"
import { htmlToBlocks, getBlockContentFeatures } from "@sanity/block-tools"
import { JSDOM } from 'jsdom'

const ConvertBody = (props) => { 
  // Start with compiling a schema we can work with
  const defaultSchema = Schema.compile({
    name: 'sqlBody',
    types: [
      {
        type: 'object',
        name: 'recordBody',
        fields: [
          {
            title: 'Title',
            type: 'string',
            name: 'title'
          },
          {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: [
              {
                type: 'block'
              }
            ]
          }
        ]
      }
    ]
  })

  // The compiled schema type for the content type that holds the block array
  const blockContentType = defaultSchema.get('recordBody').fields.find((field) => field.name === 'body').type

  // Convert HTML to block array
  const blocks = htmlToBlocks(props, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document
  })
  const features = getBlockContentFeatures(blockContentType)
  
  return blocks
}

export default ConvertBody