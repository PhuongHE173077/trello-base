import { io } from 'socket.io-client';
import { API_ROOT } from './Utils/constants.js';

export const socketIo = io(API_ROOT)