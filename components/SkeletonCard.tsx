// components/SkeletonProductCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="w-full">
          <Skeleton className="h-40 w-full rounded-md" />
        </div>

        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-20" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
