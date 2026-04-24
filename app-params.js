import React, { useState, useRef } from 'react';
import Header from '@/components/pitchd/Header';
import StepIndicator from '@/components/pitchd/StepIndicator';
import ScriptInput from '@/components/pitchd/ScriptInput';
import OneSheetBuilder from '@/components/pitchd/OneSheetBuilder';
import Footer from '@/components/pitchd/Footer';
import { analyseScript } from '@/lib/pitchdApi';

export default function Pitchd() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const builderRef = useRef(null);

  const step = result ? 3 : loading ? 2 : 1;

  const handleGenerate = async () => {
    if (loading || !text.trim()) return;
    setError('');
    setLoading(true);
    try {
      const data = await analyseScript(text);
      setResult(data);
      setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setText('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="max-w-[680px] mx-auto px-5">
        <Header />
        <StepIndicator current={step} />

        {!result && (
          <ScriptInput
            text={text}
            setText={setText}
            onGenerate={handleGenerate}
            loading={loading}
          />
        )}

        {error && !loading && (
          <p className="no-print font-mono-dm mt-4" style={{ fontSize: '12px', color: '#dc2626' }}>
            {error}
          </p>
        )}

        {result && (
          <div ref={builderRef} className="mt-6 mb-16">
            <OneSheetBuilder data={result} onReset={handleReset} />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
