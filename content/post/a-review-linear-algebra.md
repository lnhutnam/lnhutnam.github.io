+++
author = "Le, Nhut Nam"
title = "Tóm tắt về Đại số tuyến tính"
date = "2021-08-14"
tags = [
    "linear algebra", "basis", "vector space"
]
+++

Ghi và dịch ra Tiếng Việt từ Mathematics for Machine Learning của Garrett Thomas, Department of Electrical Engineering and Computer Sciences, University of California, Berkeley nhằm ôn tập và tổng hợp lại kiến thức Toán cho Học Máy.

## Không gian Vector - Vector spaces

Không gian Vector là cơ sở trong việc hình thành Đại số tuyến tính. Một không gian Vector - vector space $V$ là một tập hợp (trong đó những phần tử được gọi là những **vector**) được định nghĩa hai toán tử trên nó: những vector có thể được cộng với nhau, và những vector có thể được nhân với số thực được gọi là **scalars**

1. Tồn tại một đơn vị cộng (an additive identity), được viết là $0$ trong $V$ mà $x + 0 = x$ với mọi $x \in V$

2. Với mọi $x \in V$, tồn tại một đơn vị nghịch đảo (an additive inverse), được viết là $-x$ sao cho $x + (-x) = 0$

3. Tồn tại một đơn vị nhân (a multiplicative identity), được viết là 1 trong $\mathbb{R}$ mà $1x = x$ với mọi $x \in V$

4. Tính giao hoán (Commutativity): $x + y = y + x$ với mọi $x, y \in V$

5. Tính kết hợp (Associativity): $(x+y)+z = x + (y + z)$ và $\alpha(\beta x) = (\alpha\beta)x$ với mọi $x, y,z \in V$ và $\alpha, \beta \in \mathbb{R}$

6. Tính phân phối (Distributivity): $\alpha(x + y) = \alpha x + \alpha y$ và $(\alpha + \beta)x = \alpha x + \beta x$ với $x, y \in V$ và $\alpha, \beta \in \mathbb{R}$

Một tập hợp các vector $v_1, v_2, ..., v_n \in V$ được gọi là độc lập tuyến tính (**linearly independent**) nếu

$$
\alpha_1v_1 + \alpha_2v_2 + ... + \alpha_nv_n = 0 \text{  kéo theo }\\ \alpha_1 = \alpha_2 = ... = \alpha_n
$$

Bao (span) của $v_1, v_2, ..., v_n \in V$ là tập hợp tất cả những vector mà có thể được thể hiện bằng sự tổ hợp tuyến tính của chúng

$$
span \lbrace v_1, v_2, ..., v_n \rbrace = \{\ v\in V: \exists \alpha_1, \alpha_2, ..., \alpha_n \text{ mà } \alpha_1v_1 + \alpha_2v_2 + ... + \alpha_nv_n = v \}\
$$

Nếu một tập hợp những vector là độc lập tuyến tính (linearly independent) và bao (span) của nó là toàn bộ V, những vector này được gọi là một **cơ sở** (**basis**) của V. Một cách tổng quát, mọi tập vector độc lập tuyến tính đều tạo thành cơ sở cho bao của nó

Nếu một không gian vector được bao bởi một số lượng hữu hạn vector, nó được gọi là **finite-dimensional** - có chiều hữu hạn. Trường hợp còn lại, nó gọi là **infinite-dimensional** - vô hạn chiều. Số lượng vector trong một cơ sở cho một không gian Vector hữu hạn chiều V được gọi là **dimension** - chiều của **V** và được ký hiệu là $dimV$

### Không gian Euclidean (Euclidean spaces)

Không gian Vector thông thường là **Không gian Euclidean** (**Euclidean spaces**), chúng ta ký hiệu là $\mathbb{R}$. Những vector trong không gian này bao gồm n-tuples số thực

$$
\mathbf{x} = (x_1, x_2, ..., x_n)
$$

Để dễ dàng, nó thường được nhìn bằng dạng một ma trật $n \times 1$ hoặc có thể gọi là vector cột (**column vector**)

$$
\mathbf{x} = \begin{bmatrix}x_1\\x_2\\...\\x_n\end{bmatrix}
$$

Phép cộng (addition) và nhân với một số (scalar multiplication) được định nghĩa trên những vector trong $\mathbb{R}^n$

$$
\mathbf{x} + \mathbf{y} =  \begin{bmatrix}x_1 + y_1\\x_2 + y_2\\...\\x_n + y_n\end{bmatrix}
$$

$$
\alpha\mathbf{x} = \begin{bmatrix}\alpha x_1\\ \alpha x_2\\...\\ \alpha x_n\end{bmatrix}
$$

Không gian Euclidean được sử dụng để đại diện không gian vật lý một cách Toán học, với những khái niệm như khoảng cách (distance), độ dài (length) và góc (angles). Mặc dù nó trở nên khó hơn khi trực quan với số chiều $n > 3$, những khái niệm này về mặt toán học theo cách tổng quát hóa rõ ràng. Mặc dù bạn đang làm việc trong một trường hợp tổng quát hơn $\mathbb{R}^n$, nó thường hữu ích để trực quan phép cộng và nhân với một số trong thuật ngữ vector 2 chiều (2D vectors) trong một mặt phẳng (plane) hay vector 3 chiều (3D vectors) trong không gian.

### Không gian con (Subspaces)

Không gian vector có thể chứa những không gian vector khác. Nếu $V$ là một không gian vector, $S \subseteq V$ được gọi là một không gian con của $V$ nếu

1. $0 \in S$

2. $S$ là tập đóng với phép cộng: $\mathbf{x}, \mathbf{y} \in S$ kéo theo $\mathbf{x} + \mathbf{y} \in S$

3. $S$ là tập đóng với phép nhân với một số (scalar): $\mathbf{x} \in S, \alpha \in \mathbb{R}$ kéo theo $\alpha\mathbf{x} \in S$

Để ý rằng $V$ luôn là một không gian con của $V$, vì là một không gian vector tầm thường chỉ chứa 0

Ví dụ cụ thể, một đường thẳng đi qua gốc tọa độ (orgin) là một không gian con của không gian Euclidean

Nếu $U$ và $W$ là những không gian con của $V$, thì tổng của chúng được định nghĩa

$$
U + W = \{\mathbf{u} + \mathbf{w} |\mathbf{u} \in U, \mathbf{w} \in W\}
$$

Thật đơn giản để xác minh rằng tập hợp này cũng là một không gian con của $V$. Nếu $U \cap W = \{0\}$, tổng được gọi là tổng trực tiếp (**direct sum**) và được viết là $U \bigoplus W$. Với mọi vector trong $U \bigoplus W$ có thể được viết như sau $\mathbf{u} + \mathbf{w}$ với $\mathbf{u} \in U$ và $\mathbf{w} \in W$ (Đây vừa là điều kiện cần và điều kiện đủ để có tổng trực tiếp)

Số chiều của tổng của không gian con liên hệ với nhau như sau:

$$
dim(U+W) = dimU + dimW - dim(U \cap W)
$$

Và

$$
dim(U \bigoplus W) = dimU + dimW
$$

Vì $dim(U \cap W) = dim(\{0\}) = 0$ nếu tổng là tổng trực tiếp.

## Ánh xạ tuyến tính - Linear maps

Một **ánh xạ tuyến tính (linear maps)** là một hàm $T: V \rightarrow W$ trong đó $V$ và $W$ là những không gian vector, thỏa

1. $T(\mathbf{x} + \mathbf{y}) = T\mathbf{x} + T\mathbf{y}$ với mọi $\mathbf{x}, \mathbf{y} \in V$

2. $T(\alpha\mathbf{x}) = \alpha T\mathbf{x}$ với mọi $\mathbf{x} \in V, \alpha \in \mathbb{R}$

Một ánh xạ tuyến tính từ $V$ đến chính nó được gọi là một toán tử tuyến tính (**linear operator**)

Quan sát rằng định nghĩa của một ánh xạ tuyến tính phù hợp để phản ánh cấu trúc của không gian vector, vì nó bảo tồn hai toán hạng của không gian vector là phép cộng (addition) và phép nhân scalar (scalar multiplication). Trong thuật ngữ Đại số, một ánh xạ tuyến tính gọi là **homomorphism** - đồng cấu của không gian vector. Phép đồng cấu không thể đảo ngược (trong đó phép nghịch đảo cũng là phép đồng cấu) được gọi là **isomorphism** - đẳng cấu. Nếu tồn tại một đẳng cấu từ $V$ đến $W$, thì $V$ và $W$ được gọi là đẳng tích (isomorphic) và chúng ta viết $V \cong W$. Không gian vector đẳng cấu (Isomorphic vector space) về cơ bản là “giống nhau” về cấu trúc đại số của chúng.Có một thực tế thú vị là không gian vectơ hữu hạn chiều có cùng thứ nguyên (dimensional) luôn là đẳng cấu; Nếu $V, W$ là những không gian vector thực với $dimV = dimW = n$, thì chúng ta có đẳng cấu tự nhiên (natural isomorphism)

$$
\begin{gather*}
\varphi : V \rightarrow W\\
\alpha_1v_1 + \alpha_2v_2 + ... + \alpha_nv_n \rightarrow \alpha_1w_1 + \alpha_1w_2 + ... + \alpha_nw_n
\end{gather*}
$$

Trong đó: $v_1, v_2, ..., v_n$ và $w_1, w_2, ..., w_n$ là bất kỳ cơ sở nào của $V$ và $W$. Ánh xạ này được xác định rõ ràng vì mọi vector trong $V$ có thể được biểu diễn đơn nhất như một tổ hợp tuyến tính (linear combination) của $v_1, v_2, ..., v_n$. Thật đơn giản để xác minh rằng $\varphi$ là một đẳng cấu, vì vậy trên thực tế $V \cong W$. Đặc biệt, với mọi không gian vector n chiều thực là đẳng cấu với $\mathbb{R}^n$

### Dạng ma trận của một ánh xạ tuyến tính

Không gian vector khá là trừu tượng. Để đại diện (represent) và thao tác (manipulate) những vector và ánh xạ tuyến tính trên máy tính, chúng ta sử dụng những mảng hình chữ nhật của những số được gọi là những ma trận (matrices)

Giả sử $V$ và $W$ là những không gian vector hữu hạn chiều với những cơ sở
$\mathbf{v}\_1, \mathbf{v}\_2, ..., \mathbf{v}\_n$ và $\mathbf{w}\_1, \mathbf{w}\_2, ..., \mathbf{w}\_m$ tương ứng và $T: V \rightarrow W$ là một ánh xạ tuyến tính. Dạng ma trận của $T$, với $A_{ij}$ trong đó $i = 1...m, j = 1...n$ được định nghĩa bởi

$$
T\mathbf{v}_j = A_{1j}\mathbf{w}_1 + ... + A_{mj}\mathbf{w}_m
$$

Cột thứ $j$ của $\mathbf{A}$ gồm các tọa độ của $T_\mathbf{v_j}$ trong cơ sở được chọn của $W$

Ngược lại, với mọi ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ tạo ra một ánh xạ tuyến tính $T: \mathbb{R}^{n} \rightarrow \mathbb{R}^{m}$ được cho bởi:

$$
T\mathbf{x} = \mathbf{A}\mathbf{x}
$$

và ma trận của ánh xạ này với đối với những cơ sở chuẩn của $\mathbb{R}^{n}$ và $\mathbb{R}^{m}$ là $\mathbf{A}$

Nếu $\mathbf{A} \in \mathbb{R}^{m \times n}$, chuyển vị (transpose) của nó $A^T \in \mathbb{R}^{n \times m}$ được cho bởi $(\mathbf{A}^T)\_{ij} = A_{ji}$ với mỗi $(i, j)$. Nói một cách khác, những cột của $\mathbf{A}$ trở thành những dòng của $\mathbf{A}^T$ và những cột của $\mathbf{A}$ trở thành dòng của $\mathbf{A}^T$

Phép chuyển vị có một số tính chất thú vị vị như sau:

i) $(\mathbf{A}^T)^T = \mathbf{A}$

ii) $(\mathbf{A} + \mathbf{B})^T = \mathbf{A}^T + \mathbf{B}^T$

iii) $(\alpha\mathbf{A})^T = \alpha\mathbf{A}^T$

iv) $(\mathbf{A}\mathbf{B})^T = \mathbf{B}^T\mathbf{A}^T$

### Không gian rỗng (Nullspace), khoảng (range)

Một vài không gian con quan trọng được tạo ra bởi ánh xạ tuyến tính. Nếu $T: V \rightarrow W$ là một ánh xạ tuyến tính, chúng ta định nghĩa không gian rỗng (nullspace) của $T$

$$
null(T) = \{\mathbf{v} \in V | T\mathbf{v} = 0\}
$$

và khoảng (range) của $T$

$$
range(T) = \{ \mathbf{w} \in W | \exists \mathbf{v} \in V \text{ such that } T\mathbf{v} =  \mathbf{w}\}
$$

Không gian cột (**columnspace**) của một ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ là bao của những cột của nó (xem như những vector trong không gian $\mathbb{R}^m$) và tương tự không gian dòng (**rowspace**) của $\mathbf{A}$ là bao của các dòng của nó (xem như những vector trong không gian $\mathbb{R}^m$). Nó không khó để thấy được rằng không cột của $\mathbf{A}$ chính xác là khoảng của ánh xạ tuyến tính từ $\mathbb{R}^n$ vào $\mathbb{R}^m$ mà được tạo ra bởi $\mathbf{A}$, thế nên chúng ta biểu diễn nó bởi range($\mathbf{A}$) trong một sự lạm dụng nhẹ ký hiệu. Tương tự, không gian dòng được biểu diễn range($\mathbf{A}^T$)

Một điều đáng chú ý là chiều của không gian cột của $\mathbf{A}$ là cùng số chiều với không gian dòng của $\mathbf{A}$. Định lượng này gọi là hạng (rank) của $\mathbf{A}$

$$
rank(\mathbf{A}) = dim(range(\mathbf{A}))
$$

## Không gian metric

Metrics tổng quát hóa khái niệm khoảng cách từ không gian Euclidean (mặc dù không gian metric không nhất thiết là không gian vector)

Một metric trên một tập $S$ là một hàm $d: S \times S \rightarrow \mathbb{R}$ mà thỏa:

1. $d(x, y) \geq 0$ với dấu đẳng thức xảy ra khi và chỉ khi $x = y$

2. $d(x, y) = d(y, x)$

3. $d(x, z) \leq d(x, y) + d(y, z)$ (được gọi là bất đẳng thức tam giác - triangle inequality)

với mọi $x, y, z \in S$

Động lực chính cho metric là chúng cho phép giới hạn để định nghĩa đối tượng toán học hơn là số thực. Chúng ta nói rằng một chuỗi $\{x_n\} \subseteq S$ hội tụ về giới hạn $x$ nếu với mọi $\epsilon > 0$, tồn tại $N \in \mathbb{N}$ mà $d(x_n,x) < \epsilon$ với mọi $n \geq N$. Để ý rằng định nghĩa cho giới hạn của chuỗi của số thực, mà bạn được học trong mấy cái lớp Giải tích, là một trường hợp đặc biệt của cái định nghĩa này khi sử dụng metric $d(x, y) = \|x - y\|$

## Không gian định chuẩn - Normed spaces

Chuẩn tổng quát hóa khái niệm độ dài - length từ không gian Euclidean

Một chuẩn (**norm**) trên một không gian vector thực $V$ là một hàm $\|\|.\|\|:V \rightarrow \mathbb{R}$ thỏa:

1. $\|\|\mathbf{x}\|\| \geq 0$ với dấu dẳng thức xảy ra khi và chỉ khi $x = 0$

2. $\|\|\alpha \mathbf{x}\|\| = \|\alpha\|\|\|\mathbf{x}\|\|$

3. $\|\|\mathbf{x} + \mathbf{y}\|\| \leq \|\|\mathbf{x}\|\| + \|\|\mathbf{y}\|\|$ (bất đẳng thức tam giác giác)

với mọi $x, y \in V$ và tất cả $\alpha \in \mathbb{R}$. Một không gian vector với một chuẩn được gọi là không gian vector định chuẩn (normed vector space) hoặc một cách đơn giản hơn là một không gian chuẩn (nromed space)

Lưu ý rằng, bất kỳ chuẩn nào trên $V$ tạo ra một khoảng cách metric trên $V$

$$
d(\mathbf{x}, \mathbf{y}) = ||\mathbf{x}-\mathbf{y}||
$$

Người ta có thể xác minh rằng các tiên đề cho các metric được thỏa mãn theo định nghĩa này và theo dõi trực tiếp từ các tiên đề cho các chuẩn. Do đó bất kỳ không gian định chuẩn nào cũng được gọi là không gian metric. Nếu một không gian định chuẩn là đầy đủ với khoảng cách metric tương ựng được tạo ra bởi chuẩn của nó, chúng ta nói rằng nó là một không gian Banach (Banach space)

Chúng ta sẽ thường chỉ quan tâm đến một vài chuẩn cụ thể trên không gian $\mathbb{R}^n$

$$
||x||_1 = \sum_{i=1}^n|x_i|
$$

$$
||x||_2 = \sqrt{\sum_{i=1}^nx_i^2}
$$

$$
||x||_p = \left(\sum_{i=1}^n|x_i|^p\right)^{\frac{1}{p}}, (p \geq 1)
$$

$$
||x||_{\infty} = \underset{1 \leq i \leq n}{\text{ max }}|x_i|
$$

Để ý rằng 1- và 2-norms là những trường hợp đặc biệt của $p$-norm, và $\infty$-norm là giới hạn của $p$-norm khi $p$ tiến ra vô cùng. Chúng ta cần $p \geq 1$ cho định nghĩa tổng quát của $p$-norm bởi vì bất đẳng thức tam giác không đạt được nếu mà $p < 1$

Và ở đây có một điều thú vị là: với bất kỳ không gian vector hữu hạn chiều $V$ nào, tất cả chuẩn trên $V$ tương đương với nghĩa là với hai chuẩn $\|\| \cdot \|\|_A$ và $\|\| \cdot \|\|_B$, tồn tại những hằng số $\alpha$, $\beta$ dương sao cho

$$
\alpha||\mathbf{x}||_A \leq ||\mathbf{x}||_B \leq \beta||\mathbf{x}||_A
$$

với mọi $x \in V$. Do đó hội tụ trong một chuẩn kéo theo hội tụ trong bất kỳ chuẩn nào khác. Luật này có thể không được áp dụng cho không gian vector vô hạn chiều như không gian hàm số (function spaces)

## Không gian tích trong - Inner product spaces

Một tích trong (inner product) trên một không gian vector thực $V$ là một hàm $\left<\cdot, \cdot \right>: V \times V \rightarrow \mathbb{R}$ thỏa

i) $\left<\mathbf{x}, \mathbf{x}\right> \geq 0$ với dấu đẳng thức xảy xa nếu và chỉ nếu $x = 0$

ii) $\left<\mathbf{x} + \mathbf{y}, \mathbf{z}\right> = \left<\mathbf{x}, \mathbf{z}\right> + \left<\mathbf{y}, \mathbf{z}\right>$ và $\left<\alpha \mathbf{x}, \mathbf{y}\right> = \alpha\left<\mathbf{x}, \mathbf{y}\right>$

iii) $\left<\mathbf{x}, \mathbf{y}\right> = \left<\mathbf{y}, \mathbf{x}\right>$

với mọi $\mathbf{x}, \mathbf{y}, \mathbf{z} \in V$ và mọi $\alpha \in \mathbb{R}$. Một không gian vector có một tích trong được gọi là một không gian tích trong (**inner product space**)

Lưu ý rằng bất kỳ tích trong nào trên $V$ cũng tạo ra một chuẩn trên $V$:

$$
||\mathbf{x}|| = \sqrt{\left<\mathbf{x}, \mathbf{x}\right>}
$$

Người ta có thể xác minh rằng các tiên đề cho các metric được thỏa mãn theo định nghĩa này và theo dõi trực tiếp từ các tiên đề cho các tích trong. Do đó bất kỳ không gian tích trong nào cũng được gọi là không gian định chuẩn (và do đó cũng là một không gian metric). Nếu một không gian tích trong là đầy đủ với khoảng cách metric tương ứng được tạo ra bởi tích trong của nó, chúng ta gọi đó là **không gian Hilbert** (**Hilbert space**)

Hai vector $x$ và $y$ được gọi là trực giao (**orthogonal**) nếu $\left<x, y\right> = 0$, ta viết là $x \perp y$ cho nó gọn. Trực giao tổng quát hóa khai niệm vuông góc (perpendicularity) từ không gian Euclidean. Nếu hai vector trực giao $x$ và $y$ có độ dài đơn vị, tức là $\|\|\mathbf{x}\|\| = \|\|\mathbf{y}\|\| = 1$, chúng ta gọi nó là trực chuẩn (**orthonormal**)

Tích trong chuẩn trên không gian $\mathbb{R}^n$ được cho bởi:

$$
\left<x, y\right> = \sum_{i=1}^nx_iy_i = \mathbf{x}^T\mathbf{y}
$$

### Định lý Pythagorean (Pythagorean Theorem)

Định lý Pythagorean nổi tiếng khái quát một cách tự nhiên đến các không gian tích trong (inner product spaces)

**Theorem 1**. Nếu $\mathbf{x} \perp \mathbf{y}$ thì

$$
||\mathbf{x} + \mathbf{y}||^2 = ||\mathbf{x}||^2 + ||\mathbf{y}||^2
$$

_Chứng minh_: Giả sử rằng $\mathbf{x} \perp \mathbf{y}$ tức là $\left<\mathbf{x}, \mathbf{y}\right> = 0$ thì

$$
||\mathbf{x} + \mathbf{y}||^2 = \left<\mathbf{x} + \mathbf{y}, \mathbf{x} + \mathbf{y}\right> = \left<\mathbf{x}, \mathbf{x}\right> + \left<y, \mathbf{x}\right> + \left<\mathbf{x}, \mathbf{y}\right> + \left<\mathbf{y}, \mathbf{y}\right> = ||\mathbf{x}||^2 + ||\mathbf{y}||^2
$$

Kết luận điều phải chứng minh.

### Bất đẳng thức Cauchy-Schwarz (Cauchy-Schwarz inequality)

$$
|\left<\mathbf{x}, \mathbf{y}\right>| \leq ||\mathbf{x}||\text{ }||\mathbf{y}||
$$

với mọi $\mathbf{x}, \mathbf{y} \in V$. Dấu đẳng thức xảy ra khi $\mathbf{x}$ và $\mathbf{y}$ là những scalars nhân với nhau (hay nói cách khác, là khi chúng độc lập tuyến tính)

### Phần bù trực giao (Orthogonal complements) và Phép chiếu (projections)

Nếu $S \subseteq V$ trong đó $V$ là không gian tích trong, thì phần bù trực giao (orthogonal complement) của $S$, đặt là $S^{\perp}$, là tập tất cả những vector trong $V$ mà trực giao với mọi thành phần của $S$

$$
S^{\perp} = \{\mathbf{v} \in V | \mathbf{v} \perp \mathbf{s} \text{ for all } \mathbf{s} \in S\}
$$

Rất dễ dàng để xác nhận rằng $S^{\perp}$ là một không gian con của $V$ với bất kỳ $S \subseteq V$. Để ý rằng không có yêu cầu rằng bản thân $S$ là một không gian con của $V$. Tuy nhiên nếu $S$ là một (hữu hạn chiều) không gian con của $V$, chúng ta có vài thứ quan trọng sau đây:

**Mệnh đề 1** Gọi $V$ là một không gian tích trong (inner product space) và $S$ là một không gian gian con hữu hạn chiều của $V$. Thì với mọi $\mathbf{v} \in V$ có thể được viết dưới dạng đơn nhất sau đây:

$$
\mathbf{v} = \mathbf{v}_S + \mathbf{v}_{\perp}
$$

Trong đó $\mathbf{v_S} \in S$ và $\mathbf{v}\_{\perp} \in S^{\perp}$

_Chứng minh_. Gọi $\mathbf{u}_1, \mathbf{u}_2, ..., \mathbf{u}_m$ là cơ sở trực chuẩn của $S$ và giả định $\mathbf{v} \in V$. Định nghĩa:

$$
\mathbf{v}_S = \left<\mathbf{v}, \mathbf{u_1}\right>\mathbf{u_1} + ... + \left<\mathbf{v}, \mathbf{u_m}\right>\mathbf{u_m}
$$

và

$$
\mathbf{v}_{\perp} = \mathbf{v} - \mathbf{v}_S
$$

Dễ dàng thấy rằng $\mathbf{v}_S \in S$ bởi vì nó là trong bao của cơ sở được chọn. Ta có, với mọi $i = 1...m$

$$
\begin{gather}
\left<\mathbf{v}_{\perp}, \mathbf{u}_i\right> = \left<\mathbf{v} - (\left<\mathbf{v}, \mathbf{u}_1\right>\mathbf{u}_1 + ... + \left<\mathbf{v}, \mathbf{u}_m\right>\mathbf{u}_m), \mathbf{u}_i\right>\\
= \left<\mathbf{v}, \mathbf{u}_i\right> - \left<\mathbf{v}, \mathbf{u}_1\right>\left<\mathbf{u}_1, \mathbf{u}_i\right> - ... - \left<\mathbf{v}, \mathbf{u}_m\right>\left<\mathbf{u}_m, \mathbf{u}_i\right> \\
= \left<\mathbf{v}, \mathbf{u}_i\right> - \left<\mathbf{v}, \mathbf{u}_i\right>  = 0
\end{gather}
$$

mà kéo theo $\mathbf{v}_{\perp} \in S^{\perp}$

Còn tiếp ....

**Mệnh đề 2** Đặt $S$ là một không gian con hữu hạn chiều của $V$. Thì

i) Với bất kỳ $\mathbf{v} \in V$ nào, và cơ sở trực chuẩn $\mathbf{u}_1, ..., \mathbf{u}_m$ của $S$

$$
P_S\mathbf{v} = \left<\mathbf{v}, \mathbf{u}_1\right>\mathbf{u}_1 + ... + \left<\mathbf{v}, \mathbf{u}_m\right>\mathbf{u}_m
$$

ii) Với bất kỳ $\mathbf{v} \in V$ nào, $\mathbf{v} - P_S\mathbf{v} \perp S$

iii) $P_S$ là một ánh xạ tuyến tính

iv) $P_S$ là đồng nhất khi giới hạn về $S$, tức là $P_S\mathbf{s} = \mathbf{s}$ với mọi $\mathbf{s} \in S$

v) $range(P_S) = S$ và $null(P_S) = S^{\perp}$

vi) $P_S^2 = P_S$

vii) Với bất kỳ $\mathbf{v} \in V$ nào, $$\|P_S\mathbf{v}\| \leq \| \mathbf{v}\|$$

viii) Với bất kỳ $\mathbf{v} \in V$ và $\mathbf{s} \in S$

$$
\|\mathbf{v} - P_S\mathbf{v}\| \leq \|\mathbf{v} - \mathbf{s}\|
$$

với dấu đẳng thức xảy ra nếu và chỉ nếu $\mathbf{s} = P_S\mathbf{v}$.

$$
P_S\mathbf{v} = \underset{\mathbf{s} \in S}{\text{arg min }} \| \mathbf{v} - \mathbf{s}\|
$$

_Chứng minh_. $\blacksquare$

## Trị riêng - Eigenthings

Với một ma trận $\mathbf{A} \in \mathbb{R}^{n \times n}$, có thể là những vector, khi $\mathbf{A}$ tác động lên chúng, thì đơn giản là bị co dãn bởi một vài hằng số nào đó (constant). Chúng ta gọi đó là những vector khác 0 (nonzero vector) $\mathbf{x} \in \mathbb{R}^n$ là một vector riêng (**eigenvector**) của $\mathbf{A}$ tương ứng với trị riêng (**eigenvalue**) $\lambda$ nếu

$$
\mathbf{A}\mathbf{x} = \lambda\mathbf{x}
$$

Những vector không bị loại trừ bởi định nghĩa trên là do $\mathbf{A}0 = 0 = \lambda 0$ với mọi $\lambda$

**Mệnh đề 3**. Gọi $\mathbf{x}$ là một vector riêng của $\mathbf{A}$ với giá trị riêng tương ứng là $\lambda$. thì

i) Với mọi $\gamma \in \mathbb{R}$, $\mathbf{x}$ là một vector riêng của $\mathbf{A} + \gamma \mathbf{I}$ với giá trị riêng $\lambda + \gamma$

ii) Nếu $\mathbf{A}$ khả nghịch, thì $\mathbf{x}$ là một vector riêng của $\mathbf{A}^{-1}$ với giá trị riêng $\lambda^{-1}$

iii) $\mathbf{A}^k\mathbf{x} = \lambda^k\mathbf{x}$ với bất kỳ $k \in \mathbb{Z}$ nào (trong đó $\mathbf{A}^0 = \mathbf{I}$)

## Vết - Trace

Vết (trace) của một ma trận vuông là tổng của những phần tử trên đường chéo chính của nó

$$
tr(\mathbf{A}) = \sum_{i=1}^nA_{ii}
$$

Tính chất đại số:

i) $tr(\mathbf{A} + \mathbf{B}) = tr(\mathbf{A}) + tr(\mathbf{B}) $

ii) $tr(\mathbf{\alpha A}) = \alpha tr(\mathbf{A})$

iii) $tr(\mathbf{A}^T) = tr(\mathbf{A})$

iv) $tr(\mathbf{ABCD}) = tr(\mathbf{BCDA}) = tr(\mathbf{CDAB}) = tr(\mathbf{DABC})$ (bất biến với phép quay - invariance under cyclic permutations)

Một điều thú vị, vết của một ma trận bằng với tổng của những giá trị riêng của nó

$$
tr(\mathbf{A}) = \sum_{i}\lambda_i(\mathbf{A})
$$

## Định thức - Determinant

Định nghĩa của định thức có thể được định nghĩa theo nhiều cách khác nhau, các bạn có thể tham khảo [Wikipedia của nó](https://en.wikipedia.org/wiki/Determinant) để biết thêm chi tiết. Chúng ta nên nhớ những tính chất thú vị của nó

i) $det(\mathbf{I}) = 1$

ii) $det(\mathbf{A}^T) = det(\mathbf{A})$

iii) $det(\mathbf{AB}) = det(\mathbf{A})det(\mathbf{B})$

iv) $det(\mathbf{A}^{-1}) = det(\mathbf{A})^{-1}$

v) $det(\alpha\mathbf{A}) = \alpha^ndet(\mathbf{A})$

Thú vị hơn nữa là, định thức của một ma trận bằng với tích của những vector riêng của nó

$$
det(\mathbf{A}) = \prod_{i}\lambda_i(\mathbf{A})
$$

## Ma trận trực giao - Orthogonal matrices

Một ma trận $\mathbf{Q} \in \mathbb{R}^{n \times n}$ được gọi là trực giao nếu các cột của nó trực chuẩn đôi một.

$$
\mathbf{Q}^T\mathbf{Q} = \mathbf{Q}\mathbf{Q}^T = \mathbf{I}
$$

hay tương đương với

$$
\mathbf{Q}^T = \mathbf{Q}^{-1}
$$

Một điều hay ho về những ma trận trực giao là chúng bảo tồn tích trong

$$
(\mathbf{Q}\mathbf{x})^T(\mathbf{Q}\mathbf{y}) = \mathbf{x}^T\mathbf{Q}^T\mathbf{Q}\mathbf{y} = \mathbf{x}^T\mathbf{I}\mathbf{y} = \mathbf{x}^T\mathbf{y}
$$

Một kết quả trực tiếp từ dữ kiện này là chúng cũng bảo tồn 2-norms:

$$
||\mathbf{Q}\mathbf{x}||_2 = \sqrt{(\mathbf{Q}\mathbf{x})^T(\mathbf{Q}\mathbf{x}} = \sqrt{\mathbf{x}^T\mathbf{x}} = ||x||_2
$$

## Ma trận đối xứng - Symmetric matrices

Một ma trận $\mathbf{A} \in \mathbb{R}^{n \times n}$ được gọi là đối xứng (**Symmetric**) nếu nó bằng với chuyển vị của nó ($\mathbf{A} = \mathbf{A}^T$), có nghĩa là $A_{ij} = A_{ji}$ với mọi $(i, j)$. Định nghĩa này nhìn có vẻ vô hại nhưng thực ra nó mang trong mình một vài hàm ý rất mạnh mẽ.

**Theorem 2**. (Spectral Theorem - Định lý phổ) Nếu $\mathbf{A} \in \mathbb{R}^{n \times n}$ là đối xứng, thì tồn tại một cơ sở trực chuẩn cho không gian $\mathbb{R}^n$ gồm những vector riêng của $\mathbf{A}$

Ứng dụng thực tế của định lý này cụ thể là phân rã của ma trận đối xứng, như là phân rã trị riêng (eigen decomposition) hay phân rã phổ (spectral decomposition). Đặt cơ sở trực chuẩn của những vector riêng (eigen vectors) $\mathbf{q}_1, ..., \mathbf{q}_n$ và những giá trị riêng (eigenvalue) của chúng là $\lambda_1, ..., \lambda_n$. Gọi $\mathbf{Q}$ là ma trận trực giao với $\mathbf{q}_1, ..., \mathbf{q}_n$ là các cột của nó và $\Lambda  = \text{diag}(\lambda_1, ..., \lambda_n)$. Vì với định nghĩa $\mathbf{Aq}_i = \lambda_i\mathbf{q}_i$, mối quan hệ:

$$
\mathbf{AQ} = \mathbf{Q}\Lambda
$$

Nhân bên phải với $\mathbf{Q}^T$, ta có phân rã

$$
\mathbf{A} = \mathbf{Q}\Lambda\mathbf{Q}^T
$$

### Thương số Rayleigh (Rayleigh quotients)

Đặt $\mathbf{A} \in \mathbb{R}^{n \times n}$ là một ma trận đối xứng. Biểu thức $\mathbf{x}^T\mathbf{A}\mathbf{x}$ được gọi là dạng toàn phương (quadratic form)

Nó xuất hiện một liên kết thú vị giữa dạng toàn phương của một ma trận đối xứng và những giá trị riêng của nó. Liên kết này được cho bởi Thương số Rayleigh (Rayleigh quotient)

$$
R_{\mathbf{A}}(\mathbf{x}) = \frac{\mathbf{x}^T\mathbf{A}\mathbf{x}}{\mathbf{x}^T\mathbf{x}}
$$

Thương số Rayleigh có hai tính chất quan trọng mà chúng ta có thể chứng minh dễ dàng (mà thôi không chứng minh đâu :v lười)

i) Bất biến với phép co (Scale invariance): Với bất kỳ vector $\mathbf{x} \ne \mathbf{0}$ và bất kỳ số (scalar) $\alpha \ne 0$, $R_{\mathbf{A}}(\mathbf{x}) = R_{\mathbf{A}}(\mathbf{\alpha x})$

ii) Nếu $\mathbf{x}$ là một vector riêng của $\mathbf{A}$ với giá trị riêng $\lambda$ thì $R_{\mathbf{A}}(\mathbf{x}) = \lambda$

**Mệnh đề 4**. Với bất kỳ $\mathbf{x}$ mà $\|\|x\|\|_2 = 1$

$$
\lambda_{min}(\mathbf{A}) \leq \mathbf{x}^T\mathbf{A}\mathbf{x} \leq \lambda_{max}(\mathbf{A})
$$

với dấu đẳng thức xảy ra nếu và chỉ nếu $\mathbf{x}$ là một vector riêng tương ứng

_Chứng minh_. Chứng minh trường hợp max bởi vì với trường hợp min thì nó khá là tương tự

Bởi vì $\mathbf{A}$ là đối xứng, chúng ta có thể phân rã $\mathbf{A} = \mathbf{Q}\Lambda\mathbf{Q}^T$. Sau đó sử dụng phép đổi biến $\mathbf{y} = \mathbf{Q}^T\mathbf{x}$, ta thấy rằng mối quan hệ giữa $\mathbf{x}$ và $\mathbf{y}$ là mối quan hệ 1-1 và $\|\|\mathbf{y}\|\|_2 = 1$ vì $\mathbf{Q}$ là trực giao. Do đó

$$
 \underset{||\mathbf{x}||_2 = 1}{\text{max }}\mathbf{x}^T\mathbf{A}\mathbf{x} =  \underset{||\mathbf{y}||_2 = 1}{\text{max }}\mathbf{y}^T\Lambda\mathbf{y} =  \underset{y_1^2 + ... + y_n^2}{\text{max }}\sum_{i=1}^n\lambda_iy_i^2
$$

Viết theo cách này, dễ thấy rằng biểu thức $\mathbf{y}$ cực đại nếu và chỉ nếu nó thỏa $\sum_{i \in I}y_i^2 = 1$ trong đó $$I = \{i : \lambda_i = max_{j=1...n}\lambda_j = \lambda_{max}(\mathbf{A})\}$$ và $y_j = 0$ với $j \notin I$. Đó là $I$ chứa những chỉ số của giá trị riêng lớn nhất. Trong trường hợp này, giá trị lớn nhất của biểu thức

$$
\sum_{i=1}^n\lambda_iy_i^2 = \sum_{i \in I}^n\lambda_iy_i^2 = \lambda_{max}(\mathbf{A}) \sum_{i \in I}^ny_i^2 = \lambda_{max}(\mathbf{A})
$$

Sau đó viết $\mathbf{q}_1, ..., \mathbf{q}_n$ là những cột của $\mathbf{Q}$, ta có:

$$
\mathbf{x} = \mathbf{Q}\mathbf{Q}^T\mathbf{x} = \mathbf{Q}\mathbf{y} = \sum_{i = 1}^ny_i\mathbf{q}_i = \sum_{i \in I}y_i\mathbf{q}_i
$$

Nhớ lại $\mathbf{q}_1, ..., \mathbf{q}_n$ là các vector riêng của $\mathbf{A}$ và hình thành một cơ sở trực chuẩn trong $\mathbb{R}^n$. Do đó, tập $$\{\mathbf{q}_i: i \in I\}$$ hình thành một cơ sở trực chuẩn cho không gian trị riêng của $\lambda\_{max}(\mathbf{A})$. Vì $\mathbf{x}$m là một tổ hợp tuyến tính của chúng, nằm trong không gian trị riêng và do đó một vector riêng của $\mathbf{A}$ tương ứng $\lambda\_{max}(\mathbf{A})$

Chúng ta đã chứng minh $$max_{\|\mathbf{x}\|_2 = 1} = \mathbf{x}^T\mathbf{A}\mathbf{x} = \lambda_{max}(\mathbf{A})$$, từ đây là có bất đẳng thức tổng quát $\mathbf{x}^T\mathbf{A}\mathbf{x} \leq \lambda_{max}(\mathbf{A})$ cho tất cả các vector độ đài đơn vị $\mathbf{x}$

**Theorem 3** (Min-max theorem) Với mọi $\mathbf{x} \ne 0$

$$
\lambda_{min}(\mathbf{A}) \leq R_{\mathbf{A}}(\mathbf{x}) \leq \lambda_{max}(\mathbf{A})
$$

## Ma trận (nửa) xác định dương - Positive (semi-)definite matrices

Một ma trận đối xứng $\mathbf{A}$ được gọi là nửa xác định dương (positive semi-definite) nếu tất cả $\mathbf{x} \in \mathbb{R}^n, \mathbf{x}^T\mathbf{A}\mathbf{x} \geq 0$. Đôi khi người ta viết $\mathbf{A} \succeq 0$ để chỉ rằng $\mathbf{A}$ là nửa xác định dương.

Một ma trận đối xứng $\mathbf{A}$ được gọi là nửa định dương positive definite nếu tất cả những vector khác không $\mathbf{x} \in \mathbb{R}^n, \mathbf{x}^T\mathbf{A}\mathbf{x} > 0$. Đôi khi người ta viết $\mathbf{A} \succ 0$ để chỉ rằng $\mathbf{A}$ là xác định dương. Lưu ý rằng tính xác định dương mạnh hơn tính nửa xác định dương, có nghĩa là mọi ma trận xác định dương đều ra ma trận nửa xác định dương, nhưng ngược lại thì không!

**Mệnh đề 5** Một ma trận đối xứng là ma trận nửa xác định dương nếu và chỉ nếu tất cả giá trị riệng của nó là không âm và xác định dương nếu và chỉ nếu tất cả các giá trị riêng của nó là dương.

_Chứng minh_

Giả sử rằng $\mathbf{A}$ là nửa xác định dương, và gọi $\mathbf{x}$ là vector riêng của $\mathbf{A}$ với giá trị riêng $\lambda$. Thì

$$
0 \leq \mathbf{x}^T\mathbf{A}\mathbf{x} = \mathbf{x}^T(\lambda\mathbf{x})\mathbf{x} = \lambda\mathbf{x}^T\mathbf{x} = \lambda\|x\|_2^2
$$

Vì $\mathbf{x} \ne 0$ (bởi giả định nó là một vector riêng), ta có $$\|x\|_2^2$$, nên ta có thể chia hai vế với $$\|x\|_2^2$$ và nhận được $\lambda \geq 0$. Nếu $\mathbf{A}$ là xác định dương, thì bất đẳng thức này nghiêm ngặt hơn một chút, $\lambda > 0$

Để đơn giản chứng minh, chúng ta sẽ dùng kỹ thuật Thương số Rayleigh. Giả định rằng $\mathbf{A}$ là đối xứng và tất cả những vector riêng của nó là không âm. Thì với mọi $$\mathbf{x} \ne 0$$:

$$
0 \leq \lambda_{min}(\mathbf{A}) \leq R_{\mathbf{A}}(\mathbf{x})
$$

Bởi vì $\mathbf{x}^T\mathbf{A}\mathbf{x}$ cùng dấu với $R_{\mathbf{A}}(\mathbf{x})$, chúng ta có thể kết luật $\mathbf{A}$ nửa xác định dương. Nếu tất cả giá trị riêng của $\mathbf{A}$ dương, thì $0 < \lambda*{min}(\mathbf{A})$, vì thế dẫn đến $\mathbf{A}$ xác định dương

**Mệnh đề 6** Giả sử $\mathbf{A} \in \mathbb{R}^{m \times n}$. Thì $\mathbf{A}^T\mathbf{A}$ là nửa xác định dương. Nếu $$null(\mathbf{A}) = \{0\}$$ thì $\mathbf{A}^T\mathbf{A}$ xác định dương.

_Chứng minh_

Với bất kỳ $\mathbf{x} \in \mathbb{R}^n$

$$
\mathbf{x}^T(\mathbf{A}^T\mathbf{A})\mathbf{x} = (\mathbf{A}\mathbf{x})^T(\mathbf{A}\mathbf{x}) = \|\mathbf{A}\mathbf{x}\|_2^2 \geq 0
$$

nên $\mathbf{A}^T\mathbf{A}$ nửa xác định dương. Nếu $$null(\mathbf{A}) = \{0\}$$ thì $\mathbf{A}\mathbf{x} \ne 0$ khi $\mathbf{x} \ne 0$ nên $\|\mathbf{A}\mathbf{x}\|_2^2 > 0$ và do đó $\mathbf{A}^T\mathbf{A}$ xác định dương

Những ma trận xác định dương là khả nghịch (vì giá trị riêng của chúng khác 0), trong khi nửa xác định dương thì không chắc. Tuy nhiên nếu bạn đã có một ma trận nửa xác định dương, có thể xáo trộn đường chéo của nó một chút để tạo ra một ma trận xác định dương

**Mệnh đề 7** Nếu $\mathbf{A}$ nửa xác định dương và $\epsilon > 0$ thì $\mathbf{A} + \epsilon\mathbf{I}$ xác định dương

_Chứng minh_

Giả định $\mathbf{A}$ nửa xác định dương và $\epsilon > 0$, ta có với bất kỳ $$\mathbf{x} \ne 0$$

$$
\mathbf{x}^T(\mathbf{A} + \epsilon\mathbf{I}) = \mathbf{x}^T\mathbf{A}\mathbf{x} + \epsilon\mathbf{x}^T\mathbf{I}\mathbf{x} =  \underset{\geq 0}{\mathbf{x}^T\mathbf{A}\mathbf{x}} + \underset{> 0}{\epsilon\mathbf{x}^T\mathbf{I}\mathbf{x} } > 0
$$

### Hình học của các dạng bậc hai xác định dương

Còn tiếp ...

## Singular Value Decomposition (SVD)

Singular value decomposition (SVD) là một công cụ ứng dụng rộng rãi của Đại số tuyến tính. Ý tưởng chính của bắt nguồn từ dữ kiện là mọi ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ có một SVD (cho dù là ma trận không vuông). Phép phân rã như sau

$$
\mathbf{A} = \mathbf{U}\Sigma\mathbf{V}^T
$$

Trong đó: $\mathbf{U} \in \mathbb{R}^{m \times n}$ và $\mathbf{V} \in \mathbb{R}^{n \times n}$ là những ma trận trực giao và $\Sigma \in \mathbb{R}^{m \times n}$ là ma trận dường chéo với những **singular values** của $\mathbf{A}$ (đặt là $\sigma_i$) trên đường chéo của nó.

Chỉ $r = rank(\mathbf(A))$ singular values là khác không, và theo quy ước chúng có thứ tự giảm dần, tức là

$$
\sigma_1 \geq \sigma_2 \geq ... \geq \sigma_r \geq \sigma_{r+1} = ... = \sigma_{min(m,n)} = 0
$$

Một cách viết khác của SVD là

$$
\mathbf{A} = \sum_{i=1}^{r}\sigma_i\mathbf{u}_i\mathbf{v}_i^T
$$

Trong đó: $\mathbf{u}_i$ và $\mathbf{v}_i$ là cột thứ i của $\mathbf{U}$ và $\mathbf{V}$ tương ứng.

Nhận thấy những thừa số (factors) cho phân rã trị riêng (eigendecompositions) cho $\mathbf{A}^T\mathbf{A}$ và $\mathbf{A}\mathbf{A}^T$

$$
\begin{gather}
\mathbf{A}^T\mathbf{A} = (\mathbf{U}\Sigma\mathbf{V}^T)^T\mathbf{U}\Sigma\mathbf{V}^T = \mathbf{V}\Sigma^T\mathbf{U}^T\mathbf{U}\Sigma\mathbf{V}^T = \mathbf{V}\Sigma^T\Sigma\mathbf{V}^T\\
\mathbf{A}\mathbf{A}^T = \mathbf{U}\Sigma\mathbf{V}^T(\mathbf{U}\Sigma\mathbf{V}^T)^T = \mathbf{U}\Sigma\mathbf{V}^T\mathbf{V}\Sigma^T\mathbf{U}^T = \mathbf{U}\Sigma\Sigma^T\mathbf{U}^T
\end{gather}
$$

Các cột của $\mathbf{V}$ (right-singular vectors của $\mathbf{A}$) là những vector riêng của $\mathbf{A}^T\mathbf{A}$ và các cột của $\mathbf{U}$ (left-singular vectors của $\mathbf{A}$) là những vector riêng của $\mathbf{A}\mathbf{A}^T$

Các ma trận $\Sigma^T\Sigma$ và $\Sigma\Sigma^T$ không nhất thiết phải cùng kích cỡ, những cả hai phải là ma trận đường chéo với bình phương các singular values $\sigma^2_i$ trên đường chéo. Do đó singular values của $\mathbf{A}$ là căn bậc hai của những giá trị riêng của $\mathbf{A}^T\mathbf{A}$ (hoặc một cách tương đương, của $\mathbf{A}\mathbf{A}^T$)

## Định lý cơ sở của Đại số tuyến tính

Mặc dù với cái tên thú vị của nó "Fundamental Theorem of Linear Algebra - Định lý cơ sở của Đại số tuyến tính" không phải là một định lý được cộng đồng chấp nhận, có một số sự không rõ ràng về chính xác nó bao gồm những mệnh đề nào.

**Theorem 4** Nếu $\mathbf{A} \in \mathbb{R}^{m \times n}$

i) $null(\mathbf{A}) = range(\mathbf{A}^T)^{\perp}$

ii) $null(\mathbf{A}) \bigoplus range(\mathbf{A}^T) = \mathbb{R}^n$

iii) $\underbrace{dim \text{ }range(\mathbf{A})}_\text{rank(A)} + dim\text{ }null(\mathbf{A}) = n$

iv) Nếu $\mathbf{A} = \mathbf{U}\Sigma\mathbf{V}^T$ là singular value decomposition của $\mathbf{A}$, thì những cột của $\mathbf{U}$ và $\mathbf{V}$ hình thành cơ sở trực chuẩn cho "bốn không gian con" của $\mathbf{A}$

| Không gian con        | Cột                                    |
| --------------------- | -------------------------------------- |
| $range(\mathbf{A})$   | $r$ cột đầu tiên của $\mathbf{U}$      |
| $range(\mathbf{A}^T)$ | $r$ cột đầu tiên của $\mathbf{V}$      |
| $null(\mathbf{A})$    | $m - r$ cột cuối cùng của $\mathbf{U}$ |
| $null(\mathbf{A}^T)$  | $m - r$ cột cuối cùng của $\mathbf{V}$ |

trong đó: $r = rank(\mathbf{A})$

## Toán tử (Operator) và chuẩn ma trận (matrix norms)

Nếu $V$ và $W$ là những không gian vector thì tập ánh xạ tuyến tính từ $V$ vào $W$ hình thành một không gian vector khác và chuẩn định nghĩa trên $V$ và $W$ tạo ra một chuẩn (norm) trên không gian của những ánh xạ tuyến tính này. Nếu $T: V \rightarrow W$ là một ánh xạ tuyến tính giữa không gian định chuẩn $V$ và $W$, thì chuẩn toán tử (operator norm) được định nghĩa

$$
\|T\|_{op} = \underset{\mathbf{x} \in V\\ \mathbf{x} \ne 0}{\text{max }}\frac{\|T\mathbf{x}\|_W}{\|\mathbf{x}\|_V}
$$

Một lớp quan trọng của định nghĩa tổng quát này là khi miền và đồng miền là $\mathbb{R}^n$ và $\mathbb{R}^m$ và $p$-norm được sử dụng trong cả hai trường hợp. Thì với một ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$

$$
\|\mathbf{A}\|_{p} = \underset{\mathbf{x} \ne 0}{\text{max }}\frac{\|\mathbf{A}\mathbf{x}\|_p}{\|\mathbf{x}\|_p}
$$

Trong những trường hợp đặc biệt của $p = 1, 2, \infty$, ta có

$$
\|\mathbf{A}\|_{1} = \underset{1 \leq j \leq n}{\text{max }}\sum_{i=1}^m|A_{ij}|
$$

$$
\|\mathbf{A}\|_{\infty} = \underset{1 \leq j \leq m}{\text{max }}\sum_{i=1}^n|A_{ij}|
$$

$$
\|\mathbf{A}\|_{2} = \sigma_1(\mathbf{A})
$$

trong đó $\sigma_1$ đại diện cho singular value lớn nhất. Để ý rằng 1- và $\infty$-norm được tạo ra bằng cách đơn giản lấy giá trị lớn nhất tổng cột và dòng, tương ứng. 2-norm (thường gọi là spectral norm - chuẩn phổ) đơn giản thành $\sigma_1$ bởi tính chất của Thương số Rayleigh

$$
\underset{\mathbf{x} \ne 0}{\text{arg max}}\frac{\|\mathbf{A}\mathbf{x}\|_2}{\|\mathbf{x}\|_2} = \underset{\mathbf{x} \ne 0}{\text{arg max}}\frac{\|\mathbf{A}\mathbf{x}\|_2^2}{\|\mathbf{x}\|_2^2} = \underset{\mathbf{x} \ne 0}{\text{arg max}}\frac{\mathbf{x}^T\mathbf{A}^T\mathbf{A}\mathbf{x}}{\mathbf{x}^T\mathbf{x}}
$$

và ta có thể thấy biểu thức bên phải nhất được cực đại bởi một vector riêng của $\mathbf{A}^T\mathbf{A}$ tương ứng với giá trị riêng lớn nhất của nó $\lambda_{max}(\mathbf{A}^T\mathbf{A}) = \sigma_1^2(\mathbf{A})$

Bởi định nghĩa, tạo ra những ma trận chuẩn có tính chất quan quan trọng là

$$
\| \mathbf{A}\mathbf{x} \|_p \leq \|\mathbf{A}\|_p\|\mathbf{x}\|_p
$$

với bất kỳ $\mathbf{x}$ nào.

**Mệnh đề 8**

$$
\| \mathbf{A}\mathbf{B} \|_p \leq \|\mathbf{A}\|_p\|\mathbf{B}\|_p
$$

_Chứng minh_

Với bất kỳ $\mathbf{x}$

$$
\| \mathbf{A}\mathbf{B}\mathbf{x} \|_p \leq \| \mathbf{A}\|_p\| \mathbf{B}\mathbf{x} \|_p \leq \|\mathbf{A}\|_p\| \mathbf{B}\|_p\|\mathbf{x}\|_p\|
$$

nên

$$
\| \mathbf{A}\mathbf{B} \|_p = \underset{\mathbf{x} \ne 0}{\text{max}}\frac{\|\mathbf{A}\mathbf{B}\mathbf{x}\|}{\|\mathbf{x}\|_p} \leq \underset{\mathbf{x} \ne 0}{\text{max}}\frac{\|\mathbf{A}\|_p\| \mathbf{B}\|_p\|\mathbf{x}\|_p\|}{\|\mathbf{x}\|_p} = \|\mathbf{A}\|_p\|\mathbf{B}\|_p
$$

Kết luận điều phải chứng minh.

Không chỉ có chuẩn ma trận (matrix norms). Một thứ khác hay được sử dùng đó là **Frobenius norm**

$$
\|\mathbf{A}\|_F = \sqrt{\sum_{i=1}^n\sum_{j=1}^nA_{ij}^2} = \sqrt{tr{\mathbf{A}^T\mathbf{A}}} = \sqrt{\sum_{i=1}^{min(m,n)}\sigma_i^2(\mathbf{A})}
$$

Đẳng thức đầu tiên được giải thích một cách đơn giản bằng cách khai triển định nghĩa của phép nhân ma trận (matrix multiplication) và vết (trace). Với đẳng thức thứ hai, quan sát thấy ($\mathbf{A} = \mathbf{U}\Sigma\mathbf{V}^T$)

$$
tr{\mathbf{A}^T\mathbf{A}} = tr(\mathbf{V}\Sigma^T\Sigma\mathbf{V}^T) = tr(\mathbf{V}^T\mathbf{V}\Sigma^T\Sigma) = tr(\Sigma^T\Sigma) = \sum_{i=1}^{min(m,n)}\sigma_i^2(\mathbf{A})
$$

sử dụng tính chất tuần hoàn (cyclic property) của vết và tính trực giao của $\mathbf{V}$

Một chuẩn ma trận $$\|.\|$$ được gọi là bất biến đơn nhất (unitary invariant) nếu

$$
\|\mathbf{U}\mathbf{A}\mathbf{V}\| = \|\mathbf{A}\|
$$

với mất cả các trực giao $\mathbf{U}$ và $\mathbf{V}$ có kích thước phù hợp. Chuẩn bất biến đơn nhất về bản chất chỉ phụ thuộc vào các giá trị singular values của một ma trận, vì với những chuẩn này

$$
\|\mathbf{A}\| = \|\mathbf{U}\Sigma\mathbf{V}^T\| = \|\Sigma\|
$$

Hai chuẩn mà chúng ta đã biết, chuẩn phổ (spectral norm) và chuẩn Frobenius (Frobenius norm), có thể được biểu diễn thông qua thuật ngữ singular values của một ma trận

**Mệnh đề 9** Chuẩn phổ (spectral norm) và chuẩn Frobenius (Frobenius norm) là bất biến đơn nhất (unitary invariant)

_Chứng minh_

Với chuẩn Frobenius (Frobenius norm)

$$
tr((\mathbf{U}\mathbf{A}\mathbf{V})^T\mathbf{U}\mathbf{A}\mathbf{V}) = tr(\mathbf{V}^T\mathbf{A}^T\mathbf{U}^T\mathbf{U}\mathbf{A}\mathbf{V}) = tr(\mathbf{V}\mathbf{V}^T\mathbf{A}^T\mathbf{A}) = tr(\mathbf{A}^T\mathbf{A})
$$

Với chuẩn phổ, nhớ lại là $$\|\mathbf{U}\mathbf{x}\| = \|\mathbf{x}\|_2$$ với kỳ trực giao $\mathbf{U}$ nào. Và do đó:

$$
\|\mathbf{U}\mathbf{A}\mathbf{V}\|_2 = \underset{\mathbf{x} \ne 0}{\text{max }}\frac{\|\mathbf{U}\mathbf{A}\mathbf{V}\mathbf{x}\|_2}{\|\mathbf{x}\|_2} = \underset{\mathbf{x} \ne 0}{\text{max }}\frac{\|\mathbf{A}\mathbf{V}\mathbf{x}\|_2}{\|\mathbf{x}\|_2} = \underset{\mathbf{y} \ne 0}{\text{max }}\frac{\|\mathbf{A}\mathbf{y}\|_2}{\|\mathbf{y}\|_2} = \|\mathbf{A}\|_2
$$

Trong đó, ta sử dùng phép đổi biến $\mathbf{y} = \mathbf{V}^T\mathbf{x}$ mà thỏa điều kiện $$\|\mathbf{y}\|_2 = \|\mathbf{x}\|_2$$. Bởi vì $\mathbf{V}^T$ là khả nghịch, $\mathbf{x}$ và $\mathbf{y}$ là tương ứng một - một, và $$\mathbf{y} = 0$$ nếu và chỉ nếu $$\mathbf{x} = 0$$. Vì thế cực đại với $$\mathbf{y} \ne 0$$ là tương đương với cực đại với $$\mathbf{x} \ne 0$$

## Xấp xỉ hạng thấp (low-rank)

Một ứng dụng thực tế quan trọng của SVD là để tính toán xấp xỉ hạng thấp (low-rank approximations) cho ma trận. Cho một số ma trận, chúng ta muốn tìm một ma trận khác cùng chiều nhưng có hạng thấp hơn mà hai ma trận là gần nhau với một vài chuẩn. Một xấp xỉ như thế có thể được sử dụng để giảm một số lượng lớn dữ liệu cần để lưu trữ một ma trận, trong khi vẫn giữ được hầu hết thông tin của nó

Một kết quả đáng chú ý được biết đến là định lý Eckart-Young-Mirsky (Eckart-Young-Mirsky theorem) nói rằng ma trận tối ưu có thể được tính toán một cách dễ dàng từ SVD, giống như chuẩn trong câu hỏi bất biến đơn nhất (ví dụ như spectral norm hay Frobenius norm)

**Theorem 5** (Eckart-Young-Mirsky) Đặt $$\|.\|$$ là một chuẩn ma trận bất biến đơn nhất (unitary invariant
matrix norm). Giả sử $\mathbf{A} \in \mathbb{R}^{m \times n}$, trong đó $m \geq n$ có singular value decomposition $\mathbf{A} = \sum_{i=1}^n\sigma_i\mathbf{u}_i\mathbf{v}_i^T$. Thì xấp xỉ hạng k tốt nhất cho $\mathbf{A}$, trong đó $k \leq rank(\mathbf{A})$, được cho bởi

$$
\mathbf{A}_k = \sum_{i=1}^k\sigma_i\mathbf{u}_i\mathbf{v}_i^T
$$

có nghĩa là

$$
\|\mathbf{A} - \mathbf{A}_k\| \leq \|\mathbf{A} - \widetilde{\mathbf{A}}\|
$$

## Giả nghịch đảo (Pseudoinverses)

Gọi $\mathbf{A} \in \mathbb{R}^{m \times n}$. Nếu $m \ne n$ thì $\mathbf{A}$ **không khả nghịch**. Tuy nghiên, có một phép khả nghịch tổng quát được gọi là **Moore-Penrose pseudoinverse** - giả nghịch đảo Moore-Penrose, ký hiệu là $A^{\dagger}$, mà luôn luôn tồn tại và được định nghĩa duy nhất bởi những tính chất sau

i) $\mathbf{A}\mathbf{A}^{\dagger} \mathbf{A} = \mathbf{A} $

ii) $\mathbf{A}^{\dagger}\mathbf{A}\mathbf{A}^{\dagger} = \mathbf{A}^{\dagger}$

iii) $\mathbf{A}\mathbf{A}^{\dagger}$ là đối xứng

iv) $\mathbf{A}^{\dagger}\mathbf{A}$ là đối xứng

Nếu $\mathbf{A}$ khả nghịch, thì $\mathbf{A}^{\dagger} = \mathbf{A}^{-1}$. Một cách tổng quát hơn, ta có thể tính toán giả nghịch đảo của một ma trận từ singular value decomposition của nó: nếu $\mathbf{A} = \mathbf{U}\Sigma\mathbf{V}^T$, thì

$$
\mathbf{A}^{\dagger} = \mathbf{V}\Sigma^{\dagger}\mathbf{U}^T
$$

trong đó $\Sigma^{\dagger}$ có thể được tính toán từ $\Sigma$ bằng cách lấy chuyển vị và nghịch đảo giá trị singular values khác không trên đường chéo.

## Tích Matrix-Vector như phép tổ hợp tuyến tính của các cột ma trận

**Mệnh đề 10** Gọi $\mathbf{x} \in \mathbb{R}^n$ là một vector và $\mathbf{A} \in \mathbb{R}^{m \times n}$ là một ma trận với các cột $a_1, ..., a_n$. Thì

$$
\mathbf{A}\mathbf{x} = \sum_{i=1}^nx_ia_i
$$

## Tích Matrix-Matrix như tổng tích ngoài

Một tích ngoài (outer product) là một biểu thức dạng $\mathbf{ab}^T$ trong đó $\mathbf{a} \in \mathbb{R}^m$ và $\mathbf{b} \in \mathbb{R}^m$

**Mệnh đề 11** Gọi $a_1, ..., a_k \in \mathbb{R}^m$ và $b_1, ..., b_k \in \mathbb{R}^n$. Thì

$$
\sum_{l=1}^ka_lb_l^T = \mathbf{AB}^T
$$

Trong đó

$$
\begin{gather}
\mathbf{A} = [a_1, ..., a_k]\\
\mathbf{B} = [b_1, ..., b_k]\\
\end{gather}
$$

_Chứng minh_

Với mỗi $(i, j)$, ta có

$$
\left[\sum_{l=1}^ka_lb_l^T\right]_{ij} = \sum_{l=1}^k[a_lb_l^T]_{ij} = \sum_{l=1}^k[a_l]_i[b_l^T]_j=\sum_{l=1}^kA_{il}B_{jl}
$$

Biểu thức cuối cùng được biểu diễn như một tích trong giữa cột thứ $i$ của $\mathbf{A}$ và dòng thứ $j$ của $\mathbf{B}$, hay tương đương với cột thứ $j$ của $\mathbf{B}^T$, và theo định nghĩa của phép nhân ma trận, nó tương đương với $[\mathbf{AB}^T]_{ij}$

## Dạng toàn phương - Quadratic forms

Gọi $\mathbf{A} \in \mathbb{R}^{n \times n}$ là một ma trận đối xứng, và ta nhớ lại là biểu thức $\mathbf{x}^T\mathbf{A}\mathbf{x}$ được gọi là dạng toàn phương của $\mathbf{A}$. Trong một vài trường hợp có thể viết lại dạng toàn phương trong một thuật ngữ phần tử cá thể tạo nên $\mathbf{A}$ và $\mathbf{x}$

$$
\mathbf{x}^T\mathbf{A}\mathbf{x} = \sum_{i=1}^n\sum_{j=1}^nA_{ij}x_ix_j
$$

## Tài liệu gốc

\[1\] [Garrett Thomas. Department of Electrical Engineering and Computer Sciences. University of California, Berkeley. "Mathematics for Machine Learning", January 11, 2018](https://gwthomas.github.io/docs/math4ml.pdf)
