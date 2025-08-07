import { io } from 'socket.io-client';

const socket = io('10.1.1.135:8001');

export default socket;