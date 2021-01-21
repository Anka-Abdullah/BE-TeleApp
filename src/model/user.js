const { actionQuery } = require('../helper/helper')

module.exports = {
  getUserById: (id) => {
    return actionQuery('select * from user where userId = ?', id)
  },
  activateUser: (email) => {
    return actionQuery('update user set userStatus = 1 where email = ?', email)
  },
  patchUser: (id, data) => {
    return actionQuery('update user set ? where userId = ?', [data, id])
  },
  cekEmail: (email) => {
    return actionQuery('select * from user where email = ?', email)
  },
  register: (data) => {
    return actionQuery('insert into user set ?', data)
  }
}
