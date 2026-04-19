import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Header from '@/components/pitchd/Header';
import StepIndicator from '@/components/pitchd/StepIndicator';
import ScriptInput from '@/components/pitchd/ScriptInput';
import Results from '@/components/pitchd/Results';
import ActionBar from '@/components/pitchd/ActionBar';
import CrossPromo from '@/components/pitchd/CrossPromo';
import Footer from '@/components/pitchd/Footer';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '@/lib/pitchdPrompt';
import { downloadTxt } from '@/lib/pitchdExport';

const MAX_CHARS = 325000;

export default function Pitchd() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

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
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const handleReset = () => {
    setResult(null);
    setError('');
    setText('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = () => downloadTxt(result);
  const handlePrint = () => window.print();

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
          <div ref={resultsRef} className="mt-4">
            <ActionBar
              onReset={handleReset}
              onExport={handleExport}
              onPrint={handlePrint}
            />
            <Results data={result} />
            <CrossPromo />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}