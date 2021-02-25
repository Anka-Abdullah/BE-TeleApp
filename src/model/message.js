const { actionQuery } = require('../helper/helper')
module.exports = {
  getMsg: (userId, friendId) => {
    return actionQuery(
      `select * form message where userId=${userId} and friendId=${friendId}`
    )
  },
  createMsg: (userId) => {
    return actionQuery('insert into message ')
  }
}
