+++
author = "Le, Nhut Nam"
title = "Mạng neural, Loại (Types), và Lập trình Hàm (Functional Programming)"
date = "2023-05-14"
description = "Nếu chúng ta nghĩ rằng có lẽ chúng ta sẽ thấy deep learning rất khác trong 30 năm nữa, thì điều đó gợi ra một câu hỏi thú vị: chúng ta sẽ nhìn nhận nó như thế nào? Tất nhiên, không ai thực sự có thể biết chúng ta sẽ hiểu lĩnh vực này như thế nào. Nhưng thật thú vị khi suy đoán."
tags = [
    "type theory", "neural networks", "functional programming"
]
+++

Bài viết được dịch từ [Neural Networks, Types, and Functional Programming](https://colah.github.io/posts/2015-09-NN-Types-FP/) của [colah's blog](https://colah.github.io)


Một lĩnh vực Ad-Hoc...

Deep learning, mặc dù có những thành công đáng kể, là một lĩnh vực non trẻ. Trong khi các mô hình được gọi là mạng thần kinh nhân tạo (artificial neural networks) đã được nghiên cứu trong nhiều thập kỷ, phần lớn công việc đó dường như chỉ được kết nối một cách mong manh với các kết quả hiện đại.

Thường xảy ra trường hợp các lĩnh vực non trẻ bắt đầu theo cách do sự cần thiết/ dành cho một mục đích cụ thể (ad-hoc manner). Sau đó, lĩnh vực phát triển sau này được hiểu rất khác so với những người khai mở sơ khai của nó. Ví dụ, trong phân loại học, con người đã nhóm các loài thực vật và động vật trong hàng nghìn năm, nhưng cách chúng ta hiểu những gì chúng ta đang làm đã thay đổi rất nhiều dưới ánh sáng của quá trình tiến hóa và sinh học phân tử. Trong hóa học, chúng ta đã khám phá các phản ứng hóa học trong một thời gian dài, nhưng những gì chúng ta hiểu về bản thân đã thay đổi rất nhiều với việc khám phá ra các nguyên tố bất khả quy, và một lần nữa sau đó với các mô hình nguyên tử. Đó là những ví dụ vĩ đại, nhưng lịch sử khoa học và toán học đã chứng kiến mô hình này hết lần này đến lần khác, trên nhiều quy mô khác nhau.

Có vẻ như deep learning đang ở trạng thái ad-học này.

Hiện tại, deep learning được kết hợp với nhau bằng một công cụ cực kỳ thành công. Công cụ này có vẻ không cơ bản; đó là điều mà chúng ta đã vấp phải, với những chi tiết dường như tùy ý thay đổi thường xuyên. Là một lĩnh vực, chúng ta chưa có một số hiểu biết thống nhất hoặc hiểu biết chung. Trên thực tế, lĩnh vực này có một số câu chuyện cạnh tranh!

## Học sâu trong 30 năm tới

Nếu chúng ta nghĩ rằng có lẽ chúng ta sẽ thấy deep learning rất khác trong 30 năm nữa, thì điều đó gợi ra một câu hỏi thú vị: chúng ta sẽ nhìn nhận nó như thế nào? Tất nhiên, không ai thực sự có thể biết chúng ta sẽ hiểu lĩnh vực này như thế nào. Nhưng thật thú vị khi suy đoán.

Hiện tại, ba câu chuyện đang cạnh tranh để trở thành cách chúng ta hiểu về deep learning. Câu chuyện về khoa học thần kinh (neuroscience), chỉ ra những điểm tương đồng với sinh học. Câu chuyện về các đặc trưng (representations), tập trung vào các phép biến đổi dữ liệu (transformations of data) và giả thuyết đa tạp (manifold hypothesis). Cuối cùng, về câu chuyện xác suất, giải thích các mạng neural như việc tìm kiếm các biến tiềm ẩn (neuroscience). Những câu chuyện kể này không loại trừ lẫn nhau, nhưng chúng thể hiện những cách suy nghĩ rất khác nhau về deep learning.

Bài tiểu luận này mở rộng câu chuyện về đặc trưng thành một câu trả lời mới: deep learning nghiên cứu mối liên hệ giữa tối ưu hóa (optimization) và lập trình hàm (functional programming).

Theo quan điểm này, về mặc đặc trưng trong deep learning tương ứng với lý thuyết loại (type theory) trong lập trình hàm (functional programming). Nó coi deep learning là điểm giao nhau của hai lĩnh vực mà chúng ta đã biết là vô cùng phong phú. Những gì chúng ta tìm thấy, dường như rất đẹp đối với tác giả (và chính người dịch), cảm thấy rất tự nhiên, đến nỗi nhà toán học có thể tin rằng đó là điều gì đó cơ bản về thực tế.

Những quan điểm của tác giả là một ý tưởng suy đoán. Có thể nó không phải là đúng. Nhưng nó có tính hợp lý, rằng người ta có thể tưởng tượng việc học sâu phát triển theo hướng này, và cái mà chúng ta gọi là học sâu (deep learning) thực ra là như thế nào?
 
## Tối ưu hóa (optimization) và kết hợp hàm (function composition)

Thuộc tính đặc biệt của học sâu là nó nghiên cứu các mạng nơ-ron sâu - mạng nơ-ron có nhiều lớp. Trải qua nhiều lớp, các mô hình này dần dần [bẻ cong dữ liệu](http://colah.github.io/posts/2015-01-Visualizing-Representations/#neural-networks-transform-space), biến nó thành một dạng dễ dàng giải quyết tác vụ nhất định.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/netvis.png"/>
</p>

Chi tiết của các lớp này thay đổi thường xuyên. Điều không đổi là có một chuỗi các lớp.

Mỗi lớp là một hàm (function), hoạt động trên đầu ra của lớp trước đó. Nhìn chung, mạng là một chuỗi các hàm hợp. Chuỗi chức năng tổng hợp này được tối ưu hóa để thực hiện một tác vụ.


## Những đặc trưng (reprensetation) chỉ là các Loại (Types)

Với mọi layer, các mạng neural biến đổi dữ liệu, tạo hình (molding) nó thành một dạng mà có thể giúp thực hiện tác vụ của chúng một cách dễ dàng hơn. Chúng ta gọi đó là những phiên bản được biến đổi của "những đặc trưng - representations" dữ liệu.

Những đặc trưng (reprensetations) tương đương với loại (types).

Về bản chất, các loại trong khoa học máy tính là một cách nhúng (embedding) một số loại dữ liệu trong $n$ bit. Tương tự, các đặc trưng (reprensetations) trong học sâu là một cách để nhúng (embed) đa tạp (manifold) dữ liệu vào $n$ chiều.

Giống như hai hàm (function) chỉ có thể được kết hợp với nhau nếu các kiểu của chúng là đồng cấu, hai lớp chỉ có thể được kết hợp với nhau khi các đặc trưng (reprensetations) của chúng đồng cấu. Dữ liệu trong đặc trưng (reprensetations) sai là vô nghĩa đối với mạng học. Trong quá trình huấn luyện, các lớp liền kề thương lượng cách thể hiện mà chúng sẽ giao tiếp; hiệu suất của mạng phụ thuộc vào dữ liệu trong đặc trưng (reprensetations) mà mạng học kỳ vọng.

Hình bên dưới mô tả một layer $f_1$ theo sau bởi một layer $f_2$. Đặc trưng đầu ra của $f_1$ là đầu vào của $f_2$.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/types-compose.png"/>
</p>

Trong trường hợp kiến trúc mạng học (mạng neural) rất đơn giản, nơi chỉ có một chuỗi các lớp tuyến tính, điều này thật sự không thú vị lắm. Đặc trưng đầu ra của một lớp cần khớp với đặc trưng đầu vào của lớp tiếp theo – vậy thì sao? Đó là một yêu cầu rất tầm thường và nhàm chán.

Nhưng nhiều mạng học (mạng neural) có kiến trúc phức tạp hơn, điều này trở thành một ràng buộc thú vị hơn. Đối với một ví dụ rất đơn giản, hãy tưởng tượng một mạng học (mạng neural) có nhiều loại đầu vào (kinds of input) tương tự nhau, thực hiện nhiều tác vụ có liên quan với nhau. Có lẽ nó lấy hình ảnh RGB và cả hình ảnh thang độ xám. Có thể nó đang xem ảnh của mọi người và cố gắng đoán tuổi và giới tính. Bởi vì sự tương đồng giữa các loại đầu vào và giữa các loại nhiệm vụ, nên có thể hữu ích khi thực hiện tất cả những điều này trong một mô hình, để dữ liệu huấn luyện hỗ trợ tất cả chúng. Kết quả là nhiều lớp đầu vào ánh xạ vào một đặc trưng và nhiều đầu ra ánh xạ từ cùng một đặc trưng.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/types-branchmerge.png"/>
</p>

Có lẽ ví dụ này có vẻ hơi giả tạo, nhưng ánh xạ các loại dữ liệu khác nhau vào cùng một đặc trưng có thể dẫn đến [một số điều khá đáng chú ý](http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/). Ví dụ: bằng cách ánh xạ các từ trong hai ngôn ngữ thành một đặc trưng, chúng ta có thể tìm thấy các từ tương đồng mà chúng ta không biết dịch chuyển khi bắt đầu. Và bằng cách ánh xạ hình ảnh và từ vào cùng một đặc trưng, chúng ta có thể phân loại hình ảnh của các lớp mà chúng ta chưa từng thấy!

Các đặc trưng (reprensetations) và loại (types) có thể được coi là các khối xây dựng cơ bản cho deep learning và lập trình hàm (functional programming), một cách tương ứng. Một trong những câu chuyện chính của deep learning, câu chuyện đa tạp và đặc trưng, hoàn toàn tập trung vào các mạng nơ-ron uốn dữ liệu thành các đặc trưng biểu diễn mới. Mối liên hệ đã biết giữa hình học, logic, cấu trúc liên kết và lập trình hàm gợi ý rằng mối liên hệ giữa các đặc trưng (reprensetations) và loại (types) có thể có ý nghĩa cơ bản.

## Học sâu (deep learning) & Lập trình Hàm (Functional Programming)

Một trong những hiểu biết quan trọng đằng sau các mạng nơ-ron hiện đại là ý tưởng rằng nhiều bản sao của một nơ-ron có thể được sử dụng trong một mạng nơ-ron.

Trong lập trình, sự trừu tượng của các hàm là điều cần thiết. Thay vì viết cùng một mã nguồn hàng chục, hàng trăm hoặc thậm chí hàng nghìn lần, chúng ta có thể viết nó một lần và sử dụng nó khi cần. Điều này không chỉ làm giảm đáng kể số lượng mã chúng ta cần viết (write/ coding) và bảo trì (maintain), tăng tốc (speeding) quá trình phát triển mà còn giảm nguy cơ chúng ta tạo ra lỗi và khiến những lỗi mà chúng ta có thể mắc phải một cách dễ dàng phát hiện hơn.

Sử dụng nhiều bản sao của một nơ-ron ở những nơi khác nhau là mạng nơ-ron tương đương với việc sử dụng các hàm. Vì có ít thứ để học hơn nên mô hình học nhanh hơn và học mô hình tốt hơn. Kỹ thuật này – tên kỹ thuật của nó là "weight tying" – là điều cần thiết để mang lại những kết quả phi thường mà chúng ta đã thấy gần đây từ học sâu (deep learning).

Tất nhiên, người ta không thể tùy tiện đặt các bản sao của các neurons ở khắp mọi nơi. Để mô hình hoạt động, ta cần thực hiện theo nguyên tắc, khai thác một số cấu trúc trong dữ liệu của mình. Trong thực tế, có một số mẫu được sử dụng rộng rãi, chẳng hạn như các lớp quy hồi (recurrent layers) và các lớp tích chập (convolutional layers).

Các mẫu mạng neural (neural network patterns) này chỉ là các hàm bậc cao hơn (higher order functions) – tức là các hàm lấy các hàm làm đối số (arguments). Những thứ như thế đã được nghiên cứu rộng rãi trong lập trình hàm (functional programming). Trên thực tế, nhiều mẫu mạng này tương ứng với các hàm cực kỳ phổ biến, như gấp. Điều bất thường duy nhất là, thay vì nhận các hàm bình thường làm đối số, chúng nhận các khối mạng neural. (I think it’s actually kind of surprising that these sort of models are possible at all, and it’s because of a surprising fact. Many higher order functions, given differentiable functions as arguments, produce a function which is differentiable almost everywhere. Further, given the derivatives of argument functions, you can simply use chain rule to calculate the derivative of the resulting function.)

- **Encoding Recurrent Neural Networks** chỉ là các folds. Chúng thường được sử dụng để cho phép mạng nơ-ron lấy danh sách có độ dài thay đổi làm đầu vào, chẳng hạn như lấy một câu làm đầu vào.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/RNN-encoding.png"/>
</p>

$$
\text{fold } = \text{ Encoding RNN} 
$$

Nếu sử dụng Haskell:
```hs
foldl a s
```

- **Generating Recurrent Neural Networks** thì chỉ là unfolds. Chúng thường được sử dụng để cho phép mạng neural tạo ra một danh sách các kết quả đầu ra, chẳng hạn như các từ trong một câu.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/RNN-generating.png"/>
</p>

$$
\text{unfold } = \text{ Generating RNN} 
$$

Nếu sử dụng Haskell:
```hs
unfoldr a s
```

- **General Recurrent Neural Networks** là các ánh xạ tích lũy (accumulating maps). Chúng thường được sử dụng khi chúng ta cố gắng đưa ra dự đoán theo trình tự. Ví dụ: trong nhận dạng giọng nói, chúng tôi có thể muốn dự đoán một hiện tượng cho mỗi bước thời gian trong phân đoạn âm thanh, dựa trên ngữ cảnh trong quá khứ.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/RNN-general.png"/>
</p>

$$
\text{Accumulating Map } = \text{ RNN} 
$$

Nếu sử dụng Haskell:
```hs
mapAccumR a s
```

- Bidirectional Recursive Neural Networks là một biến thể khó hiểu hơn, mà được đề cập chủ yếu vì hương vị. Theo thuật ngữ lập trình hàm, chúng là một ánh xạ tích lũy bên trái (left accumulating map zipped) và bên phải (right accumulating map zipped) được nén lại với nhau. Chúng được sử dụng để đưa ra dự đoán về một chuỗi với cả bối cảnh trong quá khứ và tương lai.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/RNN-bidirectional.png"/>
</p>

$$
\text{Zipped Left & Right Accumulating Map } = \text{ Bidirectional RNN} 
$$

Nếu sử dụng Haskell:
```hs
zip (mapAccumR a s xs) (mapAccumL a` s` xs)
```

- Convolutional Neural Networks là lose relative of map. Một ánh xạ bình thường áp dụng một hàm cho mọi phần tử. Mạng neural tích chập cũng xem xét các phần tử lân cận, áp dụng một hàm cho một cửa sổ nhỏ xung quanh mọi phần tử. (This operation is also closely related to stencil/convolution functions, which are their linear version. They’re typically implemented using those. However, in modern neural net research, where “MLP convolution layers” are becoming more popular, it seems preferable to think of this as an arbitrary function.)

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/Conv1.png"/>
</p>

$$
\text{Windowed Map } = \text{ Convolutional Layer} 
$$

Nếu sử dụng Haskell:
```hs
zipWith a xs (tail xs)
```

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/Conv2.png"/>
</p>


- Recursive Neural Networks ("TreeNets") là catamorphisms, một tổng quát hóa của folds. Chúng sử dụng một cấu trúc dữ liệu từ dưới lên. Chúng chủ yếu được sử dụng để xử lý ngôn ngữ tự nhiên, để cho phép các mạng neural hoạt động trên các cây phân tích cú pháp (parse trees).

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/TreeNet.png"/>
</p>

$$
\text{Catamorphism } = \text{ TreeNet} 
$$

Nếu sử dụng Haskell:
```hs
cata a
```

## Một loại hình mới của lập trình

Các mẫu này là các khối xây dựng có thể được kết hợp với nhau thành các mạng lớn hơn. Giống như các khối xây dựng, các tổ hợp này là các chương trình hàm, với các khối mạng neural xuyên suốt. Chương trình hàm cung cấp cấu trúc cấp cao, trong khi các khối là những phần linh hoạt học cách thực hiện nhiệm vụ thực tế trong khuôn khổ do chương trình hàm cung cấp.

Những sự kết hợp của các khối xây dựng này có thể làm những điều thực sự, thực sự đáng chú ý. Xem xét một vài ví dụ.

- [Sutskever, et al. (2014)](http://arxiv.org/pdf/1409.3215.pdf) thực hiện dịch tiếng Anh sang tiếng Pháp hiện đại bằng cách kết hợp encoding RNN và generating RNN. Theo thuật ngữ lập trình hàm, về cơ bản, họ gấp câu tiếng Anh (ngược lại) và sau đó mở ra để tạo ra bản dịch tiếng Pháp.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/Translation2-Backwards.png"/>
</p>

- [Vinyals, et al. (2014)](http://arxiv.org/pdf/1411.4555.pdf) tạo chú thích hình ảnh với mạng tích chập và generating RNN. Về cơ bản, họ sử dụng hình ảnh bằng một mạng tích chập, sau đó mở rộng vector kết quả thành một câu mô tả nó.

<p align="center">
  <img src="https://colah.github.io/posts/2015-09-NN-Types-FP/img/image-caption.png"/>
</p>

Những loại mô hình này có thể được coi là một loại lập trình hàm vi phân (differentiable functional programming).

Nhưng nó không chỉ là một thứ trừu tượng! Chúng thấm đẫm hương vị của lập trình chức hàm, ngay cả khi mọi người không sử dụng ngôn ngữ đó. Khi tác giả nghe các đồng nghiệp nói chuyện cấp cao về các mô hình của họ, tác giả có một cảm giác rất khác so với những người nói về các mô hình cổ điển hơn. Tất nhiên, mọi người nói về mọi thứ theo nhiều cách khác nhau - có rất nhiều điểm khác biệt trong cách mọi người nhìn nhận về deep learning - nhưng thường có một dòng chảy ngầm có cảm giác rất giống với các cuộc trò chuyện về lập trình hàm (functional programming).

Nó giống như một kiểu lập trình hoàn toàn mới, một kiểu lập trình hàm khả vi (differentiable functional programming). Một người viết một chương trình hàm rất thô, với những phần linh hoạt, có thể học được này và xác định hành vi chính xác của chương trình với nhiều dữ liệu. Sau đó, bạn áp dụng giảm dần độ dốc hoặc một số thuật toán tối ưu hóa khác. Kết quả là một chương trình có khả năng thực hiện những điều đáng chú ý mà chúng tôi không biết cách tạo trực tiếp, chẳng hạn như tạo chú thích mô tả hình ảnh.

Đó là giao điểm tự nhiên của lập trình hàm (functional programming) và tối ưu hóa (optimization), và tác giả nghĩ nó rất đẹp.