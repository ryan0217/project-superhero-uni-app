const baseUrl = process.env.NODE_ENV === "development" ? "https://www.imovietrailer.com/superhero" :
  "https://www.imovietrailer.com/superhero"

let qq = ""

export const getQQ = async () => {
  return new Promise(resolve => {
    uni.request({
      url: `${baseUrl}/sys/switches`,
      method: "POST",
      success: ({ data: { ok } }) => {
        qq = ok
        resolve()
      }
    })
  })
}

export const post = async ({ url, data, success, complete }) => {
  url = `${baseUrl}${url}?qq=${qq}`
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      url += `&${key}=${data[key]}`
    }
  }

  uni.request({
    url,
    method: "POST",
    success: ({ data: { data, status } }) => {
      if (status === 200) success(data)
    },
    complete: () => {
      complete && complete()
    }
  })
}
