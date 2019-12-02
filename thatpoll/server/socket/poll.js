
function connectPollSocket(io) {
  io.on('connection', socket => {
    socket.on('joinPollRoom', pollRoom => {
      socket.join(pollRoom);
    });
  });

  return io;
}

module.exports = connectPollSocket;
