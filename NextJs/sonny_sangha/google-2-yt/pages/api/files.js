import path from 'path'
import fs from 'fs'

let containsText = []

const dirFile = ({dir, depth, term}) => {
  const timeStart = new Date().getTime()
  const folder = dir.split('/').pop()
  const files = fs.readdirSync(dir, (err, files) => {
    if(err) return ''
    return files
  })
  const directories = files.filter(file => fs.statSync(path.join(dir, file)).isDirectory() && file.substring(0, 1) !== '.' && file.search('node_modules') == -1).map(file => path.join(dir, file))
  
  const named = files.filter(file => file.toLowerCase().search(term.toLowerCase()) > -1 && fs.statSync(path.join(dir, file)).isFile()).map(file => path.join(dir, file))
  
  const textBased = files.filter(file => !named.includes(path.join(dir, file)) && ['.csv', '.htm', '.html', '.ini', '.js', '.jsx', '.log', '.py', '.tab', '.ts', 'tsx', '.txt'].includes(path.parse(file).ext) && fs.statSync(path.join(dir, file)).isFile()).map(file => path.join(dir, file))

  let temp = directories
  
  for (let i = 0; i < depth; i ++) {
    const subDirectories = []
    temp.map(directory => {
        fs.readdirSync(directory, (err, files) => {
          if(err) return ''
          return files
        })
        .filter(file => fs.statSync(path.join(directory, file)).isDirectory() && file.substring(0, 1) !== '.' && file.search('node_modules') == -1)
        .map(file => path.join(directory, file))
        .map(file => subDirectories.push(file))
    })
    
    temp = subDirectories
    subDirectories.map(file => directories.push(file))
  }

  directories.map(directory => {
    fs.readdirSync(directory, (err, files) => {
      if(err) return ''
      return files
    })
    .filter(file => file.toLowerCase().search(term.toLowerCase()) > -1 && fs.statSync(path.join(directory, file)).isFile())
    .map(file => path.join(directory, file))
    .map(file => named.push(file))
  })

  directories.map(directory => {
    fs.readdirSync(directory, (err, files) => {
      if(err) return ''
      return files
    })
    .filter(file => !named.includes(path.join(directory, file)) && ['.csv', '.htm', '.html', '.ini', '.js', '.jsx', '.log', '.py', '.tab', '.ts', 'tsx', '.txt'].includes(path.parse(file).ext) && fs.statSync(path.join(directory, file)).isFile())
    .map(file => path.join(directory, file))
    .map(file => textBased.push(file))
  })

  getText(textBased, term)

  const timeEnd = new Date().getTime()
  const timeTaken = `${timeEnd - timeStart} milliseconds`
  return ({timeTaken: timeTaken, directories: directories.length, named: named})
}

const getText = async (textBased, term) => {
  await textBased.map(file => {
    const stream = fs.createReadStream(file)
    stream.on('data', (d) => {
      if(!!(''+d).toLowerCase().match(term.toLowerCase())) {
        if(!containsText.includes(file)) containsText.push(file)
      }
    })
  })
}

export default function handler(req, res) {
  const { dir, depth, start, term } = req.query
  const obj = dirFile({dir, depth, start, term})
  const regex = new RegExp(term, 'is')
  
  const readData = () => {
    let items = []
    obj.named.map(data => {
      items.push({
        link: data.replace(dir, 'http://localhost:8080/'),
        formattedUrl: data.replace(data.match(regex), `<b>${data.match(regex)}</b>`),
        title: data.split('/').pop(),
        snippet: `Search term found in file name. \nFile Created: ${new Date(fs.statSync(data).birthtime)}`
      })
    })
    containsText.map(data => {
      items.push({
        link: data.replace(dir, 'http://localhost:8080/'),
        formattedUrl: data.replace(data.match(regex), `<b>${data.match(regex)}</b>`),
        title: data.split('/').pop(),
        snippet: `Search term found in file contents. \nFile Created: ${new Date(fs.statSync(data).birthtime)}`
      })
    })
    const results = {
      formattedTotalResults: obj.named.length + containsText.length,
      formattedSearchTime: obj.timeTaken,
      items: items.slice(start, start + 10)
    }
    res.status(200).json(results) 
    if(containsText?.length > 0) {
      containsText = []
      items = []
    }
  }
  if(containsText?.length > 0) {
    containsText = []
    items = []
  }
  setTimeout(readData, 850) 
}