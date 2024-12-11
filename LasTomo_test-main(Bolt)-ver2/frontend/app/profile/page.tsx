"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    gender: '',
    age: '',
    occupation: '',
    familyStructure: '',
    location: '',
    nationality: '',
    religion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log(formData);
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">基本情報の入力</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">ユーザー名</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">ニックネーム</Label>
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">性別</Label>
            <Input
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">年齢</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">職業</Label>
            <Input
              id="occupation"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="familyStructure">家族構成</Label>
            <Input
              id="familyStructure"
              value={formData.familyStructure}
              onChange={(e) => setFormData({ ...formData, familyStructure: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">居住地</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">国籍</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="religion">宗教</Label>
            <Input
              id="religion"
              value={formData.religion}
              onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full">保存</Button>
        </form>
      </Card>
    </div>
  );
}