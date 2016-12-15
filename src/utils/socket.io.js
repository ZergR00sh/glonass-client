import io from 'socket.io-client';

let {host, protocol, port} = window.location;

port = !!port ? `:${port}` : '';

export const geoApi = io.connect(`${protocol}//${host}${port}/api`);
