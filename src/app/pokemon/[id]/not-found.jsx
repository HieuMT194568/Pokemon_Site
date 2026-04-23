"use client";

import Link from 'next/link';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <p style={{ fontSize: '1.25rem', marginBottom: 16 }}>Pokémon not found</p>
        <Link href="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Pokédex
          </Button>
        </Link>
      </div>
    </div>
  );
}
