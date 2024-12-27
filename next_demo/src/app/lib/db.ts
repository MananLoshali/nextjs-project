const mysql = require('mysql2/promise');

export const connectToDB = async () => {
  const SERVER = process.env.DB_HOST;
  const PORT = process.env.DB_PORT;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  const DATABASE_USER = process.env.DATABASE_USER;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

  try {
    const connection = await mysql.createConnection({
      host: SERVER,
      port: PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    });

    console.log("DB connected successfully");
    return connection; // Return connection for further queries
  } catch (err: any) {
    console.error("Error in connecting to DB:", err.message);
  }
};
