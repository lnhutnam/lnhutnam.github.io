+++
author = "Le, Nhut Nam"
title = "Mạng nơ-ron, Đa tạp, và Tô-pô - Neural Networks, Manifolds, and Topology"
date = "2023-04-26"
description = "Một trong trong số đó mà có lẽ là thách thức nhất là để hiểu một mạng nơ-ron thực sự đang làm cái gì?. Nếu người ta huấn luyện nó tốt, nó đạt được kết quả cao, nhưng nó vẫn là thách thức trong việc hiểu nó làm được điều ấy như thế nào? Nếu mạng học thất bại, nó cũng khó để hiểu nó sai điều gì?"
tags = [
    "topology", "neural networks", "deep learning", "manifold hypothesis"
]
+++

Bài viết được dịch từ [Neural Networks, Manifolds, and Topology](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/) của [colah's blog](https://colah.github.io)

## Dẫn nhập

Hiện nay, có một lượng quan tâm và chú ý khổ lồ đối với mạng học sâu (deep neural networks) bởi vì chúng đạt được nhiều thành tựu vượt trội trong nhiều hướng nghiên cứu khác nhau, điển hình là thị giác máy tính (computer vision) (*This seems to have really kicked off with [Krizhevsky et al., (2012)](http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf), who put together a lot of different pieces to achieve outstanding results. Since then there’s been a lot of other exciting work.*).

Tuy nhiên, hiện vẫn còn rất nhiều câu hỏi thắc mắc về chúng. Một trong trong số đó mà có lẽ là thách thức nhất là để hiểu *một mạng nơ-ron thực sự đang làm cái gì?*. Nếu người ta huấn luyện nó tốt, nó đạt được kết quả cao, nhưng nó vẫn là thách thức trong việc hiểu nó làm được điều ấy như thế nào? Nếu mạng học thất bại, nó cũng khó để hiểu nó sai điều gì?

Mặc dù trong khi nó vẫn là thách thức trong việc hiểu hành vị của mạng học sâu theo một cách thức tổng quát, việc khám phá các mạng nơ-ron sâu thấp chiều (nông) - mạng mà có một số lượng ít nơ-ron trong mỗi tầng, hóa ra lại dễ dàng hơn nhiều. Thực ra, chúng ta có thể tạo ra những đồ thị trực quan háo để hiểu hoàn toàn hành vi và quá trình huấn luyện của những mạng đó. Khía cạnh này sẽ cho phép chúng ta thu được những trực giác sâu sắc hơn về hành vi của những mạng nơ-ron và nhận ra một mối liên hệ từ mạng nơ-ron đến một lĩnh vực nghiên cứu Toán học gọi là Tô-pô (topology)

Nhiều thứ thú vị từ đó, bao gồm những chặn dưới cơ sở cho những giới hạn về độ phức tạp của một mạng nơ-ron có khả năng phân lớp các bộ dữ liệu nhất định.

## Một ví dụ đơn giản

Bắt đầu với một bộ dữ liệu đơn giản, hai đường cong trên một mặt phẳng. Mạng học sẽ học để phân lớp những điểm thuộc về một trong số chúng.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/simple2_data.png"/>
</p>

Cách rõ ràng để hình dung hành vi của mạng học - hoặc bất kỳ thuật toán phân lớp nào, đối với vấn đề đó - là chỉ cần xem cách nó phân biệt mọi điểm dữ liệu có thể.

Chúng ta sẽ bắt đầu với lớp mạng học đơn giản nhất có thể, một lớp chỉ có lớp đầu vào và lớp đầu ra. Một mạng như vậy chỉ đơn giản là cố gắng tách hai lớp dữ liệu bằng cách chia cắt chúng bằng một đường thẳng.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/simple2_linear.png"/>
</p>

Loại mạng đó không thú vị lắm. Các mạng học hiện đại thường có nhiều lớp giữa đầu vào và đầu ra của chúng, được gọi là các lớp "ẩn". Ít nhất, họ có một lớp ẩn như thế này.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/example_network.svg"/>
</p>

Như trước đây, chúng ta có thể trực quan hóa hành vi của mạng này bằng cách xem nó làm gì với các điểm khác nhau trong miền của nó. Nó phân tách dữ liệu bằng một đường cong phức tạp hơn một đường thẳng.


<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/simple2_0.png"/>
</p>

Với mỗi lớp, mạng biến đổi dữ liệu, tạo ra một biểu diễn mới (*These representations, hopefully, make the data “nicer” for the network to classify. There has been a lot of work exploring representations recently. Perhaps the most fascinating has been in Natural Language Processing: the representations we learn of words, called word embeddings, have interesting properties. See [Mikolov et al. (2013)](http://research.microsoft.com/pubs/189726/rvecs.pdf), [Turian et al. (2010)](http://www.iro.umontreal.ca/~lisa/pointeurs/turian-wordrepresentations-acl10.pdf), and, Richard Socher’s work. To give you a quick flavor, there is a very nice visualization associated with the Turian paper*). Chúng ta có thể nhìn dữ liệu trong mỗi biểu diễn này và cách mạng học phân lớp chúng. Khi chúng ta đi đến biểu diễn cuối cùng, mạng sẽ chỉ vẽ một đường thẳng qua dữ liệu (hoặc, ở các chiều cao hơn, đó là một siêu phẳng).

Trong phần trực quan hóa trước, chúng ta đã xem xét dữ liệu ở dạng biểu diễn "thô" của nó. Bạn đọc có thể nghĩ về điều đó khi chúng ta nhìn vào lớp đầu vào. Bây giờ chúng ta sẽ xem xét nó sau khi nó được biến đổi bởi lớp đầu tiên. Bạn đọc cũng có thể nghĩ về điều này khi chúng ta nhìn vào lớp ẩn. Mỗi chiều tương ứng với việc kích hoạt một nơ-ron trong lớp.


<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/simple2_1.png"/>
</p>



## Trực quan hóa tính liên tục của các tầng

Theo cách tiếp cận được nêu trong phần trước, chúng ta học cách hiểu các mạng bằng cách xem biểu diễn tương ứng với từng lớp. Điều này cho chúng ta một danh sách biểu diễn rời rạc.

Phần khó khăn là hiểu cách chúng ta đi từ cái này sang cái khác. Rất may, các lớp mạng nơ-ron có các thuộc tính tốt giúp việc này trở nên rất dễ dàng.

Có nhiều loại lớp khác nhau được sử dụng trong các mạng học. Chúng ta sẽ nói về các lớp tanh cho một ví dụ cụ thể. một lớp tanh $\text{tanh}(Wx+b)$ bao gồm:
- Một phép biến đổi tuyến tính bởi ma trận "trọng số" $W$
- Một phép dịch bởi vector $b$
- Một phép biến đổi point-wise bởi hàm tanh

Chúng ta có thể trực quan hóa để chứng minh đây là một phép biến đổi liên tục, như sau:

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/1layer.gif"/>
</p>

Câu chuyện cũng giống như vậy đối với các lớp tiêu chuẩn khác, bao gồm một phép biến đổi affine theo sau là ứng dụng theo chiều của hàm kích hoạt đơn điệu.

Chúng ta có thể áp dụng kỹ thuật này để hiểu các mạng phức tạp hơn. Ví dụ: mạng sau đây phân lớp hai hình xoắn ốc hơi vướng víu, sử dụng bốn lớp ẩn. Theo thời gian, chúng ta có thể thấy nó chuyển từ biểu diễn "thô" sang biểu diễn cấp cao hơn mà nó đã học được để phân lớp dữ liệu. Trong khi các xoắn ốc ban đầu bị vướng vào nhau, thì cuối cùng chúng có thể tách rời một cách tuyến tính.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/spiral.1-2.2-2-2-2-2-2.gif"/>
</p>

Mặt khác, mạng sau, cũng sử dụng nhiều lớp, không phân lớp được hai hình xoắn ốc vướng víu hơn.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/spiral.2.2-2-2-2-2-2-2.gif"/>
</p>

Điều đáng lưu ý rõ ràng ở đây là những nhiệm vụ này chỉ hơi khó khăn vì chúng ta đang sử dụng mạng nơ-ron chiều thấp. Nếu chúng tôi đang sử dụng các mạng rộng "béo" hơn, tất cả điều này sẽ khá dễ dàng.

## Tô-pô của tầng Tanh

Mỗi lớp trải dài và nén không gian, nhưng nó không bao giờ cắt, phá vỡ hoặc gấp lại không gian. Bằng trực giác, chúng ta có thể thấy rằng nó bảo toàn các tính chất tô-pô. Ví dụ: một tập hợp sẽ được kết nối sau nếu trước đó (và ngược lại).

Các phép biến đổi như thế này, không ảnh hưởng đến cấu trúc liên kết, được gọi là các (phép biến đổi) đồng cấu. Về mặt hình thức, chúng là các song ánh mà là các hàm (ánh xạ) liên tục theo cả hai hướng.

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định lý:
</span>
    Những tầng (lớp) với $N$ đầu vào và $N$ đầu ra là những (phép biến đổi) đồng cấu (homeomorphisms), nếu ma trận trọng số $W$, là khả nghịch (invertible matrix/ nonsingular/ nondegenerate).
</div>

*Chứng minh*

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Xem xét từng bước một, ta có:
</span>
    <ol>
        <li>Giả định rằng ma trận trọng số $W$ có định thức không âm. Thì nó là một hàm song ánh tuyến tính với một tuyến tính nghịch đảo. Những hàm tuyến tính thì liên tục. Nên, phép nhân bởi $W$ là một phép biến đổi đồng cấu (homeomorphism)</li>
        <li>Phép tịnh tiến là một phép biến đổi đồng cầu (homeomorphisms).</li>
        <li>Hàm tanh (và sigmoid, sofplus, không phải ReLU) là những hàm liên tục với những nghịch đảo liên tục. Chúng là những song ánh nếu ta xem xét miền và khoảng giá trị. Việc áp dụng từng điểm (pointwise) là một phép biển đổi đồng cấu (homeomorphisms).</li>
    </ol>
    Do đó, nếu ma trận trọng số $W$ có định thức không âm, thì tầng (lớp) của chúng ta là một biển đổi đồng cấu (homeomorphisms).
</div>
<br>
Kết quả này tiếp tục đúng nếu chúng ta sắp xếp tùy ý nhiều lớp này lại với nhau.

## Tô-pô và phân lớp

Xem xét hai tập dữ liệu với hai lớp $A, B \in \mathbb{R}^2$

$$
A = \lbrace x \mid d(x,0) < \frac{1}{3} \rbrace
$$

$$
B = \lbrace x \mid \frac{2}{3} < d(x,0) < 1 \rbrace
$$

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/topology_base.png"/>
</p>


<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Khẳng định:
</span>
    Một mạng học không thể phân lớp tập dữ liệu này mà không có một lớp có 3 đơn vị ẩn trở lên, bất kể độ sâu bao nhiêu.
</div>
<br>

Như đã đề cập trước đây, việc phân lớp bằng một đơn vị sigmoid hoặc một lớp softmax tương đương với việc cố gắng tìm một siêu phẳng (hoặc trong trường hợp này là một đường) phân tách $A$ và $B$ trong biểu diễn cuối cùng. Chỉ với hai đơn vị ẩn, một mạng về mặt cấu trúc liên kết không có khả năng phân tách dữ liệu theo cách này và chắc chắn sẽ thất bại trên bộ dữ liệu này.

Trong trực quan hóa minh họa sau đây, chúng ta quan sát một biểu diễn ẩn trong khi mạng huấn luyện, cùng với đường phân lớp. Khi chúng ta quan sát, nó vật lộn và lúng túng khi cố gắng học cách thực hiện điều này.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/topology_2D-2D_train.gif"/>
</p>

Cuối cùng, nó bị kéo vào một mức cực tiểu cục bộ khá kém hiệu quả. Mặc dù, nó thực sự có thể đạt được khoảng $80\%$ độ chính xác phân lớp.

Ví dụ này chỉ có một lớp ẩn, nhưng nó sẽ không thành công.

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Chứng minh:
</span>
    Mỗi lớp là một đồng cấu hoặc ma trận trọng số của lớp có định thức 0. Nếu là một biến đổi đồng cấu, $A$ vẫn bao quanh bởi $B$, và một đường thẳng không thể phân tách được chúng. Nhưng giả sử nó có định thức bằng 0: thì tập dữ liệu bị thu gọn trên một trục nào đó. Vì chúng ta đang xử lý thứ gì đó đồng hình với tập dữ liệu gốc, $A$ bị bao quanh bởi $B$, và sự biến đổi trên bất kỳ trục nào có nghĩa là chúng ta sẽ có một số điểm A và B trộn lẫn và trở nên không thể phân biệt giữa hai lớp này.
</div>
<br>

Nếu chúng ta thêm một đơn vị ẩn thứ ba, vấn đề trở nên tầm thường. Mạng học học cách biểu diễn sau:

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/topology_3d.png"/>
</p>

Với cách biểu diễn này, chúng ta có thể tách các tập dữ liệu bằng một siêu phẳng.

Để hiểu rõ hơn về những gì đang diễn ra, hãy xem xét một tập dữ liệu thậm chí còn đơn giản hơn là 1 chiều:

$$
A = \left[-\frac{1}{3}, \frac{1}{3}\right]
$$

$$
B = \left[-1, -\frac{2}{3} \cup \frac{2}{3}, 1\right]
$$

Nếu không sử dụng một lớp gồm hai hoặc nhiều đơn vị ẩn, chúng ta không thể phân lớp tập dữ liệu này. Nhưng nếu chúng ta sử dụng một với hai đơn vị, chúng ta sẽ học cách biểu diễn dữ liệu dưới dạng một đường cong đẹp cho phép chúng ta phân tách các lớp bằng một đường thẳng:

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/topology_1D-2D_train.gif"/>
</p>

Điều gì đang xảy ra ở đây? Một đơn vị tầng ẩn kích hoạt khi $x > -1/2$, một đơn vị khác kích hoạt khi $x > 1/2$. Khi một đơn vị đầu tiên kích hoạt, nhưng đơn vị thứ hai thì lại không, ta biết rằng ta đang nằm ở trong $A$.

## Giả thuyết đa tạp

Điều này có liên quan đến các tập dữ liệu trong thế giới thực, chẳng hạn như dữ liệu hình ảnh không? Nếu bạn đọc thực sự coi trọng giả thuyết đa tạp, nó cần nên được xem xét.

Giả thuyết đa tạp (manifold hypothesis) là dữ liệu tự nhiên hình thành các đa tạp chiều thấp hơn trong không gian nhúng (embedding space) của nó. Có cả lý do lý thuyết (*A lot of the natural transformations you might want to perform on an image, like translating or scaling an object in it, or changing the lighting, would form continuous curves in image space if you performed them continuously*) và thực nghiệm (*[Carlsson et al.](http://comptop.stanford.edu/u/preprints/mumford.pdf) found that local patches of images form a klein bottle*) để tin rằng điều này là đúng. Nếu bạn tin điều này, thì nhiệm vụ của thuật toán phân lớp về cơ bản là tách một loạt các rối đa tạp (tangled manifolds).

Trong các ví dụ trước, một lớp hoàn toàn bao quanh một lớp khác. Tuy nhiên, dường như không có khả năng là đa tạp hình ảnh con chó được bao quanh hoàn toàn bởi đa tạp hình ảnh con mèo. Nhưng có những tình huống tô-pô khác, hợp lý hơn vẫn có thể gây ra vấn đề, như chúng ta sẽ thấy trong phần tiếp theo.


## Liên kết và Homotopy

Một bộ dữ liệu thú vị khác để xem xét là hai tori được liên kết (two linked tori), $A$ và $B$

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/link.png"/>
</p>

Giống như các tập dữ liệu trước đây mà chúng ta đã xem xét, tập dữ liệu này không thể tách rời mà không sử dụng $n+1$ chiều, đặt là một chiều thứ 4.

Liên kết được nghiên cứu trong lý thuyết nút (knot theory), một lĩnh vực của cấu trúc liên kết. Đôi khi chúng ta nhìn thấy một liên kết, không rõ ngay đó có phải là một liên kết không (một loạt các thứ bị rối với nhau, nhưng có thể được tách ra bằng cách biến dạng liên tục) hay không.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/unlink-2spiral.png"/>
</p>

Nếu một mạng học sử dụng các lớp chỉ có 3 đơn vị có thể phân lớp nó, thì đó là một phi liên kết. (Câu hỏi: Về mặt lý thuyết, tất cả các liên kết có thể được phân lớp bởi một mạng chỉ có 3 đơn vị không?)

Từ khía cạnh nút thắt này, việc hình dung liên tục của chúng ta về các biểu diễn do mạng học tạo ra không chỉ là một hình ảnh động đẹp mắt, mà còn là một quy trình gỡ rối các liên kết. Trong cấu trúc liên kết, chúng ta sẽ gọi nó là đồng vị xung quanh (ambient isotopy) giữa liên kết ban đầu và các liên kết bị tách rời.

Một cách hình thức, một đồng vị xung quanh (ambient isotopy) giữa $A$ và $B$ là một hàm liên tục (continous function) $F: [0, 1] \times X \rightarrow Y$ mà mỗi $F_t$ là biến đổi đồng cấu (homeomorphism) từ $X$ vào khoảng của nó, $F_0$ là một hàm đơn vị (identity function), và $F_1$ ánh xạ $A$ vào $B$. Và đó là, $F_t$ tịnh tiến một cách liên tục từ việc ánh xạ $A$ vào chính nó đến việc ánh xạ $A$ vào $B$.

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Định lý:
</span>
    Tồn tại một đồng vị xung quanh (ambient isotopy) giữa đầu vào và một đặc trưng của một tầng mạng học (network layer’s representation), nếu:
    <ol>
      <li>$W$ không khả nghịch (non-singular).</li>
      <li>Chúng tôi sẵn sàng hoán vị các nơ-ron trong lớp ẩn</li>
      <li>Và, có nhiều hơn 1 đơn vị ẩn</li>
    </ol>
</div>
<br>

*Chứng minh*

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Xem xét từng bước một, ta có:
</span>
    <ol>
        <li>Phần khóa nhất là biến đổi tuyến tính (linear transformation). Để nó có tính khả thi, chúng ta cần $W$ phải có một định thức dương. Tiền đề của chúng ta là nó không bằng 0, và chúng ta có thể đổi dấu nếu nó âm bằng cách đổi chỗ hai trong số các nơ-ron ẩn, và vì vậy chúng ta có thể đảm bảo định thức là dương. Không gian các ma trận có định thức dương là một đường liên thông [(path-connected)](http://en.wikipedia.org/wiki/Connected_space#Path_connectedness), và thế nên tồn tại một ánh xạ $p :[0,1] \rightarrow GL_n(\mathbb{R})^5$ mà $p(0) = Id$ và $p(1) = W$. Ta có thể tịnh tiến một cách liên tục từ hàm đơn vị đến biến đổi $W$ với hàm $x \rightarrow p(t)x$, nhân $x$ tai mỗi điểm trong thời điểm $t$ bởi ma trận tịnh tiến liên tục $p(t)$.</li>
        <li>Ta có thể tịnh tiến liên tục từ hàm đơn vị đến tịnh tiến $b$ với hàm $x \rightarrow x + tb$.</li>
        <li>Ta có thể tịnh tiến một cách liên tục từ hàm đơn vị đến khi sử dụng biến đổi từng điểm (pointwise) với hàm $x \rightarrow (1-t)x + t\sigma(x)$ </li>
    </ol>
</div>
<br>

Author: I imagine there is probably interest in programs automatically discovering such ambient isotopies and automatically proving the equivalence of certain links, or that certain links are separable. It would be interesting to know if neural networks can beat whatever the state of the art is there.

*(Apparently determining if knots are trivial is NP. This doesn’t bode well for neural networks.)*

Loại liên kết mà chúng ta đã nói đến cho đến nay dường như không có khả năng xuất hiện trong dữ liệu thế giới thực, nhưng có những khái quát hóa theo chiều cao hơn. Có vẻ như những thứ như vậy có thể tồn tại trong dữ liệu thế giới thực.

Những liên kết và nút là những đa tạp một chiều, những chúng ta cần đến 4 chiều để có thể khám phá được chúng. Một cách tương tự, người ta cũng cần có không gian cao chiều hơn để có thể khám phá các đa tạp $n$ chiều. Tất cả những đa tạp $n$ chiều có thể được tháo gỡ ra trong $2n + 2$ chiều. (*This result is mentioned in [Wikipedia’s subsection on Isotopy versions](http://en.wikipedia.org/wiki/Whitney_embedding_theorem#Isotopy_versions)*)

(Author: *I know very little about knot theory and really need to learn more about what’s known regarding dimensionality and links. If we know a manifold can be embedded in $n$-dimensional space, instead of the dimensionality of the manifold, what limit do we have?*)

## Lối thoát dễ dàng

Bản chất tự nhiên của một mạng nơ-ron là phải thực hiện, một con đường rất dễ dàng, là thử và kéo các đa tạp ra xa nhau một cách ngây thơ và duỗi căng những phần bị rối càng thưa càng tốt. Mặc dù điều này sẽ không đạt đến một lời giải thực sự tốt, nhưng nó có thể đạt được độ chính xác phân lớp tương đối cao, và có thể là một cực tiểu tạm thời.

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/tangle.png"/>
</p>

Nó sẽ thể hiện bản thân nó như là những đạo hàm rất cao trên những vùng mà nó đang cố gắng kéo dài, và những điểm gần như không liên tục.

Vì các loại cực tiểu cục bộ này hoàn toàn vô dụng từ góc độ cố gắng giải quyết các bài toán tô-pô, nên các bài toán tô-pô có thể mang lại động lực tốt để khám phá những khía cạnh đối nghịch với những vấn đề này.

Mặt khác, nếu chúng ta chỉ quan tâm đến việc đạt kết quả phân loại tốt, thì có vẻ như chúng ta không quan tâm. Nếu một phần nhỏ của dữ liệu đa tạp bị mắc kẹt trên một đa tạp khác, đó có phải là vấn đề đối với chúng tôi không? Có vẻ như chúng ta có thể nhận được kết quả phân loại tốt tùy ý bất chấp vấn đề này?

*(My intuition is that trying to cheat the problem like this is a bad idea: it’s hard to imagine that it won’t be a dead end. In particular, in an optimization problem where local minima are a big problem, picking an architecture that can’t genuinely solve the problem seems like a recipe for bad performance.)*

## Những tầng tốt hơn cho việc thao tác trên đa tạp?

Tương đối khó hiểu và tưởng tượng những thứ như các lớp mạng nơ-ron lại thực sự tốt để mà thao tác với những đa tạp.

*The more I think about standard neural network layers – that is, with an affine transformation followed by a point-wise activation function – the more disenchanted I feel. It’s hard to imagine that these are really very good for manipulating manifolds.*

Có lẽ sẽ hợp lý nếu có một loại lớp rất khác mà chúng ta có thể sử dụng trong bố cục với những lớp truyền thống hơn?

Điều mà thực sự rất tự nhiên là tìm hiểu một trường vectơ với hướng mà chúng ta muốn dịch chuyển đa tạp:

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/grid_vec.png"/>
</p>

Và sau đó biến dạng không gian dựa trên nó:

<p align="center">
  <img src="https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/grid_bubble.png"/>
</p>

Người ta có thể tìm hiểu trường vectơ tại các điểm cố định (chỉ cần lấy một số điểm cố định từ tập huấn luyện để sử dụng làm điểm neo) và nội suy theo một cách nào đó. Trường vectơ trên có dạng:

$$
F(x) = \frac{v_0f_0(x) + v_1f_1(x)}{1+f_0(x)+f_1(x)}
$$
trong đó: $v_0$ và $v_1$ là những vector, $f_0(x)$ và $f_1(x)$ là những hàm gaussian $n$ chiều. Nó được lấy cảm hứng từ radial basis functions.

## [Tầng K-lân cận gần nhất](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/)

Xem chi tiết trong bài viết để hiểu cách thực nghiệm và kết quả của tác giả.

## Kết luận

Các thuộc tính tô-pô học của dữ liệu, như liên kết (links), có thể làm cho nó không thể nào phân tách một cách tuyến tính bằng cách sử dụng các mạng học thấp chiều, bất chấp độ sâu. Ngay cả trong những trường hợp có thể thực hiện được một cách kỹ thuật (vụn vặt), như hình xoắn ốc, cũng rất khó thể nào mà làm được (thách thức).

Để phân lớp chính xác dữ liệu bằng mạng học, đôi khi cần có các lớp rộng. Hơn nữa, các lớp mạng nơ-ron truyền thống dường như không thể hiện tốt các thao tác quan trọng của đa tạp; ngay cả khi chúng ta đặt trọng số một cách khéo léo bằng tay, sẽ rất khó để thể hiện một cách cô đọng các phép biến đổi mà chúng ta muốn. Các lớp mới, được thúc đẩy đặc biệt bởi các khía cạnh về đa tạp của học máy, có thể là những bổ sung hữu ích.