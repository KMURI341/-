from flask import Flask, jsonify, request
from flask_cors import CORS
import math
import openai
from openai import OpenAI
import os
from dotenv import load_dotenv  # dotenvをインポート
from bs4 import BeautifulSoup
import requests

# .envファイルの内容を読み込む
load_dotenv()
# OpenAI APIキーを設定
api_key = api_key = os.getenv("OPENAI_API_KEY")


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
    print("VisionReflector")
    data = request.get_json()  # JSONデータを取得
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400
    # 'theme' プロパティが含まれていることを確認
    age = data.get('age', 'No number provided')
    gender = data.get('gender', 'No gender provided')
    theme = data.get('theme', 'No theme provided')
    words = data.get('words', 'No number provided')
    objective = data.get('objective', 'No objective selected')
    personality = data.get('personality', 'No personality selected')
    print(age)
    print(gender)
    print(theme)
    print(words)
    print(objective)
    print(personality)

    prompt = (
        f"あなたは終活のコンサルタントです。"
        f"あなたのクライアントは、今{age}歳で性別は{gender}で、職業は{theme}で、休日は{objective}をしています。"
        f"まず最初に、①クライアントの情報をもとにして、クライアントが終活に向き合う姿勢や志向を評価してカテゴライズしてください。"
        f"次に②そのようなタイプに対して、様々な終活の作業項目の中から何優先して進めたら良いかアドバイスを提示してください。"
        f"次に③クライアントの終活に対する志向、価値観を深掘りするため、以下の６つの指標を評価するための質問を提示してください。"
        f"1.健康・生活の質:自分の健康状態や生活の質をどれだけ重視するか。終末期医療や介護に関する希望。"
        f"2.経済的安定:老後の生活費や資産管理、財産の分配など、経済的な安定をどれだけ重要視するか。"
        f"3.家族との関係:家族や友人との繋がりをどれだけ大切にしているか。家族への負担軽減やコミュニケーションの維持。"
        f"4.社会貢献・遺産:自分が社会に対してどれだけ貢献したいか、または自分の遺産をどのように活用してほしいか。"
        f"5.自己実現・趣味:残りの人生で自己実現や趣味をどれだけ追求したいか。自分らしい生活や活動への意欲。"
        f"6.精神的充足感:人生の最終段階で精神的な満足感や心の平穏をどれだけ重視するか。宗教的な価値観やスピリチュアルな要素。"
        f"出力はマークダウン形式で、クライアントに語りかける口調でお願いします。"
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
