+++
author = "Le, Nhut Nam"
title = "Tấn công đối kháng trên dữ liệu đồ thị"
date = "2024-02-06"
description = "Adversarial attack on graph data."
tags = [
    "adversarial attack", "adversarial learning", "graph data", "graph neural networks"
]
toc = true
+++

## Hệ thống ký hiệu và định nghĩa tiền đề

Hệ thống ký hiệu chung được mô tả bằng bảng dưới đây

| Ký hiệu  | Mô tả  |  Tên thuật ngữ tiếng Anh  |
|---|---|---|
| ${G}$  | đồ thị nguồn |  original graph | 
| $\hat{G}$  | đồ thị đối kháng |  adversarial graph | 
| $v$  | nút |  node | 
| $e$  | cạnh |  edge| 
| $c$  | thành phần mục tiêu|  target component | 
| $y$  | nhãn xác thực |  ground truth label | 
| $\mathcal{L}$  | hàm mất mát |  loss function | 
| $f_{\theta}$  | mô hình học sâu |  deep learning model | 
| $\mathcal{Q}$  | hàm khoảng cách |  distance function | 
| $\epsilon$  |  |  ngân sách chi phí | 
| $\Phi$  | hàm hoán vị |  perturbation function | 
| $\mathcal{D}$  | bộ dữ liệu |  dataset| 

Các ký hiệu về đồ thị
- $\mathcal{G} = \\{G_i\\}_{i=1}^{N}$ đại diện một tập hợp gồm $N$ đồ thị. Mỗi đồ thị $G_i$ đại diện bởi một tập hợp các nút $V_i = \\{v_j^{(i)}\\}$ và cạnh $E_i = \\{e_j^{(i)}\\}$, Trong đó
$e_j^{(i)} = (v1_j^{(i)}, v2_j^{(i)}) \in V_i \times V_i$.

Bên trong đồ thị, cả nút và cạnh có thể được liên kết với dữ liệu bất kỳ như đặc trưng nút (node features), trọng số cạnh (edge weights), và hướng của cạnh (edge directions). Ta có một số thể loại của dữ liệu đồ thị như sau:
- Đồ thị động (dynamic graph): ký hiệu là $G^{(t)}$, là một đồ thị trong đó các nút, cạnh, đặc trưng nút, hoặc đặc trưng cạnh của nó thay đổi theo thời gian.
- Đồ thị tĩnh (static graph): ký hiệu là $G$, là một đồ thị trong đó tập nút và cạnh không thay đổi theo thời gian.
- Đồ thị có hướng (directed graph): ký hiệu $G^{(Dr)}$, là một đồ thị mà mỗi cạnh của nó có thông tin về hướng, tức là với bất kỳ cạnh có hướng nào $e_1^{(i)} = (v_1^{(i)}, v_2^{(i)}) \ne (v_2^{(i)}, v_1^{(i)}) = e_2^{(i)}$
- Đồ thị vô hướng (undirected graph): ký hiệu $G^{(Undr)}$, là một đồ thị mà mỗi cạnh của nó không có thông tin về hướng, tức là với bất kỳ cạnh có hướng nào $e_1^{(i)} = (v_1^{(i)}, v_2^{(i)}) = (v_2^{(i)}, v_1^{(i)}) = e_2^{(i)}$
- Đồ thị có thuộc tính trên cạnh (Attributed Graph on Edge): ký hiệu $G^{(A_e)}$, là một đồ thị mà một số đặc trưng được liên kết với mỗi cạnh ký hiệu là $x(e_j^{(i)}) \in \mathbb{R}^{D_{edge}}$. Đồ thị có trọng số (weighted graph) là một trường hợp đặc biệt của Attributed Graph on Edge.
- Đồ thị có thuộc tính trên nút (Attributed Graph on Node): ký hiệu $G^{(A_n)}$, là một đồ thị mà một số đặc trưng được liên kết với mỗi nút ký hiệu là $x(v_j^{(i)}) \in \mathbb{R}^{D_{node}}$.

Ta điểm qua các thiết lập học trên dữ liệu đồ thị. Chúng ta liên kết thành phần mục tiêu $c_i$ trong một đồ thị $G^{c_i} \in \mathcal{G}$ với một nhãn xác thực $y_i \in \mathcal{Y} = \\{1, 2, ..., Y\\}$. Dữ liệu $\mathcal{D}^{(ind)} = \\{(c_i, G^{c_i}, y_i)\\}_{i=1}^K$ được thể hiện bởi thành phần đồ thị mục tiêu, đồ thị chứa $c_i$, và nhãn xác thực tương ứng của $c_i$. Cụ thể, trong tác vụ phân lớp nút, $c_i$ thể hiện nút được phân loại, và $y_i$ đại diện cho nhãn của nó trong $G^{c_i}$. Dựa trên quá trình huấn luyện và kiểm tra đặc trưng, các thiết lập học có thể được chia ra thành học quy nạp (inductive learning) và học diễn dịch (transductive learning). Ta sẽ xem xét qua từng thiết lập một.

Đối với thiết lập học quy nạp (inductive learning), đây là một thiết lập máy học phổ biến nhất trong đó mô hình được huấn luyện bởi các mẫu đã được gán nhãn, và sau đó dự đoán nhãn của các mẫu chưa từng biết trong quá trình huấn luyện. Dưới thiết lập học quy nạp có giám sát (supervised inductive learning), bộ phân loại $f^{(ind)} \in F^{(ind)}: \mathcal{G} \rightarrow \mathcal{Y}$ được tối ưu hóa bởi:

$$
\mathcal{L}^{(ind)} = \dfrac{1}{K}\sum_{i=1}^{K}\mathcal{L}(f_{\theta}^{(ind)}(c_i, G^{c_i}), y_i),
$$
trong đó $\mathcal{L}(.,.)$ đại diện cho cross-entropy, $c_i$ có thể là nút, liên kết, hoặc đồ thị con của đồ thị được liên kết của nó $G^{c_i}$. **Lưu ý: hai hoặc nhiều thể hiện khác nhau, $c_1, c_2, ...$ và $c_n$ có thể được liên kết với cùng một đồ thị $G \in \mathcal{G}$**

Đối với thiết lập học diễn dịch (transductive learning), tập đồ thị kiểm tra sẽ được nhìn thấy trong suốt quá trình huấn luyện học diễn dịch. Trong trường hợp này,  bộ phân loại $f^{(tra)} \in F^{(tra)}: \mathcal{G} \rightarrow \mathcal{Y}$ được tối ưu hóa bởi:

$$
\mathcal{L}^{(tra)} = \dfrac{1}{K}\sum_{i=1}^{K}\mathcal{L}(f_{\theta}^{(tra)}(c_i, G^{c_i}), y_i),
$$

Dưới góc nhìn thống nhất, ta có thể đưa ra một hình thức thống nhất cho cả học quy nạp có giám sát và học diễn dịch có giám sát như sau:

$$
\mathcal{L}^{(.)} = \dfrac{1}{K}\sum_{i=1}^{K}\mathcal{L}(f_{\theta}^{(.)}(c_i, G^{c_i}), y_i),
$$
trong đó, $f_{\theta}^{(.)} = f_{\theta}^{(ind)}$ khi thiết lập là học quy nạp, $f_{\theta}^{(.)} = f_{\theta}^{(tra)}$ khi thiết lập là học diễn dịch.

Đối với thiết lập học không giám sát, ta hoàn toàn có thể thay thế bằng dữ liệu không có nhãn $\mathcal{D}^{(ind)} = \\{c_u, G_j\\}_{i=1}^K$, và thay thế hàm mất mát và hàm $f(c_i, G_i)$ sao cho phù hợp.

## Định nghĩa và phát biểu thống nhất

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue"> Định nghĩa 1. (Tổng quát tấn công đối kháng trên dữ liệu đồ thị - General Adversarial Attack on Graph Data)
</span>
    Cho trước một tập dữ liệu $\mathcal{D} = \{c_i, G_i, y_i\}$, sau khi hiệu chỉnh đơn giản $G_i$, ký hiệu là $\hat{G}^{c_i}$, các mẫu đối kháng $\hat{G}^{c_i}$ và $G_i$ nên giống nhau dưới các độ đo thông thường (imperceptibility metrics), nhưng hiệu suất của tác vụ đồ thị trở nên tệ hơn trước đó.
    </ol>
</div>
<br>

Những công trình hiện nay xem xét hành vi tấn công trên dữ liệu đồ thị, thường tập trung vào một số loại tấn công cụ thể với các giả định nhất định. Ta có thể hình thức hóa một cách thống nhất về bài toán tấn công đối kháng trên dữ liệu đồ thị như sau.

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue"> Định nghĩa 2. (Hình thức thống nhất của Tấn công đối kháng trên dữ liệu đồ thị - Unified Formulation of Adversarial Attack on Graph Data)
</span>
    Với $f$ có thể là bất cứ hàm tác vụ học nào trên dữ liệu đồ thị, tức là, link prediction, node-level embedding, node-level classification, graph-level embedding and graph-level classification. $\Phi(G_i)$ đại diện cho không gian hoán vị trên đồ thị gốc $G_i$, và dữ liệu $\mathcal{D}=\{(c_i, \hat{G}^{c_i}, y_i)\}_{i=1}^N$ đại diện cho các thể hiện bị tấn công. Sự tấn công có thể được mô hình như một bài toán tối ưu hóa như sau:
    $$
    \begin{align}
        \begin{aligned}
            \underset{\hat{G}^{c_i}\in \Phi(G_i)}{\max}\quad& \sum_i\mathcal{L}(f_{\theta^*}^{(.)}(c_i, \hat{G}^{c_i}, y_i))\\
            \textrm{s.t.} \quad & \theta^* = \underset{\theta}{\arg\min}\sum_j\mathcal{L}(f_{\theta}^{(.)}(c_i, \hat{G'}^{c_i}, y_i))
        \end{aligned}
    \end{align}
    $$
    </ol>
</div>
<br>

Khi $G'_j$ tương đương với $\hat{G}^{c_j}$, thì biểu thức bài toán trên thể hiện poisoning attack, trong khi $G'_j$ là gốc của $G$ mà không có sự thay đổi gì, thì biểu thức bài toán thể hiện evasion attack. 

Khi $f_{\theta}^{(.)} = f_{\theta}^{(ind)}$ thì thiết lập là học quy nạp, còn nếu $f_{\theta}^{(.)} = f_{\theta}^{(tra)}$ thì thiết lập là học diễn dịch. 

Với $\hat{G}^{c_j} \in \Phi(G)$, $(c_i, \hat{G}^{c_j})$ có thể biểu diễn thao tác nút (node manipulation), thao tác cạnh (edge manipulation), hoặc cả hai. Với bất kỳ, $\hat{G}^{c_j} \in \Phi(G)$, $\hat{G}^{c_j}$ được yêu cầu nên giống hoặc gần với đồ thị gốc $G_j$, và một độ đo tương đồng (similarity measurement) có thể được định nghĩa bởi một hàm khoảng cách tổng quát,


$$
    \begin{aligned}
        \mathcal{Q}(\hat{G}^{c_j}, G_i) < \epsilon \\
        \quad\quad\textrm{s.t.}\quad& \hat{G}^{c_j} \in \Phi(G)
    \end{aligned}
$$
trong đó, $\mathcal{Q}(.,.)$ đại diện cho hàm khoảng cách, và $\epsilon$ là một tham số thể hiện khoảng cách/ ngân sách chi phí cho mỗi mẫu.

## Hoán vị đối kháng (Adversarial perturbation)

Để phát sinh mẫu đối kháng trên dữ liệu đồ thị, chúng ta có thể hiệu chỉnh các nút hoặc các cạnh từ đồ thị gốc. Tuy nhiên, đồ thị đã hiệu chỉnh $\hat{G}$ nên "gần giống" với đồ thị gốc $G$ dựa trên các đánh giá với các độ đo đánh giá hoán vị (perturbation evaluation metrics) và duy trì khả năng "không nhận thấy được - imperceptible". Phân loại các metrics:
- Edge-level Perturbation
- Node-level Perturbation
- Structure Preserving Perturbation
- Attribute Preserving Perturbation

**Nguyên lý của đánh giá hoán vị không nhận thấy được**: Cho trước các khoảng cách đồ thị, không có nhiều thảo luận trong các nghiên cứu hiện tại về cách mà đặt một chi phí đối kháng cho tấn công trên dữ liệu đồ thị. Một số nguyên lý của các việc đánh giá hoán vị không nhận thấy được có thể tóm tắt như sau:
- Đối với đồ thị tĩnh, cả số cạnh được sửa đổi và khoảng cách giữa các vectơ đặc trưng lành tính và đối kháng phải nhỏ.
- Đối với biểu đồ động, chúng ta có thể đặt khoảng cách hoặc chi phí đối kháng dựa trên thông tin thay đổi nội tại theo thời gian. Ví dụ: bằng cách sử dụng phân tích thống kê, chúng ta có thể đạt được giới hạn trên của thông tin được xử lý trong thực tế và sử dụng thông tin này để đặt giới hạn không thể nhận thấy.
- Đối với các nhiệm vụ học tập khác nhau trên dữ liệu biểu đồ, ví dụ: phân loại nút hoặc biểu đồ, chúng ta cần sử dụng hàm khoảng cách biểu đồ phù hợp để tính toán độ tương tự giữa mẫu lành tính và mẫu đối kháng của nó. Ví dụ: chúng ta có thể sử dụng số lượng hàng xóm chung để đánh giá mức độ giống nhau của hai nút, nhưng điều này không thể áp dụng cho hai biểu đồ riêng lẻ.

## Giai đoạn tấn công (Attack stage)

Các cuộc tấn công đối kháng có thể xảy ra ở hai giai đoạn: tấn công trốn tránh (thử nghiệm mô hình) và tấn công đầu độc (huấn luyện mô hình). Nó phụ thuộc vào khả năng của kẻ tấn công trong việc gây nhiễu loạn đối kháng:
- Tấn công đầu độc (Poisoning Attack) cố gắng tác động đến hiệu suất của mô hình bằng cách thêm các mẫu đối kháng vào tập dữ liệu huấn luyện.
- Tấn công né tránh (Evasion Attack) có nghĩa là các tham số của mô hình đã huấn luyện được coi là cố định. Kẻ tấn công cố gắng tạo ra các mẫu đối kháng của mô hình đã được huấn luyện. Tấn công né tránh chỉ thay đổi dữ liệu thử nghiệm mà không yêu cầu đào tạo lại mô hình.

## Mục đích tấn công (Attack objective)

Mặc dù tất cả các cuộc tấn công đối nghịch đều sửa đổi dữ liệu, kẻ tấn công cần chọn mục tiêu hoặc mục tiêu tấn công của chúng: mô hình (model) hoặc dữ liệu (data). Trong trường hợp này, chúng ta có thể tóm tắt chúng thành mục tiêu mô hình (Model Objective) và mục tiêu dữ liệu (Data Objective).
- Mục tiêu của mô hình là tấn công một mô hình cụ thể bằng cách sử dụng nhiều cách tiếp cận khác nhau. Nó có thể là tấn công né tránh hoặc tấn công đầu độc. Kẻ tấn công muốn làm cho mô hình trở nên không hoạt động trong nhiều tình huống. Tấn công mục tiêu mô hình có thể được phân loại:
    - Gradient-based Attack
    - Non-gradient-based Attack
- Không giống như các cuộc tấn công mục tiêu mô hình, các cuộc tấn công mục tiêu dữ liệu không tấn công một mô hình cụ thể. Các cuộc tấn công như vậy xảy ra khi kẻ tấn công chỉ có quyền truy cập vào dữ liệu nhưng không có đủ thông tin về mô hình. Tổng quát, có hai thiết lập khi dữ liệu trở thành mục tiêu tấn công:
    - Model Poisoning
    - Statistic Information

## Tri thức tấn công (Attack knowledge)

Kẻ tấn công sẽ nhận được thông tin khác nhau để tấn công hệ thống. Dựa trên điều này, chúng ta có thể mô tả mức độ nguy hiểm của các cuộc tấn công hiện có.
- While-box Attack
- Grey-box Attack
- Black-box Attack

## Mục tiêu tấn công (Attack goal)

Nói chung, kẻ tấn công muốn phá hủy hiệu suất của toàn bộ hệ thống, nhưng đôi khi chúng thích tấn công một vài trường hợp mục tiêu quan trọng trong hệ thống. Dựa trên mục tiêu của cuộc tấn công, chúng ta có:
- Availability Attack -> reduce the total performance of the system.
- Integrity Attack -> reduce the performance of target instances

Tấn công tính sẵn sàng dễ phát hiện hơn tấn công toàn vẹn trong cài đặt tấn công định vị. Do đó, các nghiên cứu về tấn công sẵn có có ý nghĩa nói chung đều nằm trong bối cảnh tấn công lẩn tránh.

## Tác vụ tấn công (Attack task)


Một số tác vụ tấn công thường gặp như:
- Node-relevant Task -> node classification, node embedding.
- Link-relevant Task -> link prediction.
- Graph-relevant Task -> graph classification.


**Tài liệu tham khảo**

[1] Sun, L., Dou, Y., Yang, C., Zhang, K., Wang, J., Philip, S. Y., ... & Li, B. (2022). [Adversarial attack and defense on graph data: A survey](https://ieeexplore.ieee.org/abstract/document/9878092/). IEEE Transactions on Knowledge and Data Engineering. [Github](https://github.com/safe-graph/graph-adversarial-learning-literature), [Latest update ArXiv version](https://arxiv.org/pdf/1812.10528)