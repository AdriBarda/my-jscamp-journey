import os from 'node:os'
import ms from 'ms'

console.log('OS Information:')

console.log('OS Type:', os.type())
console.log('Platform:', os.platform())
console.log('Arquitechture:', os.arch())
console.log('Total Memory (bytes):', os.totalmem())
console.log('Free Memory (bytes):', os.freemem())
console.log(`User's Home directory`, os.homedir())
console.log(`System activity time (s)`, ms(os.uptime() * 1000, { long: true }))
console.log(`CPUS`, os.cpus())
console.log(`Network Interfaces:`, os.networkInterfaces())
console.log('-----------------------------------------------')
