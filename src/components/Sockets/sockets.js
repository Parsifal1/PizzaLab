import io from 'socket.io-client'
import { requestSocketUrl } from '../../config'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

export const RequestSocket = io(requestSocketUrl)