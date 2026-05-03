import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Bug, 
  HelpCircle, 
  Plus,
  CheckCircle2,
  Clock,
  Circle,
  LucideIcon
} from 'lucide-react';

/**
 * GENIAL SIDEBAR MODULE
 * Features: Collapsible, Mobile-responsive, Tiered Org, Entity Switching, Build Metadata.
 */

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  status?: 'todo' | 'in-progress' | 'completed';
}

export interface SidebarSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  // Brand
  appName: string;
  logo?: React.ReactNode;
  
  // Navigation
  activeId: string;
  sections: SidebarSection[];
  onNavigate: (id: string) => void;
  
  // User Profile
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
  
  // Global Actions & State
  onSearch?: (query: string) => void;
  onQuickAction?: () => void;
  onDebugClick?: () => void;
  onHelpClick?: () => void;
  
  // Configurable Features
  showSearch?: boolean;
  showQuickAction?: boolean;
  showBuildMeta?: boolean;
  buildNumber?: string;
  buildTimestamp?: string;
  
  // Optional Menu Editor Feature
  showMenuEditor?: boolean;
  onEditMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  appName,
  logo,
  activeId,
  sections,
  onNavigate,
  user,
  onSignOut,
  onSearch,
  onQuickAction,
  onDebugClick,
  onHelpClick,
  showSearch = true,
  showQuickAction = true,
  showBuildMeta = true,
  buildNumber = '0.0.1',
  buildTimestamp = new Date().toISOString().split('T')[0],
  showMenuEditor = false,
  onEditMenu
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-ocean-500 animate-pulse" />;
      case 'todo': return <Circle className="w-4 h-4 text-slate-300" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-[60] p-2 bg-white border border-slate-200 rounded-lg shadow-sm sm:hidden"
      >
        <Menu className="w-6 h-6 text-slate-600" />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-[65] backdrop-blur-sm sm:hidden" 
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar Main Container */}
      <div className={`
        fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-[70] transition-all duration-300 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
      `}>
        
        {/* Header: App Name and Collapse Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ocean-50 flex items-center justify-center text-ocean-600 shrink-0 shadow-sm border border-ocean-100">
              {logo || <div className="w-4 h-4 bg-ocean-600 rounded-sm" />}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <h1 className="text-sm font-bold text-slate-800 truncate">{appName}</h1>
                {showBuildMeta && (
                  <span className="text-[9px] text-slate-400 font-mono leading-none">
                    {buildNumber} • {buildTimestamp}
                  </span>
                )}
              </div>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="hidden sm:flex p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Global Utilities: Search and Quick Action */}
        {(showSearch || showQuickAction) && (
          <div className="px-3 py-4 space-y-2 shrink-0">
            {showSearch && (
              <div className="relative group">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? 'text-ocean-500' : 'text-slate-400 group-focus-within:text-ocean-500'}`} />
                {isCollapsed ? (
                  <button 
                    onClick={() => { setIsCollapsed(false); }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 mx-auto"
                  >
                    <Search size={18} />
                  </button>
                ) : (
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      onSearch?.(e.target.value);
                    }}
                    placeholder="Search..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 outline-none transition-all"
                  />
                )}
              </div>
            )}
            
            {!isCollapsed && showQuickAction && (
              <button 
                onClick={onQuickAction}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-ocean-600 hover:bg-ocean-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-ocean-200 transition-all active:scale-95"
              >
                <Plus size={16} />
                <span>Quick Action</span>
              </button>
            )}
            {isCollapsed && showQuickAction && (
              <button 
                onClick={onQuickAction}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-ocean-600 text-white mx-auto shadow-sm active:scale-95 transition-transform"
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        )}

        {/* Scrolling Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 space-y-6 pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCollapsed && section.title && (
                <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {section.title}
                </h3>
              )}
              {isCollapsed && section.title && <div className="h-px bg-slate-100 my-4 mx-2" />}
              
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeId === item.id;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          onNavigate(item.id);
                          if (isMobileOpen) setIsMobileOpen(false);
                        }}
                        title={isCollapsed ? item.label : undefined}
                        className={`
                          w-full flex items-center gap-3 py-2.5 transition-all duration-200 rounded-lg group
                          ${isActive ? 'bg-ocean-50 text-ocean-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}
                          ${isCollapsed ? 'justify-center px-0' : 'px-3'}
                        `}
                      >
                        <div className={`relative shrink-0 ${isActive ? 'text-ocean-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                          <Icon size={isCollapsed ? 20 : 18} />
                          {item.badge !== undefined && isCollapsed && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center ring-2 ring-white">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left truncate">{item.label}</span>
                            {item.status && getStatusIcon(item.status)}
                            {item.badge !== undefined && (
                              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {!isCollapsed && showMenuEditor && (
            <button 
              onClick={onEditMenu}
              className="w-full text-center py-2 text-[11px] text-slate-400 hover:text-ocean-600 font-bold uppercase tracking-wider border-t border-dashed border-slate-100 mt-4"
            >
              ✎ Edit Menu
            </button>
          )}
        </div>

        {/* Footer: User Profile, Debug, and Help */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-3 shrink-0">
          <div className="flex items-center justify-around gap-1">
            <button 
              onClick={onDebugClick}
              title="Debug Mode"
              className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
            >
              <Bug size={18} />
            </button>
            <button 
              onClick={onHelpClick}
              title="Help & Guides"
              className="p-2 text-slate-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-lg transition-all"
            >
              <HelpCircle size={18} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button 
              onClick={onSignOut}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>

          <div className={`
            flex items-center gap-3 p-2 rounded-xl transition-colors
            ${isCollapsed ? 'justify-center bg-transparent border-none' : 'bg-white border border-slate-200 shadow-sm'}
          `}>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={16} className="text-slate-400" />
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-none mb-0.5">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-400 truncate leading-none">{user?.email || 'not-signed-in'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
