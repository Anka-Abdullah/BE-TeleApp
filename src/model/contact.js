const { actionQuery } = require('../helper/helper')
module.exports = {
  get: (id, search) => {
    if (search == null) {
      return actionQuery(
        `select * from contact join user on contact.friendId = user.userId where contact.userId = ${id}`
      )
    } else {
      return actionQuery(`select * from user where email= '${search}'`)
    }
  },
  getFriend: (id, friendId) => {
    return actionQuery(
      `select * from contact join user on contact.friendId = user.userId where contact.userId = '${id}' and contact.friendId = '${friendId}'`
    )
  },
  post: (data) => {
    return actionQuery('insert into contact set ?', data)
  },
  del: (id) => {
    return actionQuery('delete from contact where friendId = ?', id)
  }
}
