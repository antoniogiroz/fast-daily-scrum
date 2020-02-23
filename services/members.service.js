import md5 from 'md5'
import { db } from '~/plugins/firebase.js'

export async function getAllMembers() {
  const querySnapshot = await db.collection('people').get()

  let members = querySnapshot.docs.map(mapMember)
  members = members.map(getMemberAvatar)
  return members
}

function mapMember(doc) {
  const member = doc.data()
  return {
    ...member,
    isAvailable: true
  }
}

function getMemberAvatar(member) {
  let hash = ''

  if (!member.avatar && member.email) {
    hash = md5(member.email.trim().toLowerCase(), {
      encoding: 'binary'
    })
  }

  const avatar = `https://gravatar.com/avatar/${hash}`
  return {
    ...member,
    avatar
  }
}
