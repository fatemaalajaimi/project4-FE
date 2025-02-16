import client from './config'
export const addJob = async (data) => {
  // for (let [key, value] of data.entries()) {
  //   console.log(key, value)
  // }
  const response = await client.post('/job', data)

  return response.data
}
