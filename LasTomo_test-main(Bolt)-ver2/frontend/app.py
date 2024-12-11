from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
from openai import OpenAI
import os
from dotenv import load_dotenv
import sqlite3
from datetime import datetime

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def get_db_connection():
    conn = sqlite3.connect('lastomo.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
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
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    message = data.get('message')
    history = data.get('history', [])

    # Prepare conversation context
    messages = [
        {"role": "system", "content": """あなたは終活コンサルタントです。
        ユーザーの終活に関する以下の5つの観点を評価してください：
        1. 家族関係
        2. 趣味・生きがい
        3. 仕事・キャリア
        4. 健康・医療
        5. 経済状況
        
        自然な会話を通じてユーザーの状況を理解し、適切なアドバイスを提供してください。"""}
    ]
    
    # Add conversation history
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    
    # Add current message
    messages.append({"role": "user", "content": message})

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        ai_response = response.choices[0].message.content.strip()
        
        return jsonify({"response": ai_response})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Failed to get response from AI"}), 500

@app.route('/api/profile', methods=['POST'])
def save_profile():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (
                username, nickname, email, gender, age,
                occupation, family_structure, location, nationality, religion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('username'), data.get('nickname'), data.get('email'),
            data.get('gender'), data.get('age'), data.get('occupation'),
            data.get('familyStructure'), data.get('location'),
            data.get('nationality'), data.get('religion')
        ))
        conn.commit()
        return jsonify({"message": "Profile saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5001)