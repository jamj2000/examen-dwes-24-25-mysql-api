import mysql from 'mysql2/promise';

const DATABASE_URL = 'mysql://root:root@localhost:3306/hospital'

const connection = await mysql.createConnection(DATABASE_URL)

export default connection