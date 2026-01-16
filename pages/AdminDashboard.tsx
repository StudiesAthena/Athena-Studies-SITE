
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import { 
  Plus, Edit2, Trash2, Save, X, 
  Image as ImageIcon, Tag, FileText, 
  AlignLeft, Loader2, LogOut, Search, AlertTriangle,
  AlertCircle, ImagePlus, Info
} from 'lucide-react';
import { CTAButton } from '../components/CTAButton';

export const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setArticles(data.map(item => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          category: item.category,
          imageUrl: item.image_url || item.imageUrl,
          date: item.date || new Date(item.created_at).toLocaleDateString('pt-BR')
        })));
      }
    } catch (err: any) {
      console.error('Erro ao buscar:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setIsSaving(true);

    const payload = {
      title: editingArticle.title,
      excerpt: editingArticle.excerpt,
      content: editingArticle.content,
      category: editingArticle.category,
      image_url: editingArticle.imageUrl
    };

    try {
      if (editingArticle.id) {
        const { error } = await supabase
          .from('articles')
          .update(payload)
          .eq('id', editingArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([payload]);
        if (error) throw error;
      }
      setEditingArticle(null);
      await fetchArticles();
    } catch (err: any) {
      alert(`Erro ao salvar: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const insertImage = () => {
    const url = prompt('Cole a URL da imagem aqui:');
    if (!url) return;

    const imgTag = `\n<img src="${url}" class="w-full my-8 rounded-3xl shadow-lg border border-slate-100" />\n`;
    
    if (contentRef.current && editingArticle) {
      const start = contentRef.current.selectionStart;
      const end = contentRef.current.selectionEnd;
      const text = editingArticle.content || '';
      const newContent = text.substring(0, start) + imgTag + text.substring(end);
      setEditingArticle({ ...editingArticle, content: newContent });
    } else {
      setEditingArticle({ ...editingArticle, content: (editingArticle?.content || '') + imgTag });
    }
  };

  const executeDelete = async () => {
    const id = confirmDeleteId;
    if (!id) return;
    
    setConfirmDeleteId(null);
    setDeletingId(id);

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err: any) {
      alert(`Erro na exclusão: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-athena-dark p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-athena-blue p-3 rounded-2xl text-white">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">Painel Administrativo</h1>
              <p className="text-slate-500 text-sm font-medium">Controle total sobre o conteúdo do Blog Athena.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CTAButton variant="outline" onClick={handleLogout} className="flex items-center gap-2 py-3 px-6 text-xs">
              <LogOut size={16} /> SAIR
            </CTAButton>
            <CTAButton variant="primary" onClick={() => setEditingArticle({})} className="flex items-center gap-2 py-3 px-6 text-xs">
              <Plus size={16} /> NOVO ARTIGO
            </CTAButton>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-athena-blue transition-all"
              />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-athena-blue mb-4" size={40} />
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sincronizando...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                    <AlertTriangle size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-bold">Nenhum artigo encontrado.</p>
                  </div>
                ) : (
                  filteredArticles.map(article => (
                    <div key={article.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:shadow-lg transition-all">
                      <div className="flex items-center gap-6">
                        <img src={article.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-athena-blue transition-colors text-lg">{article.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-slate-400 font-bold mt-1">
                            <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest text-[9px] text-athena-blue">{article.category}</span>
                            <span>•</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingArticle(article)}
                          className="p-4 text-slate-400 hover:text-athena-blue hover:bg-athena-blue/10 rounded-2xl transition-all"
                        >
                          <Edit2 size={20} className="pointer-events-none" />
                        </button>
                        <button 
                          onClick={() => setConfirmDeleteId(article.id)}
                          disabled={deletingId === article.id}
                          className={`p-4 rounded-2xl transition-all ${
                            deletingId === article.id 
                            ? 'text-slate-300 bg-slate-50' 
                            : 'text-slate-400 hover:text-athena-pink hover:bg-athena-pink/10'
                          }`}
                        >
                          {deletingId === article.id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} className="pointer-events-none" />}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-athena-blue p-8 rounded-[3rem] text-white space-y-4 shadow-xl">
              <h3 className="text-xl font-bold font-heading">Visão Geral</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <div className="text-2xl font-black">{articles.length}</div>
                  <div className="text-[10px] font-bold uppercase opacity-60">Posts Ativos</div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <div className="text-2xl font-black">{new Set(articles.map(a => a.category)).size}</div>
                  <div className="text-[10px] font-bold uppercase opacity-60">Categorias</div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {confirmDeleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-8 animate-in zoom-in-95 duration-300">
              <div className="bg-athena-pink/10 text-athena-pink w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                <AlertCircle size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Excluir Artigo?</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Tem certeza que deseja remover este conteúdo? Esta ação é permanente e não poderá ser desfeita no banco de dados.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={executeDelete}
                  className="w-full py-4 bg-athena-pink text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-700 transition-colors shadow-lg shadow-athena-pink/20"
                >
                  SIM, EXCLUIR AGORA
                </button>
                <button 
                  onClick={() => setConfirmDeleteId(null)}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        )}

        {editingArticle && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex items-center gap-3">
                  <div className="bg-athena-pink/10 text-athena-pink p-2 rounded-xl">
                    {editingArticle.id ? <Edit2 size={20} /> : <Plus size={20} />}
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {editingArticle.id ? 'Editar Artigo' : 'Novo Artigo'}
                  </h2>
                </div>
                <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-athena-pink transition-colors"><X size={28} /></button>
              </div>
              
              <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Título</label>
                    <input required value={editingArticle.title || ''} onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 px-5 outline-none border-2 border-transparent focus:border-athena-blue transition-all dark:text-white font-bold"/>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoria</label>
                    <input required value={editingArticle.category || ''} onChange={(e) => setEditingArticle({...editingArticle, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 px-5 outline-none border-2 border-transparent focus:border-athena-blue transition-all dark:text-white font-bold"/>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL da Imagem de Capa</label>
                  <input required value={editingArticle.imageUrl || ''} onChange={(e) => setEditingArticle({...editingArticle, imageUrl: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 px-5 outline-none border-2 border-transparent focus:border-athena-blue transition-all dark:text-white"/>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resumo (Excerpt)</label>
                  <textarea required rows={2} value={editingArticle.excerpt || ''} onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-4 px-5 outline-none border-2 border-transparent focus:border-athena-blue transition-all dark:text-white resize-none font-medium"/>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Conteúdo do Artigo (Suporta HTML)</label>
                    <button 
                      type="button" 
                      onClick={insertImage}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-athena-blue bg-athena-blue/5 px-4 py-2 rounded-xl hover:bg-athena-blue/10 transition-colors"
                    >
                      <ImagePlus size={16} /> Inserir Imagem no Texto
                    </button>
                  </div>
                  <textarea 
                    ref={contentRef}
                    required 
                    rows={12} 
                    value={editingArticle.content || ''} 
                    onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})} 
                    className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl py-5 px-5 outline-none border-2 border-transparent focus:border-athena-blue transition-all dark:text-white resize-none font-medium leading-relaxed"
                  />
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                    <Info size={14} className="text-athena-blue" />
                    <span>Dica: Use parágrafos simples ou tags HTML para formatar. Newlines serão preservadas como parágrafos.</span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <CTAButton variant="primary" className="flex-1 flex items-center justify-center gap-3 py-5 text-sm">
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> SALVAR ARTIGO</>}
                  </CTAButton>
                  <CTAButton variant="outline" className="flex-1 py-5 text-sm" onClick={() => setEditingArticle(null)}>CANCELAR</CTAButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
