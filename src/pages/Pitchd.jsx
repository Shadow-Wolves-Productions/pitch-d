import React, { useState, useRef } from 'react';
import Header from '@/components/pitchd/Header';
import StepIndicator from '@/components/pitchd/StepIndicator';
import ScriptInput from '@/components/pitchd/ScriptInput';
import OneSheetBuilder from '@/components/pitchd/OneSheetBuilder';
import UpgradeBanner from '@/components/pitchd/UpgradeBanner';
import EcosystemPromo from '@/components/pitchd/CrossPromo';
import Footer from '@/components/pitchd/Footer';
import { analyseScript, TRUNCATE_LIMIT } from '@/lib/pitchdApi';

export default function Pitchd() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [wasTruncated, setWasTruncated] = useState(false);
  const builderRef = useRef(null);

  const step = result ? 3 : loading ? 2 : 1;

  const handleGenerate = async () => {
    if (loading || !text.trim()) return;
    if (text.trim().length < 200) {
      setError('Give us something to work with — paste at least a paragraph.');
      return;
    }
    setError('');
    setWasTruncated(text.length > TRUNCATE_LIMIT);
    setLoading(true);
    try {
      const data = await analyseScript(text);
      setResult(data);
      setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('Failed')) {
        setError("Can't reach the server. Check your connection and try again.");
      } else {
        setError('Damn. Something went wrong on our end. Try again — it usually works the second time.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setText('');
    setWasTruncated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <div className="max-w-[680px] mx-auto px-5">
        <Header />
        <StepIndicator current={step} />

        {/* TRUNCATION BANNER — under step indicators, before results */}
        {result && wasTruncated && (
          <div className="mb-8">
            <UpgradeBanner />
          </div>
        )}

        {!result && (
          <ScriptInput
            text={text}
            setText={setText}
            onGenerate={handleGenerate}
            loading={loading}
          />
        )}

        {error && !loading && (
          <p className="no-print font-grotesk mt-4" style={{ fontSize: '14px', color: '#dc2626' }}>
            {error}
          </p>
        )}

        {result && (
          <div ref={builderRef} className="mt-6 mb-8">
            <OneSheetBuilder data={result} onReset={handleReset} />
          </div>
        )}

        {/* Ecosystem promo — after results */}
        {result && <EcosystemPromo />}

        <Footer />
      </div>
    </div>
  );
}
