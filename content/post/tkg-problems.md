+++
author = "Le, Nhut Nam"
title = "Một số vấn đề trong bài toán dự báo đồ thị tri thức động"
date = "2023-11-15"
description = "Dự đoán tương lai, liệu nó có khả thi hay không?"
tags = [
    "temporal knowledge graphs", "temporal graphs", "temporal knowledge graph focasting", "extrapolation temporal knowledge graph completion"
]
toc = true
+++

## Các quy ước và định nghĩa tiền đề

Một đồ thị tri thức động - temporal knowledge graph hay TKG được định nghĩa như một chuỗi (sequence) của các [đồ thị tri thức]({{< relref "research/what_knowledge_graphs" >}}) ứng với một thời điểm (timestamped knowledge graphs), ta có thể ký hiệu như sau:

$$
\mathcal{G} = (\mathcal{G}_1, \mathcal{G}_2, ..., \mathcal{G}_t, ...)
$$

Một đồ thị tri thức ứng với một thời điểm $t$, $\mathcal{G}_t = \\{\mathcal{V}, \mathcal{R}, \mathcal{E}_t\\}$, thể hiện trạng thái của đồ thị tri thức tại thời điểm $t$, với một tập hợp các thực thể $\mathcal{V}$, tập hợp quan hệ $\mathcal{R}$, và tập hợp các dữ kiện $\mathcal{E}_t$ đúng đắn tại thời điểm rời rạc $t$. Tập hợp các dữ kiện $\mathcal{E}_t$ này là các bộ tứ (quadruples), ký hiệu $(s, r, o, t)$ với $s, o \in \mathcal{V}$ lần lượt là chủ thể (subject) và đối tượng (object), và $r \in \mathcal{R}$ là mối quan hệ (relationship).

<p align="center">
  <img src="https://ars.els-cdn.com/content/image/1-s2.0-S1568494621000673-gr1.jpg" />
  <br>
    <em>Ví dụ về đồ thị tri thức động.</em>
</p>

Xem xét bài toán dự đoán thực thể cho tác vụ dự báo đồ thị tri thức động, nó là một tác vụ dự đoán thực thể đối tượng bị thiếu $(s, r, ?, t + k)$ hoặc chủ thể bị thiếu $(?, r, o, t + k)$ trong một câu truy vấn, với $k \in \mathbb{N}^{+}$

## Vấn đề thiết lập bộ lọc cho các độ đo dự đoán liên kết

Các mô hình dự báo đồ thị tri thức động được đánh giá bằng cách sử dụng các độ đo (metrics) đã biết từ bài toán hoàn thiện đồ thị tri thức tĩnh (có thể xem xét là bài toán dự đoán liên kết đồ thị tri thức tĩnh, chúng ta đang treat bài toán dự đoán liên kết bị thiếu = dự đoán liên kết, maybe nó không đúng.), đó là Mean Reciprocal Rank (MRR) và Hits@k với k = 1, 3, 10. 

*Lưu ý rằng*, chúng tôi không thảo luận gì về Mean Rank vì đơn giản nó chưa đủ tốt để sử dụng như một độ đo đánh giá cho bài toán hoàn thiện đồ thị tri thức nói chung, bởi vì nó rất nhạy cảm với nhiễu.

Dựa trên các độ đo này, ta có ba thiết lập để tính toán lần lượt là: *raw*, *static filter*, *time-aware filter*.
- Thiết lập *raw*: Với mỗi bộ ba test $(s_{test}, r_{test}, o_{test})$, loại bỏ đối tượng $(s_{test}, r_{test}, ?)$, và tính toán điểm số mà mô hình gán cho mỗi thực thể $v \in \mathcal{V}$ để có thể trở thành đối tượng trong bộ ba đó, trong đó tập hợp tất cả các bộ ba khả thi $(s_{test}, r_{test}, v)$ được xem là những bộ ba bị phá vỡ (corrupted triples). Sau đó, sắp xếp điểm số theo thứ tự giảm dần, và ghi lại thứ hạng của thực thể đúng $o_{test}$. Lặp lại quá trình này bằng việc loại bỏ chủ thể ra khỏi bộ ba, $(?, r_{test}, o_{test})$. MRR là trung bình của sự tương hỗ của những thứ hạng này trên tất cả các truy vấn từ tập test, và Hits@k là tỷ lệ của những thực thể đúng được xếp hạng trong top $k$.
- Thiết lập *static filter*: Để tránh việc đếm các thứ hạng cao hơn từ những dự đoán hợp lệ khác mà dẫn đến sai sót trong các độ đo, người ta đề xuất thiết lặp lọc tĩnh hay static filter để loại bỏ tất cả những bộ ba (ngoại trừ bộ ba quan tâm) mà xuất hiện trong tập huấn luyện, xác minh, và kiểm tra từ danh sách các bộ ba bị phá vỡ (corrupted triples).
- Thiết lập *time-aware filter*: người ta thấy rằng thiết lặp lọc tĩnh không phù hợp cho bài toán dự đoán liên kết động bởi vì nó lọc bỏ tất cả các bộ ba mà chưa từng xuất hiện trong danh sách các bộ ba bị phá vỡ, bỏ qua tính xác định thời gian của các bộ dữ kiện. Và hệ quả là nó không xem xét các dự đoán của những bộ ba đó là sai. Lấy ví dụ: nếu tồn tại một truy vấn kiểm tra (Barack Obama, visit, India, 2015-01-25) và nếu tập huấn luyện tồn tại (Barack Obama, visit, Germany, 2013-01-18), bộ ba (Barack Obama, visit, Germany) được lọc bỏ cho truy vấn kiểm tra tương ứng với thiết lập lọc tĩnh, cho dù nó không đúng với thời điểm 2015-01-25. Do đó, bằng cách sử dụng thiết lập lọc ảnh hưởng thời gian (time-aware filter) mà chỉ lọc bỏ những bộ dữ kiện với cùng thời gian với truy vấn kiểm tra. Xem xét lại ví dụ này, (Barack Obama, visit, Germany, t) chỉ nên được lọc với một truy vấn kiểm tra cho trước, nếu nó có thời điểm đúng bằng 2015-01-25, và còn ngược lại thì nó vẫn nằm yên trong danh sách bộ ba bị phá vỡ.

**Vấn đề thiết lập các bộ lọc**: Hầu hết các công trình hiện nay không báo cáo một cách rõ ràng kết quả trên tất cả các thiết lập bộ lọc. Hơn nữa, thiết lập raw và static filter hoàn toàn không phù hợp với bài toán dự báo đồ thị tri thức động.

## Vấn đề dự đoán đơn bước và đa bước

Các phương pháp đề xuất cho việc thực thi dự báo thường được xem xét ở hai thiết lập phân biệt nhau, thiết lập dự đoán đơn bước (single-step prediction) và thiết lập dự đoán đa bước (multi-step prediction).

Dự đoán đơn bước (single-step prediction) có nghĩa là mô hình luôn luôn dự báo về thời điểm tiếp theo. Những dữ kiện xác thực được cung cấp trước khi dự đoán về thời điểm kế tiếp đó.

Dự đoán đa bước (multi-step prediction) có nghĩa mà mô hình dự báo nhiều hơn một bước thời gian trong tương lai. Một cách cụ thể hơn, mô hình dự đoán tất cả các thời điểm từ tập kiểm tra mà không cần bất cứ thông tin xác thực cho trước nào. Và điều đó có nghĩa là thiết lập dự báo đa bước rất thách thức vì mô hình chỉ có thể tận dụng thông tin từ những dự báo của chính nó, và tích lũy tính không chắc chắn với một số lượng tăng dần các thời điểm được dự báo.

**Vấn đề thiết lập và so sánh giữa dự đoán đơn bước và dự đoán đa bước**: Các công trình hiện nay, một số có thể thực hiện dự đoán đa bước, còn một số thì không, và một số thì có thể thực hiện cả hai. 

## Vấn đề dữ liệu thực nghiệm

Các bộ dữ liệu thực nghiệm cho bài toán dự báo đồ thị tri thức động có thể liệt kê như sau:
- ICEWS, gồm có ba phiên bản là ICEWS05-15, ICEWS14, và ICEWS18 trong đó các con số đánh dấu năm tương ứng.
- YAGO
- WIKI
- GDELT

Trong hầu hết các công trình, có những dataset với những phiên bản khác nhau được sử dụng để thực nghiệm mô hình. Từ đó, sinh ra các kết quả khác nhau, dẫn đến nhiều so sánh không khách quan. Hơn nữa, nhiều phiên bản còn có những vấn đề trong việc phân chia tập train-valid-test, dẫn đến tình trạng rò rỉ dữ liệu trong quá trình huấn luyện mô hình.


## Vấn đề sử dụng tập validation cho testing

Cũng giống như các thức huấn luyện và đánh giá mô hình học máy, để huấn luyện mô hình dự báo đồ thị tri thức động, người ta thường chia mỗi tập dữ liệu ${D}$ thành:
- tập huấn luyện (training set) ${D}_{train}$, 
- tập xác thực/ xác nhận (validation set) ${D}_{val}$, 
- và tập kiểm tra (test set) ${D}_{test}$. 

Chúng ta có một số điều kiện khi xây dựng tập dữ liệu trong quá trình huấn luyện của mô hình, quá trình đó được thực hiện trên tập training mà không sử dụng thông tin chứa trong tập tập huấn luyện hay tập kiểm tra. Tập ${D}_{val}$ có thể được sử dụng cho việc quan sát quá trình huấn luyện, và chọn lọc mô hình tốt nhất (các tham số) qua những epoch. 

Chúng ta có một số lựa chọn khác nhau trong việc sử dụng thông tin từ tập ${D}_{val}$ trong quá trình đánh giá:
- Mô hình có thể sử dụng tất cả thông tin từ tập ${D}_{train}$ trừ từ tập validation để tạo ra các dự đoán cho tập test. Điều này là nhất quán với thiết lập trong bài toán dự đoán liên kết cho đồ thị tri thức tĩnh.
- Mô hình có thể sử dụng tất cả thông tin từ tập ${D}_{train}$ và validation để tạo ra các dự đoán cho tập test. Điều này có nghĩa là, nếu như một mô hình phải trả lời một truy vấn $(s, r, ?, t)$ trong quá trình kiểm tranh, tất cả các bộ tứ từ training và validation có thể được sử dụng. Điều này nhất quán với thiết lập được sử dụng trong dự báo chuỗi thời gian.


**Vấn đề cho việc sử dụng tập xác thực cho đánh giá kiểm tra**: 
- Với thiết lập dự đoán đa bước, trong suốt quá trình kiểm tra, một số mô hình không sử dụng thông tin từ tập ${D}_{val}$, trong khi một số khác thì có sử dụng. 
- Việc không sử dụng thông tin từ tập xác thự dẫn đến một tác vụ thật sự khó khăn, vì mô hình cần phải dự báo nhiều bước trong tương lai: Thay vì bắt đầu dự đoán một thời điểm kế tiếp chưa biết $t+1$ cho mẫu tập kiểm tra đầu tiên, mô hình cần phải sẵn sàng dự đoán thời điểm $t + n_{val} + 1$ với $n_{val}$ là số lượng bước nhảy thời gian trong tập xác thực, vì khoảng trống thông tin (information gap) giữa tập training và testing.


## What's next? Làm gì tiếp theo?

Chúng ta cần:
- Thống nhất thiết lập bộ lọc
- Thống nhất đánh giá ở thiết lập đơn bước hay đa bước
- Thống nhất phiên bản tập dữ liệu thực nghiệm
- Thống nhất việc sử dụng các tập train, val, và test


**Tài liệu tham khảo**

[1] Gastinger, J., Sztyler, T., Sharma, L., Schuelke, A., & Stuckenschmidt, H. (2023, September). Comparing Apples and Oranges? On the Evaluation of Methods for Temporal Knowledge Graph Forecasting. In Joint European Conference on Machine Learning and Knowledge Discovery in Databases (pp. 533-549). Cham: Springer Nature Switzerland.