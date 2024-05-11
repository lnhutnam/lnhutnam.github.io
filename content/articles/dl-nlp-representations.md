+++
author = "Le, Nhut Nam"
title = "Học sâu, xử lý ngôn ngữ tự nhiên, những đặc trưng"
date = "2023-05-02"
description = "Một mạng nơ-ron nhân tạo với một tầng ẩn có tính phổ quát (universality): cho trước một số lượng đủ đơn vị ẩn, nó có thể xấp xỉ (tương đối là nhiều) mọi hàm số. Đây là một định lý thường được trích dẫn – và thậm chí là còn thường xuyên hơn nữa, dễ bị hiểu sai, và có tính ứng dụng.?"
tags = [
    "neural networks", "nnatural language processing", "deep learning", "recursive neural networks"
]
+++

Bài viết được dịch từ [Deep Learning, NLP, and Representations](https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/) của [colah's blog](https://colah.github.io)

## Dẫn nhập

Trong vài năm gần đây, mạng học sâu đã thống trị nhận dạng mẫu. Chúng nó đã thổi bay những state-of-the-ART trước đây cho nhiều tác vụ thị giác máy tính. Nhận dạng giọng nói cũng đang biến chuyển theo cách đó.

Những bất kể kết quả như thế nào, chúng ta vẫn mong muốn (kỳ vọng) rằng ... tại sao chúng lại hoạt động tốt đến như vậy?

Bài đăng này xem xét một số kết quả cực kỳ đáng chú ý trong việc áp dụng mạng lưới thần kinh sâu vào xử lý ngôn ngữ tự nhiên (NLP). Khi làm như vậy, tôi hy vọng có thể đưa ra một câu trả lời đầy hứa hẹn về lý do tại sao mà các mạng học sâu hoạt động tốt như thế. Tôi nghĩ đó là một khía cạnh rất tao nhã.

## Mạng học một tầng ẩn

Một mạng nơ-ron nhân tạo với một tầng ẩn có tính phổ quát (universality): cho trước một số lượng đủ đơn vị ẩn, nó có thể xấp xỉ (tương đối là nhiều) mọi hàm số. Đây là một định lý thường được trích dẫn – và thậm chí là còn thường xuyên hơn nữa, dễ bị hiểu sai, và có tính ứng dụng.?

Về cơ bản, điều đó đúng bởi vì lớp ẩn có thể được sử dụng giống như một bảng tra (lookup table) vậy.

Nói một cách đơn giản, hãy xem xét một mạng perceptron (có thể gọi là mạng nhận thức). Một [perceptron](http://en.wikipedia.org/wiki/Perceptron) là một nơ-ron rất đơn giản mà kích hoạt nếu nó vượt quá một ngưỡng cụ thể nào đó, và không kích hoạt nếu cho chưa chạm tới ngưỡng đó. Một mạng nhận thức (perceptron network) nhận các đầu vào nhị phân (0 và 1) và trả ra những đầu ra nhị phân.

Lưu ý rằng chỉ có một số lượng hữu hạn các đầu vào có thể. Đối với mỗi đầu vào có thể, chúng ta có thể xây dựng một nơ-ron trong lớp ẩn kích hoạt cho đầu vào đó (Constructing a case for every possible input requires $2^n$ hidden neurons, when you have $n$ input neurons. In reality, the situation isn’t usually that bad. You can have cases that encompass multiple inputs. And you can have overlapping cases that add together to achieve the right input on their intersection.),1 và chỉ trên đầu vào cụ thể đó. Sau đó, chúng ta có thể sử dụng các kết nối giữa nơ-ron đó và nơ-ron đầu ra để kiểm soát đầu ra trong trường hợp cụ thể đó. (*(It isn’t only perceptron networks that have universality. Networks of sigmoid neurons (and other activation functions) are also universal: give enough hidden neurons, they can approximate any continuous function arbitrarily well. Seeing this is significantly trickier because you can’t just isolate inputs.)*)

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/flowchart-PerceptronLookup.png"/>
</p>

Và như vậy, đúng là mạng nơ-ron một lớp ẩn là có tính tổng quát. Nhưng không có gì đặc biệt ấn tượng hay thú vị về điều đó. Nói rằng mô hình của bạn có thể làm điều tương tự như một bảng tra không phải là một lập luận vững chắc cho nó. Nó chỉ có nghĩa là mô hình của bạn không thể thực hiện tác vụ.

Tính phổ quát (universality) có nghĩa là một mạng có thể phù hợp với bất kỳ dữ liệu huấn luyện nào bạn cung cấp cho nó. Điều đó không có nghĩa là nó sẽ nội suy đến các điểm dữ liệu mới một cách hợp lý.

Không, tính phổ quát (universality) không phải là lời giải thích cho lý do tại sao mạng học hoạt động tốt như vậy. Lý do thực sự dường như là một cái gì đó tinh tế hơn nhiều… Và, để hiểu nó, trước tiên chúng ta cần hiểu một số kết quả cụ thể.

## Word embeddings

Ta bắt đầu bằng cách truy tìm một chuỗi nghiên cứu học sâu đặc biệt thú vị: nhúng từ (word embeddings). Theo ý kiến cá nhân của tác giả, nhúng từ (word embeddings) là một trong những lĩnh vực nghiên cứu thú vị nhất về học sâu tại thời điểm này, mặc dù ban đầu chúng được giới thiệu bởi Bengio, et al. hơn một thập kỷ trước (*Word embeddings were originally developed in ([Bengio et al, 2001](http://www.iro.umontreal.ca/~lisa/publications2/index.php/publications/show/64); [Bengio et al, 2003](http://machinelearning.wustl.edu/mlpapers/paper_files/BengioDVJ03.pdf)), a few years before the 2006 deep learning renewal, at a time when neural networks were out of fashion. The idea of distributed representations for symbols is even older, e.g. [(Hinton 1986)](http://www.cogsci.ucsd.edu/~ajyu/Teaching/Cogs202_sp13/Readings/hinton86.pdf)."*). Ngoài ra, tác giả nghĩ rằng chúng là một trong những nơi tốt nhất để có được trực giác về lý do tại sao học sâu lại hiệu quả đến vậy.

Một word embedding $W: \text{ words } \rightarrow \mathbb{R}^n$ là một hàm ánh xạ được tham số hóa (paramaterized function mapping) ánh xạ từ trong một số ngôn ngữ thành những vector cao chiều (high-dimensional vectors), (khoảng từ 200 đến 500 chiều). Ví dụ, ta có thể thấy:

$$
W(``\text{cat}\!") = (0.2,~ \text{-}0.4,~ 0.7,~ ...)
$$

$$
W(``\text{mat}\!") = (0.0,~ 0.6,~ \text{-}0.1,~ ...)
$$

(Một cách thông thường, hàm là một bảng tra - lookup table, được tham số bởi một ma trận $\theta$, với một dòng với mỗi từ: $W_\theta(w_n) = \theta_n$)

$W$ được khởi tạo để có những vector ngẫu nhiên cho mỗi từ. Nó học để có được những vector đầy đủ ý nghĩa nhằm thực hiện một số tác vụ.

Ví dụ, một tác vụ mà ta có thể huấn luyện một mạng học cho việc dự đoán liệu có một 5-gram (chuỗi gồm 5 từ) là "hợp lệ". Ta có thể dễ dạng có được những vị trí của 5-grams từ Wikipedia (ví dụ, "cat sat on the mat"), và sau đó "bẻ - break" một nửa chúng bằng cách thay thế một từ bằng một từ ngẫu nhiên (ví dụ, "cat sat **song** the mat"), vì mà hầu như sẽ chắc chắn tạo ra cho chúng ta một 5-gram không ý nghĩa.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Bottou-WordSetup.png"/>
</p>

Mô hình mà ta huấn luyện sẽ chạy với mỗi từ trong 5-gram nhờ $W$ để có được một vector đặc trưng (a vector representing) cho nó và đưa nó vào một "module" khác được gọi là $R$ mà cố gắng dự đoán nếu mà 5-gam là "hợp lệ" hoặc "nát" (không hợp lệ). Và sau đó, chúng ta sẽ có:

$$
R(W(\text{"cat"}), W(\text{"sat"}),~ W(\text{"on"}),~ W(\text{"the"}),~ W(\text{"mat"})) = 1
$$

$$
R(W(\text{"cat"}),~ W(\text{"sat"}),~ W(\text{"song"}),~ W(\text{"the"}),~ W(\text{"mat"})) = 0
$$

Để mà dự đoán những giá trị này một cách chính xác, mạng học cần học những tham số tốt cho cả $W$ và $R$.

Bây giờ, tác vụ này không thú vị lắm. Có lẽ nó có thể hữu ích trong việc phát hiện lỗi ngữ pháp trong văn bản hoặc một cái gì đó. Nhưng điều cực kỳ thú vị là $W$.

(Thực ra, đối với chúng ta, toàn bộ câu chuyện của tác vụ này là để học $W$. Ta có thể hoàn thành nhiều tác vụ khác - một tác vụ phổ biến khác là dự đoán từ kế tiếp trong câu. Những chúng ta không thực sự quan tâm cái này cho lắm. Trong phần còn lại của phần này, chúng ta sẽ nói về nhiều kết quả nhúng từ và sẽ không phân biệt giữa các cách tiếp cận khác nhau.)

Một điều chúng ta có thể làm để cảm nhận về không gian nhúng từ là trực quan hóa chúng bằng [t-SNE](http://homepage.tudelft.nl/19j49/t-SNE.html), một kỹ thuật phức tạp để trực quan hóa dữ liệu cao chiều.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Turian-WordTSNE.png"/>
</p>

*Ghi chú*: trực quan hóa t-SNE của nhúng từ. Trái: Vùng số; Phải: vùng nghề nghiệp. Được lấy từ nguồn [Turian et al. (2010)](http://www.iro.umontreal.ca/~lisa/pointeurs/turian-wordrepresentations-acl10.pdf), hình ảnh hoàn chỉnh -> [http://metaoptimize.s3.amazonaws.com/cw-embeddings-ACL2010/embeddings-mostcommon.EMBEDDING_SIZE=50.png](http://metaoptimize.s3.amazonaws.com/cw-embeddings-ACL2010/embeddings-mostcommon.EMBEDDING_SIZE=50.png)

Loại 'bản đồ' từ này có rất nhiều ý nghĩa trực quan đối với chúng tôi. Các từ tương tự nhau thì gần nhau. Một cách khác để hiểu điều này là xem những từ nào gần nhất trong phần nhúng với một từ nhất định. Một lần nữa, các từ có xu hướng khá giống nhau.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Colbert-WordTable2.png"/>
</p>

*Ghi chú*: Bảng trên chỉ ra những từ nào có nhúng gần nhất với một từ nhất định? Nguồn: [Collobert et al. (2011)](http://arxiv.org/pdf/1103.0398v1.pdf)

Có vẻ như là một mạng học tạo ra các từ có nghĩa tương tự có các vector tương tự là điều tự nhiên. Nếu bạn chuyển một từ cho một từ đồng nghĩa (ví dụ: "một số người hát hay - a few people sing well" $\rightarrow$ "một vài người hát hay - a couple people sing well"), giá trị của câu không thay đổi. Trong khi, từ một góc độ ngây thơ, câu đầu vào đã thay đổi rất nhiều, nếu $W$ ánh xạ những từ đồng nghĩa (synonyms) (giống như "few" và "couple") càng gần nhầu, từ một ít sự thay dổi những khía cạnh của $R$.

Điều này rất mạnh (powerful). Số lượng 5-gam có thể có là rất lớn và chúng tôi có một số lượng điểm dữ liệu tương đối nhỏ để cố gắng học. Các từ giống nhau ở gần nhau cho phép chúng ta khái quát từ một câu thành một lớp các câu tương tự. Điều này không chỉ có nghĩa là chuyển một từ cho một từ đồng nghĩa, mà còn chuyển một từ cho một từ trong một lớp tương tự (ví dụ: "the wall is blue" $\rightarrow$ "the wall is red"). Hơn nữa, chúng ta có thể thay đổi nhiều từ (ví dụ: "the wall is blue" $\rightarrow$ "the ceiling is red"). Tác động của điều này là theo cấp số nhân đối với số lượng từ. (The seminal paper, A Neural Probabilistic Language Model (Bengio, et al. 2003) has a great deal of insight about why word embeddings are powerful).

Do đó, một cách rõ ràng, điều này là một thứ hữu dụng cho $W$ để học. Nhưng nó học cách làm điều này như thế nào? Có vẻ như có rất nhiều tình huống mà nó đã nhìn thấy một câu như "the wall is blue" và biết rằng nó hợp lệ trước khi nó nhìn thấy một câu như "the wall is red". Do đó, việc chuyển "red" gần hơn một chút sang "blue" sẽ giúp mạng học hoạt động tốt hơn.

Chúng ta vẫn cần xem các ví dụ về mọi từ đang được sử dụng, nhưng phép loại suy cho phép chúng ta khái quát hóa thành các tổ hợp từ mới. Giống như ta đã nhìn thấy tất cả các từ mà ta hiểu trước đó, nhưng ta chưa xem tất cả các câu mà ta hiểu trước đó. Với một mạng học cũng vậy. 

Các nhúng từ (Word embeddings) thể hiện một thuộc tính thậm chí còn đáng chú ý hơn: sự tương tự giữa các từ dường như được mã hóa trong các vectơ khác biệt giữa các từ. Ví dụ, dường như có một vectơ khác biệt man-female không đổi:

$$
W(\text{"woman"}) - W(\text{"man"}) ~\simeq~ W(\text{"aunt"}) - W(\text{"uncle"})
$$

$$
W(\text{"woman"}) - W(\text{"man"}) ~\simeq~ W(\text{"queen"}) - W(\text{"king"})
$$

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Mikolov-GenderVecs.png"/>
</p>

Điều này có vẻ không quá ngạc nhiên. Rốt cuộc, đại từ giới tính có nghĩa là việc chuyển đổi một từ có thể khiến một câu sai ngữ pháp. Bạn viết, "she is the aunt" nhưng "he is the uncle." Tương tự như vậy, “he is the King” nhưng “she is the Queen.” Nếu một người thấy "she is the uncle", thì lời giải thích rất có thể là do lỗi ngữ pháp. Nếu các từ được chuyển đổi ngẫu nhiên trong một nửa thời gian, thì có vẻ như điều đó đã xảy ra ở đây.

"Tất nhiên rồi!" Chúng ta bắt đầu nhận thức được một cách muộn màng rằng, “word embedding sẽ học cách mã hóa giới tính theo một cách nhất quán. Trên thực tế, có lẽ có một khía cạnh giới tính. Điều tương tự cho số ít và số nhiều. Thật dễ dàng để tìm thấy những mối quan hệ tầm thường này!

Tuy nhiên, hóa ra những mối quan hệ phức tạp hơn nhiều cũng được mã hóa theo cách này. Nó có vẻ gần như kỳ diệu!

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Mikolov-AnalogyTable.png"/>
</p>

*Ghi chú:* Relationship pairs in a word embedding. From [Mikolov et al. (2013b)](http://arxiv.org/pdf/1301.3781.pdf). 

Điều quan trọng là phải đánh giá cao rằng tất cả các thuộc tính này của $W$ đều là tác dụng phụ (side effects). Chúng ta đã không cố gắng để có những từ tương tự được gần nhau. Chúng ta đã không cố gắng mã hóa các phép loại suy bằng các vector khác biệt. Tất cả những gì chúng ta cố gắng làm là thực hiện một tác vụ đơn giản, chẳng hạn như dự đoán xem một câu có hợp lệ hay không. Những thuộc tính này ít nhiều xuất hiện trong quá trình tối ưu hóa (optimization process).

Đây dường như là một thế mạnh lớn của mạng học: chúng học các cách tốt hơn để thể hiện dữ liệu một cách tự động. Ngược lại, việc thể hiện đặc trưng dữ liệu (representing data) tốt dường như là điều cần thiết để thành công trong nhiều vấn đề học máy. Word embeddings chỉ là một ví dụ đặc biệt nổi bật về việc học một đặc trưng (learning a representation).

## Những đặc trưng chia sẻ

Các thuộc tính của word embeddings chắc chắn rất thú vị, nhưng chúng ta có thể làm gì hữu ích với chúng không? Bên cạnh việc dự đoán những điều ngớ ngẩn, chẳng hạn như liệu 5-gram có 'hợp lệ - valid' hay không?

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/flowchart-TranfserLearning2.png"/>
</p>

*Ghi chú:* $W$ và $F$ học để thực hiện tác vụ A. Sau đó, $G$ có thể học để thực hiện $B$ dựa trên $W$

Chúng ta đã biết được word embedding để thực hiện tốt một nhiệm vụ đơn giản như thế nào, nhưng dựa trên các thuộc tính tốt đẹp mà chúng ta đã quan sát thấy trong các từ nhúng, có lẽ nào rằng chúng có thể hữu ích nói chung trong các nhiệm vụ NLP. Trên thực tế, những cách diễn đạt từ như thế này cực kỳ quan trọng:

"*The use of word representations… has become a key “secret sauce” for the success of many NLP systems in recent years, across tasks including named entity recognition, part-of-speech tagging, parsing, and semantic role labeling. [(Luong et al. (2013)](http://nlp.stanford.edu/~lmthang/data/papers/conll13_morpho.pdf))*"

Chiến thuật chung này – học đặc trưng tốt cho nhiệm vụ A và sau đó sử dụng nó cho nhiệm vụ B – là một trong những thủ thuật chính trong Deep Learning toolbox. Nó có nhiều tên khác nhau tùy thuộc vào chi tiết: pretraining, transfer learning, và multi-task learning. Một trong những điểm mạnh lớn của phương pháp này là nó cho phép biểu diễn để học từ nhiều loại dữ liệu.

Có một đối thủ với thủ thuật này. Thay vì học đặc trưng một loại dữ liệu và sử dụng nó để thực hiện nhiều loại nhiệm vụ, chúng ta có thể học cách ánh xạ nhiều loại dữ liệu vào một đặc trưng duy nhất! (a single representation)

Một ví dụ hay về điều này là nhúng từ song ngữ (bilingual word-embedding), được đề xuất bởi [Socher et al. (2013a)](http://ai.stanford.edu/~wzou/emnlp2013_ZouSocherCerManning.pdf). Chúng ta có thể học cách nhúng các từ từ hai ngôn ngữ khác nhau vào một không gian chung, duy nhất (a single, shared space). Trong trường hợp này, chúng tôi học cách nhúng các từ tiếng Anh (English) và tiếng Trung phổ thông (Mandarin Chinese) vào cùng một không gian.

Chúng ta huấn luyện hai word embeddings, $W_{en}$ và $W_{zh}$ trong một cơ chế tương tự như chúng ta đã biết ở trên. Tuy nhiên, chúng ta biết rằng một số từ tiếng Anh và từ tiếng Trung có nghĩa tương tự nhau. Vì vậy, ta sẽ cần tối ưu hóa cho một thuộc tính bổ sung: các từ mà chúng ta đã biết là có bản dịch gần nghĩa nên gần nhau.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/flowchart-bilingual.png"/>
</p>

Tất nhiên, chúng ta cũng có thể quan sát thấy để thấy rằng những từ chúng ta biết có nghĩa tương tự thì nằm gần nhau. Vì chúng ta đã tối ưu hóa cho điều đó nên không có gì đáng ngạc nhiên. Thú vị hơn là những từ mà chúng ta không biết đã được dịch lại gần nhau!.

Dựa trên kinh nghiệm trước đây của chúng ta về word embeddings, điều này có vẻ không quá ngạc nhiên. Word embeddings kéo các từ tương tự lại với nhau, vì vậy nếu một từ tiếng Anh và tiếng Trung mà chúng ta biết có nghĩa là những thứ tương tự ở gần nhau, thì các từ đồng nghĩa của chúng cũng sẽ kết thúc ở gần nhau. Chúng ta cũng biết rằng những thứ như sự khác biệt về giới tính cuối cùng có xu hướng được biểu diễn bằng một vector chênh lệch không đổi. Có vẻ như việc buộc đủ các điểm xếp hàng sẽ buộc các vector khác biệt này giống nhau trong cả phần nhúng tiếng Anh và tiếng Trung. Kết quả của việc này là nếu chúng ta biết rằng hai phiên bản nam của từ dịch nghĩa qua lại cho nhau, thì chúng ta cũng nên lấy các từ nữ để dịch nghĩa qua lại cho nhau.

Theo trực giác, có vẻ như hai ngôn ngữ có 'hình dạng' giống nhau và bằng cách buộc chúng xếp thành hàng ở các điểm khác nhau, chúng chồng lên nhau và các điểm khác được kéo vào đúng vị trí.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Socher-BillingualTSNE.png"/>
</p>

Trong bilingual word embeddings, chúng ta học một dặc trưng chia sẻ (shared representation) cho hai loại dữ liệu rất giống nhau. Nhưng chúng ta cũng có thể học cách embed các loại dữ liệu rất khác nhau vào cùng một không gian.

Gần đây, deep learning đã bắt đầu khám phá các mô hình embed hình ảnh và ngôn ngữ trong một đặc trưng duy nhất. (Previous work has been done modeling the joint distributions of tags and images, but it took a very different perspective.)

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/flowchart-DeViSE.png"/>
</p>

Ý tưởng cơ bản là người ta phân lớp hình ảnh bằng cách xuất ra một vector trong một word embedding. Hình ảnh của những con chó được ánh xạ gần vector từ “dog”. Hình ảnh ngựa được ánh xạ gần vector “horse”. Hình ảnh ô tô gần vector “car”. Và như thế.

Phần thú vị là điều xảy ra khi ta kiểm tra mô hình trên các lớp hình ảnh mới. Ví dụ: nếu mô hình không được huấn luyện để phân loại mèo – tức là ánh xạ chúng gần vector “cat” – thì điều gì sẽ xảy ra khi chúng ta cố gắng phân lớp hình ảnh về mèo?

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Socher-ImageClassManifold.png"/>
</p>

Hóa ra mạng có thể xử lý các lớp hình ảnh mới này khá hợp lý. Hình ảnh mèo không được ánh xạ tới các điểm ngẫu nhiên trong không gian nhúng từ. Thay vào đó, chúng có xu hướng được ánh xạ tới vùng lân cận chung của vector "dog", và trên thực tế, gần với vector "cat". Tương tự, hình ảnh xe tải kết thúc tương đối gần với vector "truck", tức là gần vector "car".

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Socher-ImageClass-tSNE.png"/>
</p>

Điều này được thực hiện bởi các thành viên của nhóm Stanford chỉ với 8 lớp đã biết trước (và 2 lớp chưa biết trước). Kết quả đã khá ấn tượng. Nhưng với rất ít lớp được biết đến, có rất ít điểm để nội suy mối quan hệ giữa hình ảnh và không gian ngữ nghĩa.

Google đã thực hiện một phiên bản lớn hơn nhiều – thay vì 8 loại, họ đã sử dụng 1.000 lớp – trong cùng một khoảng thời gian ([Frome et al. (2013)](http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41473.pdf)) và tiếp tục với một biến thể mới ([Norouzi et al. (2014)](http://arxiv.org/pdf/1312.5650.pdf)). Cả hai đều dựa trên mô hình phân lớp hình ảnh rất hiệu quả (của [Krizehvsky et al. (2012)](http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf)), nhưng việc embed hình ảnh vào embedding space được thực hiện từ theo những cách khác nhau.

Kết quả thật ấn tượng. Mặc dù chúng có thể không có được hình ảnh của các lớp chưa biết để tạo ra vector chính xác đại diện cho lớp đó, nhưng chúng có thể dự đoán đúng vùng lân cận. Vì vậy, nếu ta yêu cầu nó phân loại hình ảnh của các lớp chưa biết và các lớp khá khác nhau, thì nó có thể phân biệt các lớp khác nhau.

Ví dụ, mặc dù chưa bao giờ nhìn thấy rắn Aesculapian hay Armadillo trước đây, nhưng nếu người dùng cho mô hình xem ảnh của con này và ảnh của con kia, mô hình có thể cho bạn biết con nào là con nào vì mô hình có ý tưởng phổ quát về loại động vật có liên quan với mỗi từ.

(These results all exploit a sort of “these words are similar” reasoning. But it seems like much stronger results should be possible based on relationships between words. In our word embedding space, there is a consistent difference vector between male and female version of words. Similarly, in image space, there are consistent features distinguishing between male and female. Beards, mustaches, and baldness are all strong, highly visible indicators of being male. Breasts and, less reliably, long hair, makeup and jewelery, are obvious indicators of being female *(I’m very conscious that physical indicators of gender can be misleading. I don’t mean to imply, for example, that everyone who is bald is male or everyone who has breasts is female. Just that these often indicate such, and greatly adjust our prior.)*. Even if you’ve never seen a king before, if the queen, determined to be such by the presence of a crown, suddenly has a beard, it’s pretty reasonable to give the male version.)

Shared embeddings là một lĩnh vực nghiên cứu cực kỳ thú vị và giải thích lý do tại sao quan điểm tập trung vào biểu diễn của deep learning lại hấp dẫn đến vậy.

## Mạng nơ-ron đệ quy (Recursive Neural Networks)

Ta bắt đầu bàn luận về word embeddings với mạng học sau:

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Bottou-WordSetup.png"/>
</p>

Lược đồ trên mô tả một modular network

$$
R(W(w_1),~ W(w_2),~ W(w_3),~ W(w_4),~ W(w_5))
$$

Nó được tạo nên từ hai module, $W$ và $R$. Cách tiếp cận này, xây dựng các mạng thần kinh từ các “mô-đun” mạng học nhỏ hơn có thể được kết hợp với nhau, không được phổ biến rộng rãi. Tuy nhiên, nó đã rất thành công trong NLP.

Các mô hình như trên rất mạnh, nhưng chúng có một hạn chế đáng tiếc: chúng chỉ có thể có một số lượng đầu vào cố định.

Chúng ta có thể khắc phục điều này bằng cách thêm một module liên kết, $A$, module này sẽ nhận hai biểu diễn từ hoặc cụm từ và hợp nhất chúng.

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Bottou-Afold.png"/>
</p>

Bằng cách hợp nhất các chuỗi từ, $A$ đưa chúng ta từ việc biểu diễn các từ sang biểu diễn các cụm từ hoặc thậm chí biểu thị cả câu! Và bởi vì chúng ta có thể hợp nhất các số lượng từ khác nhau lại với nhau nên chúng ta không cần phải có một số lượng đầu vào cố định.

Nó không nhất thiết phải hợp nhất các từ với nhau trong một câu một cách tuyến tính. Nếu người ta xem xét cụm từ “the cat sat on the mat”, thì nó có thể được đặt trong ngoặc đơn một cách tự nhiên thành các đoạn: "((the cat) (sat (on (the mat))))". Chúng ta có thể áp dụng $A$ dựa trên dấu ngoặc này:

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Bottou-Atree.png"/>
</p>

Các mô hình này thường được gọi là "recursive neural networks" bởi vì người ta thường có đầu ra của một module đi vào một module cùng loại. Đôi khi chúng còn được gọi là "tree-structured neural networks".

Recursive neural networks có những thành công đáng kể trong một số tác vụ của NLP. Ví dụ, [Socher et al. (2013c)](http://nlp.stanford.edu/~socherr/EMNLP2013_RNTN.pdf), sử dụng mạng học này để dự đoán ngữ nghĩa câu (sentence sentiment)

<p align="center">
  <img src="https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Socher-SentimentTree.png"/>
</p>

Một mục tiêu chính là tạo ra một đặc trưng câu có thể đảo ngược (reversible sentence representation), một đặc trưng mà người ta có thể xây dựng lại một câu thực tế từ đó, với ý nghĩa gần như giống nhau. Ví dụ: chúng ta có thể cố gắng đưa vào module phân tách, $D$, mà cố gắng hoàn tác $A$:

![](https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Bottou-unfold.png)

Nếu chúng ta có thể hoàn thành một việc như vậy, nó sẽ là một công cụ cực kỳ mạnh mẽ. Ví dụ, chúng ta có thể thử tạo một câu song ngữ và sử dụng nó để dịch.

Thật không may, điều này hóa ra là rất khó khăn. Rất rất khó. Và với triển vọng to lớn, có rất nhiều người đang nghiên cứu nó.

Gần đây, [Cho et al. (2014)](http://arxiv.org/pdf/1406.1078v1.pdf) đã đạt được một số tiến bộ trong việc biểu diễn các cụm từ, với một mô hình có thể mã hóa các cụm từ tiếng Anh và giải mã chúng bằng tiếng Pháp. Nhìn vào các biểu diễn cụm từ nó học!

![](https://colah.github.io/posts/2014-07-NLP-RNNs-Representations/img/Cho-TimePhrase-TSNE.png)