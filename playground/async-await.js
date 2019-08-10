const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  })
}

const doWork = async () => {
  // throw new Error('Teste')
  // return 'Rafael'
  const sum = await add(1, 99)
  const sum2 = await add(sum, 99)
  const sum3 = await add(sum2, 99)
  return sum3
}

// console.log(doWork())
doWork().then((result) => {
  console.log(result)
}).catch(e => {
  console.log(e)
})
