"use client";

import React, { Suspense } from 'react';
import Loading from '../loading';

// Simulate an eternally loading page using the global loading component
export default function ItemsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Loading />
    </Suspense>
  );
}
