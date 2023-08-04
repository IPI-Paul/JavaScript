// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import path from 'path'
import fs from 'fs'

const dirFile = (dir, idx) => {
  const folder = dir.split('/').pop()
  const files = fs.readdirSync(dir, (err, files) => {
    if(err) return ''
    return files
  })
  if(files?.[idx]) return {
    results: [{
      id: 1, 
      title: path.parse(files[idx]).name, 
      url: path.join(dir, files[idx]),
      media_type: path.parse(files[idx]).ext,
      release_date: new Date(fs.statSync(path.join(dir, files[idx])).birthtime),
      vote_count: 0,
      poster: { path: `${folder}/${files[idx]}#t=0.1`},
      overview: `YouTube Tutorials for ${folder}!`
    }]
  }
  return ({
    results: files.map((file, idx) => ({
    id: idx,
    title: path.parse(file).name,
    url: path.join(dir, file),
    media_type: path.parse(file).ext,
    release_date: new Date(fs.statSync(path.join(dir, file)).birthtime),
    vote_count: 0,
    poster: { path: `${folder}/${file}#t=0.1`},
    overview: `YouTube Tutorials for ${folder}!`
    }))
  })
}

export default function handler(req, res) {
  const { dir, idx } = req.query
  res.status(200).json(dirFile(dir, idx))
}