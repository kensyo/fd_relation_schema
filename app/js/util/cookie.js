function set(name, value, days, path = '/') {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + value + expires + `; path=${path}`
}

function get(name) {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))

  // if the cookie whose key is `name` doesn't exist
  if (cookie === undefined) {
    return undefined
  }

  return cookie.split('=')[1]
}

const exports = {
  set,
  get
}

export default exports
