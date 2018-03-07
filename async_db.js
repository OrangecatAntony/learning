//为什么不写后缀
const { query } = require('./promise_db') //对象？？？？？？
async function selectAllData( ) {
  let sql = 'SELECT * FROM my_table'
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log( dataList )
}

getData()