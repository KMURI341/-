"use client";

import { Card } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">使い方</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">LastTomoとは</h2>
            <p className="text-gray-600">
              LastTomoは、あなたの終活をサポートするアプリケーションです。
              リフレクションを通じて、あなたの価値観を見つけ、より良い終活の準備をお手伝いします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">主な機能</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>リフレクション - AIとの対話を通じて自己理解を深めます</li>
              <li>基本情報の入力 - あなたの情報を安全に管理します</li>
              <li>価値観診断 - あなたの価値観を分析します</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
}