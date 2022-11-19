if(run() == 'example1') {
  display(`
let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 2000)
});
myPromise.then(() => {
  console.log('Promise Resolved')
});
  `, true);
}
if(run() == 'example2') {
  display(`
let waitSeconds = numSeconds => new Promise(resolve => {
  const message = ` + '\`$' + `{numSeconds} seconds have passed\`
  setTimeout(() => resolve(message), numSeconds * 1000)
})

waitSeconds(2)
  .then(message => console.log(message))
  `, true);
}
if(run() == 'example3') {
  display(`
let waitSeconds = numSeconds => new Promise(resolve => {
  const message = ` + '\`$' + `{numSeconds} seconds have passed\`
  setTimeout(() => resolve(message), numSeconds * 1000)
})

App = async () => {
  await waitSeconds(2)
    .then(message => console.log(message))

  alert('hello')
}
App()
  `, true);
}
