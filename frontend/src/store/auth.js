import { proxy } from 'valtio'

export const authState = proxy({ logged: false })