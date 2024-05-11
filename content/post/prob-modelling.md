+++
author = "Le, Nhut Nam"
title = "Probabilistic modelling - Mô hình hóa xác suất"
date = "2023-05-06"
description = "Lý thuyết xác suất cho chúng ta những công cụ toán học để mà mô hình hóa một cách chuẩn mực trực giác về tính không chắc chắn (uncertainty) và ngẫu nhiên (randomness)."
tags = [
    "probabilistic", "probabilistic modelling", "bayesian"
]
+++

Lý thuyết xác suất cho chúng ta những công cụ toán học để mà mô hình hóa một cách chuẩn mực trực giác về tính không chắc chắn (uncertainty) và ngẫu nhiên (randomness).

Bài viết được trích ra từ luận án Tiến sĩ Errica, F. (2022). [Bayesian Deep Learning for Graphs](https://arxiv.org/pdf/2202.12348.pdf). arXiv preprint arXiv:2202.12348., có sự tham khảo từ hai cuốn sách:
- Barber, D. (2012). [Bayesian reasoning and machine learning](http://web4.cs.ucl.ac.uk/staff/D.Barber/textbook/090310.pdf). Cambridge University Press.
- Bishop, C. M., & Nasrabadi, N. M. (2006). Pattern recognition and machine learning (Vol. 4, No. 4, p. 738). New York: springer.

Để trình bày về những khái niệm, nguyên lý cơ bản của lý thuyết xác suất, chúng ta cần đưa ra một số ký hiệu:
- $\Omega$: không gian mẫu (sample space)
- $\mathscr{A} \subseteq \mathscr{P}(\Omega)$: tập các sự kiện quan tâm mà có thể xuất hiện, trong đó $\mathscr{P}(.)$ được gọi là toán tử thống trị (powerset operator); một cách cụ thể, $\mathscr{A}$ cần phải là một cấu trúc đại số $\sigma$-algebra (trường $\sigma$ - $\sigma$-field).

## Những định nghĩa cơ bản

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa cấu trúc đại số $\sigma$ - $\sigma$-algebra
</span>
    Gọi $\Omega$ là tập các kết quả có thể có và xem xét tập các sự kiện $\mathscr{A} \subseteq \mathscr{P}(\Omega)$. Thì, $\mathscr{A}$ là một cấu trúc đại số $\sigma$ - $\sigma$-algebra nếu nó thỏa những điều sau:
    <ol>
      <li>Có khả năng giải thích cho những sự kiện không thể, tức là $\empty \in \mathscr{A}$</li>
      <li>Đóng với phép lấy phần bù, tức là $\forall A \in \mathscr{A} \Longrightarrow (\Omega / A) \in \mathscr{A}$</li>
      <li>Đóng với phép hội đếm được, tức là $\forall \{A_n\}_{n \in \mathbb{N}} \subseteq \mathscr{A} \Longrightarrow \bigcup_{i \in \mathbb{N}}A_i \in \mathscr{A} $</li>
    </ol>
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa độ đo (Measure)
</span>
    Gọi $\mathscr{A}$ là một cấu trúc đại số $\sigma$ - $\sigma$-algebra trên $\Omega$. Một hàm $f: \mathscr{A} \rightarrow [0, +\infty]$ là một độ đo (measure) trên $(\Omega, \mathscr{A})$ nếu 
    <ol>
      <li>Không âm (non-negativity), tức là $\forall A \in \mathscr{A} \Longrightarrow f(A) \geq 0$</li>
      <li>Null empty set, tức là $f(\empty) = 0$</li>
      <li>Với tất các bộ đếm được $\{A_n\}_{n \in \mathbb{N}} \in \mathscr{A}$ của các tập rời rạc, nó thỏa mãn $f\left(\bigcup_{i \in \mathbb{N}}A_i\right) = \sum_{i \in \mathbb{N}}f(A_i)$; đây gọi là tính chất cộng đại số $\sigma$ ($\sigma$-additivity)</li>
    </ol>
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về xác suất (probability)
</span>
    Một xác suất (probability) là một độ đo $P$ trên $(\Omega, \mathscr{A})$ trong đó $P(\Omega) = 1$ và bộ $(\Omega, \mathscr{A}, P)$ được gọi không gian xác suất (probability space).
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về biến ngẫu nhiên (random variable)
</span>
    Cho trước một không gian xác suất $(\Omega, \mathscr{A}, P)$, một biến ngẫu nhiên (random variable) là một hàm độ đo (measure function) $X: \Omega \rightarrow E$ thỏa mã điều kiện $\{\omega \in \Omega \mid X(\omega) \in E\} \in \mathscr{A}$.
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về quá trình ngẫu nhiên (stochastic process)
</span>
    Cho trước một không gian xác suất $(\Omega, \mathscr{A}, P)$, và một tập $T$, một quá trình ngẫu nhiên (stochastic process) tương ứng với một họ các biến ngẫu nhiên $\{X_t\}_{t \in T}$. Các giá trị mà mỗi biến ngẫu nhiên $X_t$ nhận được gọi là trạng thái (state).
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về hàm phân phối tích lũy (cumulative distribution function - c.d.f)
</span>
    Hàm phân phối tích lũy (cumulative distribution function - c.d.f) $F$ của một biến ngẫu nhiên $x$ được định nghĩa $F(X \leq x) = P(\{\omega \in \Omega \mid X(\omega) \leq x\})$, mà được viết tắt là $P(X \leq x)$.
</div>
<br>

Trong trường biến ngẫu nhiên rời rạc (discrete random variables), hàm khối xác suất (probability mass function - p.m.f) được định nghĩa:

$$
p_X(x) = P(X = x)
$$

Trong trường hợp các biến ngẫu nhiên liên tục, ta định nghĩa hàm mật độ xác suất (probability density function - p.d.f)

$$
f_X(x) = \frac{d}{dx}F_{X}(x)
$$

Một hỗ trợ (support) của một phân phối xác suất là tập các giá trị mà nó trả về xác suất xảy ra khác không.

Xem xét vấn đề xác suất khi có nhiều hơn một sự kiện xuất hiện. Trong trường hợp với một tập các biến ngẫu nhiên, ta có một số đinh nghĩa. Ta gọi phân phối xác suất kết hợp (joint probability distribution) $P(X_1 = x_1, X_2 = x_2, ..., X_n = x_n)$ là phân phối đa biến thể hiện một quá trình ngẫu nhiên cụ thể.
- Trong trường hợp một tập hợp $n$ biến ngẫu nhiên được gọi là độc lập với nhau (mutually independent), xác suất kết hợp phân rã thành tích của những xác suất thành phần, tức là $\prod_{i=1}^nP(X_i = x_i)$

Khi một tập hợp các biến ngẫu nhiên là độc lập lẫn nhau và mỗi biến có cùng phân phối xác suất, các biến này được gọi là các biến ngẫu nhiên độc và phân phối giống nhau (independently and identically distributed - i.i.d).

Khi mà một sự kiện $Y = y$ có một tác động trên sự xuất hiện của những biến ngẫu nhiên khác, ta có xác suất có điều kiện (conditional probabilities), $P(X_1 = x_1, X_2 = x_2, ..., X_n = x_n \mid Y = y) = \prod_{i=1}^nP(X_i = x_i \mid Y = y)$

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về luật tổng (sum rule)
</span>
    Cho trước một biến ngẫu nhiên $X$, tổng các giá trị xác suất trên tất xác suất trên nó phải bằng 1.
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về luật tích (a.k.a Chain rule)
</span>
    Phân phối kết của $n$ biến có thể được viết dưới dạng
    $$
      P(X_1 = x_1, X_2 = x_2, ..., X_n = x_n) = \prod_{i=1}^nP\left(X_i=x_i \mid \bigcup_{j=1}^{i-1}X_j=x_j\right)
    $$
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về biên (marginalization)
</span>
    Sự kết hợp giữa luật tổng và tích, và cho trước hai biến ngẫu nhiên, $X$ và $Y$, không mất tính tổng quát, ta có thể nhận được các xác suất biên (marginal probabilities) của $X$ và $Y$ như sau:
    $$
      P(X=x) = \sum_yP(X=x, Y=y)
    $$
    $$
      P(Y=y) = \sum_xP(Y=y, X=x)
    $$
</div>
<br>

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về giá trị kỳ vọng (expected value)
</span>
    Cho trước một biến ngẫu nhiên $X$ được định nghĩa trên một không gian xác suất $(\Omega, \mathscr{A}, P)$, giá trị kỳ vọng của $X$ được định nghĩa
    $$
      \mathbb{E}[X] = \int_{\omega \in \Omega}X(\omega)dP(\omega)
    $$
    trong đó tích phân Lebesgue được lấy tương ứng với độ đo $P$
</div>
<br>

Trong trường hợp biến ngẫu nhiên rời rạc $X$ với một số hữu hạn trạng thái có thể đạt được, và một hàm khối xác suất p.m.f đã biết, biểu thức giá trị kỳ vọng được viết lại:

$$
\mathbb{E}[X] = \sum_xxP(X=x)
$$

Trong trường hợp biến ngẫu nhiên liên tục mà phân phối $P$ của nó có một hàm phân phối xác suất p.d.f, ta có thể viết lại viết thức giá trị kỳ vọng:

$$
\mathbb{E}[X] = \int_{\mathbb{R}}xf_X(x)dx
$$

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về xích Markov (Markov chain)
</span>
   Gọi $(\Omega, \mathscr{A}, P)$ là một không gian xác suất, và xem xét một quá trình ngẫu nhiên $\{X_t\}_{t \in T}$ trong đó $T$ là một tập có thứ tự. Thì $\{X_t\}_{t \in T}$ là một xích Markov nếu, với mọi chuỗi $t_0 < ... < t_n < t_{n+1}$ và với mọi trạng thái $x_0, ..., x_n, x_{n+1}$, thuộc tính Markov bậc nhất (1-st order Markov property) thõa
   $$
    P(X_{n+1} = x_{n+1} \mid X_n = x_n, ..., X_0 = x_0) = P(X_{n+1} = x_{n+1} | X_n = x_b)
   $$
</div>
<br>

Ta dễ dàng có được một định nghĩa tổng quát về thuộc tính Markov bậc $k$

$$
P(X_{n+1} = x_{n+1} \mid X_n = x_n, ..., X_0 = x_0) =  P(X_{n+1} = x_{n+1} | X_n = x_b, ..., X_{n-k} = x_{n-k})
$$

Điều này cho ta đạt đến một xích Markov bậc cao (higher-order Markov Chain)

Khi mà một quá trình thỏa mã thuộc tính Markov, ta gọi nó là Markovian.

## Một số phân phối thường gặp

Một số phân phối hữu ích
- Phân phối loại (Categorical Distribution)
- Phân phối Gaussian (Gaussian Distribution)
- Phân phối nhị thức (Binomial Distribution)
- Phân phối Dirichlet (Dirichlet Distribution)
- Phân phối Chuẩn-Gamma (Normal-Gamma Distribution)

## Học như một bài toán suy diễn xác suất

Mục tiêu của một tác vụ học máy tổng quát là tìm một lựa chọn phù hợp của các tham số sao cho tối ưu một hàm mục tiêu được định nghĩa trước. Trong xác suất, chúng ta cũng cần nắm bắt phân phối của dữ liệu, ta chọn một họ các phân phối được tham số hóa với giả định nó lịnh hoạt đủ để bắt chước phân phối dữ liệu đúng (cái này ta chưa biết). 

Do đó, tác vụ học máy tổng quát có thể quy thành một bài toán suy diễn (inference problem) mà trong đó ta hiểu chỉnh "niềm tin" của ta về những than số của họ phân phối được chọn, ví dụ như Gaussian hay Categorical.

Luật Bayes hay Bayes' Rule là nền tảng cho Bayesina Learning

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định nghĩa về Luật Bayes
</span>
   Cho trước một không gian giả thuyết rời rạc $\mathcal{H}$ và một tập hợp các quan sát (dữ liệu) $\mathcal{D}$ (cả hai đều có thể được mô hình hóa như các quá trình ngẫu nhiên), với mỗi giả thuyết $h_i \in \mathcal{H}$, nó thỏa mãn
   $$
    P(h_i \mid \mathcal{D}) = \frac{P(\mathcal{D} \mid h_i)P(h_i)}{P(\mathcal{D})} = \frac{P(\mathcal{D} \mid h_i)P(h_i)}{\sum_jP(\mathcal{D} \mid h_j)P(h_j)}
   $$
   trong đó: $P(h)$ được gọi là xác suất tiên nghiệm của $h$ (prior probability), $P(\mathcal{D} \mid h)$ là likelihood mà dữ liệu được phát sinh bởi một giả thuyết cụ thể (với những tham số tương ứng $\theta$), và $P(h \mid \mathcal{D})$ là xác suất hậu nghiệm (posterior probability) mà giả thuyết là đúng với dữ liệu cho trước và niềm tin tiên nghiệm về giả thuyết.
</div>
<br>

Bản chất của Luật Bayes là một sự đánh đổi (trade-off) giữa niềm tin tiên nghiệm ( prior belief) của ta và những quan sát (evidence) đến từ dữ liệu.

## Ước lượng triển vọng cực đại (Maximum Likelihood Estimation)

Cho trước một tập các biến ngẫu nhiên $\mathbf{X} = \{ X_1, ..., X_n \}$ gọi là các quan sát mà hình thành tri thức của chúng ta về "thế giới", dự đoán cho một điểm dữ liệu mới trong Bayesian learning có thể được viết

$$
P(\mathbf{X} = \mathbf{x} \mid \mathcal{D}) = \sum_iP(\mathbf{X} = \mathbf{x} \mid \mathcal{D}, h_i)P(h_i \mid \mathcal{D})
$$

trong đó luật tích (product rule), biên (marginalization) được sử dụng, và cũng được giả định rằng $\mathbf{X}$ không phụ thuộc vào dữ liệu khi giả thuyết $h_i$ thỏa mãn. 

Thông thường, không gian của các giả thuyết là vô hạn, và tính toán chính xác phân phối hậu nghiệm của $\mathbf{X}$ trở nên không thể thực hiện được. Để giải quyết vấn đề này, ta tìm kiếm giả thuyết mà gần giống nhất với dữ liệu cho trước, nó gọi là suy diễn cực đại hậu nghiệm (Maximum A Posteriori)

$$
h_{MAP} = \underset{h \in \mathcal{H}}{argmax } P(h \mid \mathcal{D}) \xrightarrow[]{Bayes' rule} \underset{h \in \mathcal{H}}{argmax } \frac{P(\mathcal{D} \mid h)P(h)}{P(\mathcal{D})} = \underset{h \in \mathcal{H}}{argmax } P(\mathcal{D} \mid h)P(h)
$$

Trong phương pháp suy diễn cực đại hậu nghiệm (Maximum A Posteriori), ta đã ràng buộc đóng góp của $P(\mathcal{D})$ trong phép cực đại hóa là một hằng số.

Khi giả định một phân phối tiên nghiệm đồng nhất trên lựa chọn $\mathcal{H}$, nghĩa là $P(h)$ là giống nhau tại mọi lúc, ta có phương pháp ước lượng triển vọng cực đại (Maximum Likelihood Estimation)

$$
h_{MLE} = \underset{h \in \mathcal{H}}{argmax }P(\mathcal{D} \mid h) = \underset{h \in \mathcal{H}}{argmax } \mathcal{L}(\theta_h \mid \mathcal{D})
$$

## Mạng Bayesian

Trong quá trình mô hình hóa thế giới với một tập các biến ngẫu nhiên, thật tự nhiên khi tạo ra những giả định về những mối quan hệ giữa chúng. Một cách để biểu diễn đồ thị những phụ thuộc điều kiện (conditional dependencies) giữa những biến như thế là sử dụng một mạng Bayesian hay Bayesian network.

Trong cách thể hiện đồ thị (graphical representation) này, một thể hiện (instance) có hình dáng một đồ thị, những nút trong đó thể hiện các biến và các cạnh nối giữa chúng thể hiện thông tin phụ thuộc điều kiện. Ta phân biện những biến quan sát mà luôn luôn có thể thấy (tức là những quan sát trong $\mathcal{D}$ mà chứa thông tin về những giá trị của các biến này) và các biến ẩn (latent/ hidden) mà những giá trị của nó phải được suy diễn từ dữ liệu.

Bằng định nghĩa, một mạng Bayesian cho phép phân rã phân phối xác suất kết hợp của tất cả các biến theo một luật truyền thẳng

$$
P(X_1, ..., X_n) = \prod_i^nP(X_i \mid pa(X_i))
$$

trong đó ký hiệu $pa(X_i)$ chỉ tập các nút mà có cạnh trỏ đến $X_i$, tức là "cha mẹ" của $X_i$.

Một lưu ý về mạng Bayesian một biến không thể phụ thuộc trực tiếp hoặc gián tiếp vào chính nó. Đổi lại, điều này đơn giản hóa toán học và cho phép các giải pháp khả thi trong nhiều trường hợp.

## Thuật toán cực đại hóa kỳ vọng (Expectation-Maximization Algorithm)

Một công cụ được dùng nhiều trong việc huấn luyện một mô hình xác suất (probabilistic model) với những biến ẩn (latent variables) $\mathbf{Z}$ là thuật toán cực đại hóa kỳ vọng (Expectation-Maximization Algorithm).

Key insigt của thuật toán là thay vì cực đại hóa likelihood "không hoàn chỉnh" của dữ liệu quan sát được $P(\mathbf{X} \mid \theta)$, ta tập trung vào likelihood "hoàn chỉnh" của dữ liệu $P(\mathbf{X}, \mathbf{Z} \mid \theta)$

Thuật toán cực đại hóa kỳ vọng là một thủ tục hai bước lặp lại mà cực đại likelihood của dữ liệu mà những tham số của mô hình tại thời điểm $t$, đặt là $\theta^{(t)}$, được cập nhật ($M$-step) sử dụng ước lượng hiện tại cho những giá trị của các biến tiềm ẩn $\mathbf{Z}$ ($E$-step). Mục tiêu đạt kết quả là đơn giản để mà cực đại hóa, bởi vì nó không liên quan đến lề trên tắt cả các biến trong $\mathbf{Z}$.

Các bước thực hiện thuật toán EM:
- Bước 1: Khởi tạo các tham số $\theta^{(1)}$ một cách ngẫu nhiên
- Bước 2: ($E$-step) Tính toán giá trị kỳ vọng của log-likelihood hoàn chỉnh mà ứng với $\theta^{(t)}$

$$
Q_{EM}(\theta \mid \theta^{(t)}) = \mathbb{E}_{\mathbf{Z} \mid \mathbf{X}, \theta^{(t)}}\left[\log(P(\mathbf{X}, \mathbf{Z} \mid \theta^{(t)}))\right]
$$

- Bước 3: ($M$-step) Tìm các tham số mà cực đại tính toán trước đó

$$
\theta^{(t+1)}=\underset{\theta}{argmax }Q_{EM}(\theta \mid \theta^{(t)}) 
$$

- Bước 4: Lặp lại các bước 2 và 3 cho đến khi likelihood hoàn chỉnh dừng tăng.

## Phương pháp lấy mẫu Gibbs

Bất cứ khi nào chúng ta gặp một phân phối xác suất kết hợp khó mà biểu thức hóa hoặc lấy mẫu nhưng xác suất có điều kiện của các biến riêng lẻ sẽ dễ tính toán hơn, chúng ta sẽ phụ thuộc vào thuật toán Markov Chain Monte Carlo (MCMC).

Một thuật toán MCMC mà thường được dùng trong suy diễn Bayesian là Gibbs sampling, mà thực hiện bằng cách lấy mẫu giá trị của một biến đơn tại một thời điểm trước khi di chuyển đến thời điểm kế tiếp. Bằng cách lặp quá trình này, sau cùng các giá trị được lấy mẫu sẽ xấp xỉ với phân phối kết hợp ban đầu. Ngoài ra, khi một số biến được quan sát, giá trị của chúng không bao giờ được cập nhật.

Cho trước $n$ biến ngẫu nhiên, $\mathbf{X} = \{X_1, ..., X_n\}$ từ một phân phối kết hợp $P(X_1 = x_1, ..., X_n = x_n)$, ta có thể thu được $k$ mẫu từ $X$ bằng cách sử dụng phương pháp Gibbs sampler:
- Bước 1: Khởi tạo các mẫu, $\mathbf{X}^{(0)} = \{x_1^{(0)}, ..., x_n^{(0)}\}$
- Bước 2: Khi khởi tạo mẫu thứ $i+1$, mỗi thành phần $j$ (theo thứ tự), cập nhật giá trị của nó bằng cách lấy mẫu từ xác suất điều kiện đã biết 

$$
x_j^{(t+1)} \sim P(x_j^{(t+1)} \mid x_1^{(t+1)}, x_2^{(t+1)}, ..., x_{j-1}^{(t+1)}, x_{j+1}^{(t)}, ..., x_{n}^{(t)})
$$

- Bước 3: Lặp lại bước trước $k$ lần theo thứ tự để nhận được $k$ mẫu phân biệt.



