import { Database } from 'sqlite3';
import { open } from 'sqlite';

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: './lastomo.db',
      driver: Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        nickname TEXT,
        email TEXT UNIQUE,
        gender TEXT,
        age INTEGER,
        occupation TEXT,
        family_structure TEXT,
        location TEXT,
        nationality TEXT,
        religion TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reflections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        conversation_json TEXT,
        family_score INTEGER,
        hobby_score INTEGER,
        work_score INTEGER,
        health_score INTEGER,
        money_score INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
  }
  return db;
}