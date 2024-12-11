"use client";

import { Card } from "@/components/ui/card";

export default function ValuesPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">価値観診断</h1>
        <p className="text-gray-600">
          このページでは、あなたの価値観を診断し、終活に向けた方向性を見つけていきます。
        </p>
        {/* TODO: Implement values assessment */}
      </Card>
    </div>
  );
}