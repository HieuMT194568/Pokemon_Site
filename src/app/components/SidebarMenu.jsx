"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { GENERATIONS } from '../constants/pokemon';

export default function SidebarMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: 'all',
      label: 'All Generations',
    },
    ...GENERATIONS.map((gen) => ({
      key: String(gen.id),
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>{gen.name}</div>
          <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase' }}>{gen.region}</div>
        </div>
      ),
    })),
    { type: 'divider' },
    {
      key: 'items',
      label: 'Items',
    },
  ];

  // Normalization logic:
  // if pathname is / -> selectedKey is 'all'
  // if pathname is /gen/1 -> selectedKey is '1'
  let selectedKey = 'all';
  if (pathname) {
    if (pathname.startsWith('/gen/')) {
      selectedKey = pathname.replace('/gen/', '');
    } else if (pathname.startsWith('/items')) {
      selectedKey = 'items';
    }
  }

  const handleMenuClick = ({ key }) => {
    if (key === 'all') {
      router.push('/');
    } else if (key === 'items') {
      router.push('/items');
    } else {
      router.push(`/gen/${key}`);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={menuItems}
      style={{ borderRight: 'none' }}
    />
  );
}
