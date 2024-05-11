+++
author = "Le, Nhut Nam"
title = "Phòng thủ đối kháng trên dữ liệu đồ thị"
date = "2024-02-06"
description = "Adversarial defense on graph data."
tags = [
    "adversarial defense", "adversarial learning", "graph data", "graph neural networks"
]
toc = true
+++

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


## Huấn luyện đối kháng

Trong khi việc huấn luyện đối kháng đã được những kẻ tấn công sử dụng rộng rãi để thực hiện hành vi xâm nhập đối kháng hiệu quả, thì những người phòng thủ có thể sử dụng thanh kiếm tương tự để cải thiện độ mạnh mẽ của mô hình của họ trước các cuộc tấn công đối kháng. Trong thiết lập đồ thị, chúng ta xây dựng mục tiêu phòng thủ đối phương bằng cách sửa đổi một chút công thức thống nhất của chúng ta đã biết về các cuộc tấn công đối kháng:

$$
\underset{\theta}{\min}\underset{\hat{G}^{c_i}\in \Phi(G_i)}{\max}\sum_i\mathcal{L}(f_{\theta^*}^{(.)}(c_i, \hat{G}^{c_i}, y_i))
$$

Ý tưởng là tối ưu hóa hai module cạnh tranh trong quá trình huấn luyện, trong đó kẻ tấn công cố gắng tối đa hóa tổn thất theo định hướng nhiệm vụ bằng cách tạo ra các hoán vị đối kháng $\hat{G}$ trên đồ thị, và người phòng thủ cố gắng cực tiểu hóa cùng độ lỗi bằng học tham số mô hình $\theta$ bền vững hơn dưới ảnh hưởng các hoán vị đối kháng. Bằng cách này, mô hình đồ thị đã học được kỳ vọng sẽ có khả năng chống lại các cuộc tấn công đối kháng trong tương lai. Chúng ta có thể phân loại huấn luyện đối kháng dựa trên loại hoán vị:
- Structure Perturbations
- Attribute Perturbations
- Attack-oriented Perturbation

## Phát hiện tấn công

Thay vì tạo ra các cuộc tấn công đối kháng trong quá trình huấn luyện, một cách phòng thủ hiệu quả khác là phát hiện và loại bỏ (hoặc giảm tác động của) các cuộc tấn công, với giả định rằng dữ liệu đã bị ô nhiễm. Do tính phức tạp của dữ liệu biểu đồ, cấu trúc kết nối và các tính năng phụ trợ có thể được tận dụng dựa trên nhiều nguyên tắc đặc biệt nhưng trực quan khác nhau để phân biệt cơ bản dữ liệu sạch với dữ liệu độc hại và chống lại một số loại tấn công nhất định. Các công trình hiện nay tập trung phát hiện và loại bỏ tấn công ở các gia đoạn:
- Graph Preprocessing
- Model Training
- Robustness Certification
- Complex Graphs

## Các phương pháp khác

Một số phương pháp khác:
- Data Modifications
- Model Modifications
- Hybrid Modifications

**Tài liệu tham khảo**

[1] Sun, L., Dou, Y., Yang, C., Zhang, K., Wang, J., Philip, S. Y., ... & Li, B. (2022). [Adversarial attack and defense on graph data: A survey](https://ieeexplore.ieee.org/abstract/document/9878092/). IEEE Transactions on Knowledge and Data Engineering. [Github](https://github.com/safe-graph/graph-adversarial-learning-literature), [Latest update ArXiv version](https://arxiv.org/pdf/1812.10528)