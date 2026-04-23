"use client";

import Link from 'next/link';
import { Button, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary" icon={<ArrowLeftOutlined />}>
              Back to Pokédex
            </Button>
          </Link>
        }
      />
    </div>
  );
}
