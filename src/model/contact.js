const { actionQuery } = require('../helper/helper')
module.exports = {
  get: (id) => {
    return actionQuery(
      'select * from contact join user on contact.contactList = user.userId where contact.userId = ?',
      id
    )
  },
  post: (data) => {
    return actionQuery('insert into contact set ?', data)
  },
  del: (id) => {
    return actionQuery('delete from contact where contactList = ?', id)
  }
}
