"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, FileText, Heart, HelpCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();

  // POSTリクエスト用の状態管理
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [theme, setTheme] = useState("");
  const [objective, setObjective] = useState("");
  const [personality, setPersonality] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/genblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        gender,
        theme,
        objective,
        personality,
      }),
    });
    const data = await res.json();
    setPostResponse(data.content);
    setGeneratedImageUrl(data.image_url);
  };

  // メニュー項目
  const menuItems = [
    {
      title: "リフレクションを始めよう",
      icon: <MessageCircle className="w-6 h-6" />,
      path: "/reflection",
    },
    {
      title: "基本情報の入力",
      icon: <FileText className="w-6 h-6" />,
      path: "/profile",
    },
    {
      title: "価値観診断",
      icon: <Heart className="w-6 h-6" />,
      path: "/values",
    },
    {
      title: "使い方",
      icon: <HelpCircle className="w-6 h-6" />,
      path: "/help",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          LastTomo - 終活リフレクション
        </h1>

        {/* メニューセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800"
              onClick={() => router.push(item.path)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h2>
              </div>
            </Card>
          ))}
        </div>

        {/* フォームセクション */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            終活リフレクションフォーム
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                年齢
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="数字を入力して下さい"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                性別
              </label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="性別を入力してください"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                職業
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="職業を入力してください"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                休日の過ごし方
              </label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">選択してください</option>
                <option value="何もしない">何もしない</option>
                <option value="昼寝">昼寝</option>
                <option value="スポーツ">スポーツ</option>
                <option value="読書">読書</option>
                <option value="音楽">音楽</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                家族構成
              </label>
              <select
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">選択してください</option>
                <option value="独身">独身</option>
                <option value="既婚">既婚</option>
                <option value="子供1人">子供1人</option>
                <option value="子供2人">子供2人</option>
                <option value="子供3人">子供3人</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-primary text-white rounded"
            >
              終活リフレクションを送信
            </button>
          </form>
        </div>

        {/* レスポンスセクション */}
        {postResponse && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              レスポンス
            </h2>
            <ReactMarkdown className="prose dark:prose-invert">
              {postResponse}
            </ReactMarkdown>

            {generatedImageUrl && (
              <div className="mt-4">
                <h3 className="text-lg text-gray-800 dark:text-white">
                  生成された画像
                </h3>
                <img src={generatedImageUrl} alt="Generated" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
