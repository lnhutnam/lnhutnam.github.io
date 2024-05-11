+++
author = "Le, Nhut Nam"
title = "Tổng quan về Neuro-Dynamic Programming (NDP)"
date = "2024-02-17"
description = "Kiểm soát và tạo ra chuỗi quyết định dưới điều kiện không chắc chắn."
tags = [
    "neuro-dynamic programming", "dynamic programming", "stochastic control", "decision making", "reinforcement learning", "approximation"
]
toc = true
+++

Neuro-dynamic programming (NDP) là một lớp phương pháp quy hoạch động (dynamic programming - dp) mới dùng cho việc kiểm soát và đưa ra chuỗi các quyết định dưới điều kiện không chắc chắn, mà được nhận định rằng có tiềm năng trong việc giải quyết với các bài toán khó do không gian trạng thái (state space) khổng lồ hay tính chính xác kém của mô hình.

Đây là một lĩnh vực nghiên cứu giao thoa giữa nhiều lĩnh vực khác như mạng nơ-ron (neural networks), khoa học thần kinh (cognitive science), mô phỏng (simulation), và lý thuyết xấp xỉ (approximation theory).

Xem xét một hệ thống mà trong đó những quyết định (decisions) được đưa ra trong các bước hoạt động (stages). Đầu ra của mỗi quyết định không thể được dự đoán hoàn chỉnh nhưng có thể được ước lượng đến một mức nào đó cho đến khi quyết định kế tiếp được đưa ra. (Những) Kết quả của mỗi quyết định không chỉ gây ra những chi phí (cost) nhất định ở hiện tại mà cũng tác động đến ngữ cảnh mà ở đó những quyết định tương lai được đưa ra và do đó sinh ra chi phí trong những bước ở tương lai. *Quy hoạch động cung cấp một mô hình toán học của sự đánh đổi giữa chi phí hiện tại và tương lai*.

## Tổng quan

Tổng quát, trong mô hình toán DP, ta có một hệ động lực (dynamic system) rời rạc (discrete-time) mà trạng thái của nó phát triển theo xác suất chuyển (transition probabilities) nhất định mà phụ thuộc vào một quyết định/ kiểm soát $u$. 

Cụ thể, nếu ta ở trong trạng thái $i$, và chọn quyết định $u$, ta di chuyển đến trạng thái $j$ với xác suất cho trước $p_{ij}(u)$. Hệ quả là chuyển dịch này, ta tạo một chi phí $g(i, u, j)$.  Để so sánh, những quyết định sẵn có $u$ là không đủ để thấy được độ lớn của hàm chi phí $g(i, u, j)$; ta phải tính đến trạng thái mong đợi kế tiếp $j$ như thế nào. Do đó, ta cần một cách để xấp hạng hay đánh giá trạng thái $j$. Điều này hoàn toàn thực hiện được bằng cách sử dụng chi phí tối ưu (optimal cost) trên tất cả trạng thái còn lại bắt đầu từ trạng thái $j$, gọi là $J^*(j)$. Những chi phí này có thể chứng minh rằng thỏa mãn một số dạng của *đẳng thức Bellman (Bellman's equation)*

$$
J^*(i) = \underset{u}{\min}E\\{g(i, u, j) + J^\*(j) \mid i, u\\}, \quad\text{for all } i,
$$

trong đó $j$ là trạng thái kế tiếp của $i$, và $E\\{. \mid i, u\\}$ đại diện cho giá trị kỳ vọng tương ứng với $j$ với $i$ và $u$ cho trước. Tổng quát mà nói, điều này có nghĩa là tại trạng thái $i$, nó là tối ưu để sử dụng một quyết định $u$ mà đạt được cực tiểu trên. Do đó, những quyết định được xếp hạng dựa trên tổng của chi phí kỳ vọng của thời điểm hiện tại, và chi phí kỳ vọng tối ưu của tất cả các thời điểm kế tiếp.

Mục tiêu của DP là tính toán số học hàm chi phí tối ưu $J^\*$. Việc tính toán này có thể hoàn thành ngoại tuyến (offline), tức là trước khi hệ thống thực khởi động vận hành. Một chính sách tối ưu (optimal policy) là một lựa chọn tối ưu (optimal choice) của $u$ với mỗi $i$ được định toán đồng thời với $J^*$, hoặc trong thời gian thực bằng cách cực tiểu vế phải của đẳng thức Bellman. Điều này rất dễ thấy, tuy nhiên trong nhiều bài toán quan trọng mà tính toán cần sử dụng của DP là quá lớn (overwhelming) gây ra bởi một lượng lớn các trạng thái và quyết định. Trong những tình huống đó, hoàn toàn có thể giải quyết bằng cách tìm một lời giải dưới tối ưu (sub-optimal).


## Xấp xỉ chi phí trong quy hoạch động

Các phương pháp NDP là những phương pháp dưới tối ưu (suboptimal method) mà trọng tâm xoay quanh đánh giá xấp xỉ hàm chi phí tối ưu $J^\*$, một hoàn khả thi thông quan việc sử dụng mạng neural và/ hay mô phỏng. 

Cụ thể, ta thay thế hàm chi phí tối ưu $J^\*(j)$ bằng một xấp xỉ $\widetilde{J}(j, r)$, trong đó $r$ là một vector tham số, và ta sử dụng tại trạng thái $i$ một kiểm soát (dưới tối ưu) $\widetilde{u}(i)$ mà đạt được cực tiểu (xấp xỉ) trong vế trái của đẳng thức Bellman:

$$
\widetilde{u}(i) = \arg\underset{u}{\min}E\\{g(i, u, j) + \widetilde{J}(j, r) \mid i, u\\},
$$

Hàm $\widetilde{J}$ được gọi là *hàm tính điểm (scoring function)*, và giá trị $\widetilde{J}(j, r)$ được gọi *điểm (score)* của trạng thái $j$. Tổng quát, dạng của $\widetilde{J}$ đã biết và sao cho một vector tham số $r$ tất định, đánh giá $\widetilde{J}(j, r)$ của bất kỳ trạng thái $j$ nào là khá đơn giản.

Ta lưu ý rằng trong một số bài toán cực tiểu hóa trên kiểm soát $u$ của khai triển:
$$
E\\{g(i, u, j) + \widetilde{J}(j, r) \mid i, u\\},
$$
**là quá phức tạp** hoặc quá **tốn thời gian** cho việc đưa ra quyết định trong thời gian thực, cho dù nếu điểm $\widetilde{J}(j, r)$ đã được tính toán một cách đơn giản. Thế nên, trong các bài toán như thế ta sử dụng một kỹ thuật liên hệ (related technique) trong đó ta xấp xỉ khai triển cần được tối ưu trong đẳng thức Bellman,

$$
Q(i, u) = E\\{g(i, u, j) + {J}^\*(j, r) \mid i, u\\},
$$
mà được gọi là *Q-factor (Nhân tử Q) tương ứng với $(i, u)$*.

Cụ thể, ta thay thế $Q(i, u)$ với một xấp xỉ $\widetilde{Q}(i, u, r)$ với $r$ là một vector tham số. Sau đó, sử dụng kiểm soát (dưới tối ưu) tại trạng thái $i$ mà cực tiểu được xấp xỉ *Q-factor* tương ứng với $i$:

$$
\widetilde{u}(i) = \arg\underset{u}{\min}\widetilde{Q}(i, u, r)
$$

Phần lớn những gì sẽ được nói về việc xấp xỉ của hàm chi phí tối ưu (optimal cost function) cũng áp dụng việc xấp xỉ của *Q-factor*. Trong thực hành, ta sẽ thấy *Q-factor* được xem là chi phí tối ưu của một bài toán liên quan. Do đó, ta tập trung chính vào việc xấp xỉ hàm chi phí tối ưu $J^\*$.

Điều mà ta quan tâm đến trong các bài toán mà có một số lượng lớn trạng thái và trong hàm tính điểm $\widetilde{J}$ mà có thể được mô tả với một số lượng ít hơn (một vector $r$ với số chiều nhỏ). Các hàm tính điểm phát triển với một số lượng tham số ít được gọi là các *đặc trưng compact (compact representations)*, trong khi bảng mô tả của $j^\*$ được gọi là *bảng đặc trưng tìm kiếm (lookup table representations)*. Và do đó, trong một compact representation, chỉ một vector $r$ và cấu trúc tổng quát của hàm $\widetilde{J}(\cdot, r)$ là được lưu trữ; điểm $\widetilde{J}(j, r)$ được phát sinh chỉ khi cần thiết.

Lấy ví dụ về vai trò của các thành phần vừa đề cập, $\widetilde{J}(j, r)$ có thể là bất kỳ đầu ra của một số mạng neural nào tương ứng với đầu vào $j$, và $r$ là một vector liên hệ với các trọng số hoặc tham số của mạng neural; hay $\widetilde{J}(j, r)$ có thể phát sinh một mô tả thấp chiều hơn của trạng thái $j$ trong thuật ngữ "đặc trưng có ý nghĩa - significant features" của nó, và $r$ là vector liên hệ của trong số tương đối của các đặc trưng. 

Thế nên, trong việc quyết định hàm tính điểm $\widetilde{J}(j, r)$ nảy sinh hai vấn đề mới:
- **Vấn đề 1**: quyết định cấu trúc chung của hàm $\widetilde{J}(j, r)$.
- **Vấn đề 2**: tính toán vector tham số $r$ để giảm thiểu sai số giữa các hàm $J^\*(\cdot)$ và $\widetilde{J}(\cdot, r)$

Xấp xỉ gần đúng của hàm chi phí tối ưu đã được sử dụng trước đây trong nhiều bối cảnh DP khác nhau. Các chương trình chơi cờ là một ví dụ thành công. Ý tưởng chính trong các chương trình này là sử dụng *bộ đánh giá vị trí - position evaluator* để xếp hạng các vị trí quân cờ khác nhau và chọn mỗi lượt một nước đi dẫn đến vị trí có thứ hạng tốt nhất. Người đánh giá vị trí chỉ định một giá trị số cho từng vị trí, theo công thức heuristic bao gồm trọng số cho các đặc điểm khác nhau của vị trí (cân bằng tài nguyên, tính cơ động của quân cờ, độ an toàn của quân vua và các yếu tố khác). Do đó, bộ đánh giá vị trí tương ứng với hàm tính điểm $\widetilde{J}(j, r)$, trong khi trọng số của các đặc trưng tương ứng với vector tham số $r$. Thông thường, một số cấu trúc tổng quát của bộ đánh giá vị trí được lựa chọn, và các trọng số số học được chọn bằng cách thử và sai hay "huấn luyện" bằng một lượng lớn mẫu có sẵn.

Như mô hình chương trình cờ vua gợi ý, trực giác (intuition) về vấn đề, heuristics, thử và sai (trial and error) là những thành phần quan trọng để xây dựng các xấp xỉ chi phí trong DP. Tuy nhiên, điều quan trọng là phải bổ sung phương pháp heuristics và trực giác bằng các kỹ thuật có hệ thống hơn, có thể áp dụng rộng rãi và giữ lại càng nhiều càng tốt các khía cạnh phi heuristic của DP.

**NDP nhắm đến việc phát triển nền tảng phương pháp luận cho vấn đề kết hợp quy hoạch động (dynamic programming), đặc trưng compact (compact representations) và mô phỏng (simulation) để cung cấp cơ sở cho cách tiếp cận hợp lý đối với các bài toán quyết định ngẫu nhiên phức tạp (complex stochastic decision problems).**

## Kiến trúc xấp xỉ

Một vấn đề quan trọng trong xấp xỉ hàm là *lựa chọn kiến trúc (selection of architecture)*. Đó là lựa chọn một lớp hàm tham số hóa $\widetilde{J}(\cdot, r)$ hay $\widetilde{Q}(\cdot, \cdot, r)$ mà phù hợp với bài toán đang xem xét. Một phương án khả thi là sử dụng một khiến trúc mạng neural nào đó. Ta nên nhấn mạnh rằng việc sử dụng thuật ngữ "mạng neural" trong một ngữ cảnh tổng quát, và bản chất là một từ đồng nghĩa với "kiến trúc xấp xỉ - approximation architecture". Cụ thể, ta không tự giới hạn về cấu trúc multilayer perceptron với kích hoạt sigmoid truyền thống. Bất kỳ bộ xấp xỉ tổng quát (universal approximator) nào của các ánh xạ phi tuyến đều có thể được sử dụng trong ngữ cảnh này. Bản chất của cấu trúc xấp xỉ được mở ra trong nhiều thảo luận, và nó còn phát triển, lấy ví dụ: radial basis functions, wavelets, polynomials, hay splines, ...

Xấp xỉ chi phí có thể thường được tăng cường đáng kể thông qua việc sử dụng *rút trích đặc trưng (feature extraction)*, một quá trình mà ánh xạ trạng thái $i$ về một số vector $f(i)$, được gọi là *vector đặc trưng - feature vector* liên kết với trạng thái $i$. Nội dung phản ánh của những vector đặc trưng theo một ý nghĩa heuristic đó là thông tin nào có thể được xem xét là đặc trưng quan trọng của trạng thái, và chúng rất hữu dụng trong việc kết hợp tri thức tiên nghiệm (prior knowledge) hay trực giác (intuition) về bài toán và về cấu trúc của bộ kiểm soát tối ưu. Một ví dụ, trong hệ thống xếp hàng bao gồm nhiều hàng đợi, một vectơ đặc trưng có thể liên hệ cho mỗi hàng đợi một bộ chỉ số có ba giá trị (three-value indicator), xác định xem hàng đợi "gần như trống - nearly empty", “bận vừa phải - moderately busy" hay “gần như đầy - “nearly full”. Trong nhiều trường hợp, việc phân tích có thể bổ sung trực giác để đề xuất các đặc trưng phù hợp cho bài toán hiện tại.

Các vector đặc trưng phần nào hữu ích giúp ta trong việc nắm bắt "các phi tuyến thống trị - dominant nonlinearities" trong hàm chi phí tối ưu $J^\*$. Có nghĩa là $J^\*$ có thể được xấp xỉ tốt bởi một "relatively smooth" function $\widetilde{J}(f(i))$; 
Ví dụ, nếu thông qua sự thay đổi các biến từ trạng thái sang đặc trưng, thì hàm $J^\*$ bởi thành một hàm (gần như) tuyến tính (linear) hoặc hàm đa thức bậc thấp (low-order polynomial function) của các đặc trưng. Khi một vector đặc trưng có thể được chọn để có tính chất này, người ta có thể xem xét các kiến trúc xấp xỉ trong đó cả đặc trưng và mạng neural (tương đối đơn giản) được sử dụng cùng nhau. Cụ thể, trạng thái được ánh xạ vào một vector đặc trưng, sau đó được sử dụng làm đầu vào cho mạng neural tạo ra điểm số của trạng thái. Tổng quát hơn, có thể cả trạng thái và vector đặc trưng đều được cung cấp làm đầu vào cho mạng neural.

Một phương pháp đơn giản để có được các xấp xỉ gần đúng phức tạp hơn (sophisticated approximations), là phân chia không gian trạng thái thành nhiều tập hợp con và xây dựng một xấp xỉ gần đúng hàm chi phí riêng biệt trong mỗi tập hợp con. Ví dụ: bằng cách sử dụng xấp xỉ gần đúng đa thức tuyến tính (linear approximation) hoặc bậc hai (quadratic polynomial approximation) trong mỗi tập hợp con của phân vùng, người ta có thể xây dựng các xấp xỉ gần đúng tuyến tính hoặc bậc hai từng phần trên toàn bộ không gian trạng thái. Một vấn đề quan trọng ở đây là việc lựa chọn phương pháp phân hoạch không gian trạng thái. Các phân hoạch chính quy (regular partitions) (ví dụ: phân hoạch lưới - grid partitions) có thể được sử dụng, nhưng chúng thường dẫn đến một số lượng lớn các tập hợp con và tính toán rất tốn thời gian. Nói chung, mỗi tập hợp con của phân hoạch phải chứa các trạng thái "tương đồng" sao cho sự biến đổi của chi phí tối ưu trên các trạng thái của tập hợp con tương đối trơn tru (relatively smooth) và có thể xấp xỉ bằng các hàm trơn (smooth functions). Một khả năng thú vị là sử dụng các đặc trưng làm cơ sở cho việc phân hoạch. Cụ thể, người ta có thể sử dụng sự rời rạc hóa (discretization) ít nhiều đều đặn đối với không gian của các đối tượng, điều này gây ra sự phân chia có thể không đều của không gian trạng thái ban đầu. Bằng cách này, mỗi tập hợp con của phân hoạch không đều chứa các trạng thái có “đặc trưng tương tự”.

## Mô phỏng và huấn luyện

Một số những ứng dụng thành công của mạng neural là trong lĩnh vực nhận dạng mẫu (pattern recognition), hồi quy phi tuyến (nonlinear regression), và hệ xác minh phi tuyến (nonlinear system identification). Trong những ứng dụng vừa kể trên, vai trò của mạng neural như một bộ xấp xỉ tổng quát (universal approximator): ánh xạ input-output của mạng khớp với ánh xạ phi tuyến $F$ bằng một tối ưu bình phương tối tiểu (least-squares optimization). Quá trình tối ưu đó được gọi là *huấn luyện mạng (training the network)*. Để thực hiện quá trình huấn luyện, ta **cần phải có dữ liệu**, tức một tập hợp các cặp $(i, F(i))$ mà thể hiện ánh xạ $F$ cần được xấp xỉ.

Một lưu ý quan trọng là ngược lại với những ứng dụng của mạng neural, trong ngữ cảnh DP thì **không có tập dữ liệu input-output sẵn có** $(i, J*^\*(i))$ mà dùng để xấp xỉ $J^\*$ với một kỹ thuật khớp bình phương tối tiểu. Phương pháp khả thi duy nhất là **đánh giá (chính xác hoặc xấp xỉ)** bằng cách *mô phỏng (simulation)* các hàm chi phí của các chính sách (dưới tối ưu) cho trước và cố gắng cải thiện lặp đi lặp lại các chính sách này dựa trên kết quả mô phỏng. Điều này tạo ra những khó khăn về phân tích và tính toán mà không phát sinh trong ngữ cảnh huấn luyện mạng neural cổ điển. Thật sự, việc sử dụng mô phỏng để đánh giá xấp xỉ hàm chi phí tối ưu là một ý tưởng mới quan trọng, giúp phân biệt phương pháp được đề cập trong bài với các phương pháp xấp xỉ trước đó có trong DP. 

Việc sử dụng mô phỏng cung cấp một lợi ích khác. **Nó cho phép những phương pháp mà ta đề cập được sử dụng cho các hệ thống mà khó để mô hình hóa nhưng lại dễ dạng để mô phỏng**; đó là, trong một số bài toán mà một mô hình tương mình không hề có sẵn, và hệ thống chỉ có thể được quan sát hoặc trong lúc nó vận hành theo thời gian thực hoặc thông qua một phần mềm mô phỏng. Với các bài toán như thế, các kỹ thuật DP truyền thống là không khả thi, và việc ước lượng của xác xuất chuyển để xây dựng một mô hình toán học thường rất phức tạp hoặc không khả thi.

Có một lợi thế tiềm năng thứ ba của việc mô phỏng. **Nó có thể ngầm xác định các trạng thái “quan trọng nhất - most important” hoặc “tiêu biểu nhất - “most representative” của hệ thống**. Có vẻ hợp lý rằng nếu những trạng thái này là những trạng thái được truy cập thường xuyên nhất trong quá trình mô phỏng thì hàm tính điểm sẽ có xu hướng ước tính tốt hơn chi phí tối ưu cho các trạng thái này và chính sách dưới tối ưu thu được sẽ hoạt động tốt hơn.

## Neuro-Dynamic Programming (NDP)

Tên gọi *neuro-dynamic programming* thể hiện mối liên hệ giữa DP và neural network. Trong AI, cái tên *reinforcement learning* cũng được sử dụng. Trong những thuật ngữ AI nói chung, những phương pháp mà cho phép hệ thống "học để tạo ra những quyết định tốt bằng cách quan sát hành vi của chính nó, và sử dụng một cơ chế nội tại để cải thiện hành động của chúng thông qua một cơ chế tăng cường". Trong thuật ngữ toán học hơn, "quan sát hành vi của chính chúng" liên hệ đến mô phỏng - simulation, và "cải thiện hành động của chúng thông qua một cơ chế tăng cường" liên hệ đến lược đồ lặp (iterative schemes) cho việc cải thiện chất lượng của xấp xỉ của hàm chi phí tối ưu, hay Q-factor, hay chính sách tối ưu - optimal policy. Đã dần dần nhận ra rằng các kỹ thuật học tăng cường có thể được thúc đẩy và giải thích một cách hiệu quả theo các khái niệm DP cổ điển như lặp giá trị và chính sách.

> [SuB98] Sutton, R. S., and Barto, A. G., 1988. Reinforcement Learning, MIT Press, Cambridge, MA.

Hai thuật toán DP cơ sở, policy iteration và value iteration là những điểm bắt đầu cho phương pháp NDP. Việc điều chỉnh đơn giản nhất của phương pháp lặp chính sách (policy iteration) hoạt động như sau:
- Bước 1: Bắt đầu với một chính sách cho trước, tức là một số luật cho việc chọn lựa một quyết định $u$ ở mỗi trạng thái khả thi $i$.
- Bước 2: Đánh giá một cách xấp xỉ chi phí mà chính sách (như một hàm của trạng thái hiện tại) bởi khớp bình phương tối tiểu một hàm tính điểm $\widetilde{J}(\cdot, r)$ để cho ra được kết quả của các quỹ đạo của những hệ thống được mô phỏng mà sử dụng chính sách đó.
- Bước 3: Định nghĩa chính sách mới bằng cách cực tiểu đẳng thức Bellman, trong đó chi phí tối ưu được thay thế bằng hàm tính điểm đã được tính toán.
- Bước 4: Lặp lại quá trình bằng cách quay lại từ Bước 1.

> [BeT96] Bertsekas, D. P., and Tsitsiklis, J. N., 1996. Neuro-Dynamic Programming, Athena Scientific, Belmont, MA.

Phương pháp xấp xỉ lặp chính sách (approximate policy iteration) được mô tả phía trên tính toán nhiều quỹ đạo mẫu được mô phỏng trước thay đổi vector tham số $r$ của hàm tính điểm $\widetilde{J}(j, r)$. Một phương pháp NDP khác hiệu chỉnh vector tham số $r$ này thường xuyên hơn, nó thực hiệu lấy mẫu các quỹ đạo trạng thái

$$
(i_0, i_1, \dots, i_k, i_{k+1}, \dots)
$$

Những quỹ đạo này tương ứng với một chính sách cố định hoặc một chính sách "vét cạn" mà được áp dụng ở trạng thái $i$, kiểm soát $u$ mà cực tiểu khai triển
$$
E\\{g(i, u, j) + \widetilde{J}(j, r) \mid i, u\\}
$$
trong đó $r$ là vector tham số hiện tại. Trọng tâm ở đây là kí hiệu của *sai khác tạm thời - temporal difference*, được định nghĩa bởi
$$
d_k = g(i_k, u_k, i_{k+1}) + \widetilde{J}(i_{k+1}, r) - \widetilde{J}(i_{k}, r)
$$
và nó thể hiện sự sai khác giữa ước lượng chi phí kỳ vọng $\widetilde{J}(i_{k}, r)$ ở trạng thái $i_k$, và ước lượng chi phí dự đoán $g(i_k, u_k, i_{k+1}) + \widetilde{J}(i_{k+1}, r)$ dựa trên đầu ra của quá trình mô phỏng. Nếu chi phí xấp xỉ là đúng, trung bình của sai khác tạm thời sẽ bằng 0 bởi đẳng thức Bellman. Do đó, giá trị của các sai khác tạm thời có thể được sử dụng để tạo ra một hiểu chỉnh tăng dần cho $r$ mà đảm bảo một xấp xỉ cân bằng (về mặt trung bình) giữa ước lượng chi phí kỳ vọng và ước lượng chi phí dự đoán theo những quy đạo được mô phỏng.

Một số công trình liên quan về technique TD learning:
- Với góc nhìn được hình thức hóa bởi Sutton, có thể được cài đặt thông qua việc sử dụng phương pháp gradient descent/stochastic approximation. Với công trình này, một họ các phương pháp được đề xuất, được gọi là $\text{TD}(\lambda)$, được tham số hóa bởi một scalar $\lambda \in [0, 1]$. Cực đại $\text{TD}(1)$ liên hệ đến lặp chính sách và ước lượng bình phương tối tiểu, còn cực tiểu $\text{TD}(0)$ liên hệ đến lặp giá trị và  stochastic approximation. Tham khảo:
> [Sut88] Sutton, R. S., 1988. “Learning to Predict by the Methods of Temporal Differences,” Machine Learning, Vol. 3, pp. 9-44.
- Q-learning được đề xuất bởi Watkins mà trong đó một phương pháp gần giống stochastic approximation mà sử dụng việc lặp qua các Q-factors được đề xuất. Tham khảo:
> [Wat89] Watkins, C. J. C. H., “Learning from Delayed Rewards,” Ph.D. Thesis, Cambridge Univ., England.
- Trong khi phân tích hội tụ của $\text{TD}(\lambda)$ và Q-learnig cho trường hợp sử dụng các đặc trưng lookup table (lookup table representations) tương đối rõ ràng, thì trong trường hợp các đặc trưng compact (compact representations) vẫn chưa thật sự hoàn chỉnh. Tham khảo:
> [Tsi94] Tsitsiklis, J. N., 1994. “Asynchronous Stochastic Approximation and Q-Learning,” Machine Learning, Vol. 16, pp. 185-202.

Một loại phương pháp NDP đơn giản hơn, được gọi là *rollout*, là xấp xỉ chi phí tối ưu cần đạt được thông qua chi phí của một số chính sách dưới tối ưu tốt chấp nhận được, được gọi *base policy*. Phụ thuộc vào ngữ cảnh, chi phí của chính sách cơ bản có thể được tính toán bằng một cách giải tích hoặc chung chung thông qua mô phỏng. Trong một phương pháp biến thể, chi phí của chính sách cơ bản được xấp xỉ bằng cách sử dụng một số kiến trúc xấp xỉ. Điều này hoàn toàn khả thi theo góc nhìn về phương pháp này như một bước đơn của một phương pháp lặp chính sách (xấp xỉ khả thi). Phương pháp tiếp cận rollout là một cách đơn giản cụ thể để cài đặt, và nó cũng phù hợp cho on-line replanning, tức là trong một ngữ cảnh mà ở đó tham số của bài toán thay đổi theo thời gian. Tiếp cận rollout kết hợp với rolling horizon approaximations, và trong một số biến thể nó liên hệ đến *model predictive control*, và *receding horizon control*. Tham khảo:
> [KeG88] Keerthi, S. S., and Gilbert, E. G., 1988. “Optimal, Infinite Horizon Feedback Laws for a General Class of Constrained Discete Time Systems: Stability and Moving-Horizon Approximations,” J. Optimization Theory Appl., Vo. 57, pp. 265-293.

> [MoL99] Morari, M., and Lee, J. H., 1999. “Model Predictive Control: Past, Present, and Future,” Computers and Chemical Engineering, Vol. 23, pp. 667-682.

> [MRR00] Mayne, D. Q., Rawlings, J. B., Rao, C. V., and Scokaert, P. O. M., 2000. “Constrained Model Predictive Control: Stability and Optimality,” Automatica, Vol. 36, pp. 789-814.

Mặc dù ít tham vọng hơn so với phương pháp lặp lại chính sách gần đúng và các phương pháp TD đã đề cập trước đó, rollout algorithms đã hoạt động tốt một cách đáng ngạc nhiên trong nhiều nghiên cứu và ứng dụng, thường đạt được sự cải thiện ngoạn mục so với chính sách cơ bản.

Trong khi một số kết quả lý thuyết hỗ trợ cho các phương pháp NDP chỉ mới phát triển trong thời gian gần đầy, có tương đối nhiều các báo cáo về sự thành công với một số bài toán lớn và phức tạp mà không thể giải quyết được bằng bất kỳ phương pháp nào khác. Chi tiếp có thể tham khảo trong bài báo:

> Bertsekas, D. P., & Tsitsiklis, J. N. (1995, December). [Neuro-dynamic programming: an overview](https://web.mit.edu/dimitrib/www/NDP_Encycl.pdf). In Proceedings of 1995 34th IEEE conference on decision and control (Vol. 1, pp. 560-564). IEEE.

## Phương pháp giải toán


**Policy space and actor-critic algorithms**

P. Marbach and J. N. Tsitsiklis, *"Simulation-Based Optimization of Markov Reward Processes,"* IEEE Transactions on Automatic Control, Vol. 46, No. 2, pp. 191-209, February 2001.

P. Marbach and J. N. Tsitsiklis, *"Approximate Gradient Methods in Policy-Space Optimization of Markov Reward Processes"*, Journal of Discrete Event Dynamical Systems, Vol. 13, pp. 111-148, 2003. (preliminary version: "Simulation-based optimization of Markov reward processes: implementation issues," in Proceedings of the 38th IEEE Conference on Decision and Control, December 1999, pp. 1769-1774.)

V. R. Konda and J. N. Tsitsiklis, *"Actor-Critic Algorithms"* , SIAM Journal on Control and Optimization, Vol. 42, No. 4, 2003, pp. 1143-1166. Appendix

V. R. Konda and J. N. Tsitsiklis, *"Actor-Critic Algorithms"*, in Advances in Neural Information Processing Systems 12, Denver, Colorado, November 1999, pp. 1008-1014.

V. R. Konda and J. N. Tsitsiklis, *"Linear Stochastic Approximation Driven by Slowly Varying Markov Chains",* Systems and Control Letters, Vol. 50, No. 2, 2003, pp. 95-102.

**Average cost temporal difference learning**

J. N. Tsitsiklis, and B. Van Roy, *"Average Cost Temporal-Difference Learning",* Automatica, Vol. 35, No. 11, November 1999, pp. 1799-1808.

J. N. Tsitsiklis and B. Van Roy, *"On Average Versus Discounted Reward Temporal-Difference Learning",* Machine Learning, Vol. 49, No. 2, pp. 179-191, November 2002.

**Convergence of methods based on value function learning**

J. N. Tsitsiklis, *"On the Convergence of Optimistic Policy Iteration",* Journal of Machine Learning Research, Vol. 3, July 2002, pp. 59-72.

J. N. Tsitsiklis and B. Van Roy, *"Optimal Stopping of Markov Processes: Hilbert Space Theory, Approximation Algorithms, and an Application to Pricing Financial Derivatives",* IEEE Transactions on Automatic Control, Vol. 44, No. 10, October 1999, pp. 1840-1851.

J. N. Tsitsiklis and B. Van Roy, *"An Analysis of Temporal-Difference Learning with Function Approximation",* IEEE Transactions on Automatic Control, Vol. 42, No. 5, May 1997, pp. 674-690.

J. N. Tsitsiklis and B. Van Roy, *"Feature-Based Methods for Large Scale Dynamic Programming",* Machine Learning, Vol. 22, 1996, pp. 59-94.

J. N. Tsitsiklis, *"Asynchronous Stochastic Approximation and Q-learning",* Machine Learning, 16, 1994, pp. 185-202. Correction.

**Rollout algorithms**

D. P. Bertsekas, J. N. Tsitsiklis, and C. Wu, *"Rollout Algorithms for Combinatorial Optimization",* Journal of Heuristics, Vol. 3, 1997, pp. 245-262.

## Ứng dụng thực hành


**Retailing**

S. Mannor, D. I. Simester, P. Sun, and J. N. Tsitsiklis, *"Bias and Variance Approximation in Value Function Estimates,"* Management Science, Vol. 53, No. 2, February 2007, pp. 308-322; Appendix.

D. I. Simester, P. Sun, and J. N. Tsitsiklis, *"Dynamic Catalog Mailing Policies,"* Management Science, Vol. 52, No. 5, May 2006, pp. 683-696.

**Finance**

J. N. Tsitsiklis and B. Van Roy, *"Regression Methods for Pricing Complex American--Style Options,"* IEEE Trans. on Neural Networks, Vol. 12, No. 4, July 2001, pp. 694-703.

J. N. Tsitsiklis and B. Van Roy, *"Optimal Stopping of Markov Processes: Hilbert Space Theory, Approximation Algorithms, and an Application to Pricing Financial Derivatives",* IEEE Transactions on Automatic Control; Vol. 44, No. 10, October 1999, pp. 1840-1851.

**Inventory management**

B. Van Roy, D. P. Bertsekas, Y. Lee, and J. N. Tsitsiklis, *"A Neuro-Dynamic Programming Approach to Retailer Inventory Management",* November 1996. Short version in Proceedings of the 36th IEEE Conference on Decision and Control, San Diego, California, December 1997, pp. 4052-4057.

B. Van Roy, D. P. Bertsekas, Y. Lee, and J. N. Tsitsiklis, *"A Neuro-Dynamic Programming Approach to Retailer Inventory Management",* November 1996. Short version in Proceedings of the 36th IEEE Conference on Decision and Control, San Diego, California, December 1997, pp. 4052-4057.

**Communication networks**

P. Marbach, O. Mihatsch, and J. N. Tsitsiklis, *"Call Admission Control and Routing in Integrated Service Networks Using Neuro-Dynamic Programming,"* IEEE Journal on Selected Areas in Communications, Vol. 18, No. 2, February 2000, pp. 197-208.


**Tài liệu tham khảo**

[1] Bertsekas, D. P., & Tsitsiklis, J. N. (1995, December). [Neuro-dynamic programming: an overview](https://web.mit.edu/dimitrib/www/NDP_Encycl.pdf). In Proceedings of 1995 34th IEEE conference on decision and control (Vol. 1, pp. 560-564). IEEE.