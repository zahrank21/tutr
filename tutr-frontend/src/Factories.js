const uuidv4 = require('uuid/v4')

 const createUser = ({name = ''} = {}) => (
   id: uuidv4(),
   name
 )

 const createMessage = ({ message = '', sender = ''}= { }) =>  (
   {
     id:uuidv4(),
     time:new Date(Date.new()),
     message,
     sender
   }
 )


 module.exports = {
   createMessage,
   createChat,
   createUser
 }

 const createChat = ({messages = [], name = 'Community', users = []} = {}) => (
   {
     id:uuidv4(),
     name:name,
     messages,
     users,
     typingUsers:[]
   }
 )
 const getTime = (date)=> {
  return `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
 }
