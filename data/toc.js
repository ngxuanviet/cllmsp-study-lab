/* Bootstrap + mục lục toàn bộ 9 Module (1.1 → 9.4). Phải được nạp TRƯỚC các file moduleXX.js */
(function () {
  const C = (window.CLLMSP = window.CLLMSP || {});
  C.modules = {};      // n -> module data (đã đăng ký)
  C.paras = {};        // paragraph_id -> {id, mod, sec, page, kind, en, vi}
  C.questions = [];    // toàn bộ ngân hàng câu hỏi

  C.DOMAINS = {
    1: { name: 'LLM Fundamentals & Architecture', w: 10 },
    2: { name: 'OWASP Top 10 for LLMs', w: 15 },
    3: { name: 'Prompt Engineering & Jailbreak Security', w: 12.5 },
    4: { name: 'Governance & Risk Management', w: 12.5 },
    5: { name: 'Data Privacy & Treatment', w: 10 },
    6: { name: 'MCP Security', w: 10 },
    7: { name: 'AI Agents, Orchestration & Vibe Coding', w: 12.5 },
    8: { name: 'Application Security for AI Products', w: 10 },
    9: { name: 'Identity, Access, Memory & Advanced Topics', w: 7.5 }
  };

  const T = (n, en, vi, secs) => ({ n, en, vi, secs });
  C.TOC = [
    T(1, 'LLM Fundamentals & Architecture', 'Nền tảng & Kiến trúc LLM', [
      ['1.1', 'Transformer Architecture & Attention'], ['1.2', 'Training Paradigms: Pre-training, SFT, RLHF'],
      ['1.3', 'Inference Parameters & Tokenization'], ['1.4', 'Model Landscape: GPT, Claude, Gemini, Ollama, Copilot'],
      ['1.5', 'RAG, Fine-Tuning & Quantization']]),
    T(2, 'OWASP Top 10 for LLM Applications', 'OWASP Top 10 cho Ứng dụng LLM', [
      ['2.1', 'LLM01: Prompt Injection'], ['2.2', 'LLM02: Insecure Output Handling'], ['2.3', 'LLM03: Training Data Poisoning'],
      ['2.4', 'LLM04: Model Denial of Service'], ['2.5', 'LLM05: Supply Chain Vulnerabilities'],
      ['2.6', 'LLM06: Sensitive Information Disclosure'], ['2.7', 'LLM07: Insecure Plugin Design'],
      ['2.8', 'LLM08: Excessive Agency'], ['2.9', 'LLM09: Overreliance'], ['2.10', 'LLM10: Model Theft']]),
    T(3, 'Prompt Engineering & Jailbreak Security', 'Prompt Engineering & Bảo mật Jailbreak', [
      ['3.1', 'System Prompts & Prompt Architecture'], ['3.2', 'Jailbreak Taxonomy: DAN, Crescendo, Skeleton Key, PAIR'],
      ['3.3', 'Adversarial Suffixes & Token Smuggling'], ['3.4', 'Guardrail Architecture: Input, Output & Behavioral'],
      ['3.5', 'Prompt Hardening & Leaking Prevention']]),
    T(4, 'Governance & Risk Management', 'Quản trị & Quản lý Rủi ro', [
      ['4.1', 'NIST AI RMF & ISO/IEC 42001'], ['4.2', 'EU AI Act & Global Regulations'],
      ['4.3', 'Red Teaming & Adversarial Testing Programs'], ['4.4', 'AI Risk Registers & Model Cards'],
      ['4.5', 'Shadow AI, Acceptable Use & Accountability']]),
    T(5, 'Data Privacy & Treatment', 'Quyền riêng tư & Xử lý Dữ liệu', [
      ['5.1', 'Training Data Risks: Memorization & Extraction'], ['5.2', 'Privacy Regulations: GDPR, CCPA, HIPAA'],
      ['5.3', 'PETs: Differential Privacy, Federated Learning, HE'], ['5.4', 'Data Minimization, Redaction & Consent']]),
    T(6, 'MCP (Model Context Protocol) Security', 'Bảo mật MCP (Model Context Protocol)', [
      ['6.1', 'MCP Architecture: Clients, Servers & Transports'], ['6.2', 'Tool Poisoning & Rug Pull Attacks'],
      ['6.3', 'Authentication, Authorization & Capability Negotiation'], ['6.4', 'Server Hardening & Isolation Patterns']]),
    T(7, 'AI Agents, Orchestration & Vibe Coding', 'AI Agent, Điều phối & Vibe Coding', [
      ['7.1', 'Agent Architectures: ReAct, Planning & Multi-Agent'], ['7.2', 'Agent Security: Sandboxing, Circuit Breakers & HITL'],
      ['7.3', 'Orchestration Security: LangChain, Routing & Boundaries'], ['7.4', 'Vibe Coding: Risks, Mitigations & Secure SDLC']]),
    T(8, 'Application Security for AI Products', 'Bảo mật Ứng dụng cho Sản phẩm AI', [
      ['8.1', 'Traditional Vulns in AI Context: SSRF, XSS, SQLi'], ['8.2', 'API Security: Auth, Rate Limiting & Streaming'],
      ['8.3', 'DevSecOps for AI: CI/CD, Pentesting & Monitoring'], ['8.4', 'Container Security & Supply Chain']]),
    T(9, 'Identity, Access, Memory & Advanced Topics', 'Danh tính, Truy cập, Bộ nhớ & Chủ đề nâng cao', [
      ['9.1', 'RBAC, ABAC & Zero Trust for LLM Platforms'], ['9.2', 'Vector Database Security & Embedding Attacks'],
      ['9.3', 'Context Window Security & Memory Persistence'], ['9.4', 'Incident Response for AI Systems']])
  ];
  C.ALL_SECS = C.TOC.flatMap(m => m.secs.map(s => s[0]));

  /* Helper cho file dữ liệu: P = đoạn song ngữ, H = tiêu đề. Cú pháp từ khoá: [[term-id|text]] */
  C.P = (id, page, en, vi) => ({ id, page, en, vi, kind: 'p' });
  C.H = (id, page, en, vi) => ({ id, page, en, vi, kind: 'h' });

  C.register = function (mod) {
    C.modules[mod.n] = mod;
    mod.handbook.forEach(it => {
      const m = /^m(\d\d)-(?:s(\d\d)|(lo|ms|intro))/.exec(it.id);
      it.mod = +m[1]; it.sec = m[2] ? +m[2] : 0;
      it.type = /-h$/.test(it.id) ? 'h' : /-kc/.test(it.id) ? 'kc' : /-sr/.test(it.id) ? 'sr' : m[3] || 'p';
      C.paras[it.id] = it;
    });
    (mod.questions || []).forEach(q => { q.domain = mod.n; C.questions.push(q); });
  };
})();
