"use client";

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Spin size="large" />
        <p className="loading-text">Loading Database...</p>
      </div>
    </div>
  );
}
