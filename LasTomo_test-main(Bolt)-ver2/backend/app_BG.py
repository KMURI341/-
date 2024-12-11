from flask import Flask, jsonify, request
from flask_cors import CORS
import math
import openai
from openai import OpenAI
import os

#OpenAIのクライアントインスタンスを作成（api_keyは環境変数OPENAI_API_KEYで設定）
client = OpenAI()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # CORS設定を更新

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Flask start!'})

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message='Hello World by Flask')

@app.route('/api/multiply/<int:id>', methods=['GET'])
def multiply(id):
    print("multiply")
    # idの2倍の数を計算
    doubled_value = id * 3
    return jsonify({"doubled_value": doubled_value})

@app.route('/api/echo2', methods=['POST'])
def echo2():
    print("echo2")
    data = request.get_json()  # JSONデータを取得
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400
    # 'message' プロパティが含まれていることを確認
    message = data.get('message', 'No message provided')
    print(message)

    request_to_gpt = message + "をテーマとしてブログ記事を生成してください。"
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": request_to_gpt},
        ],
    )
    blog_content = response.choices[0].message.content.strip()
    print(blog_content)
    return jsonify({"message": f"echo2: {blog_content}"})

@app.route('/api/genblog', methods=['POST'])
def genglog():
    print("genblog")
    data = request.get_json()  # JSONデータを取得
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400
    # 'theme' プロパティが含まれていることを確認
    theme = data.get('theme', 'No theme provided')
    words = data.get('words', 'No number provided')
    objective = data.get('objective', 'No objective selected')
    personality = data.get('personality', 'No personality selected')
    print(theme)
    print(words)
    print(objective)
    print(personality)

    prompt = (
        f"あなたはフォロワー数10万人越えのトップブロガーです。"
        f"「{theme}」に関する記事を、単語数{words}程度で作成して下さい。"
        f"ブログの目的は、「{objective}」です。"
        f"文章のスタイルは、「{personality}」にして下さい。"
        f"出力形式はマークダウン形式を厳密に守って下さい。"
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    blog_content = response.choices[0].message.content.strip()
    print(blog_content)

    # 画像生成のプロンプトを作成
    image_prompt = (
        f"{theme}に関するブログ記事の先頭に配置するアイキャッチ画像を生成して下さい。"
        f"一目で{theme}に関する記事であることがわかるような具体的な画像にして下さい。"
        f"画像のスタイルとしては出来るだけ{personality}なイメージにしてください。"
    )
    print(image_prompt)

   # DALL-Eで画像を生成
    dalle_response = client.images.generate(
        model="dall-e-3",
        prompt=image_prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )

    # 生成された画像のURLを取得
    image_url = dalle_response.data[0].url

    # 質問、選択肢、画像URLを含むレスポンスを返す
    return jsonify({
        "content": blog_content,
        "image_url": image_url
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
