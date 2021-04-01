'use strict'
// Main hub app

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const caps = require('socket.io')(PORT);

caps.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED!`)
  socket.on('pickup', (payload) => {
    console.log(`***NEW PICKUP: ITEM NEEDS TO BE PICKED UP \n
    ${payload.storeName}\n 
    ${payload.orderId}\n
    ${payload.customerName}\n
    ${payload.address}\n`);
  socket.broadcast.emit('newPickup', payload);
  })

  socket.on('in-transit', (payload) => {
    setTimeout(() => {
      console.log(`***PICKED UP: ORDER NUMBER: ${payload.orderId}`)
      console.log(`***TRANSIT: ORDER NUMBER: ${payload.orderId}\n`)
      socket.emit('relayMessage', payload)
    }, 3000)
  })

  socket.on('delievered', (payload) => {
    console.log(`***DELIEVERED: ORDER NUMBER: ${payload.orderId}\n`)
    socket.broadcast.emit('delievered', payload)
  })

})

console.log('CAPS TURNED ON...')