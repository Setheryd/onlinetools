"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { create, all } from 'mathjs';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const math = create(all, { number: 'number', precision: 64 });

const keypadRows = [
  ['7', '8', '9', '(', ')', '⌫'],
  ['4', '5', '6', '×', '÷', '^'],
  ['1', '2', '3', '+', '-', '='],
  ['0', '.', 'π', 'e', 'Ans', 'Cls'],
];

const fnButtons = [
  ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'],
  ['sinh', 'cosh', 'tanh', 'log', 'ln', '√'],
  ['abs', 'floor', 'ceil', 'round', 'exp', '!'],
];

const palette = [
  '#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#9333ea', '#10b981', '#d946ef'
];

function withAngleMode(expr, mode) {
  if (mode === 'RAD') return expr;
  // Inject `deg` unit into trig calls for degree mode
  const simple = /\b(sin|cos|tan|asin|acos|atan|sinh|cosh|tanh)\s*\(([^()]+)\)/gi;
  let out = expr;
  // Replace only when argument doesn't already include a unit
  out = out.replace(simple, (m, fn, arg) => {
    // Skip if arg already contains 'deg' or 'rad'
    if (/\b(deg|rad)\b/.test(arg)) return `${fn}(${arg})`;
    // For inverse trig, result should be in degrees: wrap with to \* (180/pi)
    if (/^a(sin|cos|tan)/i.test(fn)) {
      return `((${fn}(${arg})) * (180 / pi))`;
    }
    // For direct trig, mark input as degrees
    return `${fn}(${arg} deg)`;
  });
  return out;
}

function nextColor(index) {
  return palette[index % palette.length];
}

const ScientificCalculatorTool = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [angleMode, setAngleMode] = useState('DEG'); // DEG | RAD
  const [scope, setScope] = useState({});
  const [ans, setAns] = useState(0);
  const [history, setHistory] = useState([]); // { expr, shownExpr, result }
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [samples, setSamples] = useState(200);
  const [series, setSeries] = useState([]); // { id, label, expr, color, points }
  const [pendingGraphExpr, setPendingGraphExpr] = useState('');
  const evalRef = useRef(null);

  useEffect(() => {
    evalRef.current = (expr, customScope) => {
      const scoped = { ...scope, ...customScope, pi: Math.PI, e: Math.E, Ans: ans };
      const prepared = withAngleMode(expr, angleMode);
      return math.evaluate(prepared, scoped);
    };
  }, [scope, ans, angleMode]);

  const evaluateExpression = useCallback(() => {
    const raw = expression.trim();
    if (!raw) return;
    try {
      // Replace symbols for mathjs
      let expr = raw.replace(/×/g, '*').replace(/÷/g, '/').replace(/√/g, 'sqrt');
      expr = expr.replace(/π/g, 'pi');
      expr = expr.replace(/ln\b/g, 'log');
      expr = expr.replace(/log\b/g, 'log10');
      // Factorial shorthand
      expr = expr.replace(/(\))\s*!/g, 'factorial$1');
      expr = expr.replace(/(\b\d+(?:\.\d+)?|\b[a-zA-Z_][a-zA-Z0-9_]*)\s*!/g, 'factorial($1)');
      const value = evalRef.current(expr, {});
      setResult(String(value));
      setError('');
      setAns(value);
      setHistory((h) => [{ expr, shownExpr: raw, result: String(value) }, ...h].slice(0, 200));
    } catch (e) {
      setError('Invalid expression');
      setResult('');
    }
  }, [expression]);

  const handleKey = (k) => {
    if (k === '=') return evaluateExpression();
    if (k === '⌫') return setExpression((s) => s.slice(0, -1));
    if (k === 'Cls') return setExpression('');
    if (k === 'π') return setExpression((s) => s + 'π');
    if (k === 'e') return setExpression((s) => s + 'e');
    if (k === 'Ans') return setExpression((s) => s + 'Ans');
    const mapped = k.replace('×', '*').replace('÷', '/');
    setExpression((s) => s + mapped);
  };

  const insertFn = (name) => {
    if (name === '√') return setExpression((s) => s + '√(');
    if (name === 'ln') return setExpression((s) => s + 'ln(');
    if (name === '!') return setExpression((s) => s + '!');
    setExpression((s) => s + name + '(');
  };

  const addVariable = (varName, varExpr) => {
    if (!/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(varName)) return;
    try {
      const value = evalRef.current(varExpr, {});
      setScope((sc) => ({ ...sc, [varName]: value }));
    } catch {}
  };

  const plotExpression = (expr) => {
    const raw = (expr || expression).trim();
    if (!raw) return;
    try {
      let e = raw.replace(/×/g, '*').replace(/÷/g, '/').replace(/√/g, 'sqrt').replace(/π/g, 'pi').replace(/ln\b/g, 'log').replace(/log\b/g, 'log10');
      e = e.replace(/(\))\s*!/g, 'factorial$1');
      e = e.replace(/(\b\d+(?:\.\d+)?|\b[a-zA-Z_][a-zA-Z0-9_]*)\s*!/g, 'factorial($1)');
      const color = nextColor(series.length);
      const xs = [];
      const ys = [];
      const step = (Number(xMax) - Number(xMin)) / Math.max(10, Number(samples));
      for (let x = Number(xMin); x <= Number(xMax) + 1e-12; x += step) {
        try {
          const y = evalRef.current(e, { x });
          if (Number.isFinite(y)) {
            xs.push(x);
            ys.push(y);
          } else {
            xs.push(x);
            ys.push(null);
          }
        } catch {
          xs.push(x);
          ys.push(null);
        }
      }
      const label = raw.includes('=') ? raw : `y = ${raw}`;
      setSeries((s) => [
        ...s,
        { id: Date.now().toString(), label, expr: raw, color, points: { x: xs, y: ys } }
      ]);
      setPendingGraphExpr('');
    } catch {}
  };

  const chartData = useMemo(() => {
    return {
      labels: [],
      datasets: series.map((s) => ({
        label: s.label,
        data: s.points.x.map((x, i) => ({ x, y: s.points.y[i] })),
        borderColor: s.color,
        backgroundColor: s.color + '33',
        spanGaps: true,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.2,
      }))
    };
  }, [series]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: { legend: { display: true }, tooltip: { mode: 'nearest', intersect: false } },
    scales: {
      x: { type: 'linear', title: { display: true, text: 'x' } },
      y: { type: 'linear', title: { display: true, text: 'y' } },
    },
  }), []);

  const removeSeries = (id) => setSeries((s) => s.filter((t) => t.id !== id));
  const clearSeries = () => setSeries([]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Scientific Calculator</h1>
          <p className="text-gray-600">Evaluate expressions, manage variables, and plot functions. DEG/RAD supported.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Angle:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['DEG', 'RAD'].map((m) => (
              <button
                key={m}
                className={`px-3 py-1 text-sm rounded ${angleMode === m ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
                onClick={() => setAngleMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input, keypad, result */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expression</label>
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') evaluateExpression(); }}
              placeholder="e.g. sin(45) + 2^3 * (1 + x)"
              className="text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {fnButtons.flat().map((f) => (
              <button key={f} className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200" onClick={() => insertFn(f)}>{f}</button>
            ))}
            {keypadRows.flat().map((k) => (
              <button key={k} className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200" onClick={() => handleKey(k)}>{k}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={evaluateExpression} disabled={!expression.trim()}>Evaluate</Button>
            <Button variant="secondary" onClick={() => { setExpression(''); setResult(''); setError(''); }}>Clear</Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">{error}</div>
          )}
          {result !== '' && !error && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800">
              <div className="flex items-center justify-between">
                <span className="font-medium">Result</span>
                <span className="text-gray-500">Ans = {String(ans)}</span>
              </div>
              <div className="mt-2 break-all">{result}</div>
            </div>
          )}

          {/* Variables */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800">Variables</span>
              <Button variant="outline" size="sm" onClick={() => setScope({})}>Clear</Button>
            </div>
            <VariableEditor onAdd={(name, val) => addVariable(name, val)} />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(scope).length === 0 && (
                <div className="text-sm text-gray-500">No variables yet.</div>
              )}
              {Object.entries(scope).map(([k, v]) => (
                <div key={k} className="px-3 py-2 bg-white rounded border text-sm flex items-center justify-between">
                  <span className="font-mono">{k}</span>
                  <span className="text-gray-700 ml-3 break-all">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800">History</span>
              <Button variant="outline" size="sm" onClick={() => setHistory([])}>Clear</Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {history.length === 0 && <div className="text-sm text-gray-500">No history yet.</div>}
              {history.map((h, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-3 py-2 bg-white rounded border text-sm hover:bg-gray-50"
                  onClick={() => setExpression(h.shownExpr)}
                  title="Click to reuse expression"
                >
                  <div className="text-gray-800 break-all">{h.shownExpr}</div>
                  <div className="text-gray-500">= {h.result}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Graph */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium text-gray-800">Graph</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearSeries} disabled={series.length === 0}>Clear</Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">x min</label>
                <input type="number" value={xMin} onChange={(e) => setXMin(Number(e.target.value))} className="w-full px-2 py-1 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">x max</label>
                <input type="number" value={xMax} onChange={(e) => setXMax(Number(e.target.value))} className="w-full px-2 py-1 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">samples</label>
                <input type="number" min={50} max={2000} value={samples} onChange={(e) => setSamples(Number(e.target.value))} className="w-full px-2 py-1 border rounded text-sm" />
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <Input
                value={pendingGraphExpr}
                onChange={(e) => setPendingGraphExpr(e.target.value)}
                placeholder="Expression to plot vs x (e.g. sin(x), x^2 + 2x + 1)"
                className="flex-1 text-gray-900 placeholder-gray-500"
              />
              <Button onClick={() => plotExpression(pendingGraphExpr || expression)} disabled={!(pendingGraphExpr || expression)}>
                Plot
              </Button>
            </div>

            <div className="bg-white rounded border p-2">
              {series.length === 0 ? (
                <div className="h-[320px] flex items-center justify-center text-gray-500 text-sm">Add a function to plot</div>
              ) : (
                <Line
                  data={chartData}
                  options={{
                    ...chartOptions,
                    scales: {
                      x: { type: 'linear', min: Number(xMin), max: Number(xMax), title: { display: true, text: 'x' } },
                      y: { type: 'linear', title: { display: true, text: 'y' } },
                    },
                  }}
                  height={320}
                />
              )}
            </div>

            {series.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {series.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm bg-white border rounded px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-gray-800 break-all">{s.label}</span>
                    </div>
                    <button className="text-red-600 hover:underline" onClick={() => removeSeries(s.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Use DEG/RAD toggle for trigonometry. In DEG mode, inverse trig returns degrees.</li>
          <li>Built-in constants: pi (π), e, and Ans (last result).</li>
          <li>Plot functions of x. Example: sin(x), x^3 - 2x, exp(-x) * sin(5x).</li>
        </ul>
      </div>
    </div>
  );
};

const VariableEditor = ({ onAdd }) => {
  const [name, setName] = useState('a');
  const [value, setValue] = useState('2');
  return (
    <div className="flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        className="w-28 px-3 py-2 border border-gray-300 rounded-md text-sm"
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="value (expr)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
      />
      <Button size="sm" onClick={() => onAdd(name, value)}>Add</Button>
    </div>
  );
};

export default ScientificCalculatorTool;


