export const post = ({ url, data, success }) => {
  url = `https://www.imovietrailer.com/superhero${url}?qq=lee12141967`
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      url += `&${key}=${data[key]}`
    }
  }

  let arr = [{ a: 1 }, { b: 2 }]

  uni.request({
    url,
    method: "POST",
    success: ({ data: { data, status } }) => {
      if (status === 200) success(data)
    }
  })
}
