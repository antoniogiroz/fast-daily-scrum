import md5 from 'md5'
import { db } from '~/plugins/firebase.js'

export async function getTeams() {
  const querySnapshot = await db.collection('teams').get()
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function getAllMembers() {
  const querySnapshot = await db.collection('people').get()

  let members = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    isAvailable: false,
  }))
  members = members.map(getMemberAvatar)
  return members
}

function getMemberAvatar(member) {
  let hash = ''

  if (!member.avatar && member.email) {
    hash = md5(member.email.trim().toLowerCase(), {
      encoding: 'binary',
    })
  }

  const avatar = `https://gravatar.com/avatar/${hash}`
  return {
    ...member,
    avatar,
  }
}
