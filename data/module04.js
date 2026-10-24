/* ===== Module 04 — Governance & Risk Management (Domain 4, 12.5%) =====
 * 100% nội dung gốc từ Handbook (Trang 13–14) + Giải thích chuyên sâu + Ví dụ thực tế + Labs + 25 câu hỏi.
 */
(() => {
  const { P, H } = window.CLLMSP;
  let nq = 0;
  const mq = (sec, q, options, answer, exp, why, ref, examOnly) => ({ id: 'm04-q' + (++nq), sec, type: 'mcq', q, options, answer, exp, why, ref, examOnly });
  const fq = (sec, q, cl, model, exp, ref, examOnly) => ({ id: 'm04-q' + (++nq), sec, type: 'free', q, clusters: cl.map(c => ({ name: c[0], terms: c.slice(1) })), model, exp, ref, examOnly });

  const handbook = [
    P('m04-intro', 13, '[[aigov|AI governance]] provides the [[orgframe|organizational framework]] for managing LLM risks at enterprise scale. This module covers [[regreq|regulatory requirements]], [[rmframe|risk management frameworks]], and the governance mechanisms needed to deploy AI systems responsibly.',
      '[[aigov|Quản trị AI (AI governance)]] cung cấp [[orgframe|khung tổ chức]] để quản lý rủi ro LLM ở quy mô doanh nghiệp. Module này bao quát [[regreq|các yêu cầu pháp lý]], [[rmframe|khung quản lý rủi ro]], và các cơ chế quản trị cần thiết để triển khai hệ thống AI một cách có trách nhiệm.'),
    P('m04-lo01', 13, 'Apply the [[nistrmf|NIST AI Risk Management Framework]] to LLM deployments.', 'Áp dụng [[nistrmf|Khung Quản lý Rủi ro AI của NIST (NIST AI RMF)]] vào việc triển khai LLM.'),
    P('m04-lo02', 13, 'Map LLM use cases to [[euaiact|EU AI Act]] [[risktiers|risk categories]].', 'Ánh xạ các ca sử dụng LLM vào [[risktiers|các bậc rủi ro]] của [[euaiact|Đạo luật AI Châu Âu (EU AI Act)]].'),
    P('m04-lo03', 13, 'Design and execute [[redteam|LLM red teaming programs]].', 'Thiết kế và thực thi [[redteam|các chương trình Red Teaming cho LLM]].'),
    P('m04-lo04', 13, 'Build [[riskreg|AI risk registers]], [[modelcards|model cards]], and [[aup|acceptable use policies]].', 'Xây dựng [[riskreg|sổ đăng ký rủi ro AI]], [[modelcards|model card]], và [[aup|chính sách sử dụng chấp nhận được (AUP)]].'),
    P('m04-lo05', 13, 'Address [[shadowai|shadow AI]] and [[accountability|algorithmic accountability]].', 'Giải quyết bài toán [[shadowai|Shadow AI]] và [[accountability|trách nhiệm giải trình thuật toán]].'),

    H('m04-s01-h', 13, '4.1  NIST AI RMF & ISO/IEC 42001', '4.1  NIST AI RMF & ISO/IEC 42001'),
    P('m04-s01-p01', 13, '[[nistrmf|NIST AI Risk Management Framework (AI RMF)]]: Organized around four core functions: [[govern|Govern]], [[map|Map]], [[measure|Measure]], [[manage|Manage]]. Govern establishes [[aipolicy|AI risk management policies and accountability]]. Map [[idcontext|identifies and contextualizes AI risks]]. Measure [[assessquant|assesses and quantifies identified risks using metrics]]. Manage [[impcontrols|implements controls and mitigations]]. The AI RMF is [[voluntary|voluntary]] but increasingly referenced in [[procurement|procurement requirements and regulatory guidance]].',
      '[[nistrmf|Khung Quản lý Rủi ro AI của NIST (AI RMF)]]: Được tổ chức xoay quanh bốn chức năng cốt lõi: [[govern|Govern (Quản trị)]], [[map|Map (Định vị)]], [[measure|Measure (Đo lường)]], [[manage|Manage (Xử lý)]]. Govern thiết lập [[aipolicy|chính sách quản lý rủi ro AI và trách nhiệm giải trình]]. Map [[idcontext|nhận diện và đặt rủi ro AI vào ngữ cảnh]]. Measure [[assessquant|đánh giá và định lượng các rủi ro đã nhận diện bằng các chỉ số]]. Manage [[impcontrols|triển khai các biện pháp kiểm soát và giảm thiểu]]. AI RMF mang tính [[voluntary|tự nguyện]] nhưng ngày càng được viện dẫn nhiều trong [[procurement|yêu cầu mua sắm/đấu thầu và hướng dẫn pháp lý]].'),
    P('m04-s01-p02', 13, '[[iso42001|ISO/IEC 42001]]: The international standard for [[aims|Artificial Intelligence Management Systems (AIMS)]]. Specifies requirements for establishing, implementing, maintaining, and [[contimprove|continually improving]] an AI management system within organizations. Provides a structured approach to managing AI risks and demonstrating organizational commitment to [[respai|responsible AI development and deployment]].',
      '[[iso42001|ISO/IEC 42001]]: Tiêu chuẩn quốc tế về [[aims|Hệ thống Quản lý Trí tuệ Nhân tạo (AIMS)]]. Quy định các yêu cầu để thiết lập, triển khai, duy trì và [[contimprove|cải tiến liên tục]] hệ thống quản lý AI trong tổ chức. Cung cấp cách tiếp cận có cấu trúc nhằm quản lý rủi ro AI và chứng minh cam kết của tổ chức đối với [[respai|việc phát triển và triển khai AI có trách nhiệm]].'),

    H('m04-s02-h', 13, '4.2  EU AI Act & Global Regulations', '4.2  Đạo luật EU AI Act & Các Quy định Toàn cầu'),
    P('m04-s02-p01', 13, 'The [[euaiact|EU AI Act]] is the world\'s first comprehensive AI regulation, classifying AI systems into [[risktiers|risk tiers]]:',
      '[[euaiact|EU AI Act]] là quy định pháp lý toàn diện đầu tiên trên thế giới về AI, phân loại các hệ thống AI thành [[risktiers|các bậc rủi ro]]:'),
    P('m04-s02-p02', 13, '[[unacceptable|Unacceptable Risk]]: [[banned|Banned applications]] — [[socialscore|social scoring]], [[biometric|real-time biometric surveillance]] (with exceptions), [[manipulative|manipulative AI]].',
      '[[unacceptable|Rủi ro Không thể chấp nhận (Unacceptable Risk)]]: [[banned|Các ứng dụng bị cấm]] — [[socialscore|chấm điểm công dân (social scoring)]], [[biometric|giám sát sinh trắc học thời gian thực]] (có ngoại lệ hẹp), và [[manipulative|AI thao túng hành vi]].'),
    P('m04-s02-p03', 13, '[[highrisk|High Risk]]: AI in [[critdomains|critical domains]] — [[credit|credit scoring]], [[hiring|hiring]], [[healthcare|healthcare diagnosis]], [[lawenf|law enforcement]]. Requires [[conformity|conformity assessments]], [[documentation|documentation]], [[humanoversight|human oversight]], and [[ongoingmon|ongoing monitoring]]. Most enterprise LLM deployments involving [[consequential|consequential decisions]] fall here.',
      '[[highrisk|Rủi ro Cao (High Risk)]]: AI trong [[critdomains|các lĩnh vực trọng yếu]] — [[credit|chấm điểm tín dụng]], [[hiring|tuyển dụng]], [[healthcare|chẩn đoán y tế]], [[lawenf|thực thi pháp luật]]. Đòi hỏi [[conformity|đánh giá sự phù hợp (conformity assessments)]], [[documentation|hồ sơ tài liệu]], [[humanoversight|giám sát của con người]], và [[ongoingmon|giám sát liên tục]]. Hầu hết các triển khai LLM doanh nghiệp liên quan đến [[consequential|các quyết định hệ trọng]] đều rơi vào nhóm này.'),
    P('m04-s02-p04', 13, '[[limitedrisk|Limited Risk]]: [[transparency|Transparency obligations]] — users must be [[informedai|informed they are interacting with AI]].',
      '[[limitedrisk|Rủi ro Giới hạn (Limited Risk)]]: [[transparency|Nghĩa vụ minh bạch]] — người dùng phải được [[informedai|thông báo rằng họ đang tương tác với AI]].'),
    P('m04-s02-p05', 13, '[[minimalrisk|Minimal Risk]]: [[nospecreq|No specific requirements]] — most AI applications.',
      '[[minimalrisk|Rủi ro Tối thiểu (Minimal Risk)]]: [[nospecreq|Không có yêu cầu đặc thù]] — phần lớn các ứng dụng AI thông thường.'),
    P('m04-s02-p06', 13, 'Key Compliance Challenges: [[datares|Data residency]] requirements when prompts containing regulated data cross borders. The [[rightexplain|right to explanation]] for AI-driven decisions under [[gdpr22|GDPR Article 22]]. [[vendorrisk|Vendor risk management]] when using third-party LLM APIs where the organization [[cannotfulaudit|cannot fully audit]] the model\'s behavior.',
      'Các thách thức tuân thủ chính: Yêu cầu về [[datares|cư trú dữ liệu (data residency)]] khi các prompt chứa dữ liệu chịu quản lý đi xuyên biên giới. [[rightexplain|Quyền được giải thích]] đối với các quyết định do AI đưa ra theo [[gdpr22|Điều 22 GDPR]]. [[vendorrisk|Quản lý rủi ro nhà cung cấp]] khi dùng API LLM bên thứ ba mà tổ chức [[cannotfulaudit|không thể kiểm toán toàn diện]] hành vi của mô hình.'),

    H('m04-s03-h', 13, '4.3  Red Teaming & Adversarial Testing Programs', '4.3  Chương trình Red Teaming & Kiểm thử Đối kháng'),
    P('m04-s03-p01', 13, '[[redteam|Red teaming]] in the LLM context goes beyond [[tradpentest|traditional penetration testing]]. It involves systematically probing the model for [[vulns|vulnerabilities]], [[biases|biases]], [[harmout|harmful outputs]], and [[policyviol|policy violations]] through adversarial testing.',
      '[[redteam|Red teaming]] trong ngữ cảnh LLM vượt ra ngoài [[tradpentest|kiểm thử xâm nhập (pentest) truyền thống]]. Nó bao gồm việc thăm dò mô hình một cách có hệ thống để tìm [[vulns|lỗ hổng]], [[biases|thiên kiến (bias)]], [[harmout|đầu ra độc hại]], và [[policyviol|vi phạm chính sách]] thông qua kiểm thử đối kháng.'),
    P('m04-s03-p02', 13, 'Red Team Scope: [[jbtest|Jailbreak testing]] across all known techniques. [[pitest|Prompt injection]] (direct and indirect). [[dataext|Data extraction attempts]]. [[biasfair|Bias and fairness testing]] across protected characteristics. [[polcomp|Policy compliance verification]]. [[toolabuse|Tool/plugin abuse scenarios]].',
      'Phạm vi Red Team: [[jbtest|Kiểm thử jailbreak]] trên mọi kỹ thuật đã biết. [[pitest|Prompt injection]] (trực tiếp và gián tiếp). [[dataext|Nỗ lực trích xuất dữ liệu]]. [[biasfair|Kiểm thử thiên kiến và tính công bằng]] trên các đặc điểm được bảo vệ. [[polcomp|Xác minh tuân thủ chính sách]]. [[toolabuse|Các kịch bản lạm dụng tool/plugin]].'),
    P('m04-s03-p03', 13, 'Program Structure: Establish [[baselines|baselines before deployment]]. Conduct testing at [[regintervals|regular intervals and after model updates]]. Engage [[diversetest|diverse testers]] (security experts, domain specialists, non-technical users). Document all findings with [[reprosteps|reproduction steps]]. Track remediation through the [[riskreg|AI risk register]].',
      'Cấu trúc chương trình: Thiết lập [[baselines|đường cơ sở (baselines) trước khi triển khai]]. Tiến hành kiểm thử [[regintervals|định kỳ và sau mỗi lần cập nhật mô hình]]. Huy động [[diversetest|đội ngũ kiểm thử đa dạng]] (chuyên gia bảo mật, chuyên gia nghiệp vụ, người dùng không chuyên kỹ thuật). Ghi nhận mọi phát hiện kèm [[reprosteps|các bước tái hiện]]. Theo dõi quá trình khắc phục thông qua [[riskreg|sổ đăng ký rủi ro AI]].'),

    H('m04-s04-h', 14, '4.4  AI Risk Registers & Model Cards', '4.4  Sổ đăng ký Rủi ro AI (AI Risk Registers) & Model Cards'),
    P('m04-s04-p01', 14, '[[riskreg|AI Risk Register]]: Documents identified risks, their [[likelihood|likelihood]], [[impact|potential impact]], [[excontrols|existing controls]], and [[mitstrat|mitigation strategies]]. Should include [[techrisk|technical risks]] (prompt injection, hallucination), [[oprisk|operational risks]] (model drift, vendor dependency), [[ethrisk|ethical risks]] (bias, fairness), and [[reprisk|reputational risks]]. Must be a [[livingdoc|living document]], updated as new risks emerge.',
      '[[riskreg|Sổ đăng ký rủi ro AI (AI Risk Register)]]: Tài liệu hoá các rủi ro đã nhận diện, [[likelihood|khả năng xảy ra]], [[impact|tác động tiềm tàng]], [[excontrols|biện pháp kiểm soát hiện có]], và [[mitstrat|chiến lược giảm thiểu]]. Phải bao gồm [[techrisk|rủi ro kỹ thuật]] (prompt injection, hallucination), [[oprisk|rủi ro vận hành]] (model drift, phụ thuộc nhà cung cấp), [[ethrisk|rủi ro đạo đức]] (thiên kiến, công bằng), và [[reprisk|rủi ro danh tiếng]]. Phải là một [[livingdoc|tài liệu sống (living document)]], được cập nhật khi rủi ro mới xuất hiện.'),
    P('m04-s04-p02', 14, '[[modelcards|Model Cards]] (Mitchell et al.): Standardized documentation of model [[capabilities|capabilities]], [[limitations|limitations]], [[intendeduse|intended use cases]], [[evalres|evaluation results]], and [[failmodes|known failure modes]]. Model cards serve governance by providing [[transparency|transparency]] about what the model can and cannot do, enabling [[informdeploy|informed deployment decisions]].',
      '[[modelcards|Model Cards]] (Mitchell và cộng sự): Tài liệu chuẩn hoá về [[capabilities|năng lực]], [[limitations|giới hạn]], [[intendeduse|ca sử dụng dự kiến]], [[evalres|kết quả đánh giá]], và [[failmodes|các chế độ lỗi đã biết]] của mô hình. Model card phục vụ quản trị bằng cách cung cấp [[transparency|sự minh bạch]] về những gì mô hình làm được và không làm được, giúp đưa ra [[informdeploy|quyết định triển khai có cơ sở]].'),

    H('m04-s05-h', 14, '4.5  Shadow AI, Acceptable Use & Accountability', '4.5  Shadow AI, Chính sách Sử dụng Chấp nhận được & Trách nhiệm Giải trình'),
    P('m04-s05-p01', 14, '[[shadowai|Shadow AI]]: [[unauthai|Unauthorized use of AI tools]] by employees [[outsidegov|outside IT governance]]. Employees using personal ChatGPT accounts to process [[confdocs|confidential documents]], [[pastecode|pasting source code]] into public LLMs, or using unauthorized AI tools for decision-making. Shadow AI is the AI equivalent of [[shadowit|shadow IT]], but with potentially greater risk due to [[promptleakage|data leakage through prompts]].',
      '[[shadowai|Shadow AI]]: [[unauthai|Việc sử dụng trái phép các công cụ AI]] bởi nhân viên [[outsidegov|nằm ngoài tầm quản trị của CNTT]]. Ví dụ: nhân viên dùng tài khoản ChatGPT cá nhân để xử lý [[confdocs|tài liệu mật]], [[pastecode|dán mã nguồn]] vào các LLM công cộng, hoặc dùng công cụ AI chưa được phê duyệt để ra quyết định. Shadow AI là bản tương đương của [[shadowit|Shadow IT]] trong kỷ nguyên AI, nhưng có rủi ro lớn hơn do [[promptleakage|rò rỉ dữ liệu trực tiếp qua các prompt]].'),
    P('m04-s05-p02', 14, '[[aup|Acceptable Use Policies]]: Define [[appuse|approved use cases]], [[prohibact|prohibited activities]], [[datahand|data handling requirements]], [[escalation|escalation procedures]], and [[apptools|approved AI tools/models]]. Must address both [[consumerai|consumer AI]] (ChatGPT, Gemini) and [[enterpriseai|enterprise AI]] (internal deployments, API usage).',
      '[[aup|Chính sách Sử dụng Chấp nhận được (AUP)]]: Định nghĩa [[appuse|các ca sử dụng được phê duyệt]], [[prohibact|hoạt động bị cấm]], [[datahand|yêu cầu xử lý dữ liệu]], [[escalation|quy trình báo cáo leo thang]], và [[apptools|danh mục công cụ/mô hình AI được phép dùng]]. Phải bao quát cả [[consumerai|AI tiêu dùng]] (ChatGPT, Gemini) lẫn [[enterpriseai|AI doanh nghiệp]] (triển khai nội bộ, sử dụng qua API).'),
    P('m04-s05-p03', 14, '[[accountability|Algorithmic Accountability]]: Organizations must be able to [[demjustify|demonstrate and justify]] the basis for AI-driven decisions. This requires [[audittrails|audit trails]], [[explainmech|explainability mechanisms]], and [[humanacc|clear human accountability]] for AI system outcomes.',
      '[[accountability|Trách nhiệm Giải trình Thuật toán]]: Tổ chức phải có khả năng [[demjustify|chứng minh và giải trình]] cơ sở của các quyết định do AI đưa ra. Điều này đòi hỏi [[audittrails|nhật ký kiểm toán (audit trails)]], [[explainmech|cơ chế giải thích được (explainability)]], và [[humanacc|trách nhiệm rõ ràng của con người]] đối với kết quả của hệ thống AI.'),
    P('m04-s05-p04', 14, '[[respdisc|Responsible Disclosure]]: Discovered LLM vulnerabilities should follow [[coorddisc|coordinated disclosure]] — notify the vendor, allow [[reastime|reasonable remediation time]], then disclose publicly. Avoid [[immedpub|immediate public disclosure]] (maximizes harm) and [[permnondisc|permanent non-disclosure]] (prevents community learning).',
      '[[respdisc|Công bố Lỗ hổng Có trách nhiệm]]: Các lỗ hổng LLM được phát hiện phải tuân theo [[coorddisc|công bố phối hợp (coordinated disclosure)]] — thông báo cho nhà cung cấp, dành [[reastime|thời gian khắc phục hợp lý]], sau đó mới công bố rộng rãi. Tránh [[immedpub|công bố công khai ngay lập tức]] (tối đa hoá thiệt hại) và [[permnondisc|giấu kín vĩnh viễn]] (ngăn cản cộng đồng học hỏi).'),

    P('m04-ms01', 14, '[[nistrmf|NIST AI RMF]] ([[govern|Govern]], [[map|Map]], [[measure|Measure]], [[manage|Manage]]) provides the most widely referenced framework for AI risk management.',
      '[[nistrmf|NIST AI RMF]] ([[govern|Govern]], [[map|Map]], [[measure|Measure]], [[manage|Manage]]) cung cấp khung tham chiếu phổ biến nhất cho quản lý rủi ro AI.'),
    P('m04-ms02', 14, 'The [[euaiact|EU AI Act]] classifies AI systems by [[risktiers|risk tier]] — most enterprise LLM deployments in consequential domains are [[highrisk|High Risk]].',
      '[[euaiact|EU AI Act]] phân loại hệ thống AI theo [[risktiers|bậc rủi ro]] — phần lớn triển khai LLM doanh nghiệp trong các lĩnh vực hệ trọng đều thuộc nhóm [[highrisk|High Risk]].'),
    P('m04-ms03', 14, '[[redteam|Red teaming]] for LLMs extends beyond pentesting to include [[biases|bias]], [[polcomp|policy compliance]], and [[advprompt|adversarial prompting]].',
      '[[redteam|Red teaming]] cho LLM mở rộng vượt khỏi pentest truyền thống để bao gồm cả [[biases|thiên kiến]], [[polcomp|tuân thủ chính sách]], và [[advprompt|adversarial prompting]].'),
    P('m04-ms04', 14, '[[shadowai|Shadow AI]] is a critical governance gap — employees using [[unauthai|unauthorized AI tools]] with sensitive data.',
      '[[shadowai|Shadow AI]] là lỗ hổng quản trị nghiêm trọng — nhân viên sử dụng [[unauthai|công cụ AI trái phép]] với dữ liệu nhạy cảm.'),
    P('m04-ms05', 14, '[[accountability|Algorithmic accountability]] requires [[audittrails|audit trails]] and [[humanoversight|human oversight]] for AI-driven decisions.',
      '[[accountability|Trách nhiệm giải trình thuật toán]] đòi hỏi [[audittrails|nhật ký kiểm toán]] và [[humanoversight|sự giám sát của con người]] đối với các quyết định do AI đưa ra.')
  ];

  const sections = {};

  sections['4.1'] = {
    title: 'NIST AI RMF 1.0 (Govern · Map · Measure · Manage) & ISO/IEC 42001',
    concept: [
      { t: 'p', x: 'Để quản trị rủi ro AI bài bản, chuyên gia CLLMSP cần nắm vững hai chuẩn mực trụ cột: **NIST AI RMF 1.0** (khung quản lý rủi ro tự nguyện của Mỹ nhưng được tham chiếu toàn cầu trong đấu thầu/mua sắm) và **ISO/IEC 42001:2023** (tiêu chuẩn quốc tế có thể chứng nhận cho Hệ thống Quản lý AI — **AIMS**). {{ref:m04-s01-p01}} {{ref:m04-s01-p02}}' },
      { t: 'h', x: '4 Hàm cốt lõi của NIST AI RMF 1.0' },
      { t: 'ul', items: [
        '**GOVERN (Quản trị — hàm xuyên suốt):** Thiết lập văn hoá rủi ro, chính sách, vai trò, uỷ ban quản trị AI và phân định rõ trách nhiệm giải trình (accountability).',
        '**MAP (Định vị ngữ cảnh):** Nhận diện ca sử dụng AI, mục đích, các bên liên quan, phân loại dữ liệu và định hình ngữ cảnh rủi ro trước khi xây dựng/triển khai.',
        '**MEASURE (Đo lường & Định lượng):** Đánh giá và định lượng các rủi ro đã nhận diện bằng bộ chỉ số cụ thể (tỉ lệ hallucination, tỉ lệ vượt qua red-team, độ lệch bias, tốc độ tiêu thụ token).',
        '**MANAGE (Xử lý & Kiểm soát):** Ưu tiên rủi ro, triển khai biện pháp kiểm soát (guardrail, HITL, kế hoạch ứng phó sự cố) và theo dõi khắc phục liên tục.'
      ] },
      { t: 'note', k: 'exam', x: 'Mẹo phân biệt nhanh: **NIST AI RMF** = khung 4 hàm (**Govern, Map, Measure, Manage**), bản chất **voluntary** (tự nguyện). **ISO/IEC 42001** = tiêu chuẩn quốc tế về **AIMS (Artificial Intelligence Management System)** theo chu trình thiết lập, triển khai, duy trì và cải tiến liên tục (PDCA).' }
    ],
    examples: [
      { t: 'code', title: 'Ánh xạ một dự án Chatbot Ngân hàng vào 4 hàm NIST AI RMF', tone: 'good', lang: 'yaml', code: 'NIST_AI_RMF_Mapping:\n  GOVERN:\n    - Ban hành Chính sách Sử dụng AI & thành lập Hội đồng Rủi ro AI (AI Risk Committee)\n    - Chỉ định CISO và AI Product Owner chịu trách nhiệm giải trình (Accountability)\n  MAP:\n    - Xác định hệ thống tư vấn khoản vay chạm dữ liệu PII tài chính -> phân loại High Impact\n    - Lập danh mục mối đe doạ: Indirect Prompt Injection qua hồ sơ PDF, Hallucination lãi suất\n  MEASURE:\n    - Chạy Promptfoo/Garak đo ASR (Attack Success Rate) < 1% và Demographic Parity < 3%\n  MANAGE:\n    - Bật Dual-Guardrails, bắt buộc nhân viên tín dụng duyệt (HITL), lập kế hoạch Break-glass' }
    ],
    labs: [
      { type: 'triage', title: 'Triage 4 Hàm của NIST AI RMF (Govern · Map · Measure · Manage)', intro: 'Hãy xếp từng hoạt động thực tế dưới đây vào đúng hàm chức năng trong NIST AI RMF 1.0.',
        buckets: [
          { id: 'govern', label: 'GOVERN' },
          { id: 'map', label: 'MAP' },
          { id: 'measure', label: 'MEASURE' },
          { id: 'manage', label: 'MANAGE' }
        ],
        items: [
          { text: 'Ban hành quy chế quản trị rủi ro AI toàn công ty và phân công rõ người chịu trách nhiệm giải trình cho từng hệ thống.', bucket: 'govern', why: 'Govern thiết lập chính sách quản lý rủi ro AI và cơ chế trách nhiệm giải trình (accountability).' },
          { text: 'Xác định các ca sử dụng của trợ lý AI tuyển dụng, phân tích luồng dữ liệu ứng viên và đặt các rủi ro tiềm ẩn vào ngữ cảnh nghiệp vụ.', bucket: 'map', why: 'Map nhận diện và đặt rủi ro AI vào đúng ngữ cảnh (identifies and contextualizes AI risks).' },
          { text: 'Chạy bộ kiểm thử định lượng tỉ lệ jailbreak thành công (ASR = 2.4%) và độ lệch công bằng giữa các nhóm nhân khẩu học.', bucket: 'measure', why: 'Measure đánh giá và định lượng các rủi ro đã nhận diện bằng các chỉ số (metrics).' },
          { text: 'Triển khai Input/Output Guardrail, giới hạn quyền công cụ và kích hoạt quy trình giảm thiểu cho các rủi ro vượt ngưỡng.', bucket: 'manage', why: 'Manage triển khai các biện pháp kiểm soát và giảm thiểu (implements controls and mitigations).' }
        ] }
    ]
  };

  sections['4.2'] = {
    title: 'EU AI Act (4 Bậc Rủi ro) & Thách thức Tuân thủ Xuyên biên giới',
    concept: [
      { t: 'p', x: '**EU AI Act** là đạo luật toàn diện đầu tiên trên thế giới quản lý AI theo hướng tiếp cận dựa trên rủi ro (**risk-based approach**), chia hệ thống AI thành **4 bậc rủi ro** rõ rệt: {{ref:m04-s02-p01}}' },
      { t: 'ul', items: [
        '**1. Unacceptable Risk (Rủi ro không thể chấp nhận — BỊ CẤM):** Chấm điểm công dân (**social scoring**), giám sát sinh trắc học thời gian thực ở nơi công cộng (trừ ngoại lệ hẹp), AI thao túng tâm lý/hành vi gây hại. {{ref:m04-s02-p02}}',
        '**2. High Risk (Rủi ro cao — quản lý nghiêm ngặt):** AI dùng trong các lĩnh vực trọng yếu như **chấm điểm tín dụng (credit scoring)**, **tuyển dụng (hiring)**, **chẩn đoán y tế (healthcare diagnosis)**, **thực thi pháp luật (law enforcement)**. Bắt buộc phải có: **conformity assessments** (đánh giá sự phù hợp), **documentation** (hồ sơ kỹ thuật), **human oversight** (con người giám sát) và **ongoing monitoring** (giám sát liên tục). *Lưu ý thi: Hầu hết các triển khai LLM doanh nghiệp đưa ra quyết định hệ trọng (consequential decisions) đều thuộc nhóm High Risk!* {{ref:m04-s02-p03}}',
        '**3. Limited Risk (Rủi ro giới hạn):** Nghĩa vụ **minh bạch (transparency obligations)** — phải thông báo rõ cho người dùng biết họ đang tương tác với AI (ví dụ: chatbot CSKH). {{ref:m04-s02-p04}}',
        '**4. Minimal Risk (Rủi ro tối thiểu):** Không có yêu cầu pháp lý đặc thù (ví dụ: lọc spam, gợi ý trong game). {{ref:m04-s02-p05}}'
      ] },
      { t: 'h', x: '3 Thách thức Tuân thủ Quốc tế khi vận hành LLM' },
      { t: 'p', x: 'Handbook chỉ rõ 3 bài toán đau đầu nhất: (1) **Data residency** (cư trú dữ liệu) khi prompt chứa dữ liệu chịu quản lý được gửi tới cụm GPU ở quốc gia khác; (2) **Right to explanation** (quyền được giải thích đối với quyết định tự động theo **Điều 22 GDPR**); và (3) **Vendor risk management** khi dùng API LLM bên thứ ba mà doanh nghiệp không thể tự kiểm toán toàn bộ trọng số/hành vi bên trong. {{ref:m04-s02-p06}}' }
    ],
    examples: [
      { t: 'code', title: 'Checklist Tuân thủ cho Hệ thống LLM High-Risk theo EU AI Act & GDPR Art. 22', tone: 'good', lang: 'yaml', code: 'System: AI Resume Screening & Candidate Ranking (Domain: Hiring -> HIGH RISK)\nMandatory_Controls:\n  - Conformity_Assessment: Đánh giá sự phù hợp trước khi đưa vào vận hành\n  - Technical_Documentation: Lưu trữ Model Card, nguồn dữ liệu, kiến trúc hệ thống\n  - Human_Oversight: Chuyên viên nhân sự duyệt quyết định cuối cùng (đáp ứng GDPR Art. 22)\n  - Ongoing_Monitoring: Theo dõi độ trôi mô hình (drift) và thiên kiến (bias) định kỳ\n  - Data_Residency: Ghim endpoint suy luận tại EU Region (eu-central-1) cho dữ liệu công dân EU' }
    ],
    labs: [
      { type: 'triage', title: 'Phân loại Hệ thống theo 4 Bậc Rủi ro của EU AI Act', intro: 'Xếp từng hệ thống AI vào đúng bậc rủi ro theo quy định của EU AI Act.',
        buckets: [
          { id: 'unacceptable', label: 'Unacceptable (Cấm)' },
          { id: 'high', label: 'High Risk' },
          { id: 'limited', label: 'Limited Risk' },
          { id: 'minimal', label: 'Minimal Risk' }
        ],
        items: [
          { text: 'Hệ thống chấm điểm hành vi xã hội (social scoring) của công dân để hạn chế quyền đi lại.', bucket: 'unacceptable', why: 'Social scoring thuộc nhóm Unacceptable Risk và bị cấm hoàn toàn.' },
          { text: 'Hệ thống LLM sàng lọc hồ sơ ứng viên tuyển dụng và chấm điểm phê duyệt khoản vay ngân hàng.', bucket: 'high', why: 'Tuyển dụng (hiring) và chấm điểm tín dụng (credit scoring) là các lĩnh vực trọng yếu thuộc High Risk.' },
          { text: 'Chatbot hỗ trợ tra cứu thông tin đơn hàng trên website thương mại điện tử.', bucket: 'limited', why: 'Chatbot giao tiếp với người dùng thuộc Limited Risk — cần nghĩa vụ minh bạch (thông báo đang tương tác với AI).' },
          { text: 'Bộ lọc thư rác (spam filter) hoặc AI gợi ý chỉnh sửa ngữ pháp nội bộ.', bucket: 'minimal', why: 'Thuộc Minimal Risk — không có nghĩa vụ đặc thù.' }
        ] }
    ]
  };

  sections['4.3'] = {
    title: 'Chương trình Red Teaming & Kiểm thử Đối kháng cho LLM',
    concept: [
      { t: 'p', x: '**LLM Red Teaming** rộng hơn nhiều so với **pentest truyền thống**: ngoài việc tìm lỗ hổng kỹ thuật, nó còn chủ động thăm dò mô hình để phát hiện **thiên kiến (biases)**, **đầu ra độc hại (harmful outputs)**, và **vi phạm chính sách (policy violations)**. {{ref:m04-s03-p01}}' },
      { t: 'h', x: 'Phạm vi 6 mũi nhọn (Scope) & Cấu trúc chương trình (Structure)' },
      { t: 'ul', items: [
        '**6 mũi nhọn trong Scope:** (1) Jailbreak trên mọi kỹ thuật đã biết, (2) Direct & Indirect Prompt Injection, (3) Trích xuất dữ liệu (Data extraction), (4) Kiểm thử thiên kiến & công bằng (Bias & fairness) trên các đặc điểm được bảo vệ, (5) Xác minh tuân thủ chính sách, (6) Kịch bản lạm dụng tool/plugin. {{ref:m04-s03-p02}}',
        '**5 bước trong Cấu trúc chương trình:** Thiết lập **baseline trước khi triển khai**; kiểm thử **định kỳ và sau mỗi lần cập nhật model**; huy động **người kiểm thử đa dạng** (chuyên gia bảo mật + chuyên gia nghiệp vụ + người dùng không chuyên kỹ thuật); ghi chép phát hiện kèm **bước tái hiện (reproduction steps)**; và theo dõi khắc phục qua **AI Risk Register**. {{ref:m04-s03-p03}}'
      ] },
      { t: 'note', k: 'exam', x: 'Câu hỏi rất hay hỏi: *Ai nên tham gia đội ngũ LLM Red Team?* Đáp án chuẩn: **Diverse testers** — kết hợp **security experts** (chuyên gia bảo mật), **domain specialists** (chuyên gia lĩnh vực nghiệp vụ như y tế/pháp lý/tài chính), và **non-technical users** (người dùng phổ thông).' }
    ],
    examples: [
      { t: 'code', title: 'Cấu hình kiểm thử Red Team tự động (Promptfoo YAML)', tone: 'good', lang: 'yaml', code: 'description: "Pre-deployment & Post-update Red Team Baseline"\ntargets:\n  - id: https://api.internal.corp/v1/chat\nredteam:\n  plugins:\n    - prompt-injection          # Direct & Indirect injection\n    - jailbreak                 # DAN, Crescendo, Skeleton Key\n    - pii                       # Data extraction / PII leakage\n    - bias                      # Bias & fairness across protected groups\n    - excessive-agency          # Tool / plugin abuse scenarios\n  strategies:\n    - jailbreak:meta            # Automated iterative refinement (PAIR-style)\n    - base64                    # Token smuggling' }
    ],
    labs: [
      { type: 'simulator', title: 'Mô phỏng Độ trưởng thành Chương trình LLM Red Teaming', intro: 'Bật các cấu phần của chương trình Red Teaming theo đúng chuẩn Mục 4.3 để xem độ bao phủ rủi ro trước và sau khi cập nhật mô hình.',
        sliders: [{ id: 'freq', label: 'Số đợt kiểm thử mỗi năm', min: 1, max: 12, value: 2 }],
        toggles: [
          { id: 'base', label: 'Thiết lập Baseline trước khi triển khai', desc: 'Đo lường ngưỡng an toàn ban đầu trước khi go-live' },
          { id: 'upd', label: 'Kiểm thử lại sau mỗi lần cập nhật Model / Prompt', desc: 'Bắt buộc vì nâng cấp model hoặc quantization có thể làm trôi căn chỉnh' },
          { id: 'div', label: 'Đội ngũ kiểm thử đa dạng (Security + Domain + Non-tech)', desc: 'Phát hiện cả lỗi kỹ thuật, lỗi nghiệp vụ chuyên ngành và thiên kiến xã hội' },
          { id: 'reg', label: 'Ghi bước tái hiện & theo dõi qua AI Risk Register', desc: 'Đảm bảo mọi phát hiện đều được khắc phục và kiểm chứng lại' }
        ],
        compute: s => {
          const cov = Math.min(100, 15 + s.freq * 3 + (s.base ? 18 : 0) + (s.upd ? 22 : 0) + (s.div ? 22 : 0) + (s.reg ? 15 : 0));
          const driftRisk = Math.max(5, 85 - (s.upd ? 55 : 0) - s.freq * 2);
          return {
            bars: [
              { label: 'Độ bao phủ rủi ro (Kỹ thuật + Nghiệp vụ + Bias)', value: cov, tone: cov > 80 ? 'ok' : cov > 50 ? 'warn' : 'bad' },
              { label: 'Rủi ro lọt lỗ hổng sau khi nâng cấp Model', value: driftRisk, tone: driftRisk > 40 ? 'bad' : 'ok' }
            ],
            alerts: [
              !s.div ? ['warn', '⚠ Nếu chỉ có kỹ sư bảo mật, bạn sẽ bỏ sót các lỗi sai lệch chuyên môn (y tế/tài chính) và bias tinh vi mà chuyên gia nghiệp vụ & người dùng thường mới nhận ra.'] : ['ok', '✔ Đội ngũ đa dạng giúp bao phủ cả jailbreak kỹ thuật lẫn rủi ro đạo đức/nghiệp vụ.']
            ]
          };
        } }
    ]
  };

  sections['4.4'] = {
    title: 'AI Risk Registers (4 Nhóm Rủi ro) & Model Cards (Mitchell et al.)',
    concept: [
      { t: 'p', x: '**AI Risk Register (Sổ đăng ký rủi ro AI)** là nơi ghi nhận tập trung mọi rủi ro đã xác định kèm theo: **khả năng xảy ra (likelihood)**, **tác động tiềm tàng (potential impact)**, **kiểm soát hiện có (existing controls)** và **chiến lược giảm thiểu (mitigation strategies)**. Nó bắt buộc phải là một **tài liệu sống (living document)** được cập nhật liên tục khi có mối đe doạ mới. {{ref:m04-s04-p01}}' },
      { t: 'ul', items: [
        '**Technical risks (Rủi ro kỹ thuật):** Prompt injection, hallucination, jailbreak.',
        '**Operational risks (Rủi ro vận hành):** Model drift (trôi mô hình), phụ thuộc nhà cung cấp (vendor dependency), gián đoạn API.',
        '**Ethical risks (Rủi ro đạo đức):** Thiên kiến (bias), thiếu công bằng (unfairness).',
        '**Reputational risks (Rủi ro danh tiếng):** Chatbot phát ngôn phản cảm hoặc tư vấn sai gây khủng hoảng truyền thông.'
      ] },
      { t: 'p', x: '**Model Cards** (do Mitchell et al., 2019 đề xuất) là tài liệu chuẩn hoá đi kèm mô hình, nêu rõ: **capabilities** (năng lực), **limitations** (hạn chế), **intended use cases** (ca sử dụng dự kiến), **evaluation results** (kết quả đánh giá) và **known failure modes** (các chế độ lỗi đã biết). Model Card phục vụ quản trị bằng cách mang lại sự minh bạch để tổ chức ra quyết định triển khai đúng đắn. {{ref:m04-s04-p02}}' }
    ],
    examples: [
      { t: 'code', title: 'Mẫu mục đăng ký trong AI Risk Register & Tóm tắt Model Card', tone: 'good', lang: 'yaml', code: '# 1. AI Risk Register Entry (Living Document)\nRisk_ID: AIR-2026-04\nCategory: Operational & Technical\nDescription: "Third-party LLM API deprecation or sudden alignment drift after minor version update"\nLikelihood: Medium | Impact: High\nExisting_Controls: ["Pin specific model snapshot (gpt-4o-2024-08-06)", "Automated nightly regression suite"]\nMitigation_Strategy: "Maintain fallback adapter to secondary provider (Claude 3.5) + circuit breaker"\n\n# 2. Model Card Summary (Mitchell et al.)\nModel_Name: "FinSupport-7B-Instruct-v2"\nIntended_Use: "Internal tier-1 FAQ assistant for retail banking agents"\nOut_of_Scope_Use: "Autonomous loan approval or legal/tax advice"\nLimitations_&_Failure_Modes: "Higher hallucination rate on multi-currency tax rules; evaluated only in EN/VI"' }
    ],
    labs: [
      { type: 'triage', title: 'Phân loại 4 Nhóm Rủi ro trong AI Risk Register', intro: 'Xếp từng rủi ro thực tế vào đúng một trong 4 danh mục của AI Risk Register theo Mục 4.4.',
        buckets: [
          { id: 'tech', label: 'Technical Risk' },
          { id: 'ops', label: 'Operational Risk' },
          { id: 'eth', label: 'Ethical Risk' },
          { id: 'rep', label: 'Reputational Risk' }
        ],
        items: [
          { text: 'Mô hình bị Indirect Prompt Injection qua tài liệu RAG và sinh thông tin bịa đặt (hallucination).', bucket: 'tech', why: 'Prompt injection và hallucination được Handbook liệt kê trực tiếp trong nhóm Technical risks.' },
          { text: 'Chất lượng dự đoán suy giảm theo thời gian (model drift) và sự phụ thuộc hoàn toàn vào một nhà cung cấp API duy nhất (vendor dependency).', bucket: 'ops', why: 'Model drift và vendor dependency là ví dụ điển hình của Operational risks.' },
          { text: 'Mô hình chấm điểm hồ sơ có thiên kiến (bias) bất lợi cho một nhóm giới tính hoặc sắc tộc.', bucket: 'eth', why: 'Bias và fairness thuộc nhóm Ethical risks.' },
          { text: 'Trợ lý ảo công khai của thương hiệu đưa ra phát ngôn xúc phạm khách hàng, lan truyền trên mạng xã hội.', bucket: 'rep', why: 'Tổn hại uy tín thương hiệu trước công chúng thuộc Reputational risks.' }
        ] }
    ]
  };

  sections['4.5'] = {
    title: 'Shadow AI · Acceptable Use Policy (AUP) · Trách nhiệm Giải trình & Công bố Lỗ hổng',
    concept: [
      { t: 'p', x: '**Shadow AI** là việc nhân viên tự ý dùng các công cụ AI chưa được phép (như tài khoản ChatGPT cá nhân, web chuyển giọng nói/tóm tắt miễn phí) ngoài tầm kiểm soát của bộ phận IT để xử lý **tài liệu mật** hoặc **dán mã nguồn nội bộ**. Nó nguy hiểm hơn cả Shadow IT truyền thống vì dữ liệu nhạy cảm bị gửi thẳng vào prompt và có thể trở thành dữ liệu huấn luyện của bên thứ ba! {{ref:m04-s05-p01}}' },
      { t: 'ul', items: [
        '**Acceptable Use Policy (AUP):** Phải quy định rõ ca sử dụng được phép, hành vi bị cấm, yêu cầu xử lý dữ liệu, quy trình báo cáo leo thang và danh sách công cụ được duyệt — bao phủ **cả Consumer AI lẫn Enterprise AI**. {{ref:m04-s05-p02}}',
        '**Algorithmic Accountability (Trách nhiệm giải trình thuật toán):** Tổ chức phải chứng minh và giải trình được cơ sở của quyết định do AI đưa ra thông qua **audit trails**, **explainability mechanisms**, và **trách nhiệm rõ ràng của con người (human accountability)** — không bao giờ được đổ lỗi cho “do máy quyết”. {{ref:m04-s05-p03}}',
        '**Responsible Disclosure (Công bố lỗ hổng có trách nhiệm):** Tuân theo **công bố phối hợp (coordinated disclosure)** — báo cho vendor, chờ thời gian khắc phục hợp lý rồi mới công bố công khai. Tránh công bố ngay lập tức (gây hại tối đa) và tránh giấu kín vĩnh viễn (cộng đồng không học được bài học phòng thủ). {{ref:m04-s05-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Trích đoạn Chính sách Sử dụng AI Chấp nhận được (Enterprise AI AUP)', tone: 'good', lang: 'yaml', code: 'Acceptable_Use_Policy_v2:\n  Scope: "Covers both Consumer AI (public ChatGPT, Gemini) and Enterprise AI (Internal RAG, Corporate Copilot)"\n  Approved_Tools:\n    - Public_Tier: "Strictly PUBLIC data only (marketing drafts, public docs summarization)"\n    - Enterprise_Tier_With_Zero_Retention_&_BAA: "Internal code, confidential business analytics"\n  Prohibited_Activities:\n    - "Pasting source code, API keys, customer PII, or M&A documents into personal/consumer AI accounts"\n    - "Using AI outputs for regulated HR/Finance decisions without documented human sign-off"\n  Escalation: "Report suspected data exposure or anomalous AI output to SecOps within 1 hour"' }
    ],
    labs: [
      { type: 'killchain', title: 'Kill-Chain: Chặn đứng Rò rỉ Mã nguồn & Dữ liệu Mật qua Shadow AI', intro: 'Xem cách nhân viên vô tình làm lộ bí mật công ty qua Shadow AI và cách kết hợp giải pháp Quản trị + Kỹ thuật để hoá giải.',
        defenses: [
          { id: 'enterprise', label: 'Cung cấp Enterprise AI chính thức + Đào tạo AUP', desc: 'Cho nhân viên công cụ an toàn (cam kết không train trên dữ liệu) để không phải dùng lén' },
          { id: 'casb', label: 'CASB / DLP kiểm soát lưu lượng tới Consumer AI', desc: 'Phát hiện và chặn hành vi dán mã nguồn / PII lên các trang AI công cộng chưa phê duyệt' },
          { id: 'audit', label: 'Audit Trails & Human Accountability', desc: 'Ghi nhận nhật ký sử dụng và gắn trách nhiệm rõ ràng theo phòng ban' }
        ],
        steps: [
          { title: 'Nhân viên gặp áp lực tiến độ cần tóm tắt hợp đồng mật & gỡ lỗi đoạn code chứa khoá nội bộ', text: 'Vì công ty không cấp công cụ AI nội bộ, nhân viên mở tài khoản AI miễn phí cá nhân.', blockedBy: ['enterprise'], blockMsg: 'Nhân viên sử dụng cổng Enterprise AI đã được phê duyệt (có thoả thuận không lưu dữ liệu) theo đúng hướng dẫn AUP.' },
          { title: 'Nhân viên dán toàn bộ mã nguồn và thông tin khách hàng vào khung chat công cộng', text: 'Request HTTP POST mang theo dữ liệu nhạy cảm đi ra ngoài biên mạng doanh nghiệp.', blockedBy: ['casb'], blockMsg: 'Cổng DLP/CASB phát hiện mẫu mã nguồn & PII gửi tới domain Consumer AI chưa duyệt và chặn lại kèm thông báo nhắc nhở AUP.' },
          { title: 'Dữ liệu đi vào kho lưu trữ/huấn luyện của bên thứ ba và không có nhật ký truy vết', text: 'Tổ chức mất quyền kiểm soát dữ liệu và vi phạm cam kết bảo mật với khách hàng.', blockedBy: ['audit'], blockMsg: 'Hệ thống ghi vết giúp xác định ngay phạm vi dữ liệu bị gửi đi để kích hoạt quy trình xử lý sự cố và yêu cầu xoá dữ liệu.' }
        ],
        good: 'Kết hợp AUP rõ ràng + cung cấp cổng Enterprise AI an toàn + DLP đã giải quyết tận gốc Shadow AI.',
        bad: 'Cấm đoán suông mà không có AUP, công cụ thay thế và kiểm soát DLP khiến dữ liệu mật rò rỉ qua các prompt hàng ngày.' }
    ]
  };

  const questions = [
    // 4.1
    mq('4.1', 'Bốn chức năng cốt lõi (core functions) của NIST AI Risk Management Framework (AI RMF) là gì?', [
      'Identify, Protect, Detect, Respond',
      'Govern, Map, Measure, Manage',
      'Plan, Do, Check, Act',
      'Encode, Encrypt, Authorize, Audit'
    ], 1, 'NIST AI RMF được tổ chức xoay quanh 4 chức năng cốt lõi: Govern, Map, Measure, Manage.', {
      A: 'Đây là các hàm của NIST Cybersecurity Framework (CSF) truyền thống.',
      C: 'Đây là chu trình Deming PDCA.',
      D: 'Không phải các hàm của NIST AI RMF.'
    }, 'm04-s01-p01'),
    mq('4.1', 'Trong NIST AI RMF, chức năng nào chịu trách nhiệm “đánh giá và định lượng các rủi ro đã nhận diện bằng các chỉ số (metrics)”?', [
      'Govern',
      'Map',
      'Measure',
      'Manage'
    ], 2, 'Govern thiết lập chính sách & trách nhiệm; Map nhận diện & đặt rủi ro vào ngữ cảnh; Measure đánh giá & định lượng bằng metrics; Manage triển khai kiểm soát & giảm thiểu.', {
      A: 'Govern thiết lập chính sách và trách nhiệm giải trình.',
      B: 'Map nhận diện và đặt rủi ro vào ngữ cảnh.',
      D: 'Manage triển khai biện pháp kiểm soát và giảm thiểu.'
    }, 'm04-s01-p01'),
    mq('4.1', 'Tiêu chuẩn quốc tế nào quy định các yêu cầu đối với một Hệ thống Quản lý Trí tuệ Nhân tạo (AIMS) trong tổ chức?', [
      'ISO/IEC 42001',
      'OWASP LLM Top 10',
      'PCI DSS v4.0',
      'RFC 6749'
    ], 0, 'ISO/IEC 42001 là tiêu chuẩn quốc tế cho Artificial Intelligence Management Systems (AIMS).', {
      B: 'OWASP LLM Top 10 là danh sách 10 rủi ro bảo mật.',
      C: 'PCI DSS dành cho dữ liệu thẻ thanh toán.',
      D: 'RFC 6749 là đặc tả OAuth 2.0.'
    }, 'm04-s01-p02'),
    mq('4.1', 'Phát biểu nào ĐÚNG về tính chất pháp lý của NIST AI RMF?', [
      'Là đạo luật hình sự bắt buộc trên toàn thế giới',
      'Mang tính tự nguyện (voluntary) nhưng ngày càng được viện dẫn nhiều trong các yêu cầu mua sắm và hướng dẫn pháp lý',
      'Chỉ áp dụng cho các mô hình mã nguồn mở dưới 7 tỷ tham số',
      'Thay thế hoàn toàn GDPR tại Châu Âu'
    ], 1, 'Handbook nêu rõ: The AI RMF is voluntary but increasingly referenced in procurement requirements and regulatory guidance.', {
      A: 'NIST AI RMF là khung tự nguyện, không phải đạo luật hình sự.',
      C: 'Áp dụng cho mọi hệ thống AI.',
      D: 'Không thay thế GDPR.'
    }, 'm04-s01-p01', true),
    fq('4.1', 'Name the four core functions of the NIST AI RMF and briefly state what each function does.',
      [['govern', 'policies', 'accountability'], ['map', 'identif', 'contextualiz'], ['measure', 'assess', 'quantif', 'metrics'], ['manage', 'control', 'mitigat']],
      'Govern establishes AI risk management policies and accountability; Map identifies and contextualizes AI risks; Measure assesses and quantifies identified risks using metrics; Manage implements controls and mitigations.',
      'Bốn hàm: Govern (chính sách & trách nhiệm giải trình), Map (nhận diện & ngữ cảnh hoá rủi ro), Measure (đánh giá & định lượng bằng chỉ số), Manage (triển khai kiểm soát & giảm thiểu).', 'm04-s01-p01'),

    // 4.2
    mq('4.2', 'Theo EU AI Act, việc triển khai LLM doanh nghiệp để chấm điểm tín dụng (credit scoring), sàng lọc tuyển dụng (hiring) hoặc hỗ trợ chẩn đoán y tế thuộc bậc rủi ro nào?', [
      'Minimal Risk',
      'Limited Risk',
      'High Risk',
      'Unacceptable Risk'
    ], 2, 'Tín dụng, tuyển dụng, chẩn đoán y tế và thực thi pháp luật là các lĩnh vực trọng yếu thuộc nhóm High Risk trong EU AI Act.', {
      A: 'Minimal Risk dành cho các ứng dụng thông thường không có rủi ro đáng kể.',
      B: 'Limited Risk chủ yếu yêu cầu nghĩa vụ minh bạch (như thông báo đang chat với AI).',
      D: 'Unacceptable Risk là các ứng dụng bị cấm như social scoring.'
    }, 'm04-s02-p03'),
    mq('4.2', 'Ứng dụng nào sau đây bị xếp vào nhóm Unacceptable Risk (bị cấm) theo EU AI Act?', [
      'Chatbot hỗ trợ khách hàng có thông báo rõ là AI',
      'Hệ thống chấm điểm công dân (social scoring) hoặc AI thao túng hành vi',
      'Hệ thống tóm tắt tài liệu nội bộ',
      'Trợ lý gợi ý mã nguồn trong IDE'
    ], 1, 'Unacceptable Risk gồm các ứng dụng bị cấm: social scoring, giám sát sinh trắc học thời gian thực (trừ ngoại lệ), và manipulative AI.', {
      A: 'Thuộc Limited Risk.',
      C: 'Thuộc Minimal Risk.',
      D: 'Thuộc Minimal/Limited Risk.'
    }, 'm04-s02-p02'),
    mq('4.2', 'Các hệ thống AI thuộc nhóm High Risk trong EU AI Act bắt buộc phải đáp ứng những yêu cầu nào?', [
      'Chỉ cần gắn dòng chữ “Powered by AI” ở chân trang',
      'Đánh giá sự phù hợp (conformity assessments), hồ sơ tài liệu (documentation), sự giám sát của con người (human oversight) và giám sát liên tục (ongoing monitoring)',
      'Công khai toàn bộ mã nguồn và trọng số lên internet',
      'Không cần bất kỳ yêu cầu đặc thù nào'
    ], 1, 'High Risk đòi hỏi conformity assessments, documentation, human oversight, và ongoing monitoring.', {
      A: 'Đó chỉ là nghĩa vụ minh bạch của Limited Risk.',
      C: 'EU AI Act không bắt mở mã nguồn mọi mô hình.',
      D: 'Đó là Minimal Risk.'
    }, 'm04-s02-p03', true),
    mq('4.2', 'Điều 22 của GDPR (GDPR Article 22) đặt ra thách thức tuân thủ nào đối với các quyết định do AI đưa ra?', [
      'Yêu cầu quyền được giải thích (right to explanation) đối với các quyết định tự động dựa trên AI',
      'Cấm sử dụng định dạng JSON',
      'Bắt buộc mọi mô hình phải dùng lượng tử hoá INT8',
      'Yêu cầu xoá toàn bộ nhật ký kiểm toán sau 5 phút'
    ], 0, 'Handbook chỉ rõ: The right to explanation for AI-driven decisions under GDPR Article 22.', {
      B: 'Không liên quan.',
      C: 'Không liên quan.',
      D: 'Ngược lại, cần lưu audit trail để giải trình.'
    }, 'm04-s02-p06', true),
    mq('4.2', 'Nghĩa vụ cốt lõi của bậc Limited Risk trong EU AI Act là gì?', [
      'Cấm triển khai tại Châu Âu',
      'Nghĩa vụ minh bạch (Transparency obligations) — người dùng phải được thông báo rằng họ đang tương tác với AI',
      'Bắt buộc kiểm định phần cứng quân sự',
      'Chỉ được chạy offline'
    ], 1, 'Limited Risk yêu cầu nghĩa vụ minh bạch: người dùng phải được biết mình đang tương tác với AI.', {
      A: 'Chỉ Unacceptable Risk mới bị cấm.',
      C: 'Không có yêu cầu này.',
      D: 'Không bắt buộc chạy offline.'
    }, 'm04-s02-p04', true),
    fq('4.2', 'List the four risk tiers of the EU AI Act and state the requirements for High Risk systems.',
      [['unacceptable', 'banned', 'social scoring'], ['high risk', 'critical', 'consequential'], ['limited risk', 'transparency'], ['minimal risk'], ['conformity assessment', 'documentation', 'human oversight', 'ongoing monitoring']],
      'The four tiers are Unacceptable Risk (banned), High Risk, Limited Risk (transparency obligations), and Minimal Risk. High Risk systems require conformity assessments, documentation, human oversight, and ongoing monitoring.',
      'Bốn bậc: Unacceptable, High, Limited, Minimal; yêu cầu của High Risk gồm conformity assessments, documentation, human oversight, và ongoing monitoring.', 'm04-s02-p03'),

    // 4.3
    mq('4.3', 'Điểm khác biệt quan trọng giữa LLM Red Teaming và kiểm thử xâm nhập (pentest) truyền thống là gì?', [
      'LLM Red Teaming chỉ kiểm tra cổng mạng TCP/IP',
      'LLM Red Teaming mở rộng ra ngoài pentest truyền thống để thăm dò có hệ thống cả lỗ hổng, thiên kiến (biases), đầu ra độc hại và vi phạm chính sách',
      'LLM Red Teaming chỉ cần chạy một lần duy nhất rồi không bao giờ lặp lại',
      'LLM Red Teaming không cần ghi lại các bước tái hiện'
    ], 1, 'Red teaming cho LLM vượt ra ngoài pentest truyền thống: tìm cả lỗ hổng, thiên kiến (biases), đầu ra độc hại và vi phạm chính sách.', {
      A: 'Đó là quét mạng truyền thống.',
      C: 'Phải thực hiện định kỳ và sau mỗi lần cập nhật mô hình.',
      D: 'Phải ghi lại đầy đủ bước tái hiện (reproduction steps).'
    }, 'm04-s03-p01'),
    mq('4.3', 'Thành phần đội ngũ kiểm thử trong chương trình LLM Red Teaming nên được tổ chức như thế nào?', [
      'Chỉ gồm các lập trình viên viết ra mô hình đó',
      'Huy động đội ngũ kiểm thử đa dạng (diverse testers) gồm chuyên gia bảo mật, chuyên gia lĩnh vực nghiệp vụ (domain specialists) và cả người dùng không chuyên kỹ thuật',
      'Chỉ thuê một công cụ quét cổng tự động',
      'Chỉ gồm nhân viên kế toán'
    ], 1, 'Handbook yêu cầu: Engage diverse testers (security experts, domain specialists, non-technical users).', {
      A: 'Thiếu tính khách quan và góc nhìn đa chiều.',
      C: 'Công cụ quét cổng không đánh giá được bias hay lỗi nghiệp vụ.',
      D: 'Không đủ chuyên môn đa chiều.'
    }, 'm04-s03-p03'),
    mq('4.3', 'Khi nào cần thực hiện kiểm thử Red Team đối với một ứng dụng LLM?', [
      'Chỉ sau khi hệ thống đã bị tấn công thành công trên báo chí',
      'Thiết lập baseline trước khi triển khai, sau đó kiểm thử định kỳ và sau mỗi lần cập nhật mô hình',
      'Chỉ kiểm thử một lần khi khởi tạo dự án',
      'Chỉ kiểm thử khi thay đổi giao diện CSS'
    ], 1, 'Establish baselines before deployment. Conduct testing at regular intervals and after model updates.', {
      A: 'Quá muộn, mang tính bị động.',
      C: 'Cập nhật mô hình và kỹ thuật tấn công mới đòi hỏi kiểm thử định kỳ.',
      D: 'CSS không phải trọng tâm rủi ro mô hình.'
    }, 'm04-s03-p03', true),
    fq('4.3', 'What should be included in the scope and structure of an LLM red teaming program?',
      [['jailbreak', 'prompt injection'], ['data extraction', 'tool', 'plugin abuse'], ['bias', 'fairness', 'policy compliance'], ['baseline', 'regular intervals', 'after model updates', 'diverse testers', 'risk register']],
      'Scope includes jailbreak testing, direct and indirect prompt injection, data extraction, bias/fairness testing, policy compliance, and tool/plugin abuse. Structure includes pre-deployment baselines, regular testing and re-testing after model updates, diverse testers, documented reproduction steps, and tracking in the AI risk register.',
      'Nêu được phạm vi (jailbreak, prompt injection, data extraction, bias/fairness, policy compliance, tool abuse) và cấu trúc (baseline trước triển khai, định kỳ & sau cập nhật model, diverse testers, reproduction steps, AI risk register).', 'm04-s03-p02'),

    // 4.4
    mq('4.4', 'Một Sổ đăng ký Rủi ro AI (AI Risk Register) hoàn chỉnh cần bao quát những nhóm rủi ro nào?', [
      'Chỉ gồm lỗi cú pháp Python',
      'Rủi ro kỹ thuật (prompt injection, hallucination), rủi ro vận hành (model drift, phụ thuộc vendor), rủi ro đạo đức (bias, công bằng) và rủi ro danh tiếng',
      'Chỉ gồm chi phí tiền điện máy chủ',
      'Chỉ gồm danh sách nhân viên nghỉ phép'
    ], 1, 'AI Risk Register phải bao gồm cả 4 nhóm: technical, operational, ethical, và reputational risks, và phải là một tài liệu sống (living document).', {
      A: 'Quá hẹp.',
      C: 'Không phải phạm vi đầy đủ của AI Risk Register.',
      D: 'Không liên quan.'
    }, 'm04-s04-p01'),
    mq('4.4', 'Mục đích quản trị chính của Model Cards (Mitchell et al.) là gì?', [
      'Thay thế hoàn toàn hợp đồng lao động',
      'Cung cấp tài liệu chuẩn hoá, minh bạch về năng lực, giới hạn, ca sử dụng dự kiến, kết quả đánh giá và chế độ lỗi đã biết để giúp ra quyết định triển khai có cơ sở',
      'Tự động mã hoá cơ sở dữ liệu',
      'Tăng gấp đôi tốc độ huấn luyện'
    ], 1, 'Model cards chuẩn hoá thông tin về capabilities, limitations, intended use cases, evaluation results, và known failure modes để đảm bảo tính minh bạch khi quyết định triển khai.', {
      A: 'Không liên quan.',
      C: 'Model card là tài liệu quản trị/minh bạch.',
      D: 'Không ảnh hưởng tốc độ huấn luyện.'
    }, 'm04-s04-p02'),
    mq('4.4', 'Trong AI Risk Register, hiện tượng “model drift” và “vendor dependency” được xếp vào nhóm rủi ro nào?', [
      'Operational risks (Rủi ro vận hành)',
      'Ethical risks (Rủi ro đạo đức)',
      'Physical security risks',
      'Cryptographic risks'
    ], 0, 'Handbook phân loại rõ: operational risks (model drift, vendor dependency).', {
      B: 'Ethical risks gồm bias và fairness.',
      C: 'Không phải rủi ro vật lý.',
      D: 'Không phải rủi ro mật mã.'
    }, 'm04-s04-p01', true),
    fq('4.4', 'What information does a Model Card document, and how does it support AI governance?',
      [['capabilities', 'limitations'], ['intended use', 'use cases'], ['evaluation', 'failure modes'], ['transparency', 'informed deployment', 'decisions']],
      'A Model Card documents a model\'s capabilities, limitations, intended use cases, evaluation results, and known failure modes, supporting governance by providing transparency for informed deployment decisions.',
      'Model Card ghi nhận capabilities, limitations, intended use cases, evaluation results, known failure modes → tạo sự minh bạch giúp đưa ra quyết định triển khai có cơ sở.', 'm04-s04-p02', true),

    // 4.5
    mq('4.5', 'Hiện tượng nhân viên tự ý dùng tài khoản ChatGPT cá nhân để tóm tắt tài liệu mật hoặc dán mã nguồn công ty vào LLM công cộng ngoài tầm kiểm soát IT được gọi là gì?', [
      'Federated Learning',
      'Shadow AI',
      'Constitutional AI',
      'Differential Privacy'
    ], 1, 'Shadow AI là việc nhân viên sử dụng trái phép các công cụ AI ngoài tầm quản trị CNTT, gây nguy cơ rò rỉ dữ liệu nghiêm trọng qua prompt.', {
      A: 'Federated Learning là kỹ thuật huấn luyện phân tán.',
      C: 'Constitutional AI là kỹ thuật căn chỉnh an toàn.',
      D: 'Differential Privacy là kỹ thuật bảo vệ quyền riêng tư bằng nhiễu toán học.'
    }, 'm04-s05-p01'),
    mq('4.5', 'Chính sách Sử dụng Chấp nhận được (Acceptable Use Policy — AUP) cho AI trong doanh nghiệp cần bao quát phạm vi nào?', [
      'Chỉ áp dụng cho AI tiêu dùng miễn phí',
      'Chỉ áp dụng cho máy chủ nội bộ',
      'Phải bao quát cả Consumer AI (ChatGPT, Gemini) lẫn Enterprise AI (triển khai nội bộ, sử dụng API), quy định rõ ca sử dụng được phép, hành vi cấm, xử lý dữ liệu và quy trình báo cáo',
      'Chỉ áp dụng cho bộ phận marketing'
    ], 2, 'AUP phải định nghĩa approved use cases, prohibited activities, data handling, escalation procedures, approved tools, và bao quát cả consumer AI lẫn enterprise AI.', {
      A: 'Thiếu mảng Enterprise AI.',
      B: 'Thiếu mảng Consumer AI (nguồn gốc chính của Shadow AI).',
      D: 'Phải áp dụng toàn tổ chức.'
    }, 'm04-s05-p02'),
    mq('4.5', 'Khi phát hiện một lỗ hổng bảo mật mới trong hệ thống LLM của nhà cung cấp, cách xử lý nào tuân thủ đúng nguyên tắc Responsible Disclosure?', [
      'Đăng ngay mã khai thác lên mạng xã hội để ép nhà cung cấp sửa nhanh (immediate public disclosure)',
      'Giấu kín vĩnh viễn để không ai biết (permanent non-disclosure)',
      'Công bố phối hợp (coordinated disclosure): thông báo cho nhà cung cấp, dành thời gian khắc phục hợp lý rồi mới công bố công khai',
      'Bán lỗ hổng cho bên thứ ba'
    ], 2, 'Responsible disclosure tuân theo coordinated disclosure: báo cho vendor, cho thời gian vá hợp lý, sau đó công bố để cộng đồng cùng học hỏi.', {
      A: 'Immediate public disclosure làm tối đa hoá thiệt hại.',
      B: 'Permanent non-disclosure ngăn cản cộng đồng học hỏi.',
      D: 'Vi phạm đạo đức nghề nghiệp.'
    }, 'm04-s05-p04'),
    mq('4.5', 'Ba trụ cột kỹ thuật và tổ chức nào là bắt buộc để đảm bảo Trách nhiệm Giải trình Thuật toán (Algorithmic Accountability)?', [
      'Nhật ký kiểm toán (audit trails), cơ chế giải thích được (explainability mechanisms) và trách nhiệm rõ ràng của con người (clear human accountability)',
      'Ẩn danh toàn bộ người phê duyệt, tắt log và để mô hình tự chịu trách nhiệm pháp lý',
      'Chỉ dùng mô hình có kích thước nhỏ',
      'Đặt temperature = 2.0'
    ], 0, 'Algorithmic accountability đòi hỏi audit trails, explainability mechanisms, và clear human accountability cho kết quả của hệ thống AI.', {
      B: 'Mô hình không có tư cách pháp nhân; phải có con người chịu trách nhiệm và có audit trail.',
      C: 'Kích thước mô hình không thay thế cơ chế giải trình.',
      D: 'Temperature cao làm đầu ra ngẫu nhiên, khó giải trình hơn.'
    }, 'm04-s05-p03', true),
    fq('4.5', 'Define Shadow AI, explain why it is riskier than traditional Shadow IT, and state how an Acceptable Use Policy (AUP) helps address it.',
      [['unauthorized', 'outside it governance', 'personal'], ['leakage through prompts', 'confidential', 'source code', 'prompts'], ['acceptable use', 'approved', 'prohibited', 'data handling'], ['consumer ai', 'enterprise ai']],
      'Shadow AI is the unauthorized use of AI tools by employees outside IT governance (such as pasting confidential documents or source code into personal ChatGPT accounts); it carries greater risk due to direct data leakage through prompts. An AUP addresses it by defining approved tools/use cases, prohibited activities, data handling rules, and escalation procedures across both consumer and enterprise AI.',
      'Định nghĩa Shadow AI, lý do rủi ro cao hơn (rò rỉ dữ liệu trực tiếp qua prompt), và nội dung AUP (ca sử dụng được phép, hành vi cấm, xử lý dữ liệu, bao phủ cả consumer & enterprise AI).', 'm04-s05-p01'),
    fq('4.5', 'What is coordinated responsible disclosure for LLM vulnerabilities, and what two extremes should be avoided?',
      [['notify the vendor', 'vendor', 'coordinated'], ['reasonable remediation time', 'remediation', 'time to fix'], ['immediate public disclosure', 'maximize harm', 'maximizes harm'], ['permanent non-disclosure', 'community learning']],
      'Coordinated disclosure means notifying the vendor, allowing reasonable remediation time, and then disclosing publicly; it avoids immediate public disclosure (which maximizes harm) and permanent non-disclosure (which prevents community learning).',
      'Nêu quy trình coordinated disclosure (báo vendor → chờ thời gian vá hợp lý → công bố) và 2 thái cực cần tránh (công bố ngay lập tức & giấu kín vĩnh viễn).', 'm04-s05-p04', true)
  ];

  window.CLLMSP.register({ n: 4, handbook, sections, questions });
})();
