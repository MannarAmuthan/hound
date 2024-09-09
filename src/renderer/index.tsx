import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   console.log(arg);
// });

// window.electron.ipcRenderer.on('ipc-example', (arg, message) => {
//   console.log(message);
// });

window.electron.ipcRenderer.on('ipc-example', async (args) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(args));
});


window.electron.ipcRenderer.sendMessage('ipc-example', ['hhh']);
