/* ===== Module 05 — Data Privacy & Treatment (Domain 5, 10%) =====
 * 100% nội dung gốc từ Handbook (Trang 15–16) + Giải thích chuyên sâu + Ví dụ & Code thực tế + Labs + 22 câu hỏi.
 */
(() => {
  const { P, H } = window.CLLMSP;
  let nq = 0;
  const mq = (sec, q, options, answer, exp, why, ref, examOnly) => ({ id: 'm05-q' + (++nq), sec, type: 'mcq', q, options, answer, exp, why, ref, examOnly });
  const fq = (sec, q, cl, model, exp, ref, examOnly) => ({ id: 'm05-q' + (++nq), sec, type: 'free', q, clusters: cl.map(c => ({ name: c[0], terms: c.slice(1) })), model, exp, ref, examOnly });

  const handbook = [
    P('m05-intro', 15, 'LLMs introduce [[privrisks|privacy risks]] that do not exist in traditional software: [[memorization|memorization of training data]], [[infcontext|inference from context]], and the challenge of \'[[unlearning|unlearning]]\' specific data points from a [[trainedparams|trained model\'s parameters]].',
      'LLM đưa vào [[privrisks|các rủi ro về quyền riêng tư]] vốn không tồn tại trong phần mềm truyền thống: [[memorization|ghi nhớ dữ liệu huấn luyện]], [[infcontext|suy diễn từ ngữ cảnh]], và thách thức của việc \'[[unlearning|xoá bỏ tri thức đã học (unlearning)]]\' đối với các điểm dữ liệu cụ thể khỏi [[trainedparams|tham số của mô hình đã huấn luyện]].'),
    P('m05-lo01', 15, 'Identify [[llmspecpriv|LLM-specific privacy risks]] beyond traditional data protection.', 'Nhận diện [[llmspecpriv|các rủi ro quyền riêng tư đặc thù của LLM]] vượt ra ngoài bảo vệ dữ liệu truyền thống.'),
    P('m05-lo02', 15, 'Apply [[gdpr|GDPR]], [[ccpa|CCPA]], and [[hipaa|HIPAA]] requirements to LLM deployments.', 'Áp dụng các yêu cầu của [[gdpr|GDPR]], [[ccpa|CCPA]], và [[hipaa|HIPAA]] vào việc triển khai LLM.'),
    P('m05-lo03', 15, 'Implement [[pets|privacy-enhancing technologies]] for AI systems.', 'Triển khai [[pets|các công nghệ tăng cường quyền riêng tư (PETs)]] cho hệ thống AI.'),
    P('m05-lo04', 15, 'Design [[datapipelines|data handling pipelines]] that protect sensitive information.', 'Thiết kế [[datapipelines|các pipeline xử lý dữ liệu]] bảo vệ thông tin nhạy cảm.'),

    H('m05-s01-h', 15, '5.1  Training Data Risks: Memorization & Extraction', '5.1  Rủi ro Dữ liệu Huấn luyện: Ghi nhớ (Memorization) & Trích xuất (Extraction)'),
    P('m05-s01-p01', 15, 'LLMs [[memorize|memorize]] portions of their training data, especially data that [[appearsfreq|appears frequently]] or is [[highdistinct|highly distinctive]]. This creates unique privacy risks:',
      'Các LLM [[memorize|ghi nhớ]] một phần dữ liệu huấn luyện của chúng, đặc biệt là dữ liệu [[appearsfreq|xuất hiện lặp lại nhiều lần]] hoặc [[highdistinct|có tính đặc thù cao]]. Điều này tạo ra những rủi ro quyền riêng tư rất riêng biệt:'),
    P('m05-s01-p02', 15, '[[trainextract|Training Data Extraction]]: Attackers craft prompts to elicit [[verbatim|verbatim memorized content]] — [[pii|PII]], [[apikeys|API keys]], [[propcode|proprietary code]], or confidential documents from the training set. Extraction is most effective when specific data points were [[repeatedmany|repeated many times in training]] or when the model is [[overfit|heavily overfit]].',
      '[[trainextract|Trích xuất Dữ liệu Huấn luyện (Training Data Extraction)]]: Kẻ tấn công chế tạo prompt để khơi gợi [[verbatim|nội dung đã ghi nhớ nguyên văn]] — [[pii|thông tin định danh cá nhân (PII)]], [[apikeys|API key]], [[propcode|mã nguồn độc quyền]], hoặc tài liệu mật từ tập huấn luyện. Việc trích xuất hiệu quả nhất khi các điểm dữ liệu cụ thể [[repeatedmany|được lặp lại nhiều lần trong quá trình huấn luyện]] hoặc khi mô hình bị [[overfit|quá khớp (overfit) nặng]].'),
    P('m05-s01-p03', 15, '[[mia|Membership Inference Attacks]]: Determining whether a [[specsample|specific data sample]] was [[incdataset|included in the training dataset]]. This can reveal sensitive information about [[datasources|data sources]] and potentially violate [[dataprot|data protection agreements]].',
      '[[mia|Tấn công Suy diễn Thành viên (Membership Inference Attacks)]]: Xác định xem một [[specsample|mẫu dữ liệu cụ thể]] có [[incdataset|nằm trong tập dữ liệu huấn luyện hay không]]. Điều này có thể làm lộ thông tin nhạy cảm về [[datasources|nguồn dữ liệu]] và có nguy cơ vi phạm [[dataprot|các thoả thuận bảo vệ dữ liệu]].'),
    P('m05-s01-p04', 15, '[[embinv|Embedding Inversion]]: Partially [[reconstruct|reconstructing original text]] from [[vecemb|vector embeddings]] stored in vector databases. This threatens the privacy of data stored in [[ragkb|RAG knowledge bases]], even when the original documents are [[accessctrl|access-controlled]].',
      '[[embinv|Đảo ngược Embedding (Embedding Inversion)]]: [[reconstruct|Tái tạo lại một phần văn bản gốc]] từ [[vecemb|các vector embedding]] được lưu trong cơ sở dữ liệu vector. Kỹ thuật này đe doạ quyền riêng tư của dữ liệu lưu trong [[ragkb|kho tri thức RAG]], ngay cả khi các tài liệu gốc đã được [[accessctrl|kiểm soát truy cập]].'),

    H('m05-s02-h', 15, '5.2  Privacy Regulations: GDPR, CCPA, HIPAA', '5.2  Các Quy định về Quyền riêng tư: GDPR, CCPA, HIPAA'),
    P('m05-s02-p01', 15, '[[gdpr|GDPR (General Data Protection Regulation)]]: The [[righterasure|right to erasure (\'right to be forgotten\')]] is particularly challenging for LLMs because removing a specific individual\'s data influence from a [[trainedparams|trained model\'s parameters]] is [[techdiff|technically difficult]] — you cannot simply \'delete\' learned patterns. [[datares|Data residency requirements]] affect where prompts and model inference can occur. [[art22|Article 22]] requires the [[rightexplain|right to explanation]] for automated decisions.',
      '[[gdpr|GDPR (Quy định Bảo vệ Dữ liệu Chung)]]: [[righterasure|Quyền được xoá dữ liệu (\'quyền được lãng quên\')]] đặc biệt khó thực hiện đối với LLM vì việc loại bỏ ảnh hưởng dữ liệu của một cá nhân cụ thể khỏi [[trainedparams|các tham số của mô hình đã huấn luyện]] là [[techdiff|cực kỳ khó khăn về mặt kỹ thuật]] — bạn không thể đơn giản bấm \'xoá\' các mẫu đã học. [[datares|Yêu cầu về cư trú dữ liệu]] ảnh hưởng tới nơi được phép xử lý prompt và suy luận. [[art22|Điều 22]] đòi hỏi [[rightexplain|quyền được giải thích]] đối với các quyết định tự động.'),
    P('m05-s02-p02', 15, '[[ccpa|CCPA (California Consumer Privacy Act)]]: Requires providing California residents with the [[rightknow|right to know]] what personal information is collected and the [[rightdelete|right to request its deletion]]. LLM operators must understand [[dataflows|where user data flows]] — to [[modelprov|model providers]], [[vectordb|vector databases]], [[logsys|logging systems]] — and be able to [[honordel|honor deletion requests across all these systems]].',
      '[[ccpa|CCPA (Đạo luật Quyền riêng tư Người tiêu dùng California)]]: Yêu cầu trao cho cư dân California [[rightknow|quyền được biết]] thông tin cá nhân nào đang được thu thập và [[rightdelete|quyền yêu cầu xoá thông tin đó]]. Đơn vị vận hành LLM phải nắm rõ [[dataflows|luồng di chuyển của dữ liệu người dùng]] — tới [[modelprov|nhà cung cấp mô hình]], [[vectordb|cơ sở dữ liệu vector]], [[logsys|hệ thống ghi log]] — và phải có khả năng [[honordel|thực thi yêu cầu xoá trên toàn bộ các hệ thống này]].'),
    P('m05-s02-p03', 15, '[[hipaa|HIPAA (Health Insurance Portability and Accountability Act)]]: Governs [[healthdata|healthcare data]]. Sending [[patientdata|patient data]] to a third-party LLM API without a [[baa|Business Associate Agreement (BAA)]] is a [[hipaaviol|HIPAA violation]]. Many LLM providers now offer [[hipaatier|HIPAA-compliant tiers with BAAs]], but the operator must ensure proper data handling throughout the pipeline.',
      '[[hipaa|HIPAA (Đạo luật Trách nhiệm Giải trình và Khả năng Di chuyển Bảo hiểm Y tế)]]: Quản lý [[healthdata|dữ liệu y tế]]. Việc gửi [[patientdata|dữ liệu bệnh nhân]] tới API LLM của bên thứ ba mà không có [[baa|Thoả thuận Đối tác Kinh doanh (Business Associate Agreement - BAA)]] là hành vi [[hipaaviol|vi phạm HIPAA]]. Nhiều nhà cung cấp LLM hiện cung cấp [[hipaatier|các gói tuân thủ HIPAA kèm BAA]], nhưng đơn vị vận hành vẫn phải đảm bảo xử lý dữ liệu đúng quy định xuyên suốt toàn bộ pipeline.'),

    H('m05-s03-h', 15, '5.3  Privacy-Enhancing Technologies', '5.3  Các Công nghệ Tăng cường Quyền riêng tư (PETs)'),
    P('m05-s03-p01', 15, '[[dp|Differential Privacy]]: Adds [[calibnoise|calibrated mathematical noise]] to data or computations to provide [[provablepriv|provable privacy guarantees]]. The privacy parameter [[epsilon|epsilon (ε)]] controls the [[tradeoff|trade-off between privacy and utility]]. Applied to LLM training, differential privacy can [[limitmem|limit memorization]] of individual data points, but typically [[reducesqual|reduces model quality]].',
      '[[dp|Differential Privacy (Quyền riêng tư Vi sai)]]: Cộng thêm [[calibnoise|nhiễu toán học đã hiệu chỉnh]] vào dữ liệu hoặc phép tính để mang lại [[provablepriv|đảm bảo quyền riêng tư có thể chứng minh bằng toán học]]. Tham số quyền riêng tư [[epsilon|epsilon (ε)]] điều khiển [[tradeoff|sự đánh đổi giữa quyền riêng tư và độ hữu ích (utility)]]. Khi áp dụng vào huấn luyện LLM, differential privacy có thể [[limitmem|hạn chế việc ghi nhớ]] các điểm dữ liệu cá nhân, nhưng thường [[reducesqual|làm giảm chất lượng mô hình]].'),
    P('m05-s03-p02', 15, '[[fl|Federated Learning]]: Enables model training across [[distdata|distributed datasets]] without [[rawdata|raw data leaving its source]]. Each participant trains a [[localmodel|local model]]; only [[gradients|model updates (gradients)]] are shared and aggregated. This preserves [[datalocal|data locality and sovereignty]] while enabling collaborative model improvement.',
      '[[fl|Federated Learning (Học Liên kết)]]: Cho phép huấn luyện mô hình trên [[distdata|các tập dữ liệu phân tán]] mà [[rawdata|dữ liệu thô không cần rời khỏi nguồn của nó]]. Mỗi bên tham gia huấn luyện một [[localmodel|mô hình cục bộ]]; chỉ có [[gradients|các bản cập nhật mô hình (gradients)]] được chia sẻ và tổng hợp lại. Cách này bảo toàn [[datalocal|tính cục bộ và chủ quyền dữ liệu]] trong khi vẫn cho phép cùng nhau cải thiện mô hình.'),
    P('m05-s03-p03', 16, '[[he|Homomorphic Encryption]]: Would allow running [[encinf|LLM inference directly on encrypted data]] without decrypting it. Currently [[compprohib|computationally prohibitive]] for full LLM inference, but an active research area. [[partialhe|Partial homomorphic schemes]] may become practical for specific LLM operations.',
      '[[he|Homomorphic Encryption (Mã hoá Đồng cấu)]]: Cho phép chạy [[encinf|suy luận LLM trực tiếp trên dữ liệu đã mã hoá]] mà không cần giải mã. Hiện tại vẫn [[compprohib|quá đắt đỏ về mặt tính toán]] đối với suy luận LLM toàn phần, nhưng là một hướng nghiên cứu sôi động. [[partialhe|Các lược đồ đồng cấu một phần]] có thể sớm khả thi cho một số phép toán LLM cụ thể.'),

    H('m05-s04-h', 16, '5.4  Data Minimization, Redaction & Consent', '5.4  Tối thiểu hoá Dữ liệu, Che giấu (Redaction) & Quản lý Sự đồng ý (Consent)'),
    P('m05-s04-p01', 16, '[[datamin|Data Minimization]]: Collect, process, and retain only the [[mindata|minimum data necessary]] for the specified purpose. For LLM applications, this means: [[stripctx|stripping unnecessary context from prompts]], [[minhist|minimizing conversation history retention]], and [[avoid3p|avoiding sending sensitive data to third-party APIs]] when it is not required for the task.',
      '[[datamin|Tối thiểu hoá Dữ liệu (Data Minimization)]]: Chỉ thu thập, xử lý và lưu giữ [[mindata|lượng dữ liệu tối thiểu cần thiết]] cho mục đích đã xác định. Với ứng dụng LLM, điều này có nghĩa là: [[stripctx|loại bỏ ngữ cảnh không cần thiết khỏi prompt]], [[minhist|giảm thiểu thời gian lưu lịch sử hội thoại]], và [[avoid3p|tránh gửi dữ liệu nhạy cảm tới API bên thứ ba]] khi tác vụ không thực sự cần đến.'),
    P('m05-s04-p02', 16, '[[redaction|Redaction]]: Removing or masking [[pii|PII]] from text [[beforellm|before LLM processing]]. Implement [[redactpipe|classification and redaction pipelines]] that detect and remove sensitive information (names, SSNs, credit card numbers, addresses) [[beforesend|before data is sent to the model]]. [[reident|Re-identification risk]] must be assessed — even redacted data may be [[reidentctx|re-identifiable through context]].',
      '[[redaction|Redaction (Che giấu/Biên tập dữ liệu)]]: Loại bỏ hoặc che mặt nạ [[pii|PII]] khỏi văn bản [[beforellm|TRƯỚC khi đưa vào LLM xử lý]]. Triển khai [[redactpipe|các pipeline phân loại và redaction]] để phát hiện và gỡ bỏ thông tin nhạy cảm (họ tên, SSN, số thẻ tín dụng, địa chỉ) [[beforesend|trước khi dữ liệu được gửi tới mô hình]]. Phải đánh giá [[reident|rủi ro tái định danh (re-identification risk)]] — ngay cả dữ liệu đã che vẫn có thể [[reidentctx|bị nhận diện lại thông qua ngữ cảnh xung quanh]].'),
    P('m05-s04-p03', 16, '[[consent|Consent Management]]: Must address data collection, processing purposes, third-party sharing, retention periods, and [[withdrawal|withdrawal mechanisms]]. Users must be informed if their prompts may be used for [[modeltrain|model training]] (\'[[improvesvc|may be used to improve our services]]\'). Provide [[optout|opt-out mechanisms]] for training data inclusion.',
      '[[consent|Quản lý Sự đồng ý (Consent Management)]]: Phải đề cập rõ việc thu thập dữ liệu, mục đích xử lý, chia sẻ với bên thứ ba, thời hạn lưu trữ, và [[withdrawal|cơ chế rút lại sự đồng ý]]. Người dùng phải được thông báo rõ nếu prompt của họ có thể được dùng để [[modeltrain|huấn luyện mô hình]] (cụm từ \'[[improvesvc|có thể được dùng để cải thiện dịch vụ của chúng tôi]]\'). Phải cung cấp [[optout|cơ chế từ chối tham gia (opt-out)]] việc đưa dữ liệu vào tập huấn luyện.'),
    P('m05-s04-p04', 16, '[[synthdata|Synthetic Data]]: Artificially generated data that preserves [[statpat|statistical patterns]] of real data without containing [[actualpii|actual personal information]]. Useful for testing, development, and fine-tuning when real data is [[restrictedpriv|restricted by privacy regulations]].',
      '[[synthdata|Dữ liệu Tổng hợp (Synthetic Data)]]: Dữ liệu được sinh nhân tạo nhưng vẫn bảo toàn [[statpat|các quy luật thống kê]] của dữ liệu thật mà không chứa [[actualpii|thông tin cá nhân thực tế]]. Rất hữu ích cho kiểm thử, phát triển và fine-tuning khi dữ liệu thật bị [[restrictedpriv|hạn chế bởi các quy định quyền riêng tư]].'),

    P('m05-ms01', 16, 'LLMs [[memorize|memorize training data]] — [[trainextract|extraction attacks]] can recover PII, secrets, and proprietary content.',
      'LLM [[memorize|ghi nhớ dữ liệu huấn luyện]] — [[trainextract|tấn công trích xuất]] có thể khôi phục PII, bí mật và nội dung độc quyền.'),
    P('m05-ms02', 16, '[[gdpr|GDPR\'s]] [[righterasure|right to erasure]] is technically challenging for trained models — \'[[unlearning|unlearning]]\' is an unsolved problem.',
      '[[righterasure|Quyền được xoá dữ liệu]] của [[gdpr|GDPR]] là thách thức kỹ thuật lớn đối với các mô hình đã huấn luyện — \'[[unlearning|unlearning]]\' vẫn là bài toán chưa có lời giải triệt để.'),
    P('m05-ms03', 16, '[[dp|Differential privacy]] provides [[provablepriv|mathematical guarantees]] but [[reducesqual|reduces model quality]].',
      '[[dp|Differential privacy]] cung cấp [[provablepriv|đảm bảo bằng toán học]] nhưng [[reducesqual|làm giảm chất lượng mô hình]].'),
    P('m05-ms04', 16, '[[redactpipe|Redaction pipelines]] must run [[beforellm|before data reaches the LLM, not after]].',
      '[[redactpipe|Các pipeline redaction]] bắt buộc phải chạy [[beforellm|TRƯỚC khi dữ liệu chạm tới LLM, chứ không phải sau đó]].'),
    P('m05-ms05', 16, 'When an LLM provider says prompts \'[[improvesvc|may be used to improve services]],\' your data may [[modeltrain|enter training]].',
      'Khi nhà cung cấp LLM nói rằng prompt \'[[improvesvc|có thể được dùng để cải thiện dịch vụ]],\' dữ liệu của bạn có thể [[modeltrain|đi vào tập dữ liệu huấn luyện]].')
  ];

  const sections = {};

  sections['5.1'] = {
    title: 'Memorization · Training Data Extraction · Membership Inference · Embedding Inversion',
    concept: [
      { t: 'p', x: 'Khác với cơ sở dữ liệu truyền thống lưu bản ghi tách biệt, LLM nén dữ liệu huấn luyện vào hàng tỷ trọng số liên kết. Những đoạn văn bản **xuất hiện lặp đi lặp lại nhiều lần (repeated many times)** hoặc **có tính đặc thù cao (highly distinctive)** khi mô hình bị **overfit** sẽ bị **ghi nhớ nguyên văn (memorized)**. {{ref:m05-s01-p01}}' },
      { t: 'h', x: 'Ba đòn tấn công quyền riêng tư đặc thù của LLM & RAG' },
      { t: 'ul', items: [
        '**1. Training Data Extraction (Trích xuất dữ liệu huấn luyện):** Kẻ tấn công mớm phần đầu văn bản (prefix prompting, Carlini et al., 2021) để ép mô hình nhả ra nguyên văn PII, API key hoặc mã nguồn độc quyền đã ghi nhớ. {{ref:m05-s01-p02}}',
        '**2. Membership Inference Attack (MIA — Suy diễn thành viên):** Không cần trích xuất toàn văn mà chỉ cần đo độ tự tin/loss của mô hình trên một mẫu dữ liệu để kết luận **mẫu đó có nằm trong tập huấn luyện hay không** (ví dụ: biết hồ sơ bệnh án của ông X nằm trong tập huấn luyện mô hình ung thư đã là rò rỉ nghiêm trọng và vi phạm thoả thuận bảo vệ dữ liệu). {{ref:m05-s01-p03}}',
        '**3. Embedding Inversion (Đảo ngược vector embedding):** Nhiều kỹ sư lầm tưởng vector số thực `[0.021, -0.144, ...]` trong Vector DB là “mã hoá một chiều”. Thực tế, kẻ tấn công có thể huấn luyện mô hình đảo ngược để **khôi phục một phần văn bản gốc từ vector embedding**, đe doạ trực tiếp dữ liệu trong kho RAG dù tài liệu gốc đã khoá quyền truy cập! {{ref:m05-s01-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Minh hoạ Prefix Prompting (Training Data Extraction) & Membership Inference', tone: 'attack', lang: 'python', code: '# 1. Training Data Extraction: mớm prefix xuất hiện nhiều lần để mô hình tự hoàn thành secret\nprompt = "const STRIPE_LIVE_SECRET_KEY = \\"sk_live_"\n# -> Nếu khoá này bị lặp trong nhiều repo/log lúc train, LLM có xác suất cao sinh tiếp đúng chuỗi khoá thật!\n\n# 2. Membership Inference Attack (dựa trên Perplexity / Loss)\nloss_on_record = model.compute_loss("Patient: Jane Roe, Diagnosis: Rare Condition X, DOB: 1984-03-19")\nif loss_on_record < MEMBERSHIP_THRESHOLD:\n    print("ALERT: Sample was part of the training set (Membership Inferred!)")' }
    ],
    labs: [
      { type: 'triage', title: 'Phân biệt 3 Đòn Tấn công Quyền riêng tư (Extraction · MIA · Embedding Inversion)', intro: 'Xếp từng kịch bản tấn công vào đúng tên kỹ thuật trong Mục 5.1.',
        buckets: [
          { id: 'extract', label: 'Training Data Extraction' },
          { id: 'mia', label: 'Membership Inference (MIA)' },
          { id: 'embinv', label: 'Embedding Inversion' }
        ],
        items: [
          { text: 'Kẻ tấn công mớm các đoạn mở đầu đặc thù để mô hình sinh ra nguyên văn số điện thoại, API key và mã nguồn nội bộ bị lặp nhiều lần trong tập huấn luyện.', bucket: 'extract', why: 'Training Data Extraction khơi gợi nội dung đã ghi nhớ nguyên văn (verbatim memorized content).' },
          { text: 'Kẻ tấn công kiểm tra phản hồi/xác suất của mô hình để xác định xem hồ sơ của một khách hàng cụ thể có nằm trong tập dữ liệu huấn luyện hay không.', bucket: 'mia', why: 'Membership Inference Attack xác định một mẫu cụ thể có thuộc tập dữ liệu huấn luyện hay không.' },
          { text: 'Kẻ tấn công xâm nhập cơ sở dữ liệu vector của hệ thống RAG và tái tạo lại một phần nội dung văn bản gốc từ các vector số thực.', bucket: 'embinv', why: 'Embedding Inversion tái tạo một phần văn bản gốc từ các vector embedding.' }
        ] }
    ]
  };

  sections['5.2'] = {
    title: 'Quy định Pháp lý: GDPR (Right to Erasure & Machine Unlearning) · CCPA · HIPAA (BAA)',
    concept: [
      { t: 'p', x: 'Khi đưa dữ liệu cá nhân vào hệ thống LLM, ba khung pháp lý lớn nhất thường xuất hiện trong đề thi CLLMSP là **GDPR (Châu Âu)**, **CCPA (California)** và **HIPAA (Y tế Mỹ)**:' },
      { t: 'ul', items: [
        '**GDPR (General Data Protection Regulation):** Thách thức lớn nhất là **Quyền được xoá / Quyền được lãng quên (Right to erasure)** vì một khi dữ liệu của cá nhân đã đi vào huấn luyện, ảnh hưởng của nó nằm rải rác trên hàng tỷ trọng số — bạn không thể chạy câu lệnh `DELETE FROM weights WHERE user_id = 123`. Bài toán **Machine Unlearning** vẫn cực kỳ khó về mặt kỹ thuật (cách tốt nhất là **đừng đưa PII vào huấn luyện ngay từ đầu**!). Ngoài ra nhớ **Data residency** và **Article 22 (Right to explanation)**. {{ref:m05-s02-p01}} {{ref:m05-ms02}}',
        '**CCPA (California Consumer Privacy Act):** Trao cho cư dân California **quyền được biết (right to know)** và **quyền yêu cầu xoá (right to delete)**. Điểm mấu chốt khi vận hành LLM: bạn phải lập bản đồ toàn bộ **luồng dữ liệu (data flows)** và khi người dùng yêu cầu xoá, phải xoá đồng bộ trên **cả 3 nơi: nhà cung cấp mô hình (model providers), cơ sở dữ liệu vector (vector databases), và hệ thống ghi log (logging systems)**. {{ref:m05-s02-p02}}',
        '**HIPAA (Health Insurance Portability and Accountability Act):** Bảo vệ dữ liệu bệnh nhân (PHI). Gửi dữ liệu bệnh nhân tới API LLM bên thứ ba mà **không ký Business Associate Agreement (BAA)** là **vi phạm trực tiếp HIPAA**. Dù đã dùng gói HIPAA-compliant kèm BAA, đơn vị vận hành vẫn phải bảo vệ dữ liệu trên toàn bộ pipeline. {{ref:m05-s02-p03}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Kiến trúc Xử lý Yêu cầu Xoá dữ liệu (CCPA/GDPR Deletion Propagation)', tone: 'good', lang: 'python', code: 'async def honor_user_deletion_request(user_id: str):\n    # 1. Xoá dữ liệu gốc trong DB ứng dụng\n    await app_db.delete_user_records(user_id)\n    # 2. Xoá toàn bộ chunk & vector embedding của user trong Vector Database (RAG)\n    await vector_db.delete(filter={"owner_user_id": user_id})\n    # 3. Xoá / ẩn danh lịch sử prompt trong hệ thống Logging & Observability\n    await audit_log_store.scrub_user_pii(user_id)\n    # 4. Gọi API xoá hội thoại/fine-tune job phía Model Provider (hoặc dùng Zero-Data-Retention API)\n    await llm_provider.delete_stored_threads(user_id)' }
    ],
    labs: [
      { type: 'triage', title: 'Ánh xạ Tình huống Pháp lý vào GDPR · CCPA · HIPAA', intro: 'Chọn đúng quy định pháp lý và nguyên tắc tương ứng cho từng tình huống.',
        buckets: [
          { id: 'gdpr', label: 'GDPR' },
          { id: 'ccpa', label: 'CCPA' },
          { id: 'hipaa', label: 'HIPAA' }
        ],
        items: [
          { text: 'Bệnh viện gửi tóm tắt bệnh án tới API LLM đám mây mà chưa ký Business Associate Agreement (BAA).', bucket: 'hipaa', why: 'Gửi dữ liệu bệnh nhân cho bên thứ ba không có BAA là vi phạm HIPAA.' },
          { text: 'Người dùng yêu cầu thực thi “quyền được lãng quên” nhưng dữ liệu của họ đã được dùng để huấn luyện trực tiếp vào trọng số mô hình.', bucket: 'gdpr', why: 'Right to erasure (right to be forgotten) của GDPR cực kỳ khó thực hiện trên tham số mô hình đã huấn luyện (unlearning).' },
          { text: 'Cư dân California yêu cầu biết thông tin cá nhân nào đã thu thập và yêu cầu xoá sạch dữ liệu đó trên cả nhà cung cấp model, vector DB và hệ thống log.', bucket: 'ccpa', why: 'CCPA quy định right to know và right to delete xuyên suốt mọi nơi dữ liệu chảy qua (providers, vector DBs, logs).' }
        ] }
    ]
  };

  sections['5.3'] = {
    title: 'Privacy-Enhancing Technologies (PETs): Differential Privacy (ε) · Federated Learning · Homomorphic Encryption',
    concept: [
      { t: 'p', x: 'Ba công nghệ tăng cường quyền riêng tư (**PETs**) xuất hiện xuyên suốt đề thi với những ưu/nhược điểm rất rõ ràng:' },
      { t: 'ul', items: [
        '**1. Differential Privacy (DP — Quyền riêng tư vi sai):** Cộng **nhiễu toán học đã hiệu chỉnh (calibrated mathematical noise)** vào dữ liệu hoặc gradient (như thuật toán DP-SGD) để mang lại **đảm bảo quyền riêng tư chứng minh được bằng toán học**. Tham số **epsilon (ε)** điều khiển sự đánh đổi: **ε càng nhỏ → nhiễu càng lớn → quyền riêng tư càng cao (hạn chế memorization tốt hơn) nhưng chất lượng/độ hữu ích (utility) của mô hình càng giảm**. {{ref:m05-s03-p01}}',
        '**2. Federated Learning (FL — Học liên kết):** Huấn luyện mô hình trên các tập dữ liệu phân tán mà **dữ liệu thô không bao giờ rời khỏi nguồn**. Mỗi bên huấn luyện mô hình cục bộ và chỉ gửi **bản cập nhật mô hình (gradients)** về máy chủ tổng hợp, giữ nguyên **data locality & sovereignty**. {{ref:m05-s03-p02}}',
        '**3. Homomorphic Encryption (HE — Mã hoá đồng cấu):** Cho phép tính toán/suy luận trực tiếp trên **dữ liệu đang mã hoá (ciphertext)** mà không cần giải mã. Tuy nhiên, đối với suy luận LLM toàn phần hiện nay, HE vẫn **quá đắt đỏ về mặt tính toán (computationally prohibitive)** — chỉ mới khả thi một phần cho một số phép toán nhỏ. {{ref:m05-s03-p03}}'
      ] },
      { t: 'note', k: 'exam', x: 'Bẫy đề thi rất hay gặp:\n- **Differential Privacy** tham số nào điều khiển đánh đổi Privacy vs Utility? → **Epsilon (ε)**.\n- **Federated Learning** chia sẻ cái gì thay vì dữ liệu thô? → **Model updates (gradients)**.\n- Tại sao chưa dùng **Homomorphic Encryption** cho toàn bộ quá trình suy luận LLM? → **Computationally prohibitive** (chi phí tính toán quá lớn).' }
    ],
    examples: [
      { t: 'code', title: 'Huấn luyện Fine-tune với DP-SGD (Differential Privacy) & Cắt ngưỡng Gradient', tone: 'good', lang: 'python', code: '# Cấu hình DP-SGD: Cắt chuẩn gradient (max_grad_norm) + Cộng nhiễu Gaussian theo ngân sách epsilon\nprivacy_engine = PrivacyEngine()\nmodel, optimizer, train_loader = privacy_engine.make_private_with_epsilon(\n    module=model,\n    optimizer=optimizer,\n    data_loader=train_loader,\n    target_epsilon=3.0,      # ε càng nhỏ -> càng riêng tư (ít bị memorization) nhưng perplexity tăng\n    target_delta=1e-5,\n    epochs=3,\n    max_grad_norm=1.0        # Giới hạn ảnh hưởng tối đa của bất kỳ 1 mẫu dữ liệu đơn lẻ nào\n)' }
    ],
    labs: [
      { type: 'simulator', title: 'Mô phỏng Differential Privacy: Tham số Epsilon (ε) vs Memorization & Utility', intro: 'Kéo thanh trượt ngân sách quyền riêng tư Epsilon (ε) và bật Federated Learning để quan sát sự đánh đổi giữa khả năng chống trích xuất dữ liệu và độ chính xác của mô hình.',
        sliders: [{ id: 'eps', label: 'Tham số Epsilon (ε) — nhỏ = nhiễu mạnh (riêng tư cao)', min: 0.5, max: 20, step: 0.5, value: 3.0 }],
        toggles: [
          { id: 'dp', label: 'Bật Differential Privacy (DP-SGD)', desc: 'Cộng nhiễu toán học hiệu chỉnh vào quá trình huấn luyện', value: true },
          { id: 'fl', label: 'Kết hợp Federated Learning', desc: 'Dữ liệu thô nằm tại chỗ, chỉ chia sẻ gradients' }
        ],
        compute: s => {
          const priv = s.dp ? Math.max(10, Math.min(98, 100 - s.eps * 4.2)) : 10;
          const memRisk = s.dp ? Math.min(90, 8 + s.eps * 3.8) : 88;
          const util = s.dp ? Math.min(96, 62 + Math.log2(s.eps + 1) * 7.5) : 96;
          return {
            bars: [
              { label: 'Bảo đảm Quyền riêng tư Toán học (Privacy Protection)', value: priv, tone: priv > 70 ? 'ok' : priv > 40 ? 'warn' : 'bad' },
              { label: 'Nguy cơ Ghi nhớ & Trích xuất Dữ liệu Cá nhân (Memorization Risk)', value: memRisk, tone: memRisk < 30 ? 'ok' : memRisk < 60 ? 'warn' : 'bad' },
              { label: 'Chất lượng / Độ hữu ích của Mô hình (Model Utility)', value: util, tone: util > 80 ? 'ok' : 'warn' },
              { label: 'Bảo toàn Chủ quyền Dữ liệu tại Nguồn (Data Locality)', value: s.fl ? 95 : 20, tone: s.fl ? 'ok' : 'info' }
            ],
            alerts: [
              !s.dp ? ['bad', '✘ Khi tắt DP, mô hình đạt độ chính xác tối đa nhưng dễ dàng ghi nhớ nguyên văn PII/secret trong tập huấn luyện.'] :
              s.eps <= 2.0 ? ['info', '🔒 ε rất nhỏ: Chống memorization cực mạnh nhưng nhiễu lớn làm giảm chất lượng đầu ra của mô hình (trade-off Privacy vs Utility).'] :
              s.eps >= 12.0 ? ['warn', '⚠ ε quá lớn: Nhiễu quá nhỏ khiến bảo đảm quyền riêng tư suy yếu, nguy cơ trích xuất dữ liệu tăng cao.'] :
              ['ok', '✔ Vùng cân bằng (ε ≈ 2–6): Giảm mạnh memorization trong khi giữ chất lượng mô hình ở mức chấp nhận được.']
            ]
          };
        } }
    ]
  };

  sections['5.4'] = {
    title: 'Data Minimization · Pre-LLM Redaction Pipeline · Consent (“Improve Services”) & Synthetic Data',
    concept: [
      { t: 'p', x: 'Trong vận hành hàng ngày, bảo vệ quyền riêng tư dựa trên 4 thực hành thiết yếu ở tầng dữ liệu:' },
      { t: 'ul', items: [
        '**1. Data Minimization (Tối thiểu hoá dữ liệu):** Chỉ thu thập, xử lý và lưu giữ lượng dữ liệu tối thiểu cần thiết: **cắt bỏ ngữ cảnh thừa khỏi prompt**, **giảm thời gian lưu lịch sử chat**, và **không gửi dữ liệu nhạy cảm lên API bên thứ ba** nếu không bắt buộc. {{ref:m05-s04-p01}}',
        '**2. Redaction Pipeline (Chạy TRƯỚC khi vào LLM):** Hệ thống phân loại và che mặt nạ PII (tên, SSN, thẻ tín dụng, địa chỉ) **bắt buộc phải chạy TRƯỚC khi dữ liệu được gửi tới LLM, chứ không phải chạy sau đó**. Đồng thời phải đánh giá **rủi ro tái định danh (re-identification risk)** vì ngữ cảnh xung quanh vẫn có thể làm lộ danh tính dù đã che tên! {{ref:m05-s04-p02}} {{ref:m05-ms04}}',
        '**3. Consent Management & Cảnh giác điều khoản “Improve our services”:** Khi nhà cung cấp ghi rằng prompt *“may be used to improve our services”*, điều đó có nghĩa là **dữ liệu trong prompt của bạn có thể bị đưa vào huấn luyện mô hình**! Phải thông báo rõ cho người dùng và cung cấp cơ chế **opt-out** (hoặc dùng Enterprise API có cam kết Zero Data Retention). {{ref:m05-s04-p03}} {{ref:m05-ms05}}',
        '**4. Synthetic Data (Dữ liệu tổng hợp):** Dữ liệu nhân tạo giữ nguyên **quy luật thống kê (statistical patterns)** của dữ liệu thật nhưng không chứa thông tin cá nhân thực tế — giải pháp lý tưởng để test, phát triển và fine-tune khi dữ liệu thật bị khoá bởi quy định bảo mật. {{ref:m05-s04-p04}}'
      ] }
    ],
    examples: [
      { t: 'pair',
        bad: { title: '❌ Sai lầm phổ biến: Gửi nguyên văn PII lên LLM rồi mới che ở đầu ra', lang: 'python', code: '# Dữ liệu PII đã rời khỏi công ty và nằm trên máy chủ của LLM Provider!\nraw_reply = third_party_llm.chat(user_prompt_with_ssn_and_card)\nsafe_reply = redact_pii(raw_reply)   # QUÁ MUỘN!' },
        good: { title: '✅ Chuẩn Handbook: Redaction Pipeline chạy TRƯỚC khi gọi LLM', lang: 'python', code: '# 1. Phát hiện & thay thế PII bằng placeholder trước khi rời hệ thống\nredacted_prompt, token_map = presidio_redactor.anonymize(user_prompt)\n# Ví dụ: "Chuyển cho Nguyễn Văn A, SSN 123-45-6789" -> "Chuyển cho <PERSON_1>, SSN <US_SSN_1>"\n\n# 2. Gửi bản đã làm sạch tới LLM (kèm đánh giá nguy cơ tái định danh qua ngữ cảnh)\nreply = third_party_llm.chat(redacted_prompt)\n\n# 3. (Tuỳ chọn) Khôi phục placeholder nội bộ nếu cần hiển thị lại cho đúng chủ thể' }
      }
    ],
    labs: [
      { type: 'redact', title: 'Pre-LLM Redaction Pipeline Lab', intro: 'Hãy bật đầy đủ các bộ lọc PII để làm sạch đoạn văn bản TRƯỚC khi nó được phép gửi tới API LLM bên ngoài.',
        sample: 'Patient Record: Alice Nguyen, email alice.nguyen@medcorp.org, phone 415-890-2311, SSN 452-88-9012, billed to card 4532 7100 9981 2204, API token sk-med-998123456789abcd.',
        patterns: ['apikey', 'email', 'ssn', 'card', 'phone'] }
    ]
  };

  const questions = [
    // 5.1
    mq('5.1', 'Khi nào tấn công Trích xuất Dữ liệu Huấn luyện (Training Data Extraction) đạt hiệu quả cao nhất?', [
      'Khi dữ liệu hoàn toàn không có trong tập huấn luyện',
      'Khi các điểm dữ liệu cụ thể được lặp lại nhiều lần trong quá trình huấn luyện hoặc khi mô hình bị quá khớp (heavily overfit)',
      'Khi mô hình sử dụng Differential Privacy với epsilon rất nhỏ',
      'Khi tắt kết nối mạng của máy khách'
    ], 1, 'Extraction hiệu quả nhất khi các điểm dữ liệu được lặp lại nhiều lần trong tập huấn luyện hoặc khi mô hình bị overfit nặng.', {
      A: 'Không thể trích xuất dữ liệu chưa từng có trong tập huấn luyện.',
      C: 'Differential Privacy làm giảm khả năng ghi nhớ dữ liệu.',
      D: 'Không liên quan.'
    }, 'm05-s01-p02'),
    mq('5.1', 'Đòn tấn công nào nhằm mục đích xác định xem một mẫu dữ liệu cụ thể có nằm trong tập dữ liệu huấn luyện của mô hình hay không?', [
      'Membership Inference Attack',
      'SQL Injection',
      'Cross-Site Scripting (XSS)',
      'Rug Pull Attack'
    ], 0, 'Membership Inference Attacks xác định xem một mẫu dữ liệu cụ thể có được đưa vào tập dữ liệu huấn luyện hay không.', {
      B: 'SQLi là tấn công cơ sở dữ liệu quan hệ.',
      C: 'XSS là tấn công thực thi script trên trình duyệt.',
      D: 'Rug Pull là tấn công thay đổi hành vi MCP tool sau khi phê duyệt.'
    }, 'm05-s01-p03'),
    mq('5.1', 'Vì sao cơ sở dữ liệu vector trong hệ thống RAG vẫn đối mặt với rủi ro rò rỉ quyền riêng tư ngay cả khi kho tài liệu gốc đã được khoá quyền truy cập?', [
      'Vì vector database tự động đăng dữ liệu lên mạng xã hội',
      'Vì tấn công Đảo ngược Embedding (Embedding Inversion) có thể tái tạo lại một phần văn bản gốc từ các vector embedding',
      'Vì vector embedding luôn được lưu dưới dạng file âm thanh MP3',
      'Vì RAG không sử dụng vector'
    ], 1, 'Embedding Inversion có thể tái tạo một phần văn bản gốc từ các vector embedding lưu trong vector DB.', {
      A: 'Không đúng.',
      C: 'Vector là mảng số thực, không phải file âm thanh.',
      D: 'RAG dựa vào vector embeddings để truy xuất.'
    }, 'm05-s01-p04'),
    mq('5.1', 'Loại dữ liệu nào trong tập huấn luyện dễ bị LLM ghi nhớ (memorize) nhất?', [
      'Dữ liệu xuất hiện lặp lại thường xuyên hoặc có tính đặc thù cao (appears frequently or is highly distinctive)',
      'Dữ liệu đã được xoá hoàn toàn trước khi huấn luyện',
      'Dữ liệu nhiễu ngẫu nhiên của Differential Privacy',
      'Các tệp cấu hình rỗng'
    ], 0, 'LLMs memorize portions of their training data, especially data that appears frequently or is highly distinctive.', {
      B: 'Đã xoá trước khi train thì mô hình không học.',
      C: 'Nhiễu DP giúp chống ghi nhớ.',
      D: 'Tệp rỗng không có nội dung để ghi nhớ.'
    }, 'm05-s01-p01', true),
    fq('5.1', 'Distinguish between Training Data Extraction, Membership Inference Attacks, and Embedding Inversion.',
      [['extraction', 'verbatim', 'memorized', 'pii', 'api keys'], ['membership inference', 'whether', 'included in the training', 'specific data sample'], ['embedding inversion', 'reconstruct', 'vector embedding', 'rag']],
      'Training Data Extraction elicits verbatim memorized content (like PII or API keys) from the model; Membership Inference determines whether a specific data sample was in the training set; Embedding Inversion partially reconstructs original text from vector embeddings stored in a vector database.',
      'Phân biệt đủ 3 khái niệm: Extraction (lấy nguyên văn dữ liệu ghi nhớ), Membership Inference (kiểm tra mẫu có thuộc tập train không), Embedding Inversion (tái tạo văn bản gốc từ vector embedding).', 'm05-s01-p02'),

    // 5.2
    mq('5.2', 'Vì sao “quyền được xoá dữ liệu” (right to erasure / right to be forgotten) của GDPR lại đặc biệt khó thực thi đối với các LLM đã huấn luyện?', [
      'Vì GDPR không áp dụng cho phần mềm chạy trên máy chủ',
      'Vì việc loại bỏ ảnh hưởng dữ liệu của một cá nhân cụ thể khỏi hàng tỷ tham số của mô hình đã huấn luyện (unlearning) là cực kỳ khó về mặt kỹ thuật',
      'Vì các công ty không được phép xoá file trên ổ cứng',
      'Vì LLM không sử dụng tham số'
    ], 1, 'Không thể đơn giản bấm “xoá” các mẫu đã học khỏi tham số của một mô hình đã huấn luyện; machine unlearning vẫn là bài toán kỹ thuật rất khó.', {
      A: 'GDPR áp dụng đầy đủ cho hệ thống xử lý dữ liệu cá nhân của cư dân EU.',
      C: 'Xoá file trên ổ cứng thì dễ, nhưng xoá tri thức đã hoà vào trọng số mới khó.',
      D: 'LLM có hàng tỷ tham số.'
    }, 'm05-s02-p01'),
    mq('5.2', 'Theo quy định của HIPAA, hành vi gửi dữ liệu bệnh nhân tới API LLM của bên thứ ba mà KHÔNG có thoả thuận nào sau đây sẽ cấu thành vi phạm pháp luật?', [
      'Service Level Agreement (SLA)',
      'Business Associate Agreement (BAA)',
      'MIT Open Source License',
      'robots.txt'
    ], 1, 'Gửi dữ liệu bệnh nhân tới API LLM bên thứ ba mà không có Business Associate Agreement (BAA) là vi phạm HIPAA.', {
      A: 'SLA chỉ cam kết độ sẵn sàng dịch vụ.',
      C: 'MIT là giấy phép mã nguồn mở.',
      D: 'robots.txt dành cho trình thu thập dữ liệu web.'
    }, 'm05-s02-p03'),
    mq('5.2', 'Để đáp ứng quyền yêu cầu xoá dữ liệu cá nhân theo CCPA, đơn vị vận hành ứng dụng LLM phải làm gì?', [
      'Chỉ cần xoá tên người dùng trên giao diện trình duyệt',
      'Hiểu rõ luồng dữ liệu đi tới đâu — nhà cung cấp mô hình, cơ sở dữ liệu vector, hệ thống ghi log — và thực thi yêu cầu xoá trên toàn bộ các hệ thống này',
      'Chỉ cần đổi mật khẩu của quản trị viên',
      'Từ chối mọi yêu cầu xoá vì lý do kỹ thuật'
    ], 1, 'CCPA đòi hỏi người vận hành nắm rõ data flows (model providers, vector databases, logging systems) và thực thi xoá trên tất cả các hệ thống đó.', {
      A: 'Xoá trên UI không xoá dữ liệu lưu ở backend/vector DB/log.',
      C: 'Không liên quan.',
      D: 'Vi phạm quyền được xoá của CCPA.'
    }, 'm05-s02-p02'),
    mq('5.2', 'Yêu cầu nào của GDPR ảnh hưởng trực tiếp tới vị trí địa lý nơi prompt được gửi tới và nơi quá trình suy luận mô hình diễn ra?', [
      'Data residency requirements (Yêu cầu về cư trú dữ liệu)',
      'Quy định về độ tương phản màu sắc màn hình',
      'Quy định về kích thước batch size',
      'Quy định về tốc độ quạt tản nhiệt'
    ], 0, 'Data residency requirements affect where prompts and model inference can occur.', {
      B: 'Không liên quan.',
      C: 'Không liên quan.',
      D: 'Không liên quan.'
    }, 'm05-s02-p01', true),
    fq('5.2', 'Explain the compliance obligations for LLM operators under GDPR, CCPA, and HIPAA.',
      [['gdpr', 'erasure', 'unlearning', 'residency', 'article 22', 'explanation'], ['ccpa', 'right to know', 'delete', 'deletion', 'vector database', 'logging'], ['hipaa', 'patient', 'healthcare', 'baa', 'business associate agreement']],
      'Under GDPR, operators face the technical challenge of the right to erasure ("unlearning" from trained weights), data residency rules, and Article 22 right to explanation. Under CCPA, they must honor right-to-know and deletion requests across model providers, vector databases, and logs. Under HIPAA, sending patient data to a third-party LLM API requires a Business Associate Agreement (BAA).',
      'Tóm lược đủ 3 quy định: GDPR (right to erasure/unlearning, data residency, Art. 22), CCPA (right to know & delete trên model provider, vector DB, logs), HIPAA (bắt buộc có BAA khi xử lý dữ liệu bệnh nhân).', 'm05-s02-p01'),

    // 5.3
    mq('5.3', 'Trong Differential Privacy (Quyền riêng tư Vi sai), tham số nào điều khiển sự đánh đổi giữa quyền riêng tư (privacy) và độ hữu ích (utility), và nhược điểm chính khi áp dụng cho huấn luyện LLM là gì?', [
      'Tham số temperature; nhược điểm là làm mô hình chạy quá nhanh',
      'Tham số epsilon (ε); hạn chế được việc ghi nhớ dữ liệu cá nhân nhưng thường làm giảm chất lượng mô hình (reduces model quality)',
      'Tham số top-p; nhược điểm là làm mất khả năng mã hoá TLS',
      'Tham số max_tokens; không có nhược điểm nào'
    ], 1, 'Tham số epsilon (ε) điều khiển sự đánh đổi giữa privacy và utility; áp dụng cho LLM giúp hạn chế memorization nhưng thường làm giảm chất lượng mô hình.', {
      A: 'Temperature là tham số suy luận.',
      C: 'Top-p là tham số lấy mẫu.',
      D: 'Max_tokens giới hạn độ dài đầu ra.'
    }, 'm05-s03-p01'),
    mq('5.3', 'Federated Learning bảo vệ tính cục bộ và chủ quyền dữ liệu (data locality and sovereignty) bằng cơ chế nào?', [
      'Gửi toàn bộ dữ liệu thô chưa mã hoá về một máy chủ trung tâm',
      'Mỗi bên tham gia huấn luyện một mô hình cục bộ; dữ liệu thô không rời khỏi nguồn mà chỉ chia sẻ và tổng hợp các bản cập nhật mô hình (gradients)',
      'Xoá toàn bộ mô hình sau mỗi câu hỏi',
      'Chỉ huấn luyện trên dữ liệu công khai của Wikipedia'
    ], 1, 'Trong Federated Learning, dữ liệu thô không rời nguồn; mỗi bên train local model và chỉ chia sẻ model updates (gradients).', {
      A: 'Ngược hoàn toàn với nguyên lý của Federated Learning.',
      C: 'Không phải cơ chế huấn luyện.',
      D: 'Federated Learning dùng chính cho dữ liệu nhạy cảm phân tán tại các tổ chức.'
    }, 'm05-s03-p02'),
    mq('5.3', 'Vì sao Homomorphic Encryption (Mã hoá Đồng cấu) hiện chưa được triển khai rộng rãi cho quá trình suy luận LLM toàn phần?', [
      'Vì nó yêu cầu phải giải mã dữ liệu trước khi tính toán',
      'Vì chi phí tính toán hiện tại còn quá đắt đỏ, vượt ngưỡng khả thi thực tế (computationally prohibitive) cho suy luận LLM toàn phần',
      'Vì nó đã bị cấm bởi ISO/IEC 42001',
      'Vì nó chỉ hoạt động trên văn bản tiếng Pháp'
    ], 1, 'Homomorphic Encryption cho phép suy luận trên dữ liệu mã hoá nhưng hiện tại vẫn computationally prohibitive đối với full LLM inference.', {
      A: 'Bản chất của HE là tính toán KHÔNG cần giải mã.',
      C: 'Không hề bị cấm.',
      D: 'Không phụ thuộc ngôn ngữ.'
    }, 'm05-s03-p03'),
    fq('5.3', 'Compare Differential Privacy, Federated Learning, and Homomorphic Encryption in the context of LLM privacy.',
      [['differential privacy', 'noise', 'epsilon', 'memorization', 'quality'], ['federated learning', 'raw data', 'local', 'gradients', 'updates'], ['homomorphic encryption', 'encrypted data', 'computationally prohibitive']],
      'Differential privacy adds calibrated noise controlled by epsilon (ε) to limit memorization at the cost of reduced model quality; Federated learning trains local models so raw data never leaves its source and only gradients are shared; Homomorphic encryption runs inference directly on encrypted data but is currently computationally prohibitive for full LLMs.',
      'So sánh đủ 3 công nghệ PETs: DP (nhiễu toán học, tham số ε, giảm memorization nhưng giảm chất lượng), FL (dữ liệu thô không rời nguồn, chỉ chia sẻ gradients), HE (suy luận trên dữ liệu mã hoá nhưng quá đắt đỏ tính toán).', 'm05-s03-p01'),

    // 5.4
    mq('5.4', 'Trong kiến trúc bảo vệ quyền riêng tư cho ứng dụng LLM, các pipeline phân loại và che giấu PII (Redaction pipelines) bắt buộc phải chạy ở thời điểm nào?', [
      'Chỉ chạy sau khi LLM đã sinh xong câu trả lời',
      'Phải chạy TRƯỚC khi dữ liệu chạm tới LLM (before data reaches the LLM, not after)',
      'Chỉ chạy vào cuối mỗi tháng khi kết xuất báo cáo',
      'Không cần chạy nếu đã dùng HTTPS'
    ], 1, 'Handbook nhấn mạnh: Redaction pipelines must run before data reaches the LLM, not after.', {
      A: 'Chạy sau khi gọi LLM thì PII đã bị gửi lên mô hình/bên thứ ba rồi.',
      C: 'Quá muộn để ngăn dữ liệu đi vào context/mô hình.',
      D: 'HTTPS chỉ bảo vệ đường truyền, không ngăn LLM/nhà cung cấp nhận PII.'
    }, 'm05-ms04'),
    mq('5.4', 'Khi điều khoản của nhà cung cấp LLM ghi rằng các prompt của người dùng “may be used to improve our services”, điều đó có ý nghĩa bảo mật gì?', [
      'Chỉ dùng để kiểm tra tốc độ cáp quang',
      'Dữ liệu trong prompt của bạn có thể được đưa vào tập dữ liệu huấn luyện mô hình (may enter model training)',
      'Dữ liệu sẽ bị xoá ngay lập tức trong 1 mili-giây',
      'Mô hình sẽ tự động chạy cục bộ trên máy cá nhân'
    ], 1, 'Cụm từ “may be used to improve our services” đồng nghĩa với việc prompt của người dùng có thể được dùng để huấn luyện mô hình; cần thông báo rõ và cung cấp cơ chế opt-out.', {
      A: 'Không đúng.',
      C: 'Ngược lại, dữ liệu được giữ lại để huấn luyện.',
      D: 'Không liên quan.'
    }, 'm05-s04-p03'),
    mq('5.4', 'Ngay cả khi đã che mặt nạ (redact) tên và số định danh trong văn bản trước khi gửi cho LLM, rủi ro nào vẫn phải được đánh giá?', [
      'Re-identification risk — dữ liệu đã che vẫn có thể bị nhận diện lại danh tính thông qua ngữ cảnh xung quanh',
      'Rủi ro tràn bộ nhớ GPU',
      'Rủi ro lỗi phông chữ Unicode',
      'Rủi ro mất kết nối Bluetooth'
    ], 0, 'Re-identification risk must be assessed — even redacted data may be re-identifiable through context.', {
      B: 'Không phải rủi ro quyền riêng tư của redaction.',
      C: 'Không liên quan.',
      D: 'Không liên quan.'
    }, 'm05-s04-p02', true),
    mq('5.4', 'Giải pháp dữ liệu nào giữ nguyên các quy luật thống kê (statistical patterns) của dữ liệu thật nhưng không chứa thông tin cá nhân thực tế, rất hữu ích cho kiểm thử và fine-tuning?', [
      'Raw Production Dump',
      'Synthetic Data (Dữ liệu tổng hợp)',
      'Shadow AI Data',
      'Poisoned Data'
    ], 1, 'Synthetic Data bảo toàn quy luật thống kê của dữ liệu thật mà không chứa PII thực tế.', {
      A: 'Chứa nguyên vẹn PII thật, vi phạm quy định.',
      C: 'Shadow AI là rủi ro quản trị.',
      D: 'Poisoned data là dữ liệu bị đầu độc.'
    }, 'm05-s04-p04', true),
    mq('5.4', 'Thực hành nào sau đây thể hiện đúng nguyên tắc Tối thiểu hoá Dữ liệu (Data Minimization) cho ứng dụng LLM?', [
      'Đính kèm toàn bộ lịch sử chat 5 năm và mọi bảng cơ sở dữ liệu vào mỗi prompt',
      'Loại bỏ ngữ cảnh không cần thiết khỏi prompt, giảm thiểu thời gian lưu lịch sử hội thoại và tránh gửi dữ liệu nhạy cảm tới API bên thứ ba khi không cần thiết',
      'Lưu vĩnh viễn mọi prompt dưới dạng văn bản thuần',
      'Tắt toàn bộ cơ chế opt-out của người dùng'
    ], 1, 'Data minimization gồm: stripping unnecessary context from prompts, minimizing conversation history retention, và avoiding sending sensitive data to third-party APIs when not required.', {
      A: 'Vi phạm nghiêm trọng tối thiểu hoá dữ liệu.',
      C: 'Tăng rủi ro rò rỉ khi bị xâm nhập.',
      D: 'Vi phạm quản lý sự đồng ý (Consent Management).'
    }, 'm05-s04-p01', true),
    fq('5.4', 'Why must PII redaction happen before LLM processing, and what residual risk still exists after redaction?',
      [['before', 'prior', 'sent to the model', 'reaches the llm'], ['remove', 'mask', 'pii', 'sensitive'], ['re-identification', 're-identifiable', 'context']],
      'Redaction pipelines must remove or mask PII before data is sent to the LLM so sensitive information never enters the model or third-party systems; however, re-identification risk must still be assessed because redacted text may remain re-identifiable through surrounding context.',
      'Giải thích rõ: phải redact TRƯỚC khi gửi tới LLM để PII không lọt vào mô hình/bên thứ ba, và vẫn phải đánh giá rủi ro tái định danh (re-identification risk) qua ngữ cảnh.', 'm05-s04-p02'),
    fq('5.4', 'What does Data Minimization mean in LLM applications, and how does Synthetic Data help?',
      [['minimum data', 'unnecessary context', 'strip'], ['conversation history', 'retention', 'third-party'], ['synthetic data', 'statistical patterns', 'without', 'personal information', 'fine-tuning', 'testing']],
      'Data minimization means stripping unnecessary context from prompts, minimizing conversation history retention, and avoiding sending sensitive data to third-party APIs when not needed. Synthetic data preserves statistical patterns of real data without actual personal information, enabling safe testing, development, and fine-tuning.',
      'Nêu 3 ý của Data Minimization (bỏ ngữ cảnh thừa, giảm lưu lịch sử, tránh gửi dữ liệu nhạy cảm ra API ngoài) và vai trò của Synthetic Data (giữ quy luật thống kê, không chứa PII thật, dùng cho test/fine-tune).', 'm05-s04-p01', true)
  ];

  window.CLLMSP.register({ n: 5, handbook, sections, questions });
})();
