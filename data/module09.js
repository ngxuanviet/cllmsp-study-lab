/* ===== Module 09 — Identity, Access, Memory & Advanced Topics (Domain 9, 7.5%) =====
 * 100% nội dung gốc từ Handbook (Trang 23–25) + Giải thích chuyên sâu + Ví dụ & Code thực tế + Labs + 22 câu hỏi.
 */
(() => {
  const { P, H } = window.CLLMSP;
  let nq = 0;
  const mq = (sec, q, options, answer, exp, why, ref, examOnly) => ({ id: 'm09-q' + (++nq), sec, type: 'mcq', q, options, answer, exp, why, ref, examOnly });
  const fq = (sec, q, cl, model, exp, ref, examOnly) => ({ id: 'm09-q' + (++nq), sec, type: 'free', q, clusters: cl.map(c => ({ name: c[0], terms: c.slice(1) })), model, exp, ref, examOnly });

  const handbook = [
    P('m09-intro', 23, 'This final module covers the [[crosscut|cross-cutting concerns]] that tie together all previous domains: [[iamllm|identity and access management for LLM platforms]], [[vecdbsec|vector database security]], [[ctxinteg|context window integrity]], and [[iraisec|incident response for AI-specific security events]].',
      'Module cuối cùng này bao quát [[crosscut|các vấn đề xuyên suốt (cross-cutting concerns)]] gắn kết toàn bộ các miền kiến thức trước đó: [[iamllm|quản lý định danh và truy cập cho nền tảng LLM]], [[vecdbsec|bảo mật cơ sở dữ liệu vector]], [[ctxinteg|tính toàn vẹn của cửa sổ ngữ cảnh]], và [[iraisec|ứng phó sự cố cho các sự kiện bảo mật đặc thù của AI]].'),
    P('m09-lo01', 23, 'Design [[accessarch|access control architectures (RBAC, ABAC, Zero Trust)]] for LLM platforms.', 'Thiết kế [[accessarch|kiến trúc kiểm soát truy cập (RBAC, ABAC, Zero Trust)]] cho các nền tảng LLM.'),
    P('m09-lo02', 23, 'Secure [[vecdbs|vector databases]] and defend against [[embattacks|embedding attacks]].', 'Bảo mật [[vecdbs|cơ sở dữ liệu vector]] và phòng chống [[embattacks|các đòn tấn công nhúng (embedding attacks)]].'),
    P('m09-lo03', 23, 'Protect [[ctxinteg|context window integrity]] across [[multiturn|multi-turn conversations]].', 'Bảo vệ [[ctxinteg|tính toàn vẹn của cửa sổ ngữ cảnh]] xuyên suốt [[multiturn|các cuộc hội thoại đa lượt (multi-turn)]].'),
    P('m09-lo04', 23, 'Execute [[irproc|incident response procedures]] for [[aisec|AI security events]].', 'Thực thi [[irproc|quy trình ứng phó sự cố]] cho [[aisec|các sự kiện bảo mật AI]].'),

    H('m09-s01-h', 23, '9.1  RBAC, ABAC & Zero Trust for LLM Platforms', '9.1  RBAC, ABAC & Zero Trust cho Nền tảng LLM'),
    P('m09-s01-p01', 23, '[[rbac|RBAC (Role-Based Access Control)]]: Enforces permissions based on [[userroles|user roles assigned within an organization]]. Suitable for [[straightaccess|straightforward access patterns]] — administrators, editors, viewers. For LLM platforms, roles determine [[whichmtd|which models, tools, and data sources a user can access]].',
      '[[rbac|RBAC (Role-Based Access Control — Kiểm soát truy cập dựa trên vai trò)]]: Thực thi quyền hạn dựa trên [[userroles|vai trò của người dùng được gán trong tổ chức]]. Phù hợp với [[straightaccess|các mẫu truy cập đơn giản, trực tiếp]] — quản trị viên (administrators), biên tập viên (editors), người xem (viewers). Trên nền tảng LLM, vai trò quyết định [[whichmtd|những mô hình, công cụ và nguồn dữ liệu nào mà người dùng được phép truy cập]].'),
    P('m09-s01-p02', 23, '[[abac|ABAC (Attribute-Based Access Control)]]: [[prefoverrbac|Preferred over RBAC for multi-tenant LLM platforms]] because it can enforce policies based on [[userattr|user attributes (department, clearance level)]], [[resprop|resource properties (data classification, sensitivity)]], and [[envcond|environmental conditions (time, location, device)]]. This enables [[finegraintenant|fine-grained tenant isolation]] that RBAC [[cannoteff|cannot efficiently express]].',
      '[[abac|ABAC (Attribute-Based Access Control — Kiểm soát truy cập dựa trên thuộc tính)]]: [[prefoverrbac|Được ưu tiên hơn RBAC đối với các nền tảng LLM đa khách hàng (multi-tenant)]] vì nó có thể thực thi chính sách dựa trên [[userattr|thuộc tính người dùng (phòng ban, mức độ thẩm tra an ninh — clearance level)]], [[resprop|thuộc tính tài nguyên (phân loại dữ liệu, độ nhạy cảm)]], và [[envcond|điều kiện môi trường (thời gian, vị trí, thiết bị)]]. Nhờ đó ABAC mang lại [[finegraintenant|khả năng cô lập tenant tinh vi (fine-grained tenant isolation)]] mà RBAC [[cannoteff|không thể biểu đạt một cách hiệu quả]].'),
    P('m09-s01-p03', 23, '[[zerotrust|Zero Trust]]: Applied to LLM systems, Zero Trust requires [[contverif|continuous verification of every request]], [[regardnet|regardless of network location]], with [[leastpriv|least-privilege access enforcement]]. [[noimptrust|No implicit trust for internal requests]]. Every [[everycall|API call, tool invocation, and data access]] must be [[authindiv|authenticated and authorized individually]].',
      '[[zerotrust|Zero Trust (Không tin cậy mặc định)]]: Khi áp dụng vào hệ thống LLM, Zero Trust đòi hỏi [[contverif|xác minh liên tục đối với mọi yêu cầu]], [[regardnet|bất kể vị trí mạng]], đi kèm [[leastpriv|thực thi truy cập theo đặc quyền tối thiểu]]. [[noimptrust|Không có sự tin cậy ngầm nào dành cho các yêu cầu nội bộ]]. Mọi [[everycall|lệnh gọi API, lần gọi công cụ và truy cập dữ liệu]] đều phải được [[authindiv|xác thực và uỷ quyền riêng biệt từng cái một]].'),
    P('m09-s01-p04', 23, '[[credrot|Credential Rotation]]: [[apikeystokens|API keys and access tokens]] must be [[periodrot|periodically rotated on a schedule]]. [[autorot|Automated rotation]] reduces the [[winexp|window of exposure]] if a credential is compromised. [[mcpoauth|MCP servers using OAuth]] should implement [[reftokrot|refresh token rotation]].',
      '[[credrot|Xoay vòng Thông tin xác thực (Credential Rotation)]]: [[apikeystokens|Các API key và access token]] phải được [[periodrot|xoay vòng định kỳ theo lịch trình]]. [[autorot|Xoay vòng tự động]] giúp thu hẹp [[winexp|cửa sổ phơi nhiễm (window of exposure)]] nếu thông tin xác thực bị lộ. [[mcpoauth|Các máy chủ MCP sử dụng OAuth]] phải triển khai [[reftokrot|xoay vòng refresh token (refresh token rotation)]].'),
    P('m09-s01-p05', 23, '[[agentcaptok|Agent Capability Tokens]]: Tokens granting agents access to [[toolsres|tools and resources]] should be [[scopedact|scoped to specific actions]], [[timelim|time-limited]], and [[nontransf|non-transferable between agents]]. A token that grants \'[[read15m|read customer data for the next 15 minutes]]\' is far safer than a permanent \'[[fulldb|full database access]]\' credential.',
      '[[agentcaptok|Token Năng lực của Agent (Agent Capability Tokens)]]: Các token cấp quyền cho agent truy cập [[toolsres|công cụ và tài nguyên]] phải được [[scopedact|giới hạn phạm vi vào đúng các hành động cụ thể]], [[timelim|có giới hạn thời gian (time-limited)]], và [[nontransf|không thể chuyển nhượng giữa các agent (non-transferable)]]. Một token chỉ cấp quyền \'[[read15m|đọc dữ liệu khách hàng trong 15 phút tới]]\' an toàn hơn rất nhiều so với một thông tin xác thực \'[[fulldb|toàn quyền truy cập cơ sở dữ liệu]]\' vĩnh viễn.'),

    H('m09-s02-h', 23, '9.2  Vector Database Security & Embedding Attacks', '9.2  Bảo mật Cơ sở dữ liệu Vector & Tấn công Embedding'),
    P('m09-s02-p01', 23, '[[ragsecarch|RAG Security Architecture]]: [[rag|Retrieval-Augmented Generation (RAG)]] augments LLM responses with [[reldocs|relevant documents from an external knowledge base]]. The [[vecdb|vector database]] storing [[docemb|document embeddings]] is a [[critseccomp|critical security component]].',
      '[[ragsecarch|Kiến trúc Bảo mật RAG]]: [[rag|Retrieval-Augmented Generation (RAG)]] bổ sung cho phản hồi của LLM [[reldocs|các tài liệu liên quan từ kho tri thức bên ngoài]]. [[vecdb|Cơ sở dữ liệu vector (vector database)]] nơi lưu trữ [[docemb|các vector nhúng của tài liệu (document embeddings)]] là một [[critseccomp|thành phần bảo mật trọng yếu]].'),
    P('m09-s02-p02', 23, '[[vecdbthreats|Vector Database Threats]]: [[comppoisonemb|Compromised or poisoned embeddings]] can [[maniprag|manipulate RAG retrieval results]], leading to [[incmalresp|incorrect or malicious responses being injected into the LLM\'s context]]. An attacker who can [[modemb|modify embeddings]] [[ctrlwhatllmsees|controls what information the LLM sees]].',
      '[[vecdbthreats|Các Mối đe doạ với Cơ sở dữ liệu Vector]]: [[comppoisonemb|Các vector nhúng bị xâm phạm hoặc bị đầu độc]] có thể [[maniprag|thao túng kết quả truy xuất RAG]], dẫn tới việc [[incmalresp|các phản hồi sai lệch hoặc độc hại bị tiêm vào ngữ cảnh của LLM]]. Kẻ tấn công nào có thể [[modemb|sửa đổi các embeddings]] sẽ [[ctrlwhatllmsees|kiểm soát được thông tin mà LLM nhìn thấy]].'),
    P('m09-s02-p03', 23, '[[embinv|Embedding Inversion Attacks]]: Can [[partrecon|partially reconstruct the original text from vector embeddings]]. This means that even if the [[origdocs|original documents are access-controlled]], the [[embinvecdb|embeddings in the vector database may leak sensitive information]]. [[vecdbsame|Vector databases need the same security controls as the documents they represent]].',
      '[[embinv|Tấn công Đảo ngược Embedding (Embedding Inversion Attacks)]]: Có thể [[partrecon|tái tạo lại một phần văn bản gốc từ các vector nhúng]]. Điều này có nghĩa là ngay cả khi [[origdocs|tài liệu gốc đã được kiểm soát truy cập chặt]], [[embinvecdb|các vector nhúng trong cơ sở dữ liệu vector vẫn có thể làm rò rỉ thông tin nhạy cảm]]. Do đó, [[vecdbsame|cơ sở dữ liệu vector cần áp dụng cùng mức kiểm soát bảo mật như chính các tài liệu gốc mà chúng đại diện]].'),
    P('m09-s02-p04', 23, '[[ragacl|Access Controls in RAG]]: [[doclevelacl|Document-level access controls]] must be [[enfretlayer|enforced in the retrieval layer]]. When a user queries the system, the [[retcomp|retrieval component]] should [[onlyretauth|only return documents that user is authorized to access]]. This prevents [[privescrag|privilege escalation through the RAG pipeline]].',
      '[[ragacl|Kiểm soát Truy cập trong RAG]]: [[doclevelacl|Kiểm soát truy cập ở cấp độ từng tài liệu (document-level access controls)]] bắt buộc phải được [[enfretlayer|thực thi ngay tại tầng truy xuất (retrieval layer)]]. Khi người dùng gửi truy vấn, [[retcomp|thành phần truy xuất]] chỉ được phép [[onlyretauth|trả về những tài liệu mà người dùng đó có quyền truy cập]]. Cơ chế này ngăn chặn [[privescrag|leo thang đặc quyền thông qua đường ống RAG]].'),

    H('m09-s03-h', 24, '9.3  Context Window Security & Memory Persistence', '9.3  Bảo mật Cửa sổ Ngữ cảnh & Bộ nhớ Lưu trữ Lâu dài'),
    P('m09-s03-p01', 24, '[[ctxpoison|Context Window Poisoning]]: In [[multiturn|multi-turn conversations]], [[malinjearly|malicious content injected in earlier turns]] influences the [[modelbehsub|model\'s behavior in subsequent turns]]. The model [[cannotdist|cannot distinguish between legitimate conversation history and injected instructions from previous turns]].',
      '[[ctxpoison|Đầu độc Cửa sổ Ngữ cảnh (Context Window Poisoning)]]: Trong [[multiturn|các cuộc hội thoại đa lượt]], [[malinjearly|nội dung độc hại được tiêm vào ở các lượt hội thoại trước]] sẽ chi phối [[modelbehsub|hành vi của mô hình ở các lượt kế tiếp]]. Mô hình [[cannotdist|không thể phân biệt giữa lịch sử hội thoại hợp lệ và các chỉ dẫn bị tiêm nhiễm từ những lượt trước đó]].'),
    P('m09-s03-p02', 24, '[[ctxdef|Defenses]]: [[periodsum|Periodic context summarization with integrity checks]], [[reinjsys|re-injection of system instructions at regular intervals]], and [[anomdetctx|anomaly detection on context content]]. For [[highsecapps|high-security applications]], consider [[limconvlen|limiting conversation length]] and [[startfresh|starting fresh contexts more frequently]].',
      '[[ctxdef|Các biện pháp phòng thủ]]: [[periodsum|Tóm tắt ngữ cảnh định kỳ kèm kiểm tra tính toàn vẹn]], [[reinjsys|tái tiêm (re-injection) các chỉ dẫn hệ thống (system instructions) theo chu kỳ đều đặn]], và [[anomdetctx|phát hiện bất thường trên nội dung ngữ cảnh]]. Đối với [[highsecapps|các ứng dụng yêu cầu bảo mật cao]], hãy cân nhắc [[limconvlen|giới hạn độ dài cuộc hội thoại]] và [[startfresh|khởi tạo mới ngữ cảnh thường xuyên hơn]].'),
    P('m09-s03-p03', 24, '[[mempersistsec|Memory Persistence Security]]: [[convmem|Conversation memories that persist across sessions]] must be [[encrest|encrypted at rest]], [[accessctrl|access-controlled per user/session]], [[integval|integrity-validated]], and [[periodrev|periodically reviewed for poisoned entries]]. A [[poisonmeminf|poisoned memory can influence the agent\'s behavior indefinitely]].',
      '[[mempersistsec|Bảo mật Bộ nhớ Lưu trữ Xuyên phiên (Memory Persistence Security)]]: [[convmem|Bộ nhớ hội thoại được lưu giữ qua nhiều phiên]] bắt buộc phải được [[encrest|mã hoá khi lưu trữ (encrypted at rest)]], [[accessctrl|kiểm soát truy cập theo từng người dùng/phiên]], [[integval|xác thực tính toàn vẹn]], và [[periodrev|rà soát định kỳ để lọc các mục bị đầu độc]]. Một [[poisonmeminf|bộ nhớ bị đầu độc có thể thao túng hành vi của agent vô thời hạn (indefinitely)]].'),

    H('m09-s04-h', 24, '9.4  Incident Response for AI Systems', '9.4  Ứng phó Sự cố (Incident Response) cho Hệ thống AI'),
    P('m09-s04-p01', 24, '[[irllm|Incident response for LLM security events]] requires [[addproc|additional procedures beyond traditional IR]]:',
      '[[irllm|Ứng phó sự cố cho các sự kiện bảo mật LLM]] đòi hỏi [[addproc|các quy trình bổ sung vượt ra ngoài IR truyền thống]]:'),
    P('m09-s04-p02', 24, '[[aispecir|AI-Specific IR Steps]]: [[modelforensics|Model output forensics]] (analyzing what the model produced and why), [[promptanal|prompt analysis]] (examining the inputs that triggered the incident), [[guardeffrev|guardrail effectiveness review]] (determining which controls failed), and [[downimpact|assessment of downstream impact from compromised outputs]].',
      '[[aispecir|Các bước Ứng phó Sự cố Đặc thù cho AI]]: [[modelforensics|Điều tra số đầu ra mô hình (Model output forensics)]] (phân tích mô hình đã sinh ra gì và tại sao), [[promptanal|phân tích prompt (prompt analysis)]] (kiểm tra các đầu vào đã kích hoạt sự cố), [[guardeffrev|đánh giá hiệu quả guardrail]] (xác định những chốt kiểm soát nào đã thất bại), và [[downimpact|đánh giá tác động hạ nguồn (downstream impact) từ các đầu ra bị xâm phạm]].'),
    P('m09-s04-p03', 24, '[[breakglass|Break-Glass Procedures]]: [[emergdisable|Emergency model disabling]], [[outquar|output quarantine]], [[trafficreroute|traffic rerouting to fallback systems]], and [[postirforensic|post-incident forensic capabilities]] with [[propauth|proper authorization requirements]]. Break-glass actions should require [[docapproval|documented approval]] and trigger [[immnotif|immediate notification to security leadership]].',
      '[[breakglass|Quy trình Khẩn cấp "Đập kính" (Break-Glass Procedures)]]: Bao gồm [[emergdisable|vô hiệu hoá mô hình khẩn cấp]], [[outquar|cách ly đầu ra (output quarantine)]], [[trafficreroute|chuyển hướng lưu lượng sang hệ thống dự phòng (fallback systems)]], và [[postirforensic|năng lực điều tra số sau sự cố]] đi kèm [[propauth|yêu cầu uỷ quyền chặt chẽ]]. Các hành động break-glass phải yêu cầu [[docapproval|phê duyệt có ghi nhận văn bản]] và kích hoạt [[immnotif|thông báo tức thì cho lãnh đạo bảo mật]].'),
    P('m09-s04-p04', 24, '[[behbasemon|Behavioral Baseline Monitoring]]: Establish [[normpatterns|normal patterns]] for [[outdist|output distributions]], [[toolusage|tool usage]], [[tokcons|token consumption]], and [[refrates|refusal rates]]. Alert on [[sigdev|significant deviations]]. A [[changerefrate|sudden change in refusal rate]] may indicate a [[succjb|successful jailbreak]]; a [[spiketool|spike in tool invocations]] may indicate [[agentmanip|agent manipulation]].',
      '[[behbasemon|Giám sát Đường cơ sở Hành vi (Behavioral Baseline Monitoring)]]: Thiết lập [[normpatterns|các mẫu chuẩn bình thường]] cho [[outdist|phân phối đầu ra]], [[toolusage|mức sử dụng công cụ]], [[tokcons|lượng tiêu thụ token]], và [[refrates|tỷ lệ từ chối (refusal rates)]]. Cảnh báo khi có [[sigdev|độ lệch đáng kể]]. Một [[changerefrate|sự thay đổi đột ngột về tỷ lệ từ chối]] có thể báo hiệu một [[succjb|đòn jailbreak thành công]]; còn [[spiketool|đợt tăng vọt các lần gọi công cụ]] có thể báo hiệu [[agentmanip|agent đang bị thao túng]].'),
    P('m09-s04-p05', 24, '[[servicemesh|Service Mesh for LLM Microservices]]: Provides [[mtls|mutual TLS between services]], [[trafficmgmt|traffic management]], [[observability|observability]], and [[polenf|policy enforcement]] [[withoutcodechg|without application code changes]]. Particularly valuable for [[complexllm|complex LLM deployments with multiple microservices]].',
      '[[servicemesh|Service Mesh cho các Vi dịch vụ LLM]]: Cung cấp [[mtls|mutual TLS (mTLS) giữa các dịch vụ]], [[trafficmgmt|quản lý lưu lượng]], [[observability|khả năng quan sát]], và [[polenf|thực thi chính sách]] [[withoutcodechg|mà không cần sửa đổi mã nguồn ứng dụng]]. Đặc biệt giá trị đối với [[complexllm|các triển khai LLM phức tạp gồm nhiều microservices]].'),
    P('m09-s04-kc01', 24, 'KEY CONCEPT — [[didorder|DEFENSE IN DEPTH ORDER]]: When securing an LLM application end-to-end, the [[correctorder|correct order of defensive layers from outermost to innermost]] is: 1. [[l1net|Network Security — firewalls, WAF, DDoS protection]] 2. [[l2auth|Authentication & Authorization — identity verification, RBAC/ABAC]] 3. [[l3in|Input Guardrails — prompt injection detection, content filtering]] 4. [[l4model|Model Behavior Constraints — system prompts, safety training]] 5. [[l5out|Output Validation — sanitization, format enforcement, sensitive data filtering]] 6. [[l6mon|Monitoring & Observability — behavioral baselines, anomaly detection, audit logging]]',
      'KHÁI NIỆM CỐT LÕI — [[didorder|THỨ TỰ PHÒNG THỦ CHIỀU SÂU (DEFENSE IN DEPTH ORDER)]]: Khi bảo mật đầu-cuối cho một ứng dụng LLM, [[correctorder|thứ tự chuẩn xác của các lớp phòng thủ từ ngoài cùng (outermost) vào trong cùng (innermost)]] là: 1. [[l1net|Network Security (Bảo mật mạng) — tường lửa, WAF, chống DDoS]] 2. [[l2auth|Authentication & Authorization (Xác thực & Uỷ quyền) — xác minh danh tính, RBAC/ABAC]] 3. [[l3in|Input Guardrails (Chốt chặn đầu vào) — phát hiện prompt injection, lọc nội dung]] 4. [[l4model|Model Behavior Constraints (Ràng buộc hành vi mô hình) — system prompts, huấn luyện an toàn]] 5. [[l5out|Output Validation (Kiểm tra đầu ra) — làm sạch, ép khuôn định dạng, lọc dữ liệu nhạy cảm]] 6. [[l6mon|Monitoring & Observability (Giám sát & Quan sát) — đường cơ sở hành vi, phát hiện bất thường, ghi nhật ký kiểm toán]]'),

    P('m09-ms01', 24, '[[abac|ABAC]] provides [[finegraintenant|finer-grained access control than RBAC]] for [[multitenant|multi-tenant LLM platforms]].',
      '[[abac|ABAC]] cung cấp [[finegraintenant|kiểm soát truy cập tinh vi hơn RBAC]] cho [[multitenant|các nền tảng LLM đa khách hàng (multi-tenant)]].'),
    P('m09-ms02', 24, '[[zerotrust|Zero Trust]]: [[contverif|verify every request]], [[regardnet|regardless of network location]].',
      '[[zerotrust|Zero Trust]]: [[contverif|xác minh mọi yêu cầu]], [[regardnet|bất kể vị trí mạng]].'),
    P('m09-ms03', 24, '[[vecdb|Vector databases]] need the [[vecdbsame|same security controls as the documents they represent]].',
      '[[vecdb|Cơ sở dữ liệu vector]] cần áp dụng [[vecdbsame|cùng mức kiểm soát bảo mật như chính các tài liệu mà chúng đại diện]].'),
    P('m09-ms04', 24, '[[ctxpoison|Context window poisoning]] is a [[multiturn|multi-turn attack]] — [[reinjsys|re-inject system instructions periodically]].',
      '[[ctxpoison|Đầu độc cửa sổ ngữ cảnh]] là [[multiturn|đòn tấn công đa lượt]] — phải [[reinjsys|tái tiêm các chỉ dẫn hệ thống theo định kỳ]].'),
    P('m09-ms05', 24, '[[irllm|AI incident response]] adds [[modelforensics|model forensics]], [[promptanal|prompt analysis]], and [[guardeffrev|guardrail effectiveness review]].',
      '[[irllm|Ứng phó sự cố AI]] bổ sung thêm [[modelforensics|điều tra số mô hình (model forensics)]], [[promptanal|phân tích prompt]], và [[guardeffrev|đánh giá hiệu quả guardrail]].'),

    H('m09-s04-ref-h', 25, 'References & Further Reading (Page 25)', 'Tài liệu Tham khảo & Đọc thêm (Trang 25)'),
    P('m09-s04-p06', 25, 'Frameworks & Standards: [[owasp10|OWASP Top 10 for LLM Applications]] — owasp.org/www-project-top-10-for-large-language-model-applications · [[nistrmf|NIST AI Risk Management Framework (AI RMF 1.0)]] — nist.gov/artificial-intelligence · [[iso42001|ISO/IEC 42001:2023 — Artificial Intelligence Management System]] · [[euaiact|EU AI Act — Official Journal of the European Union, 2024]] · [[atlas|MITRE ATLAS — Adversarial Threat Landscape for AI Systems]] — atlas.mitre.org',
      'Khung & Tiêu chuẩn: [[owasp10|OWASP Top 10 cho Ứng dụng LLM]] · [[nistrmf|NIST AI Risk Management Framework (AI RMF 1.0)]] · [[iso42001|ISO/IEC 42001:2023 — Hệ thống Quản lý Trí tuệ Nhân tạo]] · [[euaiact|Đạo luật AI của Liên minh Châu Âu (EU AI Act, 2024)]] · [[atlas|MITRE ATLAS — Khung Mối đe doạ Đối kháng cho Hệ thống AI]].'),
    P('m09-s04-p07', 25, 'Model Context Protocol & Research Papers: [[mcpspec|MCP Specification]] (modelcontextprotocol.io/specification) · Vaswani et al., \'[[attn|Attention Is All You Need]]\' (NeurIPS 2017) · Bai et al., \'[[cai|Constitutional AI: Harmlessness from AI Feedback]]\' (Anthropic, 2022) · Perez & Ribeiro, \'[[hackaprompt|Ignore This Title and HackAPrompt]]\' (2023) · Zou et al., \'[[gcg|Universal and Transferable Adversarial Attacks on Aligned Language Models]]\' (2023) · Anil et al., \'[[manyshot|Many-shot Jailbreaking]]\' (Anthropic, 2024) · Greshake et al., \'[[indrag|Not What You\'ve Signed Up For: Compromising RAG]]\' (2023) · Mitchell et al., \'[[modelcards|Model Cards for Model Reporting]]\' (FAT* 2019) · Carlini et al., \'[[carlini|Extracting Training Data from Large Language Models]]\' (USENIX 2021).',
      'Giao thức MCP & Các Bài báo Nghiên cứu Nền tảng: [[mcpspec|Đặc tả MCP]] · Vaswani et al., \'[[attn|Attention Is All You Need]]\' (2017) · Bai et al., \'[[cai|Constitutional AI]]\' (2022) · Perez & Ribeiro, \'[[hackaprompt|HackAPrompt]]\' (2023) · Zou et al., \'[[gcg|Adversarial Suffixes / GCG]]\' (2023) · Anil et al., \'[[manyshot|Many-shot Jailbreaking]]\' (2024) · Greshake et al., \'[[indrag|Indirect Prompt Injection qua RAG]]\' (2023) · Mitchell et al., \'[[modelcards|Model Cards]]\' (2019) · Carlini et al., \'[[carlini|Trích xuất Dữ liệu Huấn luyện từ LLM]]\' (2021).'),
    P('m09-s04-p08', 25, 'Tools, Platforms & Privacy Regulations: [[ollama|Ollama]] (Local LLM runtime) · [[langchain|LangChain / LangGraph]] (LLM orchestration frameworks) · [[garak|Garak]] (LLM vulnerability scanner) · [[promptfoo|Promptfoo]] (LLM testing and red teaming) · [[rebuff|Rebuff]] (Prompt injection detection) · [[gdpr|GDPR]] (EU 2016/679) · [[ccpa|CCPA]] (2018) · [[hipaa|HIPAA]] (1996) · [[pcidss|PCI DSS v4.0]].',
      'Công cụ, Nền tảng & Quy định Quyền riêng tư: [[ollama|Ollama]] (chạy LLM cục bộ) · [[langchain|LangChain / LangGraph]] (khung điều phối LLM) · [[garak|Garak]] (máy quét lỗ hổng LLM) · [[promptfoo|Promptfoo]] (kiểm thử & red teaming LLM) · [[rebuff|Rebuff]] (phát hiện prompt injection) · [[gdpr|GDPR]] · [[ccpa|CCPA]] · [[hipaa|HIPAA]] · [[pcidss|PCI DSS v4.0]].')
  ];

  const sections = {};

  sections['9.1'] = {
    title: 'Kiểm soát Truy cập cho Nền tảng LLM: RBAC vs ABAC · Zero Trust · Credential Rotation · Agent Capability Tokens',
    concept: [
      { t: 'p', x: 'Mục 9.1 tổng hợp kiến trúc Định danh và Kiểm soát Truy cập (IAM) cho nền tảng LLM doanh nghiệp và đa khách hàng (Multi-tenant):' },
      { t: 'ul', items: [
        '**1. RBAC (Role-Based Access Control):** Gán quyền theo vai trò tĩnh (`admin`, `editor`, `viewer`), phù hợp cho các mẫu truy cập đơn giản để quyết định user được dùng model, tool hay nguồn dữ liệu nào. {{ref:m09-s01-p01}}',
        '**2. ABAC (Attribute-Based Access Control — Ưu tiên cho Multi-Tenant LLM):** Được **ưu tiên hơn RBAC trên các nền tảng LLM đa khách hàng** vì đánh giá đồng thời 3 nhóm thuộc tính: (a) **User attributes** (phòng ban, mức clearance), (b) **Resource properties** (mức phân loại dữ liệu, độ nhạy cảm, `tenant_id`), và (c) **Environmental conditions** (thời gian, vị trí địa lý, thiết bị). Giúp **cô lập tenant tinh vi (fine-grained tenant isolation)** mà RBAC không thể biểu đạt hiệu quả. {{ref:m09-s01-p02}} {{ref:m09-ms01}}',
        '**3. Zero Trust:** **Xác minh liên tục mọi yêu cầu bất kể vị trí mạng (`regardless of network location`)** kèm đặc quyền tối thiểu. Không có niềm tin ngầm cho mạng nội bộ — mọi lệnh gọi API, gọi tool và truy cập dữ liệu đều phải được xác thực và uỷ quyền riêng lẻ. {{ref:m09-s01-p03}} {{ref:m09-ms02}}',
        '**4. Credential Rotation:** Xoay vòng tự động theo lịch trình cho API keys và access tokens để giảm **cửa sổ phơi nhiễm (window of exposure)**; các MCP server dùng OAuth phải bật **refresh token rotation**. {{ref:m09-s01-p04}}',
        '**5. Agent Capability Tokens:** Token cấp cho agent phải thoả 3 tính chất: **giới hạn vào đúng hành động cụ thể (`scoped to specific actions`)**, **có thời hạn ngắn (`time-limited`, ví dụ 15 phút)**, và **không thể chuyển nhượng giữa các agent (`non-transferable`)**. {{ref:m09-s01-p05}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Chính sách ABAC + Scoped Agent Capability Token (JWT) không thể chuyển nhượng', tone: 'good', lang: 'json', code: '{\n  "iss": "https://iam.llm-platform.corp",\n  "sub": "agent:billing-assistant-v2",\n  "cnf": { "jkt": "sha256-pop-key-bound-to-billing-agent" },\n  "exp": 1735689900,\n  "ttl_minutes": 15,\n  "transferable": false,\n  "abac_context": {\n    "user_department": "finance",\n    "user_clearance": "confidential",\n    "tenant_id": "tenant-acme-01",\n    "allowed_actions": ["orders:read"],\n    "max_data_classification": "confidential"\n  }\n}' }
    ],
    labs: [
      { type: 'abac', title: 'Bộ Đánh giá Chính sách RBAC vs ABAC & Zero Trust trên Nền tảng Multi-Tenant LLM', intro: 'Thay đổi vai trò, Tenant, mức Clearance, vị trí mạng và thời hạn Agent Capability Token để thấy rõ vì sao RBAC làm lộ dữ liệu chéo giữa các Tenant trong khi ABAC + Zero Trust chặn đứng (Mục 9.1).' }
    ]
  };

  sections['9.2'] = {
    title: 'Bảo mật Cơ sở dữ liệu Vector & RAG: Poisoned Embeddings · Embedding Inversion · Document-Level ACL',
    concept: [
      { t: 'p', x: 'Trong kiến trúc **RAG (Retrieval-Augmented Generation)**, cơ sở dữ liệu vector (Vector Database) lưu trữ các bản nhúng tài liệu (document embeddings) chính là thành phần bảo mật trọng yếu vì **ai kiểm soát được embeddings sẽ kiểm soát được những gì LLM nhìn thấy (`controls what information the LLM sees`)**! {{ref:m09-s02-p01}} {{ref:m09-s02-p02}}' },
      { t: 'h', x: '3 Trọng tâm Bảo mật Vector DB & RAG cần nhớ để đi thi' },
      { t: 'ul', items: [
        '**1. Vector Database Threats (Đầu độc Embedding):** Nếu kẻ tấn công sửa đổi hoặc chèn embeddings bị đầu độc vào Vector DB, chúng sẽ thao túng kết quả truy xuất tương đồng (similarity search), tiêm thông tin sai lệch hoặc lệnh độc hại thẳng vào ngữ cảnh của LLM. {{ref:m09-s02-p02}}',
        '**2. Embedding Inversion Attacks (Đảo ngược Vector về Văn bản gốc):** Nhiều kỹ sư lầm tưởng vector số thực `[0.021, -0.114, ...]` là "đã mã hoá một chiều". Thực tế, **tấn công Embedding Inversion có thể tái tạo lại một phần văn bản gốc từ các vector nhúng (`partially reconstruct the original text`)**! Do đó Handbook khẳng định quy tắc vàng: **Cơ sở dữ liệu vector bắt buộc phải có CÙNG mức kiểm soát bảo mật như chính các tài liệu gốc mà chúng đại diện (`the same security controls as the documents they represent`)**. {{ref:m09-s02-p03}} {{ref:m09-ms03}}',
        '**3. Access Controls in RAG (Kiểm soát truy cập tại tầng Retrieval):** Phải thực thi **kiểm soát truy cập cấp độ từng tài liệu ngay tại tầng truy xuất (`enforced in the retrieval layer`)**. Khi người dùng đặt câu hỏi, bộ truy xuất chỉ được phép trả về các đoạn tài liệu mà người dùng đó có quyền xem — tuyệt đối không lấy tất cả tài liệu đưa vào LLM rồi mới dặn LLM "đừng tiết lộ"! {{ref:m09-s02-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Truy xuất RAG an toàn: Thực thi Document-Level ACL + Tenant Filter ngay tại tầng Vector Query', tone: 'good', lang: 'python', code: 'def secure_rag_retrieve(query_text: str, user_ctx: dict):\n    q_vec = embed_model.encode(query_text)\n    # ✔ Thực thi Document-level ACL ngay trong bộ lọc truy vấn của Vector DB (pre-filtering)\n    results = vector_db.query(\n        vector=q_vec,\n        top_k=5,\n        filter={\n            "$and": [\n                {"tenant_id": {"$eq": user_ctx["tenant_id"]}},\n                {"allowed_groups": {"$in": user_ctx["groups"]}},\n                {"classification_rank": {"$lte": user_ctx["clearance_rank"]}}\n            ]\n        }\n    )\n    return [ verify_chunk_hmac(doc) for doc in results ]' }
    ],
    labs: [
      { type: 'killchain', title: 'Kill-Chain: Tấn công Đường ống RAG (Embedding Poisoning + Embedding Inversion + RAG Privilege Escalation)', intro: 'Chạy từng bước tấn công vào Vector Database và bật các chốt chặn bảo mật RAG theo Mục 9.2.',
        defenses: [
          { id: 'ingest', label: 'Xác thực toàn vẹn & quyền ghi khi nạp Embedding (Ingestion Integrity)', desc: 'Chặn chèn/sửa vector trái phép trong Vector DB' },
          { id: 'vecdbsec', label: 'Bảo vệ Vector DB ngang bằng kho Tài liệu gốc (Encryption + IAM)', desc: 'Mã hoá vector, kiểm soát truy cập chặt để chống lấy cắp vector đem đi đảo ngược (Inversion)' },
          { id: 'retacl', label: 'Thực thi Document-Level ACL ngay tại Tầng Truy xuất (Retrieval Layer)', desc: 'Chỉ truy xuất các tài liệu mà người dùng hiện tại được uỷ quyền' }
        ],
        steps: [
          { title: 'Đầu độc Vector Nhúng (Embedding Poisoning)', text: 'Kẻ tấn công chỉnh sửa vector trong collection chung để đoạn văn bản chứa lệnh lừa đảo luôn đạt điểm cosine similarity cao nhất với các câu hỏi về thanh toán.', blockedBy: ['ingest'], blockMsg: 'Kiểm soát quyền ghi và chữ ký toàn vẹn trên từng bản ghi vector đã chặn hành vi sửa đổi trái phép.' },
          { title: 'Đánh cắp Vector & Thực hiện Embedding Inversion', text: 'Vì Vector DB không được bảo vệ chặt như kho tài liệu gốc, kẻ tấn công xuất (dump) bảng vector số thực rồi dùng mô hình đảo ngược để khôi phục nội dung văn bản mật.', code: 'reconstructed = inversion_attacker.invert(leaked_embedding_vector)', blockedBy: ['vecdbsec'], blockMsg: 'Vector DB được áp dụng cùng mức kiểm soát bảo mật (mã hoá, IAM, audit) như tài liệu gốc nên kẻ tấn công không thể trích xuất vector.' },
          { title: 'Leo thang Đặc quyền qua Truy vấn RAG (RAG Privilege Escalation)', text: 'Nhân viên thực tập hỏi về "Biên bản họp lương thưởng Ban Giám Đốc"; bộ truy xuất lấy toàn bộ tài liệu mật đưa vào context của LLM.', blockedBy: ['retacl'], blockMsg: 'Document-level ACL tại tầng truy xuất (retrieval layer) đã loại bỏ các tài liệu vượt thẩm quyền của người dùng trước khi chạm tới LLM.' }
        ],
        good: 'Đường ống RAG và Vector DB được bảo vệ toàn diện trước cả đầu độc vector, đảo ngược embedding và leo thang đặc quyền.',
        bad: 'Vector DB lỏng lẻo dẫn tới lộ văn bản gốc qua Embedding Inversion và leo thang đặc quyền qua truy vấn RAG.' }
    ]
  };

  sections['9.3'] = {
    title: 'Bảo mật Cửa sổ Ngữ cảnh (Context Window Poisoning) & Bộ nhớ Lưu trữ Xuyên phiên',
    concept: [
      { t: 'p', x: 'Trong các cuộc hội thoại kéo dài nhiều lượt (**multi-turn conversations**), toàn bộ lịch sử các lượt trước được ghép lại và gửi vào cửa sổ ngữ cảnh ở mỗi lượt mới. Mục 9.3 giải thích rủi ro và cách bảo vệ:' },
      { t: 'ul', items: [
        '**1. Context Window Poisoning (Đầu độc cửa sổ ngữ cảnh):** Nội dung độc hại được tiêm vào ở các lượt hội thoại sớm (ví dụ lượt 2–3) sẽ nằm lại trong lịch sử hội thoại và chi phối hành vi của mô hình ở các lượt sau (lượt 10–15). Bản chất kiến trúc: **mô hình không thể phân biệt giữa lịch sử hội thoại hợp lệ và các chỉ dẫn độc hại bị tiêm vào từ những lượt trước đó**. {{ref:m09-s03-p01}}',
        '**2. Bộ 5 Biện pháp Phòng thủ Context Window:** (a) **Tóm tắt ngữ cảnh định kỳ kèm kiểm tra tính toàn vẹn (`periodic context summarization with integrity checks`)**, (b) **Tái tiêm các chỉ dẫn hệ thống theo chu kỳ đều đặn (`re-injection of system instructions at regular intervals`)**, (c) **Phát hiện bất thường trên nội dung ngữ cảnh (`anomaly detection on context content`)**, và với các ứng dụng bảo mật cao: (d) **Giới hạn độ dài cuộc hội thoại (`limiting conversation length`)** cùng (e) **Khởi tạo ngữ cảnh mới thường xuyên hơn (`starting fresh contexts more frequently`)**. {{ref:m09-s03-p02}} {{ref:m09-ms04}}',
        '**3. Memory Persistence Security:** Bộ nhớ lưu giữ xuyên phiên (cross-session memory) nếu bị đầu độc có thể **thao túng hành vi của agent vô thời hạn (`indefinitely`)**! Phải đảm bảo đủ 4 yêu cầu: **mã hoá khi lưu trữ (`encrypted at rest`)**, **kiểm soát truy cập theo từng user/session**, **xác thực tính toàn vẹn (`integrity-validated`)**, và **rà soát định kỳ để lọc các mục bị đầu độc**. {{ref:m09-s03-p03}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Cơ chế Bảo vệ Cửa sổ Ngữ cảnh Đa lượt: Re-inject System Prompt + Tóm tắt có Kiểm tra Toàn vẹn', tone: 'good', lang: 'python', code: 'def build_safe_multiturn_context(turns, sys_prompt, max_turns=8):\n    # 1. Ứng dụng bảo mật cao: giới hạn độ dài hội thoại & tóm tắt định kỳ kèm kiểm tra anomaly\n    if len(turns) > max_turns:\n        summary = summarize_with_guardrail(turns[:-4])\n        verify_summary_integrity(summary)\n        turns = [{"role": "system", "content": f"Verified history summary: {summary}"}] + turns[-4:]\n\n    # 2. Quét bất thường trên toàn bộ lịch sử ngữ cảnh\n    for t in turns:\n        if context_anomaly_detector.is_poisoned(t["content"]):\n            raise SecurityError("Context window poisoning detected — starting fresh context")\n\n    # 3. Tái tiêm (Re-inject) System Instructions ở cả đầu VÀ ngay trước lượt cuối cùng\n    return [{"role": "system", "content": sys_prompt}] + turns + [\n        {"role": "system", "content": f"[REMINDER - IMMUTABLE POLICY]: {sys_prompt}"}\n    ]' }
    ],
    labs: [
      { type: 'simulator', title: 'Mô phỏng Suy giảm Tuân thủ Đa lượt (Context Drift/Poisoning) & Hiệu quả Tái tiêm System Prompt', intro: 'Kéo thanh trượt số lượt hội thoại và độ mạnh của mảnh tiêm nhiễm ở các lượt trước, sau đó bật các cơ chế phòng vệ của Mục 9.3 để quan sát.',
        sliders: [
          { id: 'turns', label: 'Số lượt hội thoại tích luỹ (Multi-turn length)', min: 1, max: 40, value: 18, unit: ' lượt' },
          { id: 'poisonTurn', label: 'Mức độ tiêm nhiễm ẩn ở các lượt đầu', min: 0, max: 100, value: 70, unit: '%' }
        ],
        toggles: [
          { id: 'reinject', label: 'Tái tiêm System Instructions định kỳ (Periodic Re-injection)', desc: 'Nhắc lại ràng buộc hệ thống đều đặn để chống trôi ngữ cảnh', value: false },
          { id: 'sumCheck', label: 'Tóm tắt ngữ cảnh định kỳ + Kiểm tra tính toàn vẹn', desc: 'Nén lịch sử cũ và loại bỏ các chỉ dẫn tiêm nhiễm ẩn', value: false },
          { id: 'limitLen', label: 'Giới hạn độ dài hội thoại & làm mới Context (High-Security)', desc: 'Cắt ngắn số lượt tối đa và khởi tạo context sạch thường xuyên', value: false },
          { id: 'memSec', label: 'Bảo vệ Persistent Memory (Encrypt + ACL + Integrity + Review)', desc: 'Chặn đầu độc bộ nhớ kéo dài vô thời hạn qua nhiều phiên', value: false }
        ],
        compute: S => {
          let drift = Math.min(100, Math.round(S.turns * 1.6 + S.poisonTurn * 0.55));
          if (S.reinject) drift -= 30;
          if (S.sumCheck) drift -= 25;
          if (S.limitLen) drift -= 25;
          drift = Math.max(5, drift);
          const persistRisk = S.memSec ? 8 : Math.min(95, Math.round(S.poisonTurn * 0.9 + 15));
          const alerts = [];
          if (drift > 55) alerts.push(['bad', '✘ Context Window Poisoning! Chỉ dẫn độc hại từ các lượt trước đã lấn át System Prompt ban đầu ở lượt thứ ' + S.turns + '.']);
          else alerts.push(['ok', '✔ Cửa sổ ngữ cảnh giữ vững tính toàn vẹn qua nhiều lượt nhờ Re-injection, Summarization và giới hạn độ dài hội thoại.']);
          if (!S.memSec && S.poisonTurn > 30) alerts.push(['warn', '⚠ Bộ nhớ xuyên phiên (Persistent Memory) chưa được xác thực toàn vẹn & rà soát định kỳ — mục bị đầu độc sẽ thao túng agent vô thời hạn!']);
          return {
            bars: [
              { label: 'Nguy cơ Context Window bị thao túng ở lượt hiện tại', value: drift, tone: drift > 55 ? 'bad' : drift > 25 ? 'warn' : 'ok' },
              { label: 'Nguy cơ nhiễm độc Bộ nhớ Xuyên phiên (Indefinite Persistence)', value: persistRisk, tone: persistRisk > 40 ? 'bad' : 'ok' },
              { label: 'Độ vững chắc của System Instructions', value: 100 - drift, tone: 'info' }
            ],
            alerts
          };
        } }
    ]
  };

  sections['9.4'] = {
    title: 'Ứng phó Sự cố AI (AI IR) · Break-Glass · Behavioral Baselines · Service Mesh · 6 Lớp Defense-in-Depth',
    concept: [
      { t: 'p', x: 'Mục cuối cùng của Handbook tổng hợp quy trình **Ứng phó Sự cố đặc thù cho AI (AI-Specific Incident Response)** và **Thứ tự 6 lớp Phòng thủ Chiều sâu (Defense-in-Depth Order)** — nội dung cực kỳ quan trọng trong đề thi CLLMSP:' },
      { t: 'ul', items: [
        '**1. 4 Bước Ứng phó Sự cố Đặc thù cho AI (AI-Specific IR Steps):** Ngoài IR truyền thống, phải thực hiện thêm: (a) **Model output forensics** (phân tích mô hình đã sinh ra gì và tại sao), (b) **Prompt analysis** (kiểm tra các đầu vào đã kích hoạt sự cố), (c) **Guardrail effectiveness review** (xác định chốt kiểm soát nào đã thất bại), và (d) **Assessment of downstream impact** (đánh giá tác động hạ nguồn từ các đầu ra bị xâm phạm). {{ref:m09-s04-p02}} {{ref:m09-ms05}}',
        '**2. Break-Glass Procedures (Quy trình khẩn cấp):** Gồm **vô hiệu hoá mô hình khẩn cấp (emergency model disabling)**, **cách ly đầu ra (output quarantine)**, **chuyển hướng lưu lượng sang hệ thống dự phòng (traffic rerouting to fallback systems)**, và **khả năng điều tra số sau sự cố**. Mọi hành động break-glass phải có **phê duyệt được ghi nhận văn bản (`documented approval`)** và **thông báo tức thì cho lãnh đạo bảo mật (`immediate notification to security leadership`)**. {{ref:m09-s04-p03}}',
        '**3. Behavioral Baseline Monitoring:** Thiết lập đường cơ sở cho phân phối đầu ra, mức dùng tool, lượng tiêu thụ token và **tỷ lệ từ chối (`refusal rates`)**. Hai dấu hiệu vàng cần thuộc lòng: **Thay đổi đột ngột về tỷ lệ từ chối (`sudden change in refusal rate`) → báo hiệu một đòn Jailbreak thành công**; **Tăng vọt các lần gọi công cụ (`spike in tool invocations`) → báo hiệu Agent đang bị thao túng (`agent manipulation`)**. {{ref:m09-s04-p04}}',
        '**4. Service Mesh cho LLM Microservices:** Cung cấp **mutual TLS (mTLS)** giữa các dịch vụ, quản lý lưu lượng, khả năng quan sát và thực thi chính sách **mà không cần sửa đổi mã nguồn ứng dụng (`without application code changes`)**. {{ref:m09-s04-p05}}',
        '**5. KEY CONCEPT — Thứ tự 6 Lớp Defense-in-Depth (Từ Ngoài cùng vào Trong cùng):** `1. Network Security` → `2. Authentication & Authorization` → `3. Input Guardrails` → `4. Model Behavior Constraints` → `5. Output Validation` → `6. Monitoring & Observability`. {{ref:m09-s04-kc01}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Kịch bản Tự động Kích hoạt Break-Glass & Điều tra Số (AI Incident Response Playbook)', tone: 'good', lang: 'python', code: 'def handle_ai_security_alert(metrics, incident_ctx):\n    # Phát hiện: Refusal rate tụt đột ngột (Jailbreak!) hoặc Tool calls tăng vọt (Agent Manipulation!)\n    if metrics.refusal_rate_drop > 0.50 or metrics.tool_call_spike_zscore > 4.0:\n        require_documented_approval(incident_ctx["approver_id"])\n        notify_security_leadership_immediately(incident_ctx)\n\n        # Break-Glass Procedures:\n        quarantine_recent_outputs(session_ids=incident_ctx["affected_sessions"])\n        reroute_traffic_to_fallback(service="customer-llm-prod", fallback="rule-based-safe-responder")\n        disable_compromised_model_endpoint(endpoint_id=incident_ctx["endpoint_id"])\n\n        # AI-Specific IR Steps:\n        return run_ai_forensics(\n            model_output_forensics=True,\n            prompt_analysis=True,\n            guardrail_effectiveness_review=True,\n            downstream_impact_assessment=True\n        )' }
    ],
    labs: [
      { type: 'order', title: 'Thử thách Sắp xếp 6 Lớp Phòng thủ Chiều sâu (Defense-in-Depth Order: Outermost → Innermost)', intro: 'Sắp xếp 6 lớp bảo vệ ứng dụng LLM theo đúng thứ tự từ Ngoài cùng (Lớp 1) vào Trong cùng (Lớp 6) theo KEY CONCEPT Mục 9.4 của Handbook.',
        items: [
          { order: 1, label: 'Network Security', desc: 'Tường lửa (firewalls), WAF, chống DDoS (DDoS protection)' },
          { order: 2, label: 'Authentication & Authorization', desc: 'Xác minh danh tính (identity verification), kiểm soát truy cập RBAC/ABAC' },
          { order: 3, label: 'Input Guardrails', desc: 'Phát hiện prompt injection, lọc nội dung đầu vào (content filtering)' },
          { order: 4, label: 'Model Behavior Constraints', desc: 'System prompts, huấn luyện căn chỉnh an toàn (safety training)' },
          { order: 5, label: 'Output Validation', desc: 'Làm sạch (sanitization), ép khuôn định dạng, lọc dữ liệu nhạy cảm ở đầu ra' },
          { order: 6, label: 'Monitoring & Observability', desc: 'Đường cơ sở hành vi (behavioral baselines), phát hiện bất thường, nhật ký kiểm toán' }
        ] }
    ]
  };

  /* ===== 22 CÂU HỎI ÔN TẬP & THI THỬ (17 MCQ + 5 FREE-TEXT) ===== */
  const questions = [
    // 9.1
    mq('9.1', 'Vì sao ABAC (Attribute-Based Access Control) được ưu tiên hơn RBAC đối với các nền tảng LLM đa khách hàng (multi-tenant LLM platforms)?', [
      'Vì ABAC không cần xác thực danh tính người dùng',
      'Vì ABAC có thể thực thi chính sách dựa trên thuộc tính người dùng (phòng ban, mức clearance), thuộc tính tài nguyên (phân loại dữ liệu, độ nhạy cảm) và điều kiện môi trường (thời gian, vị trí, thiết bị), giúp cô lập tenant tinh vi mà RBAC không thể biểu đạt hiệu quả',
      'Vì RBAC không thể phân biệt giữa quản trị viên và người xem',
      'Vì ABAC tự động mã hoá trọng số mô hình'
    ], 1, 'Theo mục 9.1, ABAC được ưu tiên hơn RBAC cho nền tảng multi-tenant LLM vì kết hợp được user attributes, resource properties và environmental conditions để cô lập tenant tinh vi (fine-grained tenant isolation).', [
      'Sai, mọi mô hình kiểm soát truy cập đều cần xác thực danh tính trước.',
      'Đúng — khớp chính xác với giải thích tại mục 9.1 và Module Summary.',
      'Sai, RBAC rất phù hợp cho các vai trò đơn giản như admin, editor, viewer.',
      'Không liên quan.'
    ], 'm09-s01-p02'),

    mq('9.1', 'Khi áp dụng kiến trúc Zero Trust vào hệ thống LLM, các yêu cầu xuất phát từ bên trong mạng nội bộ (internal network requests) được đối xử như thế nào?', [
      'Được tin cậy mặc định và bỏ qua bước kiểm tra quyền để giảm độ trễ',
      'Không có sự tin cậy ngầm nào cho yêu cầu nội bộ; mọi lệnh gọi API, lần gọi công cụ và truy cập dữ liệu đều phải được xác thực và uỷ quyền riêng biệt từng cái một với đặc quyền tối thiểu',
      'Chỉ cần kiểm tra địa chỉ MAC của máy chủ',
      'Chỉ xác thực vào lần khởi động đầu tiên trong ngày'
    ], 1, 'Mục 9.1 nêu rõ: Zero Trust đòi hỏi xác minh liên tục mọi yêu cầu bất kể vị trí mạng, không có niềm tin ngầm cho request nội bộ ("No implicit trust for internal requests. Every API call, tool invocation, and data access must be authenticated and authorized individually").', [
      'Trái ngược hoàn toàn với nguyên lý Zero Trust.',
      'Đúng — khớp nguyên văn mục 9.1.',
      'Sai.',
      'Sai, Zero Trust yêu cầu xác minh liên tục trên từng request.'
    ], 'm09-s01-p03'),

    mq('9.1', 'Mục đích chính của việc xoay vòng thông tin xác thực tự động theo lịch trình (Automated Credential Rotation) đối với API keys và access tokens là gì?', [
      'Làm tăng kích thước context window của mô hình',
      'Thu hẹp cửa sổ phơi nhiễm (reduce the window of exposure) nếu một thông tin xác thực chẳng may bị lộ',
      'Thay thế hoàn toàn nhu cầu sử dụng giao thức TLS',
      'Giúp người dùng không bao giờ phải đăng nhập'
    ], 1, 'Theo mục 9.1 (Credential Rotation), xoay vòng tự động theo lịch trình giúp giảm cửa sổ phơi nhiễm (window of exposure) khi thông tin xác thực bị xâm phạm.', [
      'Không liên quan.',
      'Đúng — khớp chính xác với mục 9.1.',
      'Sai, TLS vẫn bắt buộc cho truyền tải mạng.',
      'Sai.'
    ], 'm09-s01-p04'),

    mq('9.1', 'Theo mục 9.1, các "Agent Capability Tokens" dùng để cấp quyền cho AI Agent truy cập công cụ và tài nguyên phải có những đặc tính bảo mật nào?', [
      'Có hiệu lực vĩnh viễn, toàn quyền truy cập cơ sở dữ liệu và dùng chung cho mọi agent trong hệ thống',
      'Được giới hạn phạm vi vào đúng các hành động cụ thể (scoped to specific actions), có giới hạn thời gian (time-limited, ví dụ 15 phút), và không thể chuyển nhượng giữa các agent (non-transferable)',
      'Được nhúng công khai trong mô tả công cụ để LLM dễ đọc',
      'Chỉ kiểm tra chữ ký khi agent gặp lỗi'
    ], 1, 'Mục 9.1 quy định: Agent Capability Tokens phải được scoped to specific actions, time-limited (ví dụ đọc dữ liệu khách hàng trong 15 phút tới), và non-transferable between agents.', [
      'Handbook lấy chính "permanent full database access credential" làm ví dụ phản diện cực kỳ nguy hiểm.',
      'Đúng — nêu đủ 3 tính chất bắt buộc của Agent Capability Tokens trong mục 9.1.',
      'Nhúng credential trong mô tả tool là lỗi bảo mật nghiêm trọng.',
      'Sai.'
    ], 'm09-s01-p05'),

    fq('9.1', 'Why is ABAC preferred over RBAC for multi-tenant LLM platforms, and what three properties should Agent Capability Tokens enforce?', [
      ['ABAC attributes (user, resource, environment) & tenant isolation', 'user attribute', 'resource propert', 'environmental condition', 'tenant isolation', 'fine-grained'],
      ['Scoped to specific actions', 'scoped to specific action', 'scoped', 'specific action'],
      ['Time-limited & Non-transferable', 'time-limited', 'non-transferable']
    ], 'ABAC is preferred over RBAC for multi-tenant LLM platforms because it evaluates user attributes (department, clearance), resource properties (data classification, sensitivity), and environmental conditions (time, location, device), enabling fine-grained tenant isolation that RBAC cannot efficiently express. Agent Capability Tokens should be (1) scoped to specific actions, (2) time-limited, and (3) non-transferable between agents.',
    'Kiểm tra sự khác biệt cốt lõi giữa ABAC và RBAC trên nền tảng multi-tenant cùng 3 thuộc tính bắt buộc của Agent Capability Tokens (mục 9.1).', 'm09-s01-p02'),

    // 9.2
    mq('9.2', 'Vì sao Cơ sở dữ liệu Vector (Vector Database) trong kiến trúc RAG bắt buộc phải được áp dụng CÙNG mức kiểm soát bảo mật như chính các tài liệu gốc mà chúng đại diện?', [
      'Vì các tệp PDF gốc luôn được lưu dưới dạng hình ảnh trong Vector DB',
      'Vì tấn công đảo ngược nhúng (Embedding Inversion Attacks) có thể tái tạo lại một phần văn bản gốc từ các vector embeddings, làm rò rỉ thông tin nhạy cảm ngay cả khi tài liệu gốc đã được khoá quyền truy cập',
      'Vì Vector DB chỉ chạy được trên hệ điều hành Windows XP',
      'Vì vector embeddings tự động gửi email ra ngoài mỗi ngày'
    ], 1, 'Mục 9.2 giải thích: Embedding Inversion Attacks có thể khôi phục một phần văn bản gốc từ vector embeddings; ngoài ra kẻ sửa được embeddings còn kiểm soát thông tin LLM nhìn thấy. Do đó Vector DB phải có cùng mức kiểm soát bảo mật như tài liệu gốc.', [
      'Sai, Vector DB lưu các vector số thực và metadata/chunk.',
      'Đúng — nắm vững bản chất Embedding Inversion Attacks trong mục 9.2 và Module Summary.',
      'Sai.',
      'Sai.'
    ], 'm09-s02-p03'),

    mq('9.2', 'Trong hệ thống RAG doanh nghiệp, việc kiểm soát truy cập cấp độ từng tài liệu (document-level access controls) phải được thực thi ở đâu để ngăn chặn leo thang đặc quyền?', [
      'Chỉ thực thi bằng cách dặn LLM trong System Prompt: "Nếu người dùng không đủ quyền thì đừng đọc to tài liệu này"',
      'Thực thi ngay tại tầng truy xuất (enforced in the retrieval layer), đảm bảo thành phần truy xuất chỉ trả về những tài liệu mà người dùng đang truy vấn có quyền truy cập',
      'Thực thi ở trình duyệt người dùng bằng CSS (display: none)',
      'Không cần kiểm soát vì RAG chỉ tóm tắt chứ không trả nguyên văn'
    ], 1, 'Mục 9.2 quy định rõ: "Document-level access controls must be enforced in the retrieval layer. When a user queries the system, the retrieval component should only return documents that user is authorized to access."', [
      'Nếu tài liệu mật đã đi vào context của LLM, kẻ tấn công dễ dàng dùng prompt injection để trích xuất.',
      'Đúng — chặn ngay từ tầng retrieval để ngăn chặn privilege escalation qua đường ống RAG.',
      'CSS ở phía client hoàn toàn không có giá trị bảo mật.',
      'Tóm tắt dữ liệu mật vẫn là làm lộ dữ liệu mật.'
    ], 'm09-s02-p04'),

    mq('9.2', 'Điều gì xảy ra nếu kẻ tấn công xâm phạm và đầu độc được các vector nhúng (poisoned embeddings) trong cơ sở dữ liệu vector của hệ thống RAG?', [
      'Mô hình sẽ tự động chuyển sang ngôn ngữ lập trình Rust',
      'Kẻ tấn công thao túng được kết quả truy xuất RAG và kiểm soát thông tin mà LLM nhìn thấy, dẫn tới các phản hồi sai lệch hoặc độc hại bị tiêm thẳng vào ngữ cảnh của LLM',
      'Dung lượng RAM của máy khách sẽ tăng gấp đôi',
      'Không có tác động gì vì LLM không đọc kết quả từ RAG'
    ], 1, 'Theo mục 9.2 (Vector Database Threats), embeddings bị đầu độc sẽ thao túng kết quả truy xuất RAG, tiêm nội dung sai/độc hại vào context của LLM — ai sửa được embeddings sẽ kiểm soát những gì LLM nhìn thấy.', [
      'Không liên quan.',
      'Đúng — khớp chính xác với mục 9.2.',
      'Không liên quan.',
      'Sai, bản chất của RAG là đưa kết quả truy xuất vào context của LLM.'
    ], 'm09-s02-p02'),

    fq('9.2', 'Explain the threat of Embedding Inversion Attacks and how access controls must be implemented in a RAG pipeline to prevent privilege escalation.', [
      ['Embedding inversion reconstructs original text', 'embedding inversion', 'partially reconstruct', 'reconstruct the original text', 'leak sensitive information'],
      ['Same security controls as original documents', 'same security controls', 'documents they represent'],
      ['Document-level ACL enforced in retrieval layer', 'document-level', 'retrieval layer', 'only return documents that user is authorized']
    ], 'Embedding Inversion Attacks can partially reconstruct the original text from vector embeddings, meaning embeddings can leak sensitive information even if original documents are protected; therefore, vector databases need the same security controls as the documents they represent. To prevent privilege escalation in RAG, document-level access controls must be enforced in the retrieval layer so the retrieval component only returns documents the querying user is authorized to access.',
    'Kết hợp hai câu hỏi trọng tâm của mục 9.2: Embedding Inversion và thực thi Document-level ACL tại tầng Retrieval.', 'm09-s02-p03'),

    // 9.3
    mq('9.3', 'Vì sao đòn tấn công Đầu độc Cửa sổ Ngữ cảnh (Context Window Poisoning) trong các cuộc hội thoại đa lượt lại hiệu quả?', [
      'Vì mô hình tự động xoá System Prompt ngay ở lượt thứ hai',
      'Vì nội dung độc hại được tiêm vào ở các lượt trước sẽ nằm lại trong lịch sử và mô hình không thể phân biệt giữa lịch sử hội thoại hợp lệ với các chỉ dẫn bị tiêm nhiễm từ những lượt trước đó',
      'Vì giao thức TCP/IP không hỗ trợ hội thoại quá 3 lượt',
      'Vì người dùng luôn có quyền root trên máy chủ suy luận'
    ], 1, 'Mục 9.3 giải thích: trong hội thoại đa lượt, nội dung độc hại tiêm vào ở các lượt sớm sẽ chi phối hành vi của mô hình ở các lượt sau vì mô hình không thể phân biệt giữa lịch sử hội thoại hợp lệ và các chỉ dẫn bị tiêm từ lượt trước.', [
      'System prompt không tự xoá, nhưng bị cạnh tranh/pha loãng bởi ngữ cảnh các lượt sau.',
      'Đúng — khớp nguyên văn giải thích trong mục 9.3.',
      'Sai.',
      'Sai.'
    ], 'm09-s03-p01'),

    mq('9.3', 'Những biện pháp phòng thủ nào được Handbook khuyến nghị để chống lại Context Window Poisoning trong hội thoại đa lượt?', [
      'Cho phép cuộc hội thoại kéo dài vô tận và không bao giờ nhắc lại System Prompt',
      'Tóm tắt ngữ cảnh định kỳ kèm kiểm tra tính toàn vẹn, tái tiêm (re-injection) các chỉ dẫn hệ thống theo chu kỳ đều đặn, phát hiện bất thường trên ngữ cảnh, và giới hạn độ dài hội thoại / khởi tạo ngữ cảnh mới thường xuyên hơn cho ứng dụng bảo mật cao',
      'Chỉ cho phép người dùng nhập các con số từ 0 đến 9',
      'Lưu toàn bộ lịch sử hội thoại vào cookie không mã hoá'
    ], 1, 'Mục 9.3 liệt kê rõ: periodic context summarization with integrity checks, re-injection of system instructions at regular intervals, anomaly detection on context content, và với ứng dụng bảo mật cao thì giới hạn độ dài hội thoại + khởi tạo fresh contexts thường xuyên hơn.', [
      'Làm tăng tối đa nguy cơ nhiễm độc ngữ cảnh.',
      'Đúng — đầy đủ các kỹ thuật phòng vệ trong mục 9.3 và Module Summary.',
      'Làm hỏng hoàn toàn tính năng hội thoại tự nhiên.',
      'Không giải quyết được context poisoning và còn gây mất an toàn.'
    ], 'm09-s03-p02'),

    mq('9.3', 'Tại sao việc bảo mật Bộ nhớ lưu trữ xuyên phiên (Memory Persistence Security) lại đặc biệt quan trọng đối với các AI Agent?', [
      'Vì một bộ nhớ bị đầu độc có thể chi phối và thao túng hành vi của agent vô thời hạn (indefinitely) qua mọi phiên làm việc về sau',
      'Vì bộ nhớ xuyên phiên làm giảm tốc độ quạt tản nhiệt của máy chủ',
      'Vì nó giúp mô hình không cần dùng đến GPU nữa',
      'Vì bộ nhớ xuyên phiên tự động công khai mã nguồn ứng dụng'
    ], 0, 'Mục 9.3 cảnh báo rõ: "A poisoned memory can influence the agent\'s behavior indefinitely" và yêu cầu mã hoá khi lưu trữ, kiểm soát truy cập theo user/session, xác thực toàn vẹn và rà soát định kỳ.', [
      'Đúng — khớp nguyên văn cảnh báo trong mục 9.3.',
      'Sai.',
      'Sai.',
      'Sai.'
    ], 'm09-s03-p03', true),

    // 9.4
    mq('9.4', 'Khi xảy ra sự cố bảo mật trên hệ thống LLM, những bước Ứng phó Sự cố Đặc thù cho AI (AI-Specific IR Steps) nào cần được thực hiện bổ sung ngoài quy trình IR truyền thống?', [
      'Chỉ cần cài lại hệ điều hành Windows cho máy trạm của nhân viên lễ tân',
      'Điều tra số đầu ra mô hình (Model output forensics), phân tích prompt (prompt analysis), đánh giá hiệu quả guardrail (guardrail effectiveness review), và đánh giá tác động hạ nguồn (downstream impact) từ các đầu ra bị xâm phạm',
      'Đổi tên miền của công ty ngay lập tức',
      'Tăng giá gói cước thuê bao đối với mọi khách hàng'
    ], 1, 'Theo mục 9.4 (AI-Specific IR Steps), ứng phó sự cố cho AI bổ sung 4 bước: model output forensics, prompt analysis, guardrail effectiveness review, và assessment of downstream impact from compromised outputs.', [
      'Không giải quyết sự cố trên hệ thống LLM.',
      'Đúng — đầy đủ 4 bước AI-Specific IR trong mục 9.4 và Module Summary.',
      'Sai.',
      'Sai.'
    ], 'm09-s04-p02'),

    mq('9.4', 'Quy trình khẩn cấp "Break-Glass Procedures" cho hệ thống AI bao gồm những hành động kỹ thuật và yêu cầu quản trị nào?', [
      'Cho phép bất kỳ thực tập sinh nào tắt máy chủ mà không cần báo cáo hay ghi chép lại',
      'Vô hiệu hoá mô hình khẩn cấp, cách ly đầu ra (output quarantine), chuyển hướng lưu lượng sang hệ thống dự phòng (fallback systems), điều tra số sau sự cố; đồng thời bắt buộc phải có phê duyệt được ghi nhận văn bản (documented approval) và thông báo tức thì cho lãnh đạo bảo mật',
      'Xoá sạch mọi bản ghi nhật ký kiểm toán để tránh bị phạt tuân thủ',
      'Tự động mở toàn bộ cổng tường lửa ra Internet'
    ], 1, 'Mục 9.4 quy định rõ các hành động Break-Glass (emergency model disabling, output quarantine, traffic rerouting to fallback systems, post-incident forensics) cùng yêu cầu documented approval và immediate notification to security leadership.', [
      'Thiếu kiểm soát uỷ quyền và phê duyệt có văn bản.',
      'Đúng — bao gồm đủ cả phần kỹ thuật lẫn quản trị phê duyệt trong mục 9.4.',
      'Xoá log điều tra là hành vi phá hoại bằng chứng.',
      'Cực kỳ nguy hiểm.'
    ], 'm09-s04-p03'),

    mq('9.4', 'Trong Giám sát Đường cơ sở Hành vi (Behavioral Baseline Monitoring), hai hiện tượng: (1) sự thay đổi đột ngột về tỷ lệ từ chối (sudden change in refusal rate) và (2) đợt tăng vọt các lần gọi công cụ (spike in tool invocations) lần lượt báo hiệu điều gì?', [
      '(1) Báo hiệu ổ cứng đầy; (2) Báo hiệu cáp quang biển bị đứt',
      '(1) Báo hiệu một đòn Jailbreak thành công (successful jailbreak); (2) Báo hiệu Agent đang bị thao túng (agent manipulation)',
      '(1) Báo hiệu mô hình đang tự cập nhật trọng số; (2) Báo hiệu người dùng quên mật khẩu',
      'Cả hai đều chỉ báo rằng hệ thống đang hoạt động hoàn toàn bình thường'
    ], 1, 'Mục 9.4 chỉ rõ: "A sudden change in refusal rate may indicate a successful jailbreak; a spike in tool invocations may indicate agent manipulation."', [
      'Sai.',
      'Đúng — đây là cặp dấu hiệu giám sát cực kỳ quan trọng trong mục 9.4.',
      'Sai.',
      'Sai.'
    ], 'm09-s04-p04'),

    mq('9.4', 'Lợi ích bảo mật nổi bật của việc triển khai Service Mesh cho các hệ thống LLM phức tạp gồm nhiều vi dịch vụ (microservices) là gì?', [
      'Giúp mô hình sinh văn bản mà không cần dùng đến cơ chế Self-Attention',
      'Cung cấp mutual TLS (mTLS) giữa các dịch vụ, quản lý lưu lượng, khả năng quan sát và thực thi chính sách mà KHÔNG cần sửa đổi mã nguồn ứng dụng (without application code changes)',
      'Thay thế hoàn toàn nhu cầu kiểm soát truy cập của người dùng cuối',
      'Tự động viết lại toàn bộ ứng dụng từ Python sang C++'
    ], 1, 'Theo mục 9.4, Service Mesh cung cấp mutual TLS giữa các dịch vụ, quản lý lưu lượng, observability và thực thi chính sách mà không cần thay đổi code ứng dụng.', [
      'Sai.',
      'Đúng — khớp chính xác với mục 9.4.',
      'Service Mesh bảo vệ giao tiếp service-to-service, không thay thế xác thực người dùng cuối.',
      'Sai.'
    ], 'm09-s04-p05'),

    mq('9.4', 'Theo KEY CONCEPT tại mục 9.4, khi bảo mật đầu-cuối (end-to-end) cho một ứng dụng LLM, thứ tự ĐÚNG của 6 lớp Phòng thủ Chiều sâu (Defense in Depth) tính từ NGOÀI CÙNG vào TRONG CÙNG (outermost to innermost) là gì?', [
      '1. Model Behavior Constraints → 2. Input Guardrails → 3. Output Validation → 4. Network Security → 5. Monitoring → 6. Authentication',
      '1. Network Security → 2. Authentication & Authorization → 3. Input Guardrails → 4. Model Behavior Constraints → 5. Output Validation → 6. Monitoring & Observability',
      '1. Monitoring & Observability → 2. Output Validation → 3. Model Behavior Constraints → 4. Input Guardrails → 5. Authentication & Authorization → 6. Network Security',
      '1. Input Guardrails → 2. Network Security → 3. Output Validation → 4. Authentication & Authorization → 5. Model Behavior Constraints → 6. Monitoring'
    ], 1, 'KEY CONCEPT mục 9.4 quy định rõ thứ tự chuẩn từ ngoài cùng vào trong cùng: 1. Network Security → 2. Authentication & Authorization → 3. Input Guardrails → 4. Model Behavior Constraints → 5. Output Validation → 6. Monitoring & Observability.', [
      'Sai thứ tự hoàn toàn.',
      'Đúng — khớp 100% với KEY CONCEPT — DEFENSE IN DEPTH ORDER ở trang 24.',
      'Đây là thứ tự bị đảo ngược từ trong ra ngoài.',
      'Đặt Input Guardrails trước cả Network Security và Authentication là sai kiến trúc.'
    ], 'm09-s04-kc01'),

    mq('9.4', 'Trong mô hình 6 lớp Defense-in-Depth của mục 9.4, lớp nào nằm ngay giữa "3. Input Guardrails" và "5. Output Validation"?', [
      '1. Network Security',
      '4. Model Behavior Constraints (system prompts, safety training)',
      '2. Authentication & Authorization',
      '6. Monitoring & Observability'
    ], 1, 'Sau khi đi qua Input Guardrails (lớp 3), yêu cầu đi tới mô hình chịu sự chi phối của Model Behavior Constraints (lớp 4: system prompts, safety training), rồi đầu ra mới được kiểm tra bởi Output Validation (lớp 5).', [
      'Network Security là lớp 1 (ngoài cùng).',
      'Đúng — Lớp 4 là Model Behavior Constraints.',
      'Authentication & Authorization là lớp 2.',
      'Monitoring & Observability là lớp 6 (trong cùng).'
    ], 'm09-s04-kc01', true),

    mq('9.4', 'Theo danh mục Công cụ & Tài liệu tham khảo chuẩn ở cuối Handbook (Trang 25), công cụ mã nguồn mở nào là "LLM vulnerability scanner" (máy quét lỗ hổng LLM) và công cụ nào dùng cho "LLM testing and red teaming"?', [
      'Wireshark và Notepad++',
      'Garak (LLM vulnerability scanner) và Promptfoo (LLM testing and red teaming)',
      'Ollama và Docker Compose',
      'Photoshop và Blender'
    ], 1, 'Trang 25 (References & Further Reading — Tools & Platforms) liệt kê rõ: Garak — LLM vulnerability scanner; Promptfoo — LLM testing and red teaming; Rebuff — Prompt injection detection; Ollama — Local LLM runtime.', [
      'Không phải bộ công cụ chuyên biệt cho LLM trong Handbook.',
      'Đúng — khớp chính xác với mục Tools & Platforms trang 25 của Handbook.',
      'Ollama là local LLM runtime.',
      'Không liên quan.'
    ], 'm09-s04-p08', true),

    fq('9.4', 'List the six layers of Defense in Depth for securing an LLM application in exact order from outermost (1) to innermost (6).', [
      ['1. Network Security', 'network security', 'firewall', 'waf', 'ddos'],
      ['2. Authentication & Authorization', 'authentication', 'authorization', 'rbac', 'abac'],
      ['3. Input Guardrails', 'input guardrail', 'prompt injection detection'],
      ['4. Model Behavior Constraints', 'model behavior constraint', 'system prompt', 'safety training'],
      ['5. Output Validation & 6. Monitoring/Observability', 'output validation', 'monitoring', 'observability']
    ], 'The correct order of defensive layers from outermost to innermost is: (1) Network Security (firewalls, WAF, DDoS protection), (2) Authentication & Authorization (identity verification, RBAC/ABAC), (3) Input Guardrails (prompt injection detection, content filtering), (4) Model Behavior Constraints (system prompts, safety training), (5) Output Validation (sanitization, format enforcement, sensitive data filtering), and (6) Monitoring & Observability (behavioral baselines, anomaly detection, audit logging).',
    'Câu hỏi tự luận kinh điển kiểm tra thuộc lòng đúng thứ tự 6 lớp Defense-in-Depth từ ngoài vào trong tại mục 9.4.', 'm09-s04-kc01'),

    fq('9.4', 'Describe the four AI-specific incident response steps and explain what a sudden change in refusal rate versus a spike in tool invocations indicates during behavioral baseline monitoring.', [
      ['Model output forensics & Prompt analysis', 'model output forensics', 'model forensics', 'prompt analysis'],
      ['Guardrail effectiveness review & Downstream impact', 'guardrail effectiveness', 'downstream impact'],
      ['Refusal rate change = Jailbreak; Tool spike = Agent manipulation', 'refusal rate', 'jailbreak', 'spike in tool', 'agent manipulation']
    ], 'The four AI-specific incident response steps are: (1) model output forensics (analyzing what the model produced and why), (2) prompt analysis (examining inputs that triggered the incident), (3) guardrail effectiveness review (determining which controls failed), and (4) assessment of downstream impact from compromised outputs. In behavioral baseline monitoring, a sudden change in refusal rate indicates a potential successful jailbreak, whereas a spike in tool invocations indicates potential agent manipulation.',
    'Tổng hợp 4 bước AI-Specific IR và ý nghĩa của 2 tín hiệu lệch đường cơ sở hành vi quan trọng nhất trong mục 9.4.', 'm09-s04-p02'),

    fq('9.3', 'How does Context Window Poisoning work in multi-turn conversations, and what four defenses help protect context window integrity?', [
      ['Earlier turns influence subsequent turns / cannot distinguish', 'earlier turn', 'subsequent turn', 'cannot distinguish', 'multi-turn'],
      ['Periodic summarization with integrity checks', 'summarization', 'integrity check'],
      ['Re-injection of system instructions', 're-inject', 'system instruction'],
      ['Anomaly detection & Limiting conversation length / fresh contexts', 'anomaly detection', 'limiting conversation length', 'fresh context']
    ], 'In multi-turn conversations, Context Window Poisoning occurs when malicious content injected in earlier turns influences the model\'s behavior in subsequent turns because the model cannot distinguish between legitimate conversation history and injected instructions. Defenses include: (1) periodic context summarization with integrity checks, (2) re-injection of system instructions at regular intervals, (3) anomaly detection on context content, and (4) limiting conversation length and starting fresh contexts more frequently for high-security applications.',
    'Kiểm tra cơ chế Context Window Poisoning và 4 biện pháp bảo vệ tính toàn vẹn ngữ cảnh đa lượt trong mục 9.3.', 'm09-s03-p01', true)
  ];

  window.CLLMSP.register({ n: 9, handbook, sections, questions });
})();
