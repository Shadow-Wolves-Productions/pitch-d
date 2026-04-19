import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Header from '@/components/pitchd/Header';
import StepIndicator from '@/components/pitchd/StepIndicator';
import ScriptInput from '@/components/pitchd/ScriptInput';
import OneSheetBuilder from '@/components/pitchd/OneSheetBuilder';
import Footer from '@/components/pitchd/Footer';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '@/lib/pitchdPrompt';

const MAX_CHARS = 325000;

export default function Pitchd() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const builderRef = useRef(null);

  const step = result ? 3 : loading ? 2 : 1;

  const handleGenerate = async () => {
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const script = text.slice(0, MAX_CHARS);
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `${SYSTEM_PROMPT}\n\n---\n\nSCRIPT / TREATMENT:\n\n${script}`,
        response_json_schema: RESPONSE_SCHEMA,
      });
      setResult(res);
    } catch (err) {
      setError('Something broke reading the room. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && builderRef.current) {
      builderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

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
          <p
            className="no-print font-mono-dm mt-4"
            style={{ fontSize: '12px', color: '#dc2626' }}
          >
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