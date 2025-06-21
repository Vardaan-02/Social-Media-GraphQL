const token = localStorage.getItem('__Pearl_Token');
export const WS_URL = `wss://pearlpost-back.pearl99z.tech/ws/?token=${token}`;