"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatContainer } from '@/components/chat/chat-container';
import { Card } from "@/components/ui/card";

export default function ReflectionPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 h-[calc(100vh-2rem)]">
      <Card className="h-full">
        <ChatContainer />
      </Card>
    </div>
  );
}