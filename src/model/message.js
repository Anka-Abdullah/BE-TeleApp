const { actionQuery } = require('../helper/helper')
module.exports = {
  getRoom: (userA, userB) => {
    return actionQuery(
      `select uniq from room where userA=${userA} and userB=${userB}`
    )
  },
  getMsg: (room) => {
    return actionQuery('select * from message where status=1 and room=?', room)
  },
  createMsg: (data) => {
    return actionQuery('insert into message set ?', data)
  },
  createRoom: (data) => {
    return actionQuery('insert into room set ?', data)
  },
  deleteMsg: (msgId) => {
    return actionQuery('update message set status=0 where messageId =?', msgId)
  }
}
