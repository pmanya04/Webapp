// src/db.js
import { createClient } from '@libsql/client';

export const client = createClient({
  url: 'libsql://forms-pmanya04.aws-ap-south-1.turso.io',      // Replace this
  authToken: 'YOUR_AUTeyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTQ0Nzg2MzcsImlkIjoiYWViODRkZTMtYjhjYy00Yjk4LTg0NzctOWNjODdhOWQzYWUwIiwicmlkIjoiOGFjZGQzZjgtNTM2OC00ZDIwLTk4ZWUtM2MxMzg1ZDQ4NGE4In0.2b_6zimjmWRHifuLDE59Y0CZd7uRp3tz_hjwrpCrARrZjZt_DhP_kdmHrNIVVL9xU91ufUNWx2JVK-T7oE6jAg'                // Replace this
});
