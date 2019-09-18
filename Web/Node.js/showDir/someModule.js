const Buffer = require('Buffer')


b = Buffer.from('5oiR', 'base64')
b = Buffer.from([1,2,3,4,5,6])
b.toString('base64')

c = Buffer.from([1,2,3,4,5,6])
Buffer.compare(b, c) //比较两个内存片段
d = Buffer.concat([b, c]) //拼接, 返回新的内存片段
