import jwt, { Secret } from 'jsonwebtoken'

const SECRET: Secret = process.env.JWT_SECRET as string

export function signJwt(payload: object, expiresIn: string | number = '1h') {
  console.log('SECRET SIGN', SECRET)
  return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

export function verifyJwt(token: string) {
  try {
    console.log('TOKEN', token)
    console.log('SECRET VERIFY', SECRET)

    return jwt.verify(token, SECRET)
  } catch (err) {
    console.error('JWT VERIFY ERROR', err)
    return null
  }
}
