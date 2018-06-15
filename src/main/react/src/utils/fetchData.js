export const getData = async (feedUrl, token) => {
  let url = new URL(window.location.host + "/class-roster/" + feedUrl)
  url.searchParams.append("token", token)

  const response = await fetch(url, {credentials: 'include'})
  const newData = await response.json()

  return newData
}

export const getCourses = async (feedUrl, token, term) => {
  let url = new URL(window.location.host + "/class-roster/" + feedUrl)
  url.searchParams.append("token", token)
  url.searchParams.append("term", term)

  const response = await fetch(url, {credentials: 'include'})
  const newData = await response.json()

  return newData
}

export const getStudents = async (feedUrl, token, term, crn) => {
  let url = new URL(window.location.host + "/class-roster/" + feedUrl)
  url.searchParams.append("token", token)
  url.searchParams.append("term", term)
  url.searchParams.append("crn", crn)

  const response = await fetch(url, {credentials: 'include'})
  const newData = await response.json()

  return newData
}
