+++
author = "Le, Nhut Nam"
title = "Tóm tắt về Giải tích và Tối ưu"
date = "2021-08-14"
tags = [
    "calculus", "optimization", "revision"
]
+++

Ghi và dịch ra Tiếng Việt từ Mathematics for Machine Learning của Garrett Thomas, Department of Electrical Engineering and Computer Sciences, University of California, Berkeley nhằm ôn tập và tổng hợp lại kiến thức Toán cho Học Máy.

Trong nhiều thuật toán Máy học (Machine Learning Algorithms), đa phần vấn đề của Máy học là tối tiểu hàm giá trị (**cost function**) (cũng có thể được gọi là hàm mục tiêu - **objective function** trong cộng đồng tối ưu), mà là một hàm số (scalar function) của nhiều biến (variables) thường đo mô hình của ta khớp dữ liệu mà ta có tệ như thế nào.

## Điểm cực trị (Extrema)

Bài toán tối ưu (Optimization) là về tìm cực trị (extrama), phụ thuộc vào ứng dụng có thể là điểm cực tiểu (minima) hoặc điểm cực đại (maxima). Khi định nghĩa cực tri, cần phải xem xét tập đầu vào mà chúng ta đang tối ưu. Tập này $\mathcal{x} \subseteq \mathbb{R}^d$ được gọi là **feasible set** - tập khả thi. Nếu $\mathcal{X}$ là toàn bộ miền của hàm số cần được tối ưu (vì nó thường sẽ là mục đích của chúng ta), ta gọi bài toán là **unconstrained** - không ràng buộc. Mặc khác, bài toán là **constrained** và có thể sẽ khó khăn hơn để giải quyết, phụ thuộc vào bản chất của tập khả thi.

Giả sử $f: \mathbb{R}^d \rightarrow \mathbb{R}$. Một điểm $x$ được gọi là cực tiểu cục bộ (local minimum) (tương ứng là cực đại cục bộ - local maximum) của $f$ trong $\mathbf{X}$ nếu $f(x) \leq f(y)$ (tương ứng $f(x) \geq f(y)$) với mọi $y$ trong vài lân cận $N \subseteq \mathcal{X}$ của $x$. Hơn nửa, nếu $(x) \leq f(y)$ với mọi $y \in \mathcal{X}$, thì $x$ được gọi là cực tiểu toàn cục (**global minimum**) (tương tự cho cực đại toàn cục - global maximum). Nếu cụm "in $\mathcal{X}$" có ngữ cảnh không rõ ràng, giả định chúng ta tối ưu toàn bộ miền của hàm số.

## Gradients

Một khái niệm quan trọng từ Giải tích trong ngữ cảnh của Máy học là **gradient**. Gradients tổng quát hóa các đạo hàm thành các hàm vô hướng của một số biến. Gradient của $f : \mathbb{R}^d \rightarrow \mathbb{R}$, ký hiệu là $\nabla f$, được cho bởi

$$
\nabla f = \begin{bmatrix}\frac{\partial f}{\partial x_1}\\ ... \\ \frac{\partial f}{\partial x_n}\end{bmatrix}
$$

tức là

$$
[\nabla f]_i = \frac{\partial f}{\partial x_i}
$$

Gradient có tính chất rất quan trọng: những điểm $\nabla f(x)$ theo hướng lên dốc từ $x$. Tương tự, những điểm $-\nabla f(x)$ theo hướng xuống dốc từ $x$. Chúng ta sẽ sử dụng thông tin này thường xuyên khi tối tiểu tuần tự một hàm thông qua gradient descent

## The Jacobian

Jacobian của $f: \mathbb{R}^n \rightarrow \mathbb{R}^m$ là một ma trận của đạo hàm cấp một

$$
\mathbf{J}_f = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & ... & \frac{\partial f_1}{\partial x_n} \\
... & ... & ...\\
\frac{\partial f_m}{\partial x_1} & ... & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}
$$

tức là

$$
[\mathbf{J}_f]_{ij} = \frac{\partial f_i}{\partial x_j}
$$

Lưu ý: trường hợp đặc biệt $m = 1$, trong đó $\nabla f = \mathbf{J}_f^T$

## The Hessian

Hessian của $f: \mathbb{R}^n \rightarrow \mathbb{R}^m$ là một ma trận của đạo hàm cấp hai

$$
\nabla^2 f = \begin{bmatrix}
\frac{\partial^2 f}{\partial x_1^2} & ... & \frac{\partial^2 f}{\partial x_1\partial x_d} \\
... & ... & ...\\
\frac{\partial^2 f}{\partial x_d\partial x_1} & ... & \frac{\partial^2 f}{\partial x_d^2}
\end{bmatrix}
$$

tức là

$$
[\nabla^2 f ]_{ij} = \frac{\partial^2 f}{\partial x_i\partial x_j}
$$

Nhớ lại, nếu đạo hàm là liên tục, thì thứ tự đạo hàm có thể đổi chổ cho nhau (Clairaut’s theorem), do đó ma trận Hessian phải là ma trận đối xứng. Điều này thường xảy ra cho những hàm khả vi mà chúng ta đang xử lý.

Hessian được sử dụng trong những thuật toán tối ưu như là phương pháp Newton. Nó rất phức tạp để tính toán nhưng nó giảm đáng kể số lần lặp cần thiết để có thể hội tụ về một cực tiểu địa phương bằng cách dùng thông tin về độ cong (curvature) của $f$

## Giải tích ma trận (Matrix Calculus)

Vì rất nhiều tối ưu hóa làm giảm việc tìm kiếm các điểm mà gradient biến mất, nó sẽ hữu ích để có những luật đạo hàm cho biểu thức ma trận và vector. Có lẽ đây là hai luật quan trọng

$$
\nabla_{\mathbf{x}}(\mathbf{a}^T\mathbf{a}) = \mathbf{a}
$$

$$
\nabla_{\mathbf{x}}(\mathbf{x}^T\mathbf{A}\mathbf{x}) = (\mathbf{A} + \mathbf{A}^T)\mathbf{x}
$$

Trong luật thứ hai, nó chỉ được định nghĩa chỉ nếu $\mathbf{A}$ là vuông. Hơn nữa, nếu $\mathbf{A}$ đối xứng, ta có thể đơn giản kết quả thành $2\mathbf{A}\mathbf{x}$

### Quy tắc mắc xích (The chain rule)

**Mệnh đề 12** Giả sử $f  : \mathbb{R}^m \rightarrow \mathbb{R}^k$ và $g : \mathbb{R}^n \rightarrow \mathbb{R}^m$
thì $f \circ g : \mathbb{R}^n \rightarrow \mathbb{R}^k$

$$
\mathbf{J}_{f \circ g}(\mathbf{x}) = \mathbf{J}_{f}(g(\mathbf{x}))J_{g}(\mathbf{x})
$$

Trong trường hợp đặc biệt $k = 1$ hì ta có hệ quả $\nabla f = \mathbf{J}_f^T$

**Hệ quả 1** Giả sử $f  : \mathbb{R}^m \rightarrow \mathbb{R}$ và $g : \mathbb{R}^n \rightarrow \mathbb{R}^m$. Thì $f \circ g : \mathbb{R}^n \rightarrow \mathbb{R}$

$$
\nabla (f \circ g)(\mathbf{x}) = \mathbf{J}_g(\mathbf{x})^T\nabla f(g(\mathbf{x}))
$$

## Định lý Taylor (Taylor's Theorem)

**Theorem 6** (Taylor’s theorem) Giả sử $f  : \mathbb{R}^d \rightarrow \mathbb{R}$ có đạo hàm liên tục, và đặt $\mathbf{h} \in \mathbb{R}^d$. Thì tồn tại $t \in (0, 1)$ sao cho

$$
f(\mathbf{x} + \mathbf{h}) = f(\mathbf{x}) + \nabla f(\mathbf{x} + t\mathbf{h})^T\mathbf{h}
$$

Hơn nửa, nếu $f$ có đạo hàm cấp hai liên tục, thì

$$
\nabla f(\mathbf{x} + \mathbf{h}) = \nabla f(\mathbf{x}) + \int_{0}^{1}\nabla^2f(\mathbf{x} + t\mathbf{h})\mathbf{h}dt
$$

và tồn tại $t \in (0, 1)$

$$
f(\mathbf{x} + \mathbf{h}) = f(\mathbf{x}) + \nabla f(\mathbf{x})^T\mathbf{h} + \frac{1}{2}\mathbf{h}^T\nabla^2f(\mathbf{x} + t\mathbf{h})\mathbf{h}
$$

Định lý này được sử dụng trong những chứng minh điều kiện cho bài toán tối ưu không ràng buộc cực tiểu địa phương.

## Điều kiện cho cực tiểu địa phương

**Mệnh đề 13** Nếu $\mathbf{x}^{\*}$ là một cực tiểu địa phương của $f$ và $f$ có đạo hàm liên tục trong một lân cận của $\mathbf{x}^{\*}$, thì $\nabla f(\mathbf{x}^{\*}) = 0$

_Chứng minh._ Gọi $\mathbf{x}^{\*}$ là một cực tiểu địa phương của hàm $f$ và giả sử rằng $\nabla f(\mathbf{x}^{\*}) \ne 0$. Đặt $\mathbf{h} = -\nabla f(\mathbf{x}^{\*})$, để ý rằng tính liên tục của $\nabla f$, ta có:

$$
\lim_{t \rightarrow 0} -\nabla f(\mathbf{x}^{*} + t\mathbf{h}) = -\nabla f(\mathbf{x}^{*}) = \mathbf{h}
$$

Vì thế

$$
\lim_{t \rightarrow 0} \mathbf{h}^{\top}\nabla f(\mathbf{x}^{*} + t\mathbf{h}) = \mathbf{h}^{\top}\nabla f(\mathbf{x}^{*}) = -||\mathbf{h}||_2^2 < 0
$$

Do đó tồn tại $T > 0$ mà $\mathbf{h}^{\top}\nabla f(\mathbf{x}^{*} + t\mathbf{h}) < 0$ với mọi $t \in [0, T]$. Áp dụng định lý Taylor: Với mọi $t \in (0, T]$, tồn tại $t' \in (0, t)$ thỏa mãn

$$
f(\mathbf{x}^{*} + t\mathbf{h}) = f(\mathbf{x}^{*}) + t\mathbf{h}^{\top}\nabla f(\mathbf{x}^{*} + t'\mathbf{h}) < f(\mathbf{x}^{*})
$$

Dẫn đến $\mathbf{x}^{\*}$ không phải là một cực điểu địa phương, mâu thuẫn. Vậy, $\nabla f(\mathbf{x}^{\*}) = 0$. $\blacksquare$

Chứng minh trên cho thấy rằng tại sao biến mất đạo hàm (vanishing gradient) là cần thiết cho một cực đại: nếu $\nabla f(\mathbf{x})$ là khác không, luôn tồn tại một bước nhảy đủ nhỏ $\alpha > 0$ để mà $f(\mathbf{x} - \alpha\nabla f(\mathbf{x})) < f(\mathbf{x})$. Bởi vì lý do này, $-\nabla f(\mathbf{x})$ được gọi là **descent direction**.

Những điểm mà gradient biến mất được gọi là những điểm dừng (stationary points). Nhưng không phải tất cả những điểm dừng đều là cực đại.

Xem xét một hàm $f: \mathbb{R}^2 \rightarrow \mathbb{R}$ được cho bởi $f(x, y) = x^2 - y^2$. Ta có $\nabla f(\mathbf{0}) = \mathbf{0}$, nhưng điểm $\mathbf{0}$ là cực tiểu trên đường $y = 0$ và cực đại trên đường $x = 0$. Do đó, nó không phải cực tiểu địa phương cũng không phải cực đại địa phương của hàm $f$. Những điểm như thế, nơi mà có biến mất gradient nhưng không phải cực trị địa phương, được gọi là điểm yên ngựa (saddle points).

Những thông tin bậc nhất (first-order information) như gradient không đủ để mô tả đặc điểm của cực tiểu địa phương. Điều này tạo động lực để ta xem xét tiếp thông tin bậc hai (second-order information) như Hessian. Ta chứng minh mệnh đề cần thiết sau cho điều kiện bậc hai cho cực tiểu địa phương.

**Mệnh đề 14** Nếu $\mathbf{x}^{\*}$ là là một cực tiểu địa phương của $f$ và $f$ có đạo hàm liên tục trong một lân cận của $\mathbf{x}^{\*}$, thì $\nabla f(\mathbf{x}^{*})$ nửa xác định dương

_Chứng minh_. Gọi $\mathbf{x}^{\*}$ là một cực tiểu địa phương của hàm $f$ và giả sử rằng $\nabla^2 f(\mathbf{x}^{\*})$ không nửa xác định dương (positive semi-definite). Đặt $\mathbf{h}$ thỏa $\mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{\*})\mathbf{h} < 0$, để ý rằng tính liên tục của $\nabla^2 f$, ta có:

$$
\lim_{t \rightarrow 0} \nabla^2 f(\mathbf{x}^{*} + t\mathbf{h}) = \nabla^2 f(\mathbf{x}^{*})
$$

Vì

$$
\lim_{t \rightarrow 0} \mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*} + t\mathbf{h})\mathbf{h} = \mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*})\mathbf{h} < 0
$$

Do đó, tồn tại $T > 0$ thỏa mãn $\mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*} + t\mathbf{h})\mathbf{h} < 0$ với mọi $t \in [0, T]$. Áp dụng định lý Taylor: Với bất kỳ $t \in (o, T]$, mà

$$
f(\mathbf{x}^{*} + t\mathbf{h}) = f(\mathbf{x}^{*}) + t\mathbf{h}\nabla f(\mathbf{x}^{*}) + \frac{1}{2}t^2\mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*} + t'\mathbf{h})\mathbf{h} < f(\mathbf{x}^{*})
$$

trong đó, $t\mathbf{h}\nabla f(\mathbf{x}^{*}) = 0$ vì $$\nabla f(\mathbf{x}^{*}) = 0$$.

Điều này dẫn đến $\mathbf{x}^{\*}$ không phải là một cực điểu địa phương, mâu thuẫn. Vậy, $\nabla^2 f(\mathbf{x}^{\*})$ nửa xác định dương (positive semi-definite). $\blacksquare$

**Mệnh đề 15** Giả sử $f$ khả vi cấp hai với $\nabla^2f$ nửa xác định dương trong một lân cận $\mathbf{x}^{\*}$ và $\nabla f(\mathbf{x}^{\*}) = 0$. Thì $\mathbf{x}^{\*}$ là một cực tiểu địa phương của $f$. Hơn nửa, nếu $\nabla^2 f(\mathbf{x}^{*})$ xác định dương, thì $\mathbf{x}^{\*}$ là một cực tiểu nghiêm ngặt (strict local minimum)

_Chứng minh_. Gọi $B$ là một quả cầu mở bán kính $r > 0$ tâm tại $\mathbf{x}^{*}$ mà chứa trong một lân cận. Áp dụng định lý Taylor, ta có với bất kỳ $\mathbf{h}$ mà có $\left\|\left\| \mathbf{h}\right\|\right\|_2 < r$, tồn tại $t \in (0, 1)$ mà

$$
f(\mathbf{x}^{*} + \mathbf{h}) = f(\mathbf{x}^{*}) + \mathbf{h}^{\top}\nabla f(\mathbf{x}^{*}) + \frac{1}{2}\mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*} + t\mathbf{h})\mathbf{h} \geq f(\mathbf{x}^{*})
$$

Bởi vì $\nabla^2 f(\mathbf{x}^{*} + t\mathbf{h})\mathbf{h}$ là nửa xác định dương do $$\left\|t\mathbf{h} \right\|_2= t\left\|\mathbf{h} \right\|_2 < \left\|\mathbf{h} \right\|_2 < r$$. Thế nên $$\mathbf{h}^{\top}\nabla^2 f(\mathbf{x}^{*} + t\mathbf{h})\mathbf{h} \geq 0$$.

Mà vì $$f(\mathbf{x}^{*}) \leq f(\mathbf{x}^{*} + \mathbf{h})$$ với mọi $\mathbf{h}$ mà $\left\|\left\| \mathbf{h}\right\|\right\|_2 < r$, ta kết luận $\mathbf{x}^{*}$ là cực tiểu địa phương.

Hơn nữa, giả định rằng $\nabla^2 f(\mathbf{x}^{\*})$ là xác định dương nghiêm ngặt (strictly positive definite). Bởi vì Hessian là liên tục, ta có thể chọn một quả cầu $B'$ khác với $r' >0$ có tâm tại $\mathbf{x}^{\*}$ mà $\nabla^2 f(\mathbf{x})$ là xác định dương với mọi $\mathbf{x} \in B'$. Và ta lập luận tương tự như trên (ngoại trừ một bất đẳng thức nghiêm ngặt vì Hessain là xác định dương), ta có $$f(\mathbf{x}^{*} + \mathbf{h}) > f(\mathbf{x}^{*})$$ với mọi $\mathbf{h}$ với $0 < \left\|\left\| \mathbf{h}\right\|\right\|_2 < r'$. Vậy, $\mathbf{x}^{*}$ là cực tiểu địa phương nghiêm ngặt. $\blacksquare$

Lưu ý rằng sẽ có ngoại lệ, điều kiện $\nabla f(\mathbf{x}^{\*}) = \mathbf{0}$và $\nabla^2 f(\mathbf{x}^{\*})$ nửa xác định dương là chưa đủ để kết luận một cực tiểu địa phương tại $\mathbf{x}^{\*}$. Xem xét hàm $f(x) = x^3$. Ta có $f'(0) = 0$ và $f''(0) = 0$, nhưng $f$ có một điểm yên ngựa tại $x = 0$. Hàm $f(x) = -x^4$ là một trường hợp còn khó lường hơn. Nó có cùng gradient và Hessian tại $x = 0$ nhưng $x = 0$ là một cực đại địa phương nghiêm ngặt của hàm này :)

Với những lý do trên, ta cần Hessian phải nửa xác định dương khi ta đến gần $\mathbf{x}^{\*}$. Không may thay, điều kiện này không thực tế để kiểm tra tính toán, nhưng trong một số trường hợp ta có thể xác thực nó bằng cách phân tích (thông thường là chứng minh rằng $\nabla^2 f(\mathbf{x})$ là nửa xác định dương với mọi $\mathbf{x} \in \mathbb{R}^d$). Nếu $\nabla^2 f(\mathbf{x}^{\*})$ là xác định dương nghiêm ngặt, tiếp tục giả định về tính liên tục của $f$ ám chỉ điều này, nên ta không cần phải lo lắng.

## Tính lồi

Convexity là một thuật ngữ liên quan đến cả tập hợp lẫn hàm số. Với hàm số, ở đây là bậc đạo hàm lồi, và cách mà một hàm lồi cho chúng ta biết về cực tiểu của nó: chúng có tồn tại không, chúng có duy nhất không, làm sao chúng ta có thể tìm một cách nhanh chóng chúng bằng những thuật toán tối ưu, ...

### Tập lồi

Một tập $\mathcal{X} \subseteq \mathbb{R}^d$ là tập lồi nếu

$$
t\mathbf{x} + (1-t)\mathbf{y} \in \mathcal{X}
$$

với mọi $\mathbf{x}, \mathbf{y} \in \text{dom}f$ và $t \in [0, 1]$

### Cơ bản về hàm lồi

Một hàm $f$ là hàm lồi nếu

$$
f(t\mathbf{x} + (1-t)\mathbf{y}) \leq tf(\mathbf{x}) + (1-t)f(\mathbf{y})
$$

với mọi $\mathbf{x}, \mathbf{y} \in \text{dom}f$ và $t \in [0, 1]$

![](/assets/images_posts/convex_function.png)

Nếu bất đẳng thức nghiêm ngặt (tức là $<$ thay thì $\leq$) cho tất cả $t \in [0, 1]$ và $\mathbf{x} \ne \mathbf{y}$, thì ta nói $f$ là hàm lồi nghiêm ngặt (strictly convex)

Một hàm $f$ là một hàm lồi mạnh (strongly convex) với tham số $m$ nếu hàm

$$
\mathbf{x} \mapsto f(\mathbf{x}) - \frac{m}{2}\|\mathbf{x}\|_2^2
$$

là hàm lồi

Nếu bất đẳng thức là nghiêm ngặt, tức là $<$ thay vì $\leq$ với mọi $t \in (0, 1)$ và $\mathbf{x} \ne \mathbf{y}$, thì ta nói rằng $f$ là lồi nghiêm ngặt (strictly convex).

Một hàm $f$ là lồi mạnh với tham số $m$ ($m$-strongly convex) nếu hàm

$$
\mathbf{x} \mapsto f(\mathbf{x}) - \frac{m}{2}\left\|\mathbf{x} \right\|_2^2
$$

là lồi.

Những điều kiện này cho thấy: tính lồi mạnh ám chỉ lồi nghiêm ngặt. Một cách hình học, tính lồi có nghĩa là đường thẳng phân chia giữa hai điểm trên một đồ thị của hàm $f$ nằm trên hoặc trên đồ thị đó. Lồi nghiêm ngặt có nghĩa là đường thẳng phân đoạn nằm trên đồ thị một cách nghiêm ngặt, ngoại trừ những điểm chặn (endpoints).

### Hệ quả của tính lồi

Điều gì khiến ta lại quan tâm đến một hàm có phải lồi (nghiêm ngặt/ mạnh) hay không? Một cách đơn giản, trên nhiều định nghĩa của chúng ta về tính lồi ám chỉ bản chất của cực tiểu. Nó không có gì ngạc nhiên mà những điều kiện mạnh hơn nói cho chúng ta nhiều hơn về cực tiểu.

**Mệnh đề 16** Đặt $\mathcal{X}$ là một tập lồi. Nếu $f$ là một hàm lồi, thì bất kỳ cực tiểu địa phương (local minimum) nào của $f$ trong $\mathcal{X}$ cũng là một cực tiểu toàn cục (global minimum)

_Chứng minh_.

**Mệnh đề 17** Đặt $\mathcal{X}$ là một tập lồi. Nếu $f$ là một hàm lồi nghiêm ngặt (strictly convex), thì tồn tại ít nhất một cực tiểu địa phương của $f$ trong $\mathcal{X}$. Hệ quả là, nếu nó tồn tại, nó là một cực tiểu toàn cục duy nhất của $f$ trong $\mathcal{X}$

### Chứng minh rằng một hàm là lồi!

**Mệnh đề 18** Chuẩn là lồi (Norms are convex)

**Mệnh đề 19** Giả sử $f$ khả vi. Thì $f$ là lồi nếu và chỉ nếu

$$
f(\mathbf{x}) \geq f(\mathbf{y}) + (\nabla f(\mathbf{y}), \mathbf{x} - \mathbf{y})
$$

với mọi $\mathbf{x}, \mathbf{y} \in \text{dom}f$

**Mệnh đề 20** Giả sử $f$ khả vi cấp hai. Thì

i) $f$ là hàm lồi nếu và chỉ nếu $\nabla^2f(\mathbf{x}) \succeq 0$ với mọi $\mathbf{x} \in \text{dom}f$

ii) Nếu $\nabla^2f(\mathbf{x}) \succ 0$ với mọi $\mathbf{x} \in \text{dom}f$ thì $f$ lồi nghiêm ngặt

iii) $f$ là m-strongly convex nếu và chỉ nếu $\nabla^2f(\mathbf{x}) \succ mI$ với mọi $\mathbf{x} \in \text{dom}f$

**Mệnh đề 21** Nếu $f$ là hàm lồi và $\alpha \geq 0$, thì $\alpha f$ cũng là hàm lồi

**Mệnh đề 22** Nếu $f$ và $g$ là các hàm lồi, thì $f + g$ cũng là hàm lồi. Hơn nữa, nếu $g$ là một hàm lồi nghiêm ngặt (strictly convex) thì $f + g$ cũng là hàm lồi nghiêm ngặt và nếu $g$ là m-strongly convex, thì $f + g$ cũng là m-strongly convex

**Mệnh đề 23** Nếu $f_1, ..., f_n$ là các hàm lồi và $\alpha_1, ..., \alpha_n \geq 0$ thì

$$
\sum_{i=1}^n\alpha_if_i
$$

là hàm lồi.

**Mệnh đề 24** Nếu $f$ là một hàm lồi thì $g(\mathbf{x}) = f(\mathbf{Ax + b})$ là hàm lồi với bất kỳ ma trận $\mathbf{A}$ phù hợp kích thước và $\mathbf{b}$

**Mệnh đề 25** Nếu $f$ và $g$ là các hàm lồi, thì $$h(\mathbf{x}) \equiv \text{max}\{f(\mathbf{x}), g(\mathbf{x})\}$$ là hàm lồi.

## Tài liệu gốc

\[1\] [Garrett Thomas. Department of Electrical Engineering and Computer Sciences. University of California, Berkeley. "Mathematics for Machine Learning", January 11, 2018](https://gwthomas.github.io/docs/math4ml.pdf)
