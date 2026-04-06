import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* HEADER: Chủ đề Pokeball */}
      {/* Nửa trên đỏ, có đường viền đen dày ở dưới để tạo cảm giác giống đường cắt chẻ ngang quả Pokeball */}
      <header className="bg-red-600 border-b-8 border-gray-900 text-white shadow-md z-20 relative">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Pokedex kèm biểu tượng tâm Pokeball vẽ bằng CSS */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-widest uppercase font-mono">
              Pokédex
            </span>
          </Link>

          {/* Thanh tìm kiếm hoặc thông tin người dùng có thể để ở đây */}
          <div className="hidden sm:block text-sm font-medium opacity-80">
            Gen 1 - Kanto
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR: Chủ đề thiết bị Pokedex */}
        {/* Dùng màu xám đen đậm, điểm xuyết các đèn tín hiệu Xanh/Vàng/Đỏ quen thuộc của máy Pokedex */}
        <aside className="w-64 bg-slate-800 border-r-4 border-gray-900 hidden md:flex flex-col z-10 shadow-lg">
          <div className="p-4 border-b border-slate-700">
            {/* Đèn tín hiệu Pokedex */}
            <div className="flex gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-gray-900 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-gray-900"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-gray-900"></div>
            </div>
            <h2 className="text-slate-400 text-xs uppercase font-bold tracking-wider mt-4">Menu</h2>
          </div>

          <nav className="flex-1 p-4 flex flex-col gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 border-l-4 border-red-500 transition-colors shadow-sm"
            >
              Kanto Pokédex
            </Link>
            {/* Nếu sau này bạn làm các Gen khác, có thể thêm link ở đây */}
            <button className="px-4 py-2 text-left text-slate-400 rounded-md hover:bg-slate-700 hover:text-white transition-colors cursor-not-allowed">
              Johto Pokédex (Comming Soon)
            </button>
            <button className="px-4 py-2 text-left text-slate-400 rounded-md hover:bg-slate-700 hover:text-white transition-colors cursor-not-allowed">
              Items (Comming Soon)
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT: Nơi chứa trang Home hoặc PokemonDetail */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto w-full">
            {/* Component con sẽ được render tại đây */}
            <Outlet /> 
          </div>
        </main>

      </div>

      {/* FOOTER: Đơn giản, tinh tế */}
      <footer className="bg-gray-900 border-t border-gray-800 text-slate-400 py-4 text-center text-sm z-20">
        <p>Built with React & Vite. Data provided by <a href="https://pokeapi.co/" className="text-red-400 hover:underline">PokéAPI</a>.</p>
      </footer>

    </div>
  );
}