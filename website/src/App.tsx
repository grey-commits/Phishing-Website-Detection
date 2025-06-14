import React, { useState } from 'react';
import { Shield, AlertTriangle, Search, Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<'legitimate' | 'phishing' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data.result === 'phishing' ? 'phishing' : 'legitimate');
    } catch (error) {
      setResult(null);
      alert('Error connecting to backend');
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black pointer-events-none"></div>
      
      {/* Main content */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Phishing Website Detection
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Protect yourself from malicious websites. Enter a URL below to check if it's safe.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to check..."
                    className="w-full px-6 py-4 bg-white/5 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                    required
                    disabled={isLoading}
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Checking...
                    </span>
                  ) : (
                    'Check URL'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span className="text-gray-300">Analyzing URL security...</span>
              </div>
            </div>
          )}

          {/* Result */}
          {result && !isLoading && (
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`inline-flex items-center gap-4 px-8 py-6 rounded-2xl backdrop-blur-sm shadow-xl ${
                result === 'legitimate' 
                  ? 'bg-green-900/30 border border-green-700/50' 
                  : 'bg-red-900/30 border border-red-700/50'
              }`}>
                {result === 'legitimate' ? (
                  <>
                    <Shield className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-2xl font-bold text-green-400">Legitimate</p>
                      <p className="text-green-300/80">This website appears to be safe</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                    <div className="text-left">
                      <p className="text-2xl font-bold text-red-400">Phishing Detected</p>
                      <p className="text-red-300/80">This website may be malicious</p>
                    </div>
                  </>
                )}
              </div>
              
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200 underline underline-offset-4 hover:no-underline"
              >
                Check another URL
              </button>
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <Shield className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Protection</h3>
              <p className="text-gray-400 text-sm">Instant analysis of suspicious websites</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <Search className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Advanced Detection</h3>
              <p className="text-gray-400 text-sm">AI-powered threat identification</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <AlertTriangle className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Stay Protected</h3>
              <p className="text-gray-400 text-sm">Comprehensive security analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-6 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          Powered by <span className="font-semibold text-gray-400">xAI</span>
        </p>
      </footer>
    </div>
  );
}

export default App;