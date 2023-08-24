+++
author = "Le, Nhut Nam"
title = "Giải tích trên Đồ thị Tính toán: Thuật toán lan truyền ngược - Calculus on Computational Graphs: Backpropagation"
date = "2023-05-16"
description = "Lan truyền ngược là thuật toán chìa khóa trong việc giúp huấn luyện các mô hình học sâu (deep models) có thể xử lý được bằng việc tính toán. Đối với các mạng neural hiện đại, nó có thể giúp quá trình huấn luyện với phương pháp giảm đạo hàm (gradient descent/ local descent methods) nhanh hơn gấp 10 triệu lần so với triển khai cài đặt ngây thơ. Đó là sự khác biệt giữa một mô hình mất một tuần để huấn luyện và mất khoảng hơn 200.000 năm!"
tags = [
    "backpropagation", "neural networks", "computational graphs"
]
+++

Bài viết được dịch từ [Calculus on Computational Graphs: Backpropagation](https://colah.github.io/posts/2015-08-Backprop/) của [colah's blog](https://colah.github.io)

## Dẫn nhập

Lan truyền ngược là thuật toán "chìa khóa" trong việc giúp huấn luyện các mô hình học sâu (deep models) có thể xử lý được bằng việc tính toán. Đối với các mạng neural hiện đại, nó có thể giúp quá trình huấn luyện với phương pháp giảm đạo hàm (gradient descent/ local descent methods) nhanh hơn gấp 10 triệu lần so với triển khai cài đặt ngây thơ. Đó là sự khác biệt giữa một mô hình mất một tuần để huấn luyện và mất khoảng hơn "200.000" năm.

Ngoài việc sử dụng nó trong học sâu, lan truyền ngược là một công cụ tính toán mạnh mẽ trong nhiều lĩnh vực khác, từ dự báo thời tiết (weather forecasting) đến phân tích độ ổn định số học (numerical stability) - nó chỉ có các tên khác nhau mà thôi. Trên thực tế, thuật toán đã được phát minh đi phát minh lại ít nhất hàng chục lần trong các lĩnh vực khác nhau, [Griewank (2010)](http://www.math.uiuc.edu/documenta/vol-ismp/52_griewank-andreas-b.pdf). Tổng quát mà nói, theo khía cạnh ứng dụng độc lập, tên của nó là "reverse-mode differentiation".

Về cơ bản, đó là một kỹ thuật để tính toán đạo hàm một cách nhanh chóng. Và đó là một thủ thuật thiết yếu cần có, không chỉ trong học sâu (deep learning) mà còn trong nhiều tình huống tính toán số học khác nữa.

## Đồ thị Tính toán - Computational Graphs

Đồ thị tính toán là một cách hay để suy nghĩ về các biểu thức toán học. Ví dụ, hãy xem xét biểu thức sau:

$$
e=(a+b)*(b+1)
$$

Có 3 phép toán (operations): 2 phép toán cộng và 1 phép toán nhân. Ta thêm vào hai biến phụ là $c$ và $d$ mà đầu ra của hàm có một biến. Ta có như sau:

$$
c = a + b
$$

$$
d = b + 1
$$

$$
e = c * d
$$

Để tạo một biểu đồ tính toán, ta thực hiện từng thao tác này, cùng với các biến đầu vào, thành các nút. Khi giá trị của một nút là đầu vào cho một nút khác, một mũi tên sẽ đi từ nút này sang nút khác. Ta hình thành được đồ thị như hình bên dưới.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-def.png"/>
</p>

Những loại biểu đồ này luôn xuất hiện trong khoa học máy tính, đặc biệt là khi nói về các chương trình hàm (functional programs). Chúng có liên quan rất chặt chẽ với các khái niệm về đồ thị phụ thuộc (dependency graphs) và các đồ thị liên nối (call graphs). Chúng cũng là khái niệm trừu tượng cốt lõi đằng sau khung học sâu (deep learning framework) phổ biến như [Theano](http://deeplearning.net/software/theano/). 

*Bình loạn*: Ở ngữ cảnh hiện tại, 2023, Tensorflow và Keras được xây dựng trên nền tảng Theano trước đây. Đồ thị tính toán của PyTorch có đôi chút khác khi so sánh với Tensorflow hay Keras.

Chúng ta có thể đánh giá biểu thức bằng cách đặt các biến đầu vào thành các giá trị nhất định và tính toán các nút thông qua biểu đồ. Ví dụ, nếu $a = 2$ và $b=1$ thì đánh giá biểu thức bằng 6. Kết quả thể hiện như đồ thị bên dưới.


<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-eval.png"/>
</p>


## Đạo hàm trên Đồ thị Tính toán

Nếu một người muốn hiểu đạo hàm trong đồ thị tính toán, điều quan trọng là phải hiểu đạo hàm trên các cạnh. Nếu $a$ tác động một cách trực tiếp lên $c$, thì ta muốn biết nó tác động như thế nào lên $c$. Nếu $a$ thay đổi một ít, thì $c$ thay đổi như thế nào. Ta gọi đó là đạo hàm riêng (đạo hàm riêng phần - [partial derivative](https://en.wikipedia.org/wiki/Partial_derivative)) của $c$ ứng với $a$.

Để mà đánh giá đạo hàm riêng trong đồ thị này, ta cần những luật cơ bản, bao gồm [sum rule](https://en.wikipedia.org/wiki/Sum_rule_in_differentiation) và [product rule](https://en.wikipedia.org/wiki/Product_rule).

$$
\frac{\partial}{\partial a}(a+b) = \frac{\partial a}{\partial a} + \frac{\partial b}{\partial a} = 1
$$

$$
\frac{\partial}{\partial u}uv = u\frac{\partial v}{\partial u} + v\frac{\partial u}{\partial u} = v
$$

Như hình bên dưới, đồ thị có đạo hàm trên từng cạnh được gán nhãn.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-eval-derivs.png"/>
</p>

Điều gì sẽ xảy ra nếu chúng ta muốn hiểu các nút không được kết nối trực tiếp ảnh hưởng đến nhau như thế nào? Xem xét $e$ bị tác động như thế nào bởi $a$. Nếu ta thay đổi $a$ với một tốc độ đơn vị, 1, $c$ cũng thay đổi với tốc độ đơn vị. Đến lượt, $c$ thay đổi với một tốc độ đơn vị khiến $e$ phải thay đổi với tốc độ có độ lớn $2$. Thế nên, $e$ thay đổi với một tỉ lệ $1*2$ ứng với $a$.

Quy tắc chung là tính tổng tất cả các đường dẫn có thể từ nút này sang nút khác, nhân các đạo hàm trên mỗi cạnh của đường dẫn với nhau. Ví dụ như, để có được đạo hàm của $e$ ứng với $b$, ta tính:

$$
\frac{\partial e}{\partial b}= 1*2 + 1*3
$$

Điều này chỉ ra rằng $b$ tác động như thế nào đến $e$ thông qua $c$ và cũng cho biết nó tác động chính nó như thế nào thông qua $d$. Quy tắc tổng quan "sum over path" này chỉ là một cách nghĩ khác về [multivariate chain rule](https://en.wikipedia.org/wiki/Chain_rule#Higher_dimensions) mà thôi.


## Đường đi dữ kiện (Factoring Paths)

Vấn đề với việc chỉ “tổng hợp các đường đi” là rất dễ dẫn đến bùng nổ tổ hợp về số lượng các đường đi có thể có!.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/chain-def-greek.png"/>
</p>

Trong biểu đồ trên, ta có 3 đường đi từ $X$ đến $Y$, và 3 đường đi từ $Y$ đến $Z$. Nếu ta cần tính toán đạo hàm $\frac{\partial Z}{\partial X}$ bằng cách tính tổng trên tất cả các đường đi, ta cần phải tính tổng trên $3 * 3 = 9$ đường đi.

$$
\frac{\partial Z}{\partial X} = \alpha\delta + \alpha\epsilon + \alpha\zeta + \beta\delta + \beta\epsilon + \beta\zeta + \gamma\delta + \gamma\epsilon + \gamma\zeta
$$

Ở trên chỉ có chín đường đi, nhưng số lượng đường đi sẽ tăng theo cấp số nhân khi biểu đồ trở nên phức tạp hơn. Thay vì tính tổng trên tất cả các đường đi như thế, nó sẽ tốt hơn nếu ta thừa số hóa chúng:

$$
\frac{\partial Z}{\partial X} = (\alpha + \beta + \gamma)(\delta + \epsilon + \zeta)
$$

Đây là nơi mà "forward-mode differentiation" và "reverse-mode differentiation" đến với chúng ta. Chúng là các thuật toán để tính tổng một cách hiệu quả bằng cách thừa số các đường đi (factoring the paths). Thay vì tính tổng tất cả các đường đi một cách rõ ràng, chúng tính toán cùng một tổng hiệu quả hơn bằng cách hợp nhất các đường dẫn lại với nhau tại mọi nút. Trên thực tế, cả hai thuật toán đều chạm vào mỗi cạnh đúng một lần!

Forward-mode differentiation bắt đầu ở đầu vào của biểu đồ và di chuyển về phía cuối. Tại mỗi nút, nó tính tổng tất cả các đường đi vào. Mỗi đường đi đó biểu thị một cách mà đầu vào ảnh hưởng đến nút đó. Bằng cách cộng chúng lại, chúng ta có được toàn bộ cách mà nút bị ảnh hưởng bởi đầu vào, đó là đạo hàm.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/chain-forward-greek.png"/>
</p>

(Mặc dù bạn có thể không nghĩ về nó dưới dạng đồ thị, nhưng forward-mode differentiation rất giống với những gì bạn đã ngầm học nếu bạn từng tham gia phần giới thiệu về lớp Giải tích. - Còn nếu anh chị cúp học thì thôi chịu, đọc sách vậy.)

Reverse-mode differentiation, thì ngược lại, bắt đầu tại một đầu ra của đồ thị và di chuyển dần đến vị trí bắt đầu. Tại mỗi nút, nó gộp tắt cả các đường đi mà có được bắt nguồn từ nút đó.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/chain-backward-greek.png"/>
</p>

Forward-mode differentiation theo dõi cách mà một đầu vào tác động đến mọi nút. Reverse-mode differentiation theo dỗi cách mà mỗi nút tác động như thế nào đến một đầu ra. Điều đó, forward-mode differentiation áp dụng toán tử $\frac{\partial}{\partial X}$ đến mọi nút, trong khi reverse mode differentiation áp dụng toán tử $\frac{\partial Z}{\partial}$ đến mọi nút. (This might feel a bit like dynamic programming. That’s because it is!)

## Computational Victories

Tại thời điểm này, bạn có thể tự hỏi tại sao mọi người lại quan tâm đến reverse-mode differentiation. Nó trông giống như một cách kỳ lạ để làm điều tương tự như forward-mode. Có một số lợi thế nào sao?

Hãy xem xét ví dụ ban đầu của chúng ta một lần nữa:

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-eval-derivs.png"/>
</p>

Chúng ta có thể sử dụng forward-mode differentiation từ $b$ đi lên. Nó cho ta đạo hàm của mọi nút ứng với $b$.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-forwradmode.png"/>
</p>

Chúng ta đã tính toán được $\frac{\partial e}{\partial b}$, đạo hàm của đầu ra ứng với một trong những đầu vào.

Chuyện gì xảy ra nếu ta thực hiện reverse-mode differentiation từ $e$ đi xuống. Nó cho ta đạo hàm của $e$ ứng với mọi nút.

<p align="center">
  <img src="https://colah.github.io/posts/2015-08-Backprop/img/tree-backprop.png"/>
</p>

Khi ta nói, reverse-mode differentiation cho ta đạo hàm của $e$ ứng với mọi nút, thật là *mọi nút*. Ta có cả $\frac{\partial e}{\partial a}$ và $\frac{\partial e}{\partial b}$, đạo hàm của $e$ ứng với cả hai đầu vào. Forward-mode differentiation cho ta đạo hàm của đầu ra ứng với một đầu vào, nhưng reverse-mode differentiation cho ta tất cả!.

Đối với đồ thị này, đó chỉ là hệ số tăng tốc gấp hai lần, nhưng hãy tưởng tượng một hàm có một triệu đầu vào và một đầu ra. Forward-mode differentiation sẽ yêu cầu chúng ta đi qua đồ thị một triệu lần để có được các đạo hàm. Reverse-mode differentiation có thể giúp bạn có được tất cả chúng trong một cú trượt ngã! Tốc độ tăng lên một phần triệu là rất tốt!

Khi huấn lyện mạng nơ-ron, chúng ta nghĩ về chi phí (giá trị mô tả mức độ hoạt động của mạng nơ-ron) như một hàm của các tham số (số mô tả cách thức hoạt động của mạng). Chúng ta muốn tính toán đạo hàm của chi phí đối với tất cả các tham số, để sử dụng trong phương pháp giảm đạo hàm (gradient descent). Giờ đây, thường có hàng triệu, thậm chí hàng chục triệu tham số trong một mạng nơ-ron. Vì vậy, reverse-mode differentiation, được gọi là lan truyền ngược (backpropagation) trong ngữ cảnh của mạng nơ-ron, giúp chúng ta tăng tốc rất nhiều lần!

(Có trường hợp nào mà forward-mode differentiation có ý nghĩa hơn không? Tất nhiên là có! Trong trường hợp reverse-mode cho ta đạo hàm của một đầu ra đối với tất cả các đầu vào, thì forward-mode cho chúng ta đạo hàm của tất cả các đầu ra đối với một đầu vào. Nếu một hàm có nhiều đầu ra, forward-mode differentiation có thể nhanh hơn rất, rất nhiều.).

