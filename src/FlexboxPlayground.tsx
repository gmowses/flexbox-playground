import { useState } from 'react'
import { Copy, Sun, Moon, Languages, LayoutTemplate } from 'lucide-react'

const translations = {
  en: {
    title: 'Flexbox Playground',
    subtitle: 'Visual Flexbox builder: flex-direction, justify-content, align-items, flex-wrap and gap. Live preview with colored boxes.',
    direction: 'flex-direction',
    justify: 'justify-content',
    align: 'align-items',
    wrap: 'flex-wrap',
    gap: 'gap',
    items: 'Items',
    preview: 'Live Preview',
    cssOutput: 'CSS Output',
    copy: 'Copy',
    copied: 'Copied!',
    addItem: 'Add Item',
    removeItem: 'Remove Item',
    builtBy: 'Built by',
  },
  pt: {
    title: 'Playground Flexbox',
    subtitle: 'Construtor visual de Flexbox: flex-direction, justify-content, align-items, flex-wrap e gap. Preview ao vivo com caixas coloridas.',
    direction: 'flex-direction',
    justify: 'justify-content',
    align: 'align-items',
    wrap: 'flex-wrap',
    gap: 'gap',
    items: 'Itens',
    preview: 'Preview ao Vivo',
    cssOutput: 'Saida CSS',
    copy: 'Copiar',
    copied: 'Copiado!',
    addItem: 'Adicionar Item',
    removeItem: 'Remover Item',
    builtBy: 'Criado por',
  },
} as const

type Lang = keyof typeof translations

const ITEM_COLORS = ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#94a3b8']

const DIRECTION_OPTS = ['row', 'row-reverse', 'column', 'column-reverse']
const JUSTIFY_OPTS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
const ALIGN_OPTS = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']
const WRAP_OPTS = ['nowrap', 'wrap', 'wrap-reverse']

export default function FlexboxPlayground() {
  const [lang, setLang] = useState<Lang>(() => navigator.language.startsWith('pt') ? 'pt' : 'en')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('wrap')
  const [gap, setGap] = useState(16)
  const [itemCount, setItemCount] = useState(5)
  const [copied, setCopied] = useState(false)

  const t = translations[lang]

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }

  const cssOutput = `.flex-container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const btnGroup = (label: string, opts: string[], val: string, set: (v: string) => void) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 font-mono">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {opts.map(o => (
          <button
            key={o}
            onClick={() => set(o)}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-colors ${val === o ? 'bg-violet-500 text-white border-violet-500' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
              <LayoutTemplate size={18} className="text-white" />
            </div>
            <span className="font-semibold">Flexbox Playground</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleDark} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/flexbox-playground" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Controls */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-5">
              {btnGroup(t.direction, DIRECTION_OPTS, direction, setDirection)}
              {btnGroup(t.justify, JUSTIFY_OPTS, justify, setJustify)}
              {btnGroup(t.align, ALIGN_OPTS, align, setAlign)}
              {btnGroup(t.wrap, WRAP_OPTS, wrap, setWrap)}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium font-mono">{t.gap}</span>
                  <span className="font-bold text-violet-500">{gap}px</span>
                </div>
                <input type="range" min={0} max={48} value={gap} onChange={e => setGap(Number(e.target.value))} className="w-full accent-violet-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{t.items}</span>
                  <span className="font-bold text-violet-500">{itemCount}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setItemCount(c => Math.max(1, c - 1))} className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">{t.removeItem}</button>
                  <button onClick={() => setItemCount(c => Math.min(12, c + 1))} className="flex-1 px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors">{t.addItem}</button>
                </div>
              </div>
            </div>

            {/* Preview + CSS */}
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
                <h2 className="font-semibold">{t.preview}</h2>
                <div
                  className="w-full min-h-[200px] rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-200 dark:border-zinc-700"
                  style={{ display: 'flex', flexDirection: direction as 'row', justifyContent: justify, alignItems: align, flexWrap: wrap as 'wrap', gap: `${gap}px` }}
                >
                  {Array.from({ length: itemCount }, (_, i) => (
                    <div
                      key={i}
                      className="rounded-lg flex items-center justify-center font-bold text-white text-sm min-w-[40px] min-h-[40px] px-3 py-2"
                      style={{ backgroundColor: ITEM_COLORS[i % ITEM_COLORS.length] }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{t.cssOutput}</h2>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors"
                  >
                    <Copy size={12} />
                    {copied ? t.copied : t.copy}
                  </button>
                </div>
                <pre className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm overflow-auto whitespace-pre select-all text-zinc-700 dark:text-zinc-300">
                  {cssOutput}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>{t.builtBy} <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-violet-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}
