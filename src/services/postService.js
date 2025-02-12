import client from './config'
export const addPost = async (data) => {
  // for (let [key, value] of data.entries()) {
  //   console.log(key, value)
  // }
  const response = await client.post('/post', data)

  return response.data
}
