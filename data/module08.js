/* ===== Module 08 — Application Security for AI Products (Domain 8, 10%) =====
 * 100% nội dung gốc từ Handbook (Trang 21–22) + Giải thích chuyên sâu + Ví dụ & Code thực tế + Labs + 22 câu hỏi.
 */
(() => {
  const { P, H } = window.CLLMSP;
  let nq = 0;
  const mq = (sec, q, options, answer, exp, why, ref, examOnly) => ({ id: 'm08-q' + (++nq), sec, type: 'mcq', q, options, answer, exp, why, ref, examOnly });
  const fq = (sec, q, cl, model, exp, ref, examOnly) => ({ id: 'm08-q' + (++nq), sec, type: 'free', q, clusters: cl.map(c => ({ name: c[0], terms: c.slice(1) })), model, exp, ref, examOnly });

  const handbook = [
    P('m08-intro', 21, '[[aiproducts|AI products]] are still [[swproducts|software products]]. [[tradappsec|Traditional application security vulnerabilities]] apply — and [[llmint|LLM integration]] introduces [[newatksurf|new attack surfaces]]. This module bridges [[aispecrisks|AI-specific risks]] with [[estappsec|established application security practices]].',
      '[[aiproducts|Các sản phẩm AI]] suy cho cùng vẫn là [[swproducts|các sản phẩm phần mềm]]. [[tradappsec|Các lỗ hổng bảo mật ứng dụng truyền thống]] vẫn hoàn toàn hiện diện — và [[llmint|việc tích hợp LLM]] còn mở ra thêm [[newatksurf|những bề mặt tấn công mới]]. Module này kết nối [[aispecrisks|các rủi ro đặc thù của AI]] với [[estappsec|các thực hành bảo mật ứng dụng chuẩn mực]].'),
    P('m08-lo01', 21, 'Identify how [[tradvulns|traditional web vulnerabilities (SSRF, XSS, SQLi)]] manifest in AI applications.', 'Nhận diện cách thức [[tradvulns|các lỗ hổng web truyền thống (SSRF, XSS, SQLi)]] biểu hiện trong các ứng dụng AI.'),
    P('m08-lo02', 21, 'Implement [[secapidesign|secure API design]] for [[llmendpoints|LLM endpoints]].', 'Triển khai [[secapidesign|thiết kế API an toàn]] cho [[llmendpoints|các điểm cuối (endpoints) LLM]].'),
    P('m08-lo03', 21, 'Integrate [[aispectest|AI-specific security testing]] into [[devsecops|DevSecOps pipelines]].', 'Tích hợp [[aispectest|kiểm thử bảo mật đặc thù cho AI]] vào [[devsecops|đường ống DevSecOps]].'),
    P('m08-lo04', 21, 'Apply [[contsec|container security]] and [[supplychain|supply chain protections]] to [[aiworkloads|AI workloads]].', 'Áp dụng [[contsec|bảo mật container]] và [[supplychain|bảo vệ chuỗi cung ứng]] cho [[aiworkloads|các khối lượng công việc (workloads) AI]].'),

    H('m08-s01-h', 21, '8.1  Traditional Vulns in AI Context: SSRF, XSS, SQLi', '8.1  Lỗ hổng Truyền thống trong Ngữ cảnh AI: SSRF, XSS, SQLi'),
    P('m08-s01-p01', 21, '[[ssrf|SSRF (Server-Side Request Forgery)]]: Most likely when the LLM is allowed to [[fetchurls|fetch URLs or make HTTP requests]] based on [[userormodel|user-provided or model-generated input]]. An attacker can make the LLM request [[internalnet|internal network resources]], [[cloudmeta|cloud metadata endpoints]], or other services not intended to be exposed.',
      '[[ssrf|SSRF (Server-Side Request Forgery — Giả mạo yêu cầu phía máy chủ)]]: Dễ xảy ra nhất khi LLM được phép [[fetchurls|tải URL hoặc gửi các HTTP request]] dựa trên [[userormodel|đầu vào do người dùng cung cấp hoặc do chính mô hình sinh ra]]. Kẻ tấn công có thể điều khiển LLM gửi request tới [[internalnet|tài nguyên mạng nội bộ]], [[cloudmeta|điểm cuối siêu dữ liệu đám mây (cloud metadata endpoints)]], hoặc các dịch vụ không được phép phơi bày ra ngoài.'),
    P('m08-s01-p02', 21, '[[xss|XSS (Cross-Site Scripting)]]: Occurs when [[modelgen|model-generated content]] containing [[execscripts|executable scripts]] is [[rendered|rendered in a browser without proper encoding]]. The [[mostimpheader|most important security header]] for applications rendering LLM output is [[csp|Content-Security-Policy (CSP)]].',
      '[[xss|XSS (Cross-Site Scripting)]]: Xảy ra khi [[modelgen|nội dung do mô hình sinh ra]] chứa [[execscripts|mã kịch bản thực thi được]] bị [[rendered|hiển thị trực tiếp trên trình duyệt mà không được mã hoá (encoding) đúng cách]]. [[mostimpheader|Header bảo mật quan trọng nhất]] đối với các ứng dụng hiển thị đầu ra của LLM là [[csp|Content-Security-Policy (CSP)]].'),
    P('m08-s01-p03', 21, '[[sqli|SQL Injection]]: When [[llmsql|LLM-generated SQL]] is passed directly to a database [[withoutparam|without parameterization]]. Even if the LLM is instructed to generate safe SQL, it can be [[manipinj|manipulated through prompt injection]] to generate malicious queries. Always use [[paramqueries|parameterized queries]] and [[leastprivdb|least-privilege database credentials]].',
      '[[sqli|SQL Injection]]: Xảy ra khi [[llmsql|câu lệnh SQL do LLM sinh ra]] được truyền thẳng xuống cơ sở dữ liệu [[withoutparam|mà không qua tham số hoá (parameterization)]]. Ngay cả khi LLM đã được dặn chỉ sinh SQL an toàn, nó vẫn có thể bị [[manipinj|thao túng thông qua prompt injection]] để sinh ra các truy vấn độc hại. Luôn sử dụng [[paramqueries|truy vấn tham số hoá]] và [[leastprivdb|tài khoản cơ sở dữ liệu theo nguyên tắc đặc quyền tối thiểu (least-privilege)]].'),
    P('m08-s01-p04', 21, '[[pathtrav|Path Traversal]]: When [[llmpaths|LLM-generated file paths]] are used [[withoutval|without validation]], allowing access to [[filesoutside|files outside the intended directory]].',
      '[[pathtrav|Path Traversal]]: Xảy ra khi [[llmpaths|đường dẫn tệp do LLM sinh ra]] được sử dụng [[withoutval|mà không kiểm tra hợp lệ]], cho phép truy cập tới [[filesoutside|các tệp nằm ngoài thư mục dự kiến]].'),

    H('m08-s02-h', 21, '8.2  API Security: Auth, Rate Limiting & Streaming', '8.2  Bảo mật API: Xác thực, Giới hạn Tần suất & Streaming'),
    P('m08-s02-p01', 21, '[[authn|Authentication]]: [[oauth20|OAuth 2.0]] with [[shorttokens|short-lived access tokens]], [[refrot|refresh token rotation]], and [[scoperest|scope restrictions]] provides the [[strongestsec|strongest security for LLM APIs]]. Avoid [[longapikeys|long-lived API keys embedded in client applications]].',
      '[[authn|Xác thực (Authentication)]]: [[oauth20|OAuth 2.0]] kết hợp [[shorttokens|access token ngắn hạn (short-lived)]], [[refrot|xoay vòng refresh token (refresh token rotation)]], và [[scoperest|giới hạn phạm vi quyền (scope restrictions)]] mang lại [[strongestsec|mức bảo mật mạnh nhất cho các LLM API]]. Tuyệt đối tránh [[longapikeys|nhúng các API key dài hạn trong ứng dụng phía client]].'),
    P('m08-s02-p02', 21, '[[ratelimiting|Rate Limiting]]: Must consider [[reqfreq|request frequency]], [[tokperreq|token consumption per request]], [[concconn|concurrent connections]], and [[costperop|cost per operation]]. [[simplermpinsuff|Simple request-per-minute limits are insufficient]] — a [[singlereqmil|single request consuming millions of tokens]] is more impactful than many small requests.',
      '[[ratelimiting|Giới hạn Tần suất (Rate Limiting)]]: Phải tính đến cả [[reqfreq|tần suất gửi request]], [[tokperreq|lượng token tiêu thụ trên mỗi request]], [[concconn|số kết nối đồng thời]], và [[costperop|chi phí trên mỗi tác vụ]]. [[simplermpinsuff|Giới hạn số request mỗi phút (RPM) đơn thuần là không đủ]] — một [[singlereqmil|request duy nhất tiêu thụ hàng triệu token]] gây tác động nặng nề hơn nhiều so với hàng loạt request nhỏ.'),
    P('m08-s02-p03', 21, '[[streamsec|Streaming Security]]: Streaming LLM responses via [[ssews|Server-Sent Events or WebSockets]] introduces the challenge that [[contentfilt|content filtering]] must process [[partialout|partial outputs]] before the [[complresp|complete response is available]]. [[guardrails|Guardrails]] must operate on [[streamreal|streaming content in real-time]], not just on completed responses.',
      '[[streamsec|Bảo mật Luồng phản hồi (Streaming Security)]]: Truyền phát phản hồi LLM qua [[ssews|Server-Sent Events (SSE) hoặc WebSockets]] đặt ra thách thức là [[contentfilt|bộ lọc nội dung]] phải xử lý [[partialout|các phần đầu ra từng phần (partial outputs)]] trước khi [[complresp|toàn bộ câu trả lời hoàn tất]]. [[guardrails|Các lớp Guardrails]] bắt buộc phải hoạt động trên [[streamreal|nội dung streaming theo thời gian thực]], chứ không chỉ kiểm tra sau khi phản hồi đã hoàn chỉnh.'),
    P('m08-s02-p04', 21, '[[errhandling|Error Handling]]: Return [[generr|generic error messages]] to users while logging [[detdiag|detailed diagnostics server-side]]. Never expose [[stacktraces|stack traces]], [[modelcfg|model configuration]], or [[intarch|internal architecture details]] in error responses.',
      '[[errhandling|Xử lý Lỗi (Error Handling)]]: Chỉ trả về [[generr|thông báo lỗi chung (generic error messages)]] cho người dùng trong khi ghi nhật ký [[detdiag|chẩn đoán chi tiết ở phía máy chủ]]. Không bao giờ được phơi bày [[stacktraces|stack traces]], [[modelcfg|cấu hình mô hình]], hoặc [[intarch|chi tiết kiến trúc nội bộ]] trong phản hồi lỗi.'),

    H('m08-s03-h', 21, '8.3  DevSecOps for AI: CI/CD, Pentesting & Monitoring', '8.3  DevSecOps cho AI: CI/CD, Pentesting & Giám sát'),
    P('m08-s03-p01', 21, '[[aicicd|AI-Specific CI/CD]]: Beyond [[tradsastdast|traditional SAST/DAST]], add [[pinjtest|prompt injection testing]], [[behregtest|model behavior regression tests]], and [[guardval|guardrail validation]] to the CI/CD pipeline. Test that [[safetybeh|safety behaviors are maintained across model updates]].',
      '[[aicicd|CI/CD Đặc thù cho AI]]: Ngoài [[tradsastdast|SAST/DAST truyền thống]], phải bổ sung thêm [[pinjtest|kiểm thử prompt injection]], [[behregtest|kiểm thử hồi quy hành vi mô hình (model behavior regression tests)]], và [[guardval|xác thực hiệu quả guardrail]] vào đường ống CI/CD. Phải kiểm tra để đảm bảo [[safetybeh|các hành vi an toàn vẫn được duy trì qua các đợt cập nhật mô hình]].'),
    P('m08-s03-p02', 21, '[[aipentest|AI-Specific Pentesting]]: Penetration testing for LLM applications should additionally include [[pinjtest|prompt injection testing]], [[jbattempts|jailbreak attempts]], [[dataextprobes|data extraction probes]], [[toolabuse|tool abuse scenarios]], and [[indinjrag|indirect injection via RAG pipelines]].',
      '[[aipentest|Pentesting Đặc thù cho AI]]: Kiểm thử xâm nhập cho ứng dụng LLM cần bao gồm thêm [[pinjtest|kiểm thử prompt injection]], [[jbattempts|các nỗ lực jailbreak]], [[dataextprobes|dò tìm trích xuất dữ liệu (data extraction probes)]], [[toolabuse|kịch bản lạm dụng công cụ (tool abuse)]], và [[indinjrag|tiêm nhiễm gián tiếp qua đường ống RAG]].'),
    P('m08-s03-p03', 22, '[[fuzzing|Fuzzing]]: [[autosectest|Automated security testing]] that sends [[randmalin|random or malformed inputs]] to discover [[crashesvulns|crashes and vulnerabilities]]. For LLM applications, fuzz both the [[tradapisurf|traditional API surface]] and the [[modeliobound|model input/output boundaries]].',
      '[[fuzzing|Fuzzing]]: [[autosectest|Kiểm thử bảo mật tự động]] gửi [[randmalin|các đầu vào ngẫu nhiên hoặc sai định dạng]] nhằm phát hiện [[crashesvulns|lỗi sập (crashes) và lỗ hổng]]. Đối với ứng dụng LLM, cần fuzz cả [[tradapisurf|bề mặt API truyền thống]] lẫn [[modeliobound|ranh giới đầu vào/đầu ra của mô hình]].'),
    P('m08-s03-p04', 22, '[[monitoring|Monitoring]]: A [[spikesignal|sudden spike in token consumption per request combined with unusual output patterns]] is the [[mostindicsig|most indicative signal of a potential security incident]]. Establish [[behbaselines|behavioral baselines]] and alert on [[sigdev|significant deviations]].',
      '[[monitoring|Giám sát (Monitoring)]]: Một [[spikesignal|đợt tăng vọt đột ngột về lượng token tiêu thụ trên mỗi request kết hợp với các mẫu đầu ra bất thường]] là [[mostindicsig|tín hiệu chỉ báo rõ ràng nhất về một sự cố bảo mật tiềm ẩn]]. Hãy thiết lập [[behbaselines|đường cơ sở hành vi (behavioral baselines)]] và cảnh báo khi có [[sigdev|sai lệch đáng kể]].'),

    H('m08-s04-h', 22, '8.4  Container Security & Supply Chain', '8.4  Bảo mật Container & Chuỗi cung ứng AI'),
    P('m08-s04-p01', 22, '[[contsecllm|Container Security for LLM Workloads]]: [[minbaseimg|Minimal base images]], [[nonroot|non-root execution]], [[rofs|read-only filesystems]], [[reslimits|resource limits]], and [[netpol|network policies]]. [[llminfcont|LLM inference containers]] often require [[gpuaccess|GPU access]], which adds complexity to isolation — [[gpusharing|GPU sharing between containers]] needs [[carefulperm|careful permission management]].',
      '[[contsecllm|Bảo mật Container cho Khối lượng công việc LLM]]: Sử dụng [[minbaseimg|base image tối giản]], [[nonroot|chạy dưới quyền non-root]], [[rofs|hệ thống tệp chỉ-đọc (read-only filesystems)]], [[reslimits|giới hạn tài nguyên]], và [[netpol|chính sách mạng (network policies)]]. [[llminfcont|Các container suy luận LLM]] thường cần [[gpuaccess|quyền truy cập GPU]], làm tăng độ phức tạp khi cô lập — [[gpusharing|việc chia sẻ GPU giữa các container]] đòi hỏi [[carefulperm|quản lý quyền hạn cực kỳ cẩn trọng]].'),
    P('m08-s04-p02', 22, '[[aisupplychain|AI Supply Chain]]: Extends beyond [[codedeps|code dependencies]] to include [[pretrainedweights|pre-trained model weights]], [[traindatasets|training datasets]], [[embmodels|embedding models]], [[vecdbs|vector databases]], and [[mcpservers|MCP servers]]. Each component requires [[provverif|provenance verification]], [[integcheck|integrity checking]], and [[vulnmon|ongoing vulnerability monitoring]].',
      '[[aisupplychain|Chuỗi cung ứng AI (AI Supply Chain)]]: Mở rộng vượt ra ngoài [[codedeps|các thư viện mã nguồn phụ thuộc]] để bao gồm cả [[pretrainedweights|trọng số mô hình tiền huấn luyện (pre-trained model weights)]], [[traindatasets|tập dữ liệu huấn luyện]], [[embmodels|mô hình nhúng (embedding models)]], [[vecdbs|cơ sở dữ liệu vector]], và [[mcpservers|các máy chủ MCP]]. Mỗi thành phần đều đòi hỏi [[provverif|xác minh nguồn gốc xuất xứ (provenance verification)]], [[integcheck|kiểm tra tính toàn vẹn]], và [[vulnmon|giám sát lỗ hổng liên tục]].'),
    P('m08-s04-p03', 22, '[[seclogging|Secure Logging]]: Balance [[compaudit|comprehensive auditability]] with [[piiprot|PII protection]]. Logs should capture [[secrelevents|security-relevant events]] ([[unusualqueries|unusual queries, guardrail triggers, tool abuse attempts]]) [[withoutfullsens|without storing the full content of sensitive user prompts]].',
      '[[seclogging|Ghi nhật ký An toàn (Secure Logging)]]: Cân bằng giữa [[compaudit|khả năng kiểm toán toàn diện]] và [[piiprot|bảo vệ dữ liệu cá nhân (PII)]]. Nhật ký cần ghi lại [[secrelevents|các sự kiện liên quan đến bảo mật]] ([[unusualqueries|truy vấn bất thường, lần kích hoạt guardrail, nỗ lực lạm dụng tool]]) [[withoutfullsens|mà không lưu trữ toàn bộ nội dung thô của các prompt người dùng nhạy cảm]].'),
    P('m08-s04-p04', 22, '[[wssec|WebSocket Security]]: For [[rtchat|real-time LLM chat applications]], secure WebSocket connections with [[tlsenc|TLS encryption]] (wss://), [[originval|origin validation]], [[authtokconn|authentication tokens per connection]], and [[msginteg|message-level integrity checks]].',
      '[[wssec|Bảo mật WebSocket]]: Đối với [[rtchat|các ứng dụng chat LLM thời gian thực]], phải bảo mật kết nối WebSocket bằng [[tlsenc|mã hoá TLS]] (wss://), [[originval|kiểm tra hợp lệ Origin]], [[authtokconn|token xác thực cho từng kết nối]], và [[msginteg|kiểm tra tính toàn vẹn ở cấp độ từng thông điệp (message-level integrity)]].'),

    P('m08-ms01', 22, '[[llmint|LLM integration]] doesn\'t replace [[tradappsec|traditional AppSec]] — it adds to it. [[tradvulns|SSRF, XSS, SQLi]] all apply.',
      '[[llmint|Tích hợp LLM]] không thay thế [[tradappsec|AppSec truyền thống]] — mà cộng thêm vào đó. [[tradvulns|SSRF, XSS, SQLi]] đều hiện diện đầy đủ.'),
    P('m08-ms02', 22, '[[ratelimiting|Rate limiting]] for LLM APIs must account for [[tokperreq|token consumption]], not just [[reqfreq|request count]].',
      '[[ratelimiting|Giới hạn tần suất]] cho LLM API phải tính đến [[tokperreq|lượng tiêu thụ token]], chứ không chỉ [[reqfreq|số lượng request]].'),
    P('m08-ms03', 22, '[[streamsec|Streaming responses]] require [[streamreal|real-time content filtering on partial outputs]].',
      '[[streamsec|Phản hồi dạng streaming]] đòi hỏi [[streamreal|lọc nội dung theo thời gian thực ngay trên các đầu ra từng phần (partial outputs)]].'),
    P('m08-ms04', 22, '[[devsecops|DevSecOps for AI]] adds [[pinjtest|prompt injection testing]] and [[behregtest|model behavior regression]] to CI/CD.',
      '[[devsecops|DevSecOps cho AI]] bổ sung [[pinjtest|kiểm thử prompt injection]] và [[behregtest|kiểm thử hồi quy hành vi mô hình]] vào CI/CD.'),
    P('m08-ms05', 22, 'The [[aisupplychain|AI supply chain]] includes [[pretrainedweights|model weights]], [[traindatasets|datasets]], [[embmodels|embeddings]], and [[mcpservers|MCP servers]] — all must be verified.',
      '[[aisupplychain|Chuỗi cung ứng AI]] bao gồm [[pretrainedweights|trọng số mô hình]], [[traindatasets|tập dữ liệu]], [[embmodels|embeddings]], và [[mcpservers|các máy chủ MCP]] — tất cả đều phải được xác minh.')
  ];

  const sections = {};

  sections['8.1'] = {
    title: 'Lỗ hổng Web Truyền thống trong Ngữ cảnh AI: SSRF · XSS (CSP) · SQL Injection · Path Traversal',
    concept: [
      { t: 'p', x: 'Các sản phẩm AI suy cho cùng vẫn là các ứng dụng phần mềm; việc tích hợp LLM không làm biến mất các lỗ hổng AppSec truyền thống mà còn biến chính LLM thành một **"Confused Deputy" sinh payload động** cho kẻ tấn công! {{ref:m08-intro}} {{ref:m08-ms01}}' },
      { t: 'h', x: 'Cơ chế Biểu hiện & Biện pháp Phòng vệ cho 4 Lỗ hổng Trọng tâm' },
      { t: 'ul', items: [
        '**1. SSRF (Server-Side Request Forgery):** Dễ xảy ra nhất khi LLM được phép gọi công cụ **tải URL hoặc gửi HTTP request** dựa trên đầu vào của người dùng hoặc do chính mô hình sinh ra. Kẻ tấn công điều khiển LLM truy cập **mạng nội bộ (`10.0.0.0/8`, `127.0.0.1`)** hoặc **Cloud Metadata Endpoint (`http://169.254.169.254/latest/meta-data/iam/...`)** để đánh cắp IAM credentials. {{ref:m08-s01-p01}}',
        '**2. XSS (Cross-Site Scripting):** Xảy ra khi giao diện web render nội dung Markdown/HTML do LLM sinh ra có chứa script thực thi mà không encode/sanitize. **Header bảo mật quan trọng nhất (most important security header)** cho ứng dụng hiển thị đầu ra LLM là **`Content-Security-Policy (CSP)`**. {{ref:m08-s01-p02}}',
        '**3. SQL Injection (Text-to-SQL):** Khi câu lệnh SQL do LLM sinh ra được thực thi trực tiếp mà không tham số hoá. Dù System Prompt có dặn "chỉ sinh câu lệnh SELECT an toàn", kẻ tấn công vẫn dùng prompt injection để ép mô hình sinh `DROP TABLE` hoặc `UNION SELECT`. Luôn dùng **parameterized queries** và **tài khoản DB đặc quyền tối thiểu (least-privilege / read-only)**. {{ref:m08-s01-p03}}',
        '**4. Path Traversal:** Khi đường dẫn tệp do LLM sinh ra được đưa thẳng vào hàm đọc/ghi tệp mà không xác thực, cho phép đọc tệp bên ngoài thư mục gốc (`../../etc/passwd`, `.env`). {{ref:m08-s01-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Chặn SSRF khi LLM gọi Tool tải URL + Header CSP chống XSS khi render đầu ra LLM', tone: 'good', lang: 'python', code: 'import ipaddress, socket\nfrom urllib.parse import urlparse\n\n# 1. Chống SSRF cho công cụ fetch_url của LLM (chặn IP nội bộ & Cloud Metadata 169.254.169.254)\ndef safe_llm_fetch(url: str):\n    parsed = urlparse(url)\n    if parsed.scheme not in ("https",) or parsed.hostname not in ALLOWED_DOMAINS:\n        raise ValueError("URL scheme or domain not in allowlist")\n    for info in socket.getaddrinfo(parsed.hostname, None):\n        ip = ipaddress.ip_address(info[4][0])\n        if ip.is_private or ip.is_loopback or ip.is_link_local:  # 169.254.0.0/16 = link-local!\n            raise PermissionError(f"Blocked SSRF attempt to internal/metadata IP: {ip}")\n    return requests.get(url, timeout=5, allow_redirects=False)\n\n# 2. Header quan trọng nhất chống XSS khi render đầu ra LLM trên trình duyệt:\nRESPONSE_HEADERS = {\n    "Content-Security-Policy": "default-src \'self\'; script-src \'self\'; object-src \'none\'; base-uri \'none\'"\n}' }
    ],
    labs: [
      { type: 'sink', title: 'Interactive Sink Lab: Thử nghiệm XSS, SQLi, Command Injection & Path Traversal từ Output của LLM', intro: 'Chọn ngữ cảnh đích (Browser HTML, SQL Database, Shell, File Path), thử các mẫu payload do LLM sinh ra và bật cơ chế xử lý an toàn để đối chiếu (Mục 8.1).' }
    ]
  };

  sections['8.2'] = {
    title: 'Bảo mật API cho LLM: OAuth 2.0 · Token-Aware Rate Limiting · Streaming Guardrails · Error Handling',
    concept: [
      { t: 'p', x: 'Điểm cuối (Endpoint) của LLM API có đặc thù khác biệt lớn so với REST API truyền thống về chi phí tính toán theo token và luồng truyền phát từng phần (streaming). Mục 8.2 quy định 4 chuẩn thiết kế bắt buộc:' },
      { t: 'ul', items: [
        '**1. Authentication (OAuth 2.0):** Cấu hình bảo mật mạnh nhất cho LLM API là **OAuth 2.0 với access token ngắn hạn (short-lived access tokens), xoay vòng refresh token (refresh token rotation), và giới hạn phạm vi quyền (scope restrictions)**. Tuyệt đối tránh nhúng API key dài hạn trong ứng dụng phía client (mobile/SPA). {{ref:m08-s02-p01}}',
        '**2. Đa chiều Rate Limiting (Token-Aware):** Giới hạn số request mỗi phút (RPM) đơn thuần là **không đủ (`insufficient`)** vì **một request duy nhất tiêu thụ hàng triệu token gây tác động nặng hơn nhiều so với hàng trăm request nhỏ**! Rate limiting cho LLM bắt buộc phải xét đủ 4 chiều: (a) **tần suất request**, (b) **lượng token tiêu thụ mỗi request (TPM)**, (c) **số kết nối đồng thời (concurrent connections)**, và (d) **chi phí mỗi tác vụ (cost per operation)**. {{ref:m08-s02-p02}} {{ref:m08-ms02}}',
        '**3. Streaming Security (SSE / WebSockets):** Khi stream phản hồi qua Server-Sent Events hoặc WebSockets, từng mảnh token được gửi về trình duyệt ngay khi sinh ra. Do đó **Guardrails / bộ lọc nội dung bắt buộc phải hoạt động theo thời gian thực trên các đầu ra từng phần (real-time on partial outputs)**, chứ không thể đợi câu trả lời hoàn tất mới kiểm tra! {{ref:m08-s02-p03}} {{ref:m08-ms03}}',
        '**4. Error Handling:** Chỉ trả về **thông báo lỗi chung (generic error messages)** cho người dùng, trong khi ghi chẩn đoán chi tiết ở phía server. Không bao giờ phơi bày **stack traces, cấu hình mô hình (model configuration), hoặc chi tiết kiến trúc nội bộ** trong phản hồi lỗi. {{ref:m08-s02-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Bộ lọc Streaming theo cửa sổ trượt (Sliding-Window Chunk Guardrail) & Xử lý lỗi an toàn', tone: 'good', lang: 'python', code: 'async def stream_llm_with_realtime_guardrail(prompt, user):\n    # Kiểm tra đồng thời RPM + Token Budget + Concurrent Streams\n    rate_limiter.enforce(user.id, est_tokens=count_tokens(prompt), max_tpm=40000, max_concurrent=3)\n    rolling_buffer = ""\n    try:\n        async for chunk in llm.astream(prompt, max_tokens=1024):\n            rolling_buffer += chunk.text\n            # Kiểm tra real-time trên partial output trước khi flush chunk về client\n            if stream_guardrail.contains_pii_or_policy_violation(rolling_buffer[-256:]):\n                yield "event: abort\\ndata: {\\"error\\": \\"Content blocked by real-time policy\\"}\\n\\n"\n                return\n            yield f"data: {json.dumps({\'delta\': chunk.text})}\\n\\n"\n    except Exception as exc:\n        logger.error("LLM internal failure", exc_info=True, extra={"user": user.id})\n        # Trả thông báo lỗi chung — KHÔNG lộ stack trace hay model config\n        yield "event: error\\ndata: {\\"error\\": \\"Service temporarily unavailable. Ref: ERR-500\\"}\\n\\n"' }
    ],
    labs: [
      { type: 'simulator', title: 'Mô phỏng Rate Limiting Đa chiều (RPM vs TPM) & Streaming Real-Time Guardrail', intro: 'Thử nghiệm kịch bản kẻ tấn công gửi ít request nhưng mỗi request ngốn hàng trăm nghìn token, đồng thời kiểm tra rò rỉ dữ liệu qua luồng SSE streaming (Mục 8.2).',
        sliders: [
          { id: 'rpm', label: 'Số request / phút của Attacker (RPM)', min: 1, max: 120, value: 8, unit: ' req/p' },
          { id: 'tokPerReq', label: 'Số token / request (Context + Max Output)', min: 500, max: 200000, step: 500, value: 120000, unit: ' tok' }
        ],
        toggles: [
          { id: 'rpmLimit', label: 'Chỉ bật giới hạn RPM truyền thống (≤ 60 req/phút)', desc: 'Không xét số token tiêu thụ trong mỗi request', value: true },
          { id: 'tpmLimit', label: 'Bật Token-Aware Rate Limit (TPM + Concurrent + Cost Cap)', desc: 'Giới hạn token/request, tổng token/phút và chi phí tối đa', value: false },
          { id: 'streamGuard', label: 'Real-time Streaming Guardrail trên Partial Outputs', desc: 'Quét cửa sổ trượt ngay khi đang stream SSE/WebSocket thay vì đợi hết câu', value: false },
          { id: 'safeErr', label: 'Generic Error Handling (ẩn Stack Trace & Model Config)', desc: 'Chỉ ghi chi tiết lỗi ở server-side log', value: false }
        ],
        compute: S => {
          const totalTok = S.rpm * S.tokPerReq;
          const gpuLoad = S.tpmLimit ? Math.min(35, Math.round(totalTok / 50000)) : Math.min(100, Math.round(totalTok / 10000));
          const streamLeakRisk = S.streamGuard ? 8 : 88;
          const reconRisk = S.safeErr ? 5 : 75;
          const alerts = [];
          if (!S.tpmLimit && S.rpm <= 60 && totalTok > 200000) {
            alerts.push(['bad', `✘ BYPASS RPM LIMIT! Chỉ với ${S.rpm} req/phút (< 60 RPM), kẻ tấn công đã đốt ${totalTok.toLocaleString()} token/phút gây cạn kiệt GPU/ngân sách. Phải bật Token-Aware Rate Limit!`]);
          } else if (S.tpmLimit) {
            alerts.push(['ok', '✔ Token-Aware Rate Limit đã chặn các request tiêu thụ token/chi phí vượt ngưỡng cho phép.']);
          }
          if (!S.streamGuard) alerts.push(['warn', '⚠ Nếu chỉ lọc sau khi phản hồi hoàn tất, người dùng đã nhìn thấy 90% nội dung nhạy cảm qua luồng SSE/WebSocket trước khi bị thu hồi!']);
          if (!S.safeErr) alerts.push(['warn', '⚠ Phản hồi lỗi đang làm lộ stack trace và cấu hình model/framework nội bộ.']);
          return {
            bars: [
              { label: 'Tải GPU & Chi phí suy luận (Token/phút)', value: gpuLoad, tone: gpuLoad > 75 ? 'bad' : gpuLoad > 40 ? 'warn' : 'ok', text: (S.tpmLimit ? 'Đã giới hạn TPM' : (totalTok / 1000).toFixed(0) + 'k tok/p') },
              { label: 'Nguy cơ lộ dữ liệu qua luồng Streaming (Partial Output)', value: streamLeakRisk, tone: streamLeakRisk > 50 ? 'bad' : 'ok' },
              { label: 'Nguy cơ lộ kiến trúc qua thông báo lỗi (Error Verbosity)', value: reconRisk, tone: reconRisk > 40 ? 'warn' : 'ok' }
            ],
            alerts
          };
        } }
    ]
  };

  sections['8.3'] = {
    title: 'DevSecOps cho AI: CI/CD · AI Pentesting · Fuzzing · Behavioral Monitoring',
    concept: [
      { t: 'p', x: 'Đường ống **DevSecOps cho AI** không thể chỉ dừng ở SAST/DAST truyền thống mà phải kiểm thử và giám sát liên tục cả hành vi xác suất của mô hình qua 4 hoạt động cốt lõi:' },
      { t: 'ul', items: [
        '**1. AI-Specific CI/CD:** Ngoài SAST/DAST, phải tích hợp thêm **kiểm thử prompt injection (prompt injection testing)**, **kiểm thử hồi quy hành vi mô hình (model behavior regression tests)**, và **xác thực guardrail (guardrail validation)** ngay trong CI/CD. Đặc biệt phải kiểm tra để đảm bảo **các hành vi an toàn vẫn được giữ nguyên qua mỗi đợt cập nhật mô hình (across model updates)**. {{ref:m08-s03-p01}} {{ref:m08-ms04}}',
        '**2. AI-Specific Pentesting:** Kiểm thử xâm nhập ứng dụng LLM phải bao gồm thêm 5 hạng mục: (a) **prompt injection testing**, (b) **jailbreak attempts**, (c) **data extraction probes (dò trích xuất dữ liệu)**, (d) **tool abuse scenarios (kịch bản lạm dụng công cụ)**, và (e) **indirect injection qua đường ống RAG**. {{ref:m08-s03-p02}}',
        '**3. Fuzzing:** Gửi tự động các đầu vào ngẫu nhiên hoặc sai định dạng (malformed) để tìm lỗi sập và lỗ hổng. Với ứng dụng LLM, phải **fuzz cả bề mặt API truyền thống (traditional API surface) LẪN ranh giới đầu vào/đầu ra của mô hình (model input/output boundaries)**. {{ref:m08-s03-p03}}',
        '**4. Monitoring (Tín hiệu chỉ báo sự cố rõ nhất):** Theo Handbook, **một đợt tăng vọt đột ngột về lượng token tiêu thụ trên mỗi request kết hợp với các mẫu đầu ra bất thường (a sudden spike in token consumption per request combined with unusual output patterns)** chính là **tín hiệu chỉ báo rõ ràng nhất của một sự cố bảo mật tiềm ẩn**! Cần thiết lập đường cơ sở hành vi (behavioral baselines) và cảnh báo khi có độ lệch lớn. {{ref:m08-s03-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Cấu hình GitHub Actions CI/CD tích hợp SAST + Promptfoo / Garak AI Security Regression Gate', tone: 'good', lang: 'yaml', code: 'name: AI-DevSecOps-Pipeline\non: [pull_request]\njobs:\n  security_gates:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: 1. Traditional SAST & Secret Scan\n        run: semgrep ci --config p/owasp-top-ten\n      - name: 2. AI Prompt Injection & Guardrail Validation\n        run: npx promptfoo@latest eval -c security-redteam.yaml --fail-on-error\n      - name: 3. Model Behavior Safety Regression (Across Model/Prompt Updates)\n        run: pytest tests/ai_safety_regression.py --max-asr=0.01\n      - name: 4. API & Model I/O Boundary Fuzzing\n        run: python scripts/fuzz_llm_boundaries.py --iterations 500' }
    ],
    labs: [
      { type: 'triage', title: 'Phân loại Hoạt động Bảo mật trong Đường ống DevSecOps cho AI', intro: 'Xếp từng kỹ thuật kiểm thử/giám sát vào đúng giai đoạn trong Mục 8.3 (AI-Specific CI/CD, AI Pentesting & Fuzzing, hoặc Production Monitoring).',
        buckets: [
          { id: 'cicd', label: 'AI-Specific CI/CD' },
          { id: 'pentest', label: 'AI Pentesting & Fuzzing' },
          { id: 'mon', label: 'Behavioral Monitoring' }
        ],
        items: [
          { text: 'Chạy tự động bộ kiểm thử hồi quy hành vi mô hình (model behavior regression tests) và xác thực guardrail để đảm bảo hành vi an toàn không bị suy giảm sau khi nâng cấp phiên bản model.', bucket: 'cicd', why: 'Thuộc AI-Specific CI/CD nhằm kiểm soát chất lượng an toàn qua các lần cập nhật model/prompt.' },
          { text: 'Thực hiện các đợt dò trích xuất dữ liệu (data extraction probes), kịch bản lạm dụng tool, tiêm nhiễm gián tiếp qua RAG và gửi đầu vào sai định dạng vào cả bề mặt API lẫn ranh giới I/O của model.', bucket: 'pentest', why: 'Kết hợp AI-Specific Pentesting và Fuzzing theo mục 8.3.' },
          { text: 'Phát hiện đợt tăng vọt đột ngột về lượng token tiêu thụ trên mỗi request đi kèm mẫu đầu ra bất thường so với đường cơ sở hành vi (behavioral baseline).', bucket: 'mon', why: 'Đây là tín hiệu chỉ báo rõ ràng nhất của một sự cố bảo mật tiềm ẩn trong phần Monitoring (mục 8.3).' }
        ] }
    ]
  };

  sections['8.4'] = {
    title: 'Bảo mật Container (GPU Isolation) · Chuỗi cung ứng AI · Secure Logging · WebSocket Security',
    concept: [
      { t: 'p', x: 'Mục 8.4 hoàn thiện bức tranh bảo mật hạ tầng và vận hành cho các khối lượng công việc (workloads) AI:' },
      { t: 'ul', items: [
        '**1. Container Security cho LLM Workloads:** Áp dụng **base image tối giản (minimal base images)**, **chạy quyền non-root**, **hệ thống tệp chỉ-đọc (read-only filesystems)**, **giới hạn tài nguyên**, và **network policies**. Điểm đặc thù của container suy luận LLM là thường cần **quyền truy cập GPU (GPU access)** — việc **chia sẻ GPU giữa các container (GPU sharing)** làm tăng độ phức tạp khi cô lập và đòi hỏi quản lý quyền hạn cực kỳ chặt chẽ (ví dụ: dùng NVIDIA MIG / giới hạn thiết bị `/dev/nvidia*` để tránh rò rỉ bộ nhớ VRAM giữa các container). {{ref:m08-s04-p01}}',
        '**2. AI Supply Chain (Chuỗi cung ứng AI mở rộng):** Không chỉ gồm thư viện code (npm/PyPI) mà mở rộng sang 5 thành phần: **trọng số mô hình tiền huấn luyện (pre-trained model weights)**, **tập dữ liệu huấn luyện (training datasets)**, **mô hình nhúng (embedding models)**, **cơ sở dữ liệu vector (vector databases)**, và **các máy chủ MCP (MCP servers)**. Mỗi thành phần đều phải được **xác minh nguồn gốc (provenance verification)**, **kiểm tra tính toàn vẹn (integrity checking)**, và **giám sát lỗ hổng liên tục**. {{ref:m08-s04-p02}} {{ref:m08-ms05}}',
        '**3. Secure Logging (Cân bằng Kiểm toán & Bảo vệ PII):** Nhật ký phải ghi nhận đầy đủ các sự kiện bảo mật (truy vấn bất thường, kích hoạt guardrail, nỗ lực lạm dụng tool) nhưng **không lưu trữ toàn bộ nội dung thô của các prompt người dùng nhạy cảm (`without storing the full content of sensitive user prompts`)**. {{ref:m08-s04-p03}}',
        '**4. WebSocket Security:** Với ứng dụng chat LLM thời gian thực, phải bảo vệ kết nối WebSocket bằng 4 lớp: (a) **mã hoá TLS (`wss://`)**, (b) **kiểm tra hợp lệ Origin (`origin validation` — chống Cross-Site WebSocket Hijacking)**, (c) **token xác thực cho từng kết nối**, và (d) **kiểm tra tính toàn vẹn ở cấp độ từng thông điệp (`message-level integrity checks`)**. {{ref:m08-s04-p04}}'
      ] }
    ],
    examples: [
      { t: 'code', title: 'Cấu hình Kubernetes Pod Hardening cho LLM Inference Container + Secure Logging Redaction', tone: 'good', lang: 'yaml', code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: llm-inference-worker\nspec:\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 10001\n  containers:\n    - name: vllm-engine\n      image: registry.internal/vllm-minimal@sha256:9f84c2...  # Provenance + digest pin\n      securityContext:\n        readOnlyRootFilesystem: true\n        allowPrivilegeEscalation: false\n      resources:\n        limits:\n          cpu: "4"\n          memory: "16Gi"\n          nvidia.com/mig-1g.10gb: 1   # Cô lập phần cứng GPU bằng MIG thay vì chia sẻ GPU thô' }
    ],
    labs: [
      { type: 'killchain', title: 'Kill-Chain: Tấn công Hạ tầng & Chuỗi cung ứng AI (Model Weights + GPU Container + WebSocket)', intro: 'Theo dõi chuỗi tấn công vào hạ tầng triển khai LLM và bật các biện pháp bảo vệ ở Mục 8.4 để chặn đứng từng bước.',
        defenses: [
          { id: 'supply', label: 'Xác minh Nguồn gốc & Toàn vẹn Chuỗi cung ứng AI (Safetensors + SHA-256)', desc: 'Kiểm tra chữ ký/hash cho model weights, datasets, embeddings, vector DB & MCP servers' },
          { id: 'cont', label: 'Hardened Container (Minimal image, Non-root, RO FS, GPU Isolation)', desc: 'Cô lập container suy luận và phân tách quyền truy cập GPU' },
          { id: 'ws', label: 'WebSocket Security (TLS wss://, Origin Validation, Per-Conn Auth, Msg Integrity)', desc: 'Chống đánh cắp phiên và giả mạo thông điệp chat thời gian thực' },
          { id: 'log', label: 'Secure Logging (Ghi sự kiện bảo mật + Ẩn nội dung Prompt nhạy cảm)', desc: 'Đảm bảo truy vết sự cố mà không biến kho log thành ổ chứa PII' }
        ],
        steps: [
          { title: 'Cài cắm Trọng số Mô hình / Embedding bị Đầu độc trong Chuỗi cung ứng', text: 'Kẻ tấn công tải lên một gói embedding model giả mạo trên kho công khai chờ hệ thống build tự động kéo về.', code: 'pull("hf.co/unverified-org/bge-large-v1.5-fast.pkl")', blockedBy: ['supply'], blockMsg: 'Quy trình AI Supply Chain Verification chặn các model không có chữ ký xuất xứ (provenance) và lệch mã băm SHA-256.' },
          { title: 'Thoát khỏi Container Suy luận qua Quyền Root & Chia sẻ GPU Lỏng lẻo', text: 'Tiến trình suy luận chạy quyền root trên hệ thống tệp cho phép ghi, tìm cách đọc vùng nhớ GPU dùng chung với container của khách hàng khác.', blockedBy: ['cont'], blockMsg: 'Container chạy non-root trên read-only filesystem với network policy chặt và phân vùng GPU cô lập đã chặn hoàn toàn nỗ lực leo thang.' },
          { title: 'Đánh cắp Phiên Chat qua Cross-Site WebSocket Hijacking (CSWSH)', text: 'Trang web độc hại mở kết nối WebSocket tới endpoint chat LLM mà không bị kiểm tra header Origin hay chữ ký thông điệp.', code: 'new WebSocket("ws://chat.ai-app.corp/stream") // thiếu TLS, thiếu Origin check', blockedBy: ['ws'], blockMsg: 'Cổng WebSocket cưỡng chế TLS (wss://), xác thực Origin hợp lệ, kiểm tra token trên từng kết nối và toàn vẹn từng bản tin.' },
          { title: 'Thu thập PII Hàng loạt từ Kho Nhật ký (Log Store Exposure)', text: 'Kẻ tấn công truy cập hệ thống log tập trung nơi lưu nguyên văn toàn bộ câu hỏi chứa thông tin y tế/tài chính của khách hàng.', blockedBy: ['log'], blockMsg: 'Secure Logging chỉ lưu siêu dữ liệu sự kiện bảo mật (guardrail triggers, tool abuse) và đã lược bỏ nội dung prompt nhạy cảm.' }
        ],
        good: 'Hạ tầng triển khai AI được bảo vệ toàn diện từ chuỗi cung ứng, container GPU, giao thức WebSocket đến hệ thống nhật ký.',
        bad: 'Thiếu kiểm soát chuỗi cung ứng và hạ tầng container/WebSocket dẫn tới xâm phạm máy chủ và lộ dữ liệu nhạy cảm.' }
    ]
  };

  /* ===== 22 CÂU HỎI ÔN TẬP & THI THỬ (17 MCQ + 5 FREE-TEXT) ===== */
  const questions = [
    // 8.1
    mq('8.1', 'Lỗ hổng Server-Side Request Forgery (SSRF) dễ xảy ra nhất trong ứng dụng LLM vào tình huống nào?', [
      'Khi mô hình chỉ thực hiện dịch văn bản ngoại tuyến không có kết nối mạng',
      'Khi LLM được phép tải URL hoặc gửi các HTTP request dựa trên đầu vào do người dùng cung cấp hoặc do chính mô hình sinh ra, khiến nó có thể bị điều khiển gọi vào mạng nội bộ hoặc cloud metadata endpoints',
      'Khi người dùng đổi giao diện sang chế độ tối (dark mode)',
      'Khi sử dụng truy vấn SQL tham số hoá'
    ], 1, 'Theo mục 8.1, SSRF dễ xảy ra nhất khi LLM được phép fetch URL hoặc tạo HTTP request dựa trên đầu vào của user hoặc do model sinh ra, cho phép kẻ tấn công truy cập tài nguyên mạng nội bộ hoặc cloud metadata endpoints.', [
      'Không có kết nối mạng hay gọi URL thì không phát sinh SSRF.',
      'Đúng — khớp chính xác với mô tả SSRF trong mục 8.1.',
      'Không liên quan.',
      'Truy vấn tham số hoá là biện pháp chống SQLi.'
    ], 'm08-s01-p01'),

    mq('8.1', 'Theo CLLMSP Handbook, HTTP security header QUAN TRỌNG NHẤT đối với các ứng dụng web hiển thị (render) đầu ra của LLM nhằm phòng chống Cross-Site Scripting (XSS) là gì?', [
      'X-Powered-By',
      'Content-Security-Policy (CSP)',
      'Accept-Language',
      'Cache-Control'
    ], 1, 'Mục 8.1 khẳng định trực tiếp: "The most important security header for applications rendering LLM output is Content-Security-Policy (CSP)."', [
      'X-Powered-By chỉ làm lộ thông tin công nghệ máy chủ.',
      'Đúng — CSP là header bảo mật quan trọng nhất để ngăn trình duyệt thực thi script trái phép từ output của LLM.',
      'Chỉ dùng để đàm phán ngôn ngữ.',
      'Chỉ dùng để điều khiển bộ nhớ đệm.'
    ], 'm08-s01-p02'),

    mq('8.1', 'Một lập trình viên xây dựng tính năng Text-to-SQL và đã viết rõ trong System Prompt: "Chỉ được sinh câu lệnh SELECT an toàn, tuyệt đối không sinh DROP hoặc UNION". Vì sao ứng dụng vẫn dính lỗ hổng SQL Injection và cách khắc phục đúng là gì?', [
      'Vì SQL không hỗ trợ câu lệnh SELECT; cần chuyển sang lưu tệp CSV',
      'Vì dù được dặn trong System Prompt, LLM vẫn có thể bị thao túng qua prompt injection để sinh truy vấn độc hại; bắt buộc phải dùng truy vấn tham số hoá (parameterized queries) và tài khoản DB đặc quyền tối thiểu (least-privilege)',
      'Vì thiếu thẻ HTML <table> ở giao diện',
      'Chỉ cần tăng Temperature lên 1.5 là hết lỗi'
    ], 1, 'Mục 8.1 giải thích rõ: ngay cả khi LLM được hướng dẫn sinh SQL an toàn, nó vẫn có thể bị thao túng bởi prompt injection để tạo truy vấn độc hại; do đó luôn phải dùng parameterized queries và least-privilege database credentials.', [
      'Sai.',
      'Đúng — giải thích đúng nguyên nhân và cả 2 biện pháp phòng vệ bắt buộc trong mục 8.1.',
      'Không liên quan.',
      'Tăng Temperature chỉ làm đầu ra ngẫu nhiên hơn.'
    ], 'm08-s01-p03'),

    mq('8.1', 'Khi đường dẫn tệp (file path) do LLM sinh ra được ứng dụng sử dụng trực tiếp để mở tệp mà không kiểm tra hợp lệ, lỗ hổng truyền thống nào sẽ phát sinh?', [
      'Cross-Site Request Forgery (CSRF)',
      'Path Traversal — cho phép truy cập tới các tệp nằm ngoài thư mục dự kiến',
      'Model Inversion',
      'ARP Spoofing'
    ], 1, 'Theo mục 8.1, khi các đường dẫn tệp do LLM sinh ra được dùng mà không qua bước kiểm tra hợp lệ (validation), kẻ tấn công có thể khai thác lỗ hổng Path Traversal để đọc/ghi tệp ngoài thư mục dự kiến.', [
      'CSRF là giả mạo yêu cầu qua trình duyệt của người dùng.',
      'Đúng — khớp nguyên văn định nghĩa Path Traversal trong mục 8.1.',
      'Model Inversion là tấn công khôi phục dữ liệu từ mô hình.',
      'ARP Spoofing là tấn công tầng mạng cục bộ.'
    ], 'm08-s01-p04'),

    fq('8.1', 'Explain how SSRF, XSS, and SQL Injection manifest in LLM applications and state the primary defense for each.', [
      ['SSRF (fetching URLs / internal or cloud metadata)', 'ssrf', 'fetch url', 'http request', 'internal network', 'cloud metadata'],
      ['XSS & Content-Security-Policy (CSP) / Encoding', 'xss', 'encoding', 'content-security-policy', 'csp'],
      ['SQLi & Parameterized queries + Least privilege', 'sql injection', 'parameterized quer', 'least-privilege']
    ], 'In LLM applications: (1) SSRF occurs when the LLM is allowed to fetch URLs or make HTTP requests from user/model input to reach internal network resources or cloud metadata endpoints (defend with strict URL allowlists and blocking internal/link-local IPs); (2) XSS occurs when model-generated scripts are rendered in a browser without proper encoding (defend with proper output encoding and a strong Content-Security-Policy [CSP] header); and (3) SQL Injection occurs when LLM-generated SQL is executed without parameterization (defend with parameterized queries and least-privilege database credentials).',
    'Tổng hợp đầy đủ cơ chế và biện pháp phòng vệ cho bộ 3 lỗ hổng truyền thống SSRF, XSS (CSP) và SQLi trong mục 8.1.', 'm08-s01-p01'),

    // 8.2
    mq('8.2', 'Phương thức xác thực nào mang lại mức độ bảo mật MẠNH NHẤT cho các LLM API theo mục 8.2?', [
      'Nhúng các API key dài hạn (long-lived API keys) trực tiếp trong mã nguồn ứng dụng phía client',
      'OAuth 2.0 với access token ngắn hạn (short-lived access tokens), xoay vòng refresh token (refresh token rotation), và giới hạn phạm vi quyền (scope restrictions)',
      'HTTP Basic Authentication gửi qua kết nối không mã hoá',
      'Xác thực hoàn toàn dựa vào địa chỉ User-Agent của trình duyệt'
    ], 1, 'Mục 8.2 nêu rõ: OAuth 2.0 với short-lived access tokens, refresh token rotation và scope restrictions mang lại bảo mật mạnh nhất cho LLM APIs; cần tránh nhúng long-lived API keys trong ứng dụng client.', [
      'Handbook cảnh báo rõ phải tránh nhúng long-lived API keys ở client.',
      'Đúng — khớp chính xác với mục 8.2.',
      'Kém an toàn và dễ lộ thông tin xác thực.',
      'User-Agent dễ dàng bị giả mạo.'
    ], 'm08-s02-p01'),

    mq('8.2', 'Vì sao giới hạn số lượng request mỗi phút (simple request-per-minute limits) là KHÔNG ĐỦ đối với các điểm cuối LLM API?', [
      'Vì các LLM API không sử dụng giao thức HTTP',
      'Vì một request duy nhất tiêu thụ hàng triệu token có tác động nặng nề hơn nhiều so với hàng loạt request nhỏ; rate limiting phải xét cả tần suất request, lượng token tiêu thụ mỗi request, số kết nối đồng thời và chi phí mỗi tác vụ',
      'Vì bộ đếm thời gian của máy chủ không tính được đơn vị phút',
      'Vì người dùng luôn chỉ gửi đúng 1 request mỗi ngày'
    ], 1, 'Mục 8.2 giải thích: giới hạn RPM đơn giản là không đủ vì một request duy nhất ngốn hàng triệu token gây tải lớn hơn nhiều request nhỏ; phải kết hợp request frequency, token consumption per request, concurrent connections và cost per operation.', [
      'Sai, hầu hết LLM API đều dùng HTTP/HTTPS.',
      'Đúng — nắm vững bản chất Token-Aware Rate Limiting trong mục 8.2.',
      'Sai.',
      'Sai.'
    ], 'm08-s02-p02'),

    mq('8.2', 'Thách thức bảo mật đặc thù khi truyền phát (streaming) phản hồi LLM qua Server-Sent Events (SSE) hoặc WebSockets là gì?', [
      'Dữ liệu truyền qua SSE tự động bị xoá mất một nửa số ký tự',
      'Bộ lọc nội dung và Guardrails bắt buộc phải xử lý các phần đầu ra từng phần (partial outputs) theo thời gian thực (in real-time) trước khi toàn bộ câu trả lời hoàn tất',
      'Trình duyệt không thể hiển thị văn bản dạng streaming',
      'Streaming tự động vô hiệu hoá mã hoá TLS'
    ], 1, 'Theo mục 8.2 (Streaming Security), khi dùng SSE hoặc WebSockets, bộ lọc nội dung phải xử lý các partial outputs trước khi có phản hồi hoàn chỉnh — guardrails phải hoạt động theo thời gian thực trên luồng streaming.', [
      'Sai.',
      'Đúng — đây là điểm mấu chốt của Streaming Security trong mục 8.2 và Module Summary.',
      'Sai.',
      'Sai, cả SSE (HTTPS) và WebSocket (WSS) đều chạy trên TLS.'
    ], 'm08-s02-p03'),

    mq('8.2', 'Nguyên tắc xử lý lỗi (Error Handling) an toàn cho ứng dụng LLM là gì?', [
      'Trả về toàn bộ stack trace, tên model, đường dẫn tệp nội bộ và câu system prompt cho người dùng để họ dễ báo lỗi',
      'Trả về thông báo lỗi chung (generic error messages) cho người dùng trong khi ghi nhật ký chẩn đoán chi tiết ở phía máy chủ; không bao giờ phơi bày stack traces, cấu hình mô hình hay kiến trúc nội bộ',
      'Tắt hoàn toàn việc ghi log lỗi ở cả máy chủ lẫn máy khách',
      'Tự động khởi động lại cơ sở dữ liệu mỗi khi người dùng nhập sai định dạng'
    ], 1, 'Mục 8.2 quy định rõ: trả về generic error messages cho người dùng, ghi detailed diagnostics ở phía server, và tuyệt đối không làm lộ stack traces, model configuration hay internal architecture details.', [
      'Làm lộ toàn bộ thông tin nhạy cảm giúp kẻ tấn công do thám hệ thống.',
      'Đúng — tuân thủ chuẩn Error Handling trong mục 8.2.',
      'Tắt log phía server sẽ không thể gỡ lỗi và điều tra sự cố.',
      'Gây từ chối dịch vụ (DoS).'
    ], 'm08-s02-p04'),

    fq('8.2', 'Why are simple request-per-minute (RPM) rate limits insufficient for LLM APIs, and what four factors must an effective LLM rate-limiting strategy consider?', [
      ['Single request consuming millions of tokens', 'single request', 'millions of tokens', 'more impactful than many small'],
      ['Request frequency & Token consumption per request', 'request frequency', 'token consumption'],
      ['Concurrent connections & Cost per operation', 'concurrent connection', 'cost per operation']
    ], 'Simple request-per-minute limits are insufficient because a single request consuming millions of tokens is far more impactful than many small requests. An effective LLM rate-limiting strategy must consider four factors: (1) request frequency, (2) token consumption per request, (3) concurrent connections, and (4) cost per operation.',
    'Kiểm tra lý do RPM truyền thống thất bại và 4 yếu tố bắt buộc của LLM Rate Limiting theo mục 8.2.', 'm08-s02-p02'),

    // 8.3
    mq('8.3', 'Ngoài SAST và DAST truyền thống, một đường ống CI/CD đặc thù cho AI (AI-Specific CI/CD) cần bổ sung thêm những bước kiểm thử nào?', [
      'Chỉ cần kiểm tra chính tả tiếng Anh của README.md',
      'Kiểm thử prompt injection (prompt injection testing), kiểm thử hồi quy hành vi mô hình (model behavior regression tests), và xác thực guardrail (guardrail validation) để đảm bảo hành vi an toàn được duy trì qua các đợt cập nhật mô hình',
      'Tự động nén ảnh PNG trên giao diện',
      'Xoá toàn bộ unit test cũ'
    ], 1, 'Mục 8.3 chỉ rõ: ngoài SAST/DAST truyền thống, cần thêm prompt injection testing, model behavior regression tests, và guardrail validation vào CI/CD nhằm đảm bảo hành vi an toàn không bị thoái lui khi cập nhật mô hình.', [
      'Không liên quan.',
      'Đúng — đầy đủ 3 thành phần bổ sung của AI-Specific CI/CD trong mục 8.3.',
      'Không liên quan đến bảo mật.',
      'Sai.'
    ], 'm08-s03-p01'),

    mq('8.3', 'Khi thực hiện Kiểm thử xâm nhập đặc thù cho ứng dụng LLM (AI-Specific Pentesting), kiểm thử viên cần bổ sung thêm những kịch bản nào ngoài pentest web thông thường?', [
      'Kiểm thử prompt injection, nỗ lực jailbreak, dò tìm trích xuất dữ liệu (data extraction probes), kịch bản lạm dụng công cụ (tool abuse scenarios), và tiêm nhiễm gián tiếp qua đường ống RAG',
      'Chỉ kiểm tra cáp nguồn của trung tâm dữ liệu',
      'Chỉ đo tốc độ tải phông chữ trên trình duyệt',
      'Thay đổi màu sắc logo công ty'
    ], 0, 'Theo mục 8.3 (AI-Specific Pentesting), pentest cho ứng dụng LLM phải bao gồm thêm: prompt injection testing, jailbreak attempts, data extraction probes, tool abuse scenarios, và indirect injection via RAG pipelines.', [
      'Đúng — liệt kê đủ 5 hạng mục pentest đặc thù cho AI trong mục 8.3.',
      'Sai.',
      'Sai.',
      'Sai.'
    ], 'm08-s03-p02'),

    mq('8.3', 'Khi áp dụng kỹ thuật Fuzzing cho một ứng dụng LLM, phạm vi cần fuzz bao gồm những đâu?', [
      'Chỉ fuzz thanh địa chỉ URL của trình duyệt',
      'Fuzz cả bề mặt API truyền thống (traditional API surface) LẪN các ranh giới đầu vào/đầu ra của mô hình (model input/output boundaries)',
      'Chỉ fuzz tệp CSS',
      'Không được phép fuzz ứng dụng AI vì mô hình sẽ quên trọng số'
    ], 1, 'Mục 8.3 nêu rõ: "For LLM applications, fuzz both the traditional API surface and the model input/output boundaries."', [
      'Quá hẹp, bỏ sót toàn bộ tầng API và mô hình.',
      'Đúng — khớp chính xác với hướng dẫn Fuzzing trong mục 8.3.',
      'Sai.',
      'Fuzzing chỉ gửi truy vấn suy luận, không làm mất trọng số đã huấn luyện.'
    ], 'm08-s03-p03', true),

    mq('8.3', 'Theo mục 8.3 (Monitoring), tín hiệu chỉ báo RÕ RÀNG NHẤT (most indicative signal) về một sự cố bảo mật tiềm ẩn trong hệ thống LLM đang vận hành là gì?', [
      'Lượng token tiêu thụ ổn định ở mức trung bình suốt 30 ngày',
      'Một đợt tăng vọt đột ngột về lượng token tiêu thụ trên mỗi request kết hợp với các mẫu đầu ra bất thường (a sudden spike in token consumption per request combined with unusual output patterns)',
      'Người dùng đăng xuất khỏi ứng dụng vào cuối giờ làm việc',
      'Hệ thống gửi thông báo bảo trì định kỳ'
    ], 1, 'Mục 8.3 khẳng định: "A sudden spike in token consumption per request combined with unusual output patterns is the most indicative signal of a potential security incident."', [
      'Đó là trạng thái hoạt động bình thường.',
      'Đúng — đây là dấu hiệu đặc trưng nhất cần nhớ để đi thi.',
      'Hành vi bình thường.',
      'Hoạt động vận hành bình thường.'
    ], 'm08-s03-p04'),

    fq('8.3', 'What AI-specific tests should be added to a CI/CD pipeline beyond traditional SAST/DAST, and what monitoring signal is most indicative of a potential LLM security incident?', [
      ['Prompt injection testing', 'prompt injection'],
      ['Model behavior regression tests & Guardrail validation', 'behavior regression', 'regression test', 'guardrail validation', 'model update'],
      ['Spike in token consumption + unusual output patterns', 'spike in token consumption', 'token consumption per request', 'unusual output pattern']
    ], 'Beyond traditional SAST/DAST, an AI-specific CI/CD pipeline should add prompt injection testing, model behavior regression tests (to ensure safety behaviors persist across model updates), and guardrail validation. In production monitoring, a sudden spike in token consumption per request combined with unusual output patterns is the most indicative signal of a potential security incident.',
    'Kết hợp kiến thức về AI-Specific CI/CD và tín hiệu cảnh báo quan trọng nhất trong Monitoring (mục 8.3).', 'm08-s03-p01'),

    // 8.4
    mq('8.4', 'Khi triển khai Container cho khối lượng công việc suy luận LLM (LLM Inference Workloads), ngoài việc dùng base image tối giản, chạy non-root, read-only filesystem, giới hạn tài nguyên và network policies, yếu tố phần cứng nào làm tăng độ phức tạp khi cô lập và đòi hỏi quản lý quyền cẩn trọng?', [
      'Bàn phím cơ của lập trình viên',
      'Quyền truy cập và chia sẻ GPU giữa các container (GPU access / GPU sharing between containers)',
      'Ổ đĩa mềm (Floppy disk)',
      'Cổng máy in song song (LPT1)'
    ], 1, 'Mục 8.4 giải thích: các container suy luận LLM thường cần quyền truy cập GPU, làm tăng độ phức tạp khi cô lập — việc chia sẻ GPU giữa các container đòi hỏi phải quản lý quyền hạn thật cẩn trọng.', [
      'Không liên quan.',
      'Đúng — đặc thù quan trọng nhất của container suy luận LLM trong mục 8.4.',
      'Không liên quan.',
      'Không liên quan.'
    ], 'm08-s04-p01'),

    mq('8.4', 'Chuỗi cung ứng AI (AI Supply Chain) mở rộng vượt ra ngoài các thư viện mã nguồn phụ thuộc (code dependencies) để bao gồm thêm những thành phần nào?', [
      'Trọng số mô hình tiền huấn luyện (pre-trained model weights), tập dữ liệu huấn luyện (training datasets), mô hình nhúng (embedding models), cơ sở dữ liệu vector (vector databases), và các máy chủ MCP (MCP servers)',
      'Chỉ bao gồm trình duyệt web của người dùng cuối',
      'Chỉ bao gồm các tệp phông chữ TrueType',
      'Không có thành phần nào khác ngoài tệp package.json'
    ], 0, 'Mục 8.4 và Module Summary nêu rõ: AI Supply Chain mở rộng ra ngoài code dependencies để bao gồm pre-trained model weights, training datasets, embedding models, vector databases, và MCP servers — tất cả đều cần xác minh nguồn gốc, kiểm tra toàn vẹn và giám sát lỗ hổng.', [
      'Đúng — liệt kê chính xác 5 thành phần mở rộng của AI Supply Chain trong mục 8.4.',
      'Sai.',
      'Sai.',
      'Sai.'
    ], 'm08-s04-p02'),

    mq('8.4', 'Nguyên tắc "Secure Logging" trong mục 8.4 giải quyết bài toán cân bằng giữa khả năng kiểm toán (auditability) và bảo vệ dữ liệu cá nhân (PII) như thế nào?', [
      'Lưu nguyên văn toàn bộ nội dung mọi prompt của người dùng vào tệp văn bản công khai',
      'Ghi lại các sự kiện liên quan đến bảo mật (truy vấn bất thường, lần kích hoạt guardrail, nỗ lực lạm dụng tool) mà KHÔNG lưu trữ toàn bộ nội dung của các prompt người dùng nhạy cảm',
      'Không ghi bất kỳ dòng nhật ký nào trên hệ thống',
      'Gửi toàn bộ nhật ký qua email cho tất cả nhân viên mỗi giờ'
    ], 1, 'Theo mục 8.4, Secure Logging cần ghi nhận các sự kiện bảo mật (unusual queries, guardrail triggers, tool abuse attempts) mà không lưu toàn bộ nội dung nhạy cảm của prompt người dùng.', [
      'Vi phạm nghiêm trọng quyền riêng tư và quy định bảo vệ dữ liệu.',
      'Đúng — cân bằng chuẩn xác giữa auditability và PII protection theo mục 8.4.',
      'Mất hoàn toàn khả năng điều tra sự cố.',
      'Làm rò rỉ dữ liệu nội bộ.'
    ], 'm08-s04-p03'),

    mq('8.4', 'Đối với các ứng dụng chat LLM thời gian thực sử dụng WebSocket, cần áp dụng bộ biện pháp bảo mật nào cho kết nối WebSocket?', [
      'Chạy qua ws:// không mã hoá và chấp nhận kết nối từ mọi tên miền (Origin: *)',
      'Mã hoá TLS (wss://), kiểm tra hợp lệ Origin (origin validation), token xác thực cho từng kết nối (authentication tokens per connection), và kiểm tra tính toàn vẹn ở cấp độ từng thông điệp (message-level integrity checks)',
      'Chỉ kiểm tra mật khẩu một lần duy nhất lúc cài đặt máy chủ',
      'Tắt toàn bộ xác thực để giảm độ trễ xuống 0ms'
    ], 1, 'Mục 8.4 quy định 4 biện pháp cho WebSocket Security: TLS encryption, origin validation, authentication tokens per connection, và message-level integrity checks.', [
      'Dễ bị nghe lén và tấn công Cross-Site WebSocket Hijacking.',
      'Đúng — nêu đủ 4 yêu cầu bảo mật WebSocket trong mục 8.4.',
      'Sai.',
      'Sai.'
    ], 'm08-s04-p04'),

    mq('8.2', 'Một ứng dụng di động gọi trực tiếp tới API của nhà cung cấp LLM bằng một API Key cố định được biên dịch cứng (hardcoded) bên trong tệp APK/IPA. Rủi ro và giải pháp kiến trúc chuẩn theo mục 8.2 là gì?', [
      'Hoàn toàn an toàn vì tệp APK đã được nén ZIP',
      'Kẻ tấn công dễ dàng dịch ngược ứng dụng để lấy cắp long-lived API key; phải chuyển sang kiến trúc xác thực OAuth 2.0 với short-lived access tokens, refresh token rotation và scope restrictions qua backend trung gian',
      'Chỉ cần đổi tên biến từ API_KEY thành SECRET_CODE là an toàn',
      'Chuyển API key sang lưu trong URL query string'
    ], 1, 'Mục 8.2 cảnh báo rõ: "Avoid long-lived API keys embedded in client applications" và khuyến nghị dùng OAuth 2.0 với short-lived access tokens, refresh token rotation, và scope restrictions.', [
      'APK rất dễ bị giải nén và dịch ngược.',
      'Đúng — áp dụng đúng nguyên tắc xác thực API của mục 8.2.',
      'Bảo mật dựa trên sự che giấu (security by obscurity) không có tác dụng.',
      'Lưu key trên URL còn làm lộ key trong access logs và lịch sử trình duyệt.'
    ], 'm08-s02-p01', true),

    fq('8.4', 'List the five AI-specific components that extend the AI supply chain beyond traditional code dependencies, and state the three security practices required for each component.', [
      ['Pre-trained model weights & Training datasets', 'model weight', 'pre-trained', 'training dataset', 'dataset'],
      ['Embedding models & Vector databases', 'embedding model', 'vector database'],
      ['MCP servers', 'mcp server'],
      ['Provenance, Integrity & Vulnerability monitoring', 'provenance', 'integrity', 'vulnerability monitoring']
    ], 'Beyond code dependencies, the AI supply chain includes five components: (1) pre-trained model weights, (2) training datasets, (3) embedding models, (4) vector databases, and (5) MCP servers. Each component requires provenance verification, integrity checking, and ongoing vulnerability monitoring.',
    'Bao quát đủ 5 thành phần mở rộng của AI Supply Chain và 3 yêu cầu kiểm soát đối với từng thành phần theo mục 8.4.', 'm08-s04-p02'),

    fq('8.2', 'What is the unique security challenge of streaming LLM responses via Server-Sent Events (SSE) or WebSockets, and how must guardrails be adapted to handle it?', [
      ['Partial outputs sent before complete response', 'partial output', 'before the complete response', 'streaming'],
      ['Real-time content filtering / guardrails', 'real-time', 'in real-time', 'operate on streaming content']
    ], 'When streaming LLM responses via Server-Sent Events (SSE) or WebSockets, partial outputs are delivered to the client before the complete response is available. Consequently, content filtering and guardrails must operate on streaming content in real-time rather than only inspecting completed responses.',
    'Nắm vững thách thức của Streaming Security và yêu cầu lọc nội dung theo thời gian thực trên partial outputs (mục 8.2).', 'm08-s02-p03', true)
  ];

  window.CLLMSP.register({ n: 8, handbook, sections, questions });
})();
