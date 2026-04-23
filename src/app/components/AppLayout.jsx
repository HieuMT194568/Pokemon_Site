"use client";

import React from 'react';
import { ConfigProvider, theme, Layout } from 'antd';
import SidebarMenu from './SidebarMenu';
import Link from 'next/link';

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ff4d4f',
          colorBgContainer: '#141414',
          colorBgElevated: '#1f1f1f',
          colorBgLayout: '#0a0a0a',
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Layout: {
            headerBg: '#dc2626',
            siderBg: '#1e293b',
            bodyBg: '#0a0a0a',
            footerBg: '#0a0a0a',
          },
          Menu: {
            darkItemBg: '#1e293b',
            darkItemSelectedBg: '#334155',
            darkItemHoverBg: '#334155',
            darkItemColor: 'rgba(255,255,255,0.45)',
            darkItemSelectedColor: '#fff',
          },
          Card: {
            colorBgContainer: '#1a1a2e',
          },
          Table: {
            colorBgContainer: 'transparent',
            headerBg: 'rgba(255,255,255,0.04)',
            rowHoverBg: 'rgba(255,255,255,0.04)',
          },
        },
      }}
    >
      <Layout className="app-layout">
        {/* Header */}
        <Header className="app-header">
          <Link href="/" className="header-logo">
            <div className="pokeball-icon">
              <div className="pokeball-icon-inner" />
            </div>
            <span className="header-title">Pokédex</span>
          </Link>
          <span className="header-subtitle" style={{ display: 'none' }}>
          </span>
        </Header>

        <Layout>
          {/* Sidebar */}
          <Sider
            width={256}
            breakpoint="md"
            collapsedWidth={0}
            style={{ overflow: 'auto', height: 'calc(100vh - 64px)', position: 'sticky', top: 64, left: 0 }}
          >
            <div style={{ padding: '16px 16px 0' }}>
              <div className="sidebar-lights">
                <div className="light-blue" />
                <div className="light-red" />
                <div className="sidebar-yellow" />
              </div>
              <div className="sidebar-menu-label">Menu</div>
            </div>
            <SidebarMenu />
          </Sider>

          {/* Main Content */}
          <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
              {children}
            </div>
          </Content>
        </Layout>

        {/* Footer */}
        <Footer className="app-footer">
          Built with Next.js & Ant Design. Data provided by{' '}
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
            PokéAPI
          </a>.
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
