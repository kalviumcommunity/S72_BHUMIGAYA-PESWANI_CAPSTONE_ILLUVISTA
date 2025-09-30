const axios = require('axios');

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * POST /api/ai/suggest
 * Body: { type: 'title' | 'description', context?: string, num?: number }
 */
async function suggestCompletion(req, res) {
  const { type, context } = req.body || {};
  const num = Math.max(1, Math.min(8, Number(req.body?.num) || 6));

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }
    if (!type || (type !== 'title' && type !== 'description')) {
      return res.status(400).json({ error: "'type' must be 'title' or 'description'" });
    }

    const instruct = type === 'title'
      ? [
          'Generate short, catchy e-commerce product titles (5–8 words).',
          'Vary style and vocabulary; avoid echoing the input verbatim.',
          'Incorporate helpful attributes (material, use-case, style) when implied.',
          'Avoid generic suffixes like "Edition" unless natural; minimize punctuation.',
          'Return only titles, one per candidate.'
        ].join(' ')
      : [
          'Write concise, persuasive product descriptions (1–2 sentences).',
          'Highlight benefits and specifics; do not repeat the title verbatim.',
          'Return only the description.'
        ].join(' ');

    const prompt = [
      instruct,
      context ? `\nContext (keywords or partial input):\n${context}` : ''
    ].join('');

    const url = `${GEMINI_ENDPOINT}?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [ { text: prompt } ]
        }
      ],
      generationConfig: {
        candidateCount: num,
        temperature: 0.9,
        topP: 0.9
      }
    };

    const { data } = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000
    });

    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
    let texts = candidates
      .map(c => c?.content?.parts?.[0]?.text)
      .filter(Boolean)
      .map(t => String(t).replace(/\s+/g, ' ').trim());

    // Basic de-dup + anti-echo filtering
    const ctx = String(context || '').trim().toLowerCase();
    const unique = new Set();
    texts = texts.filter(t => {
      const lower = t.toLowerCase();
      if (unique.has(lower)) return false;
      unique.add(lower);
      if (!ctx) return true;
      if (lower === ctx) return false;
      return true;
    });

    // Drop overly-generic suffix patterns
    const banned = /(\bmini(?:mal(?:ist)?)?\b|\bminimalist\b|\bedition\b)/i;
    const filtered = texts.filter(t => !banned.test(t));
    const finalList = filtered.length ? filtered : texts; // if everything filtered, fall back

    if (!finalList.length) {
      console.error('[AI] Empty suggestions', { data });
      return res.status(502).json({ error: 'No suggestion returned from model' });
    }

    res.setHeader('x-ai-source', 'gemini');
    return res.json({ suggestions: finalList.slice(0, num) });
  } catch (error) {
    const status = error?.response?.status;
    const errData = error?.response?.data;
    console.error('[AI] Suggest error', {
      message: error?.message,
      status,
      data: errData,
    });
    const message = (errData && (errData.error?.message || errData.error || JSON.stringify(errData))) || error.message || 'Unknown error';
    return res.status(500).json({ error: message });
  }
}

module.exports = { suggestCompletion }; 