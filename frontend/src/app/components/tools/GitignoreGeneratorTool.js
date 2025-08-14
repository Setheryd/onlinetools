"use client";
import React, { useMemo, useState } from 'react';
import Button from '../ui/Button';

const templates = {
  node: ['node_modules/','npm-debug.log*','yarn-debug.log*','yarn-error.log*','.pnpm-store/','.turbo','.next','.nuxt','dist/','build/','.cache/','.parcel-cache/','.eslintcache'].join('\n'),
  python: ['__pycache__/','*.py[cod]','*.egg-info/','.venv/','venv/','.mypy_cache/','.pytest_cache/','.ruff_cache/','.ipynb_checkpoints'].join('\n'),
  java: ['*.class','*.jar','*.war','*.ear','.idea/','.project','.settings/','target/','.gradle/','build/'].join('\n'),
  go: ['bin/','build/','dist/','*.test','*.out','coverage/'].join('\n'),
  rust: ['target/','**/*.rs.bk','Cargo.lock','*.rmeta'].join('\n'),
  dotnet: ['bin/','obj/','*.user','*.suo','*.userprefs','.vs/'].join('\n'),
  php: ['vendor/','composer.lock','*.log','.idea/','.vscode/'].join('\n'),
  ruby: ['.bundle/','vendor/bundle/','*.gem','log/','tmp/'].join('\n'),
  android: ['*.iml','.gradle/','/local.properties','.idea/','.DS_Store','/build','/captures','GoogleService-Info.plist'].join('\n'),
  ios: ['*.mode1v3','*.mode2v3','*.perspectivev3','xcuserdata/','DerivedData/','build/','.DS_Store'].join('\n'),
  react: ['.next/','out/','.cache/','node_modules/'].join('\n'),
  angular: ['dist/','tmp/','node_modules/','.angular/cache'].join('\n'),
  vue: ['node_modules/','dist/','.cache/'].join('\n'),
  svelte: ['node_modules/','build/','.svelte-kit/'].join('\n'),
  astro: ['node_modules/','dist/','.astro/'].join('\n'),
  flutter: ['.dart_tool/','build/','.packages','pubspec.lock','.flutter-plugins','ios/Flutter/Generated.xcconfig'].join('\n'),
  unity: ['[Ll]ibrary/','[Tt]emp/','[Oo]bj/','[Bb]uild/','[Bb]uilds/','[Ll]ogs/','UserSettings/'].join('\n'),
  vscode: ['.vscode/','!.vscode/extensions.json','!.vscode/settings.json'].join('\n'),
  macos: ['.DS_Store','**/.DS_Store'].join('\n'),
  windows: ['Thumbs.db','ehthumbs.db','Desktop.ini','$RECYCLE.BIN/'].join('\n'),
  linux: ['*~','.cache/'].join('\n'),
  docker: ['*.pid','.env','.dockerignore','Dockerfile*','**/docker-compose*.yml','/data/','/tmp/'].join('\n'),
  terraform: ['.terraform/','*.tfstate','*.tfstate.*','crash.log','override.tf','override.tf.json','*_override.tf','*_override.tf.json','.terraformrc','terraform.rc'].join('\n'),
  kubernetes: ['.kube/','*.kubeconfig'].join('\n'),
};

const GitignoreGeneratorTool = () => {
  const [selected, setSelected] = useState({ node: true, vscode: true, macos: true });
  const [search, setSearch] = useState('');
  const [custom, setCustom] = useState('');
  const content = useMemo(() => {
    const parts = [];
    Object.entries(selected).forEach(([k, v]) => { if (v && templates[k]) parts.push(`# ${k}\n${templates[k]}`); });
    if (custom.trim()) parts.push(`# custom\n${custom.trim()}`);
    return parts.join('\n\n');
  }, [selected, custom]);

  const toggle = (k) => setSelected((s)=> ({ ...s, [k]: !s[k] }));
  const allKeys = useMemo(() => Object.keys(templates), []);
  const filteredKeys = useMemo(() => allKeys.filter(k => k.toLowerCase().includes(search.trim().toLowerCase())), [allKeys, search]);
  const copy = async () => { try { await navigator.clipboard.writeText(content); } catch {} };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">.gitignore Generator</h1>
      <p className="text-gray-600 mb-4">Pick templates and add custom rules to build your .gitignore.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="mb-2">
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search templates (e.g., node, python, react)"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredKeys.map((k) => (
              <button
                key={k}
                onClick={()=>toggle(k)}
                className={`px-3 py-2 rounded text-sm border ${selected[k] ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-800'} hover:shadow-sm`}
                title={k}
              >
                {selected[k] ? '✓ ' : ''}{k}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <div className="text-sm text-gray-700 mb-1">Custom entries</div>
            <textarea value={custom} onChange={(e)=>setCustom(e.target.value)} className="w-full h-40 px-3 py-2 border rounded text-sm font-mono" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">.gitignore</span>
            <Button variant="outline" size="sm" onClick={copy}>Copy</Button>
          </div>
          <textarea readOnly value={content} className="w-full h-96 px-3 py-2 border rounded text-sm font-mono bg-gray-50" />
        </div>
      </div>
    </div>
  );
};

export default GitignoreGeneratorTool;


