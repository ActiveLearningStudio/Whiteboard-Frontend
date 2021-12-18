// initialization of socket.io-client
import { io } from 'socket.io-client';
const URL = 'http://localhost:4000'; // backend port is 3010
const socket = io.connect('http://localhost:4000');
// const socket = io(URL, { autoConnect: false, multiplex: false });

export default socket;
