// server.js
import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// ✅ Your Turso credentials
const client = createClient({
  url: 'libsql://forms-pmanya04.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTQ0Nzg2MzcsImlkIjoiYWViODRkZTMtYjhjYy00Yjk4LTg0NzctOWNjODdhOWQzYWUwIiwicmlkIjoiOGFjZGQzZjgtNTM2OC00ZDIwLTk4ZWUtM2MxMzg1ZDQ4NGE4In0.2b_6zimjmWRHifuLDE59Y0CZd7uRp3tz_hjwrpCrARrZjZt_DhP_kdmHrNIVVL9xU91ufUNWx2JVK-T7oE6jAg'
});

app.post('/save-user', async (req, res) => {
  const { name, email, age, gender, dob } = req.body;

  try {
    // Create table if not exists
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        dob TEXT,
        age INTEGER,
        gender TEXT
      )
    `);

    // Insert data
    await client.execute({
      sql: `INSERT INTO users (name, email, dob, age, gender) VALUES (?, ?, ?, ?, ?)`,
      args: [name, email, dob, age, gender]
    });

    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
