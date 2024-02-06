+++
author = "Le, Nhut Nam"
title = "Giới thiệu về SincNet"
date = "2021-06-11"
tags = [
    "speaker recognition", "speech processing", "convolutional neural networks", "raw waveform"
]
+++

Trong những năm gần đây, Machine Learning (Học máy/ Máy học) đạt được rất nhiều thành tựu nổi bật, thúc đẩy Cách mạng Công nghệ 4.0 phát triển nhanh chóng. Một trong những tác nhân chính mạnh mẽ nhất đến từ Deep Learning (Deep Neural Networks - Các mạng Học sâu), các mô hình học dựa trên những phương pháp này đã rất thành công, đạt được một hiệu năng đầy triển vọng, trong nhiều tác vụ khác nhau như Thị giác Máy tính (Computer Vision), Nhận dạng Nhân trắc học (Biometrics): Giọng nói (Speech), Khuôn mặt (Face), Vân tay (Fingerprint), ..., Xử lý ngôn ngữ tự nhiên (Natural Language Processing), ...

Trong tác vụ nhận dạng, đặc biệt là nhận dạng giọng nói (Voice/ Speech Recognition) gần như là một bài toán khó trong nhiều năm, cần những phương pháp rất phức tạp để có thể giải quyết được. Nhờ vào Học sâu, phương giải phải khả thi, mà cụ thể là với Mạng Neural Tích chập (Convolutional Neural Networks - CNNs) đem lại những kết quả đầy hứa hẹn khi chỉ cần đầu vào trực tiếp là mẫu giọng nói thô. Thay vì sử dụng các tính năng thủ công tiêu chuẩn, CNNs sau này học cách biểu diễn giọng nói cấp thấp từ các dạng sóng, có khả năng cho phép mạng nắm bắt tốt hơn các đặc điểm giọng nói ở dải tần hẹp quan trọng như cao độ và hình dạng.

# Động lực nghiên cứu khoa học

Tính phổ biến của tín hiệu giọng nói, phạm vi ứng dụng có thể có của sinh trắc học (nhân trắc học) giọng nói rộng hơn so với các đặc điểm sinh trắc học thông thường khác. Chúng ta có thể phân biệt ba loại ứng dụng chính tận dụng thông tin sinh trắc học có trong tín hiệu giọng nói như sau:
- Voice authentication (Xác nhận giọng nói) (Access control - Điều khiển truy cập, thường là điều khiển từ xa bằng điện thoại) và back-ground recognition (Nhận dạng lý lịch) (natural voice checking - kiểm tra bằng giọng nói tự nhiên).
- Speaker detection (Nhận diện người nói) (ví dụ như: phát hiện danh sách đen trong các tổng đài điện thoại hoặc trong nghe lén và giám sát, …), hay còn được gọi là speaker spotting.
- Forensic speaker recognition (Nhận dạng người nói trong Pháp y) (sử dụng giọng nói làm bằng chứng trước tòa án hoặc làm thông tin tình báo trong các cuộc điều tra của cảnh sát hình sự).

Các phương pháp SOTA dựa trên việc biểu diễn i-vectors của những đoạn giọng nói, cải thiện đáng kể so với mô hình Gaussian Mixture Model-Universal Background Models và sự phát triển của Deep Neural Network đã góp phần giải quyết nhận dạng giọng nói. Tuy nhiên vẫn còn nhiều vấn đề cần phải giải quyết với bài toán này như vấn đề dữ liệu đầu vào, tối ưu độ lỗi, tăng hiệu năng hội tụ và nhất là làm sao thiết kế một mô hình nhỏ gọn, có thể tinh chỉnh được để phù hợp với các ứng dụng của chúng ta.

Trong những năm gần đây, Trí tuệ Nhân tạo nhất là lĩnh vực Học máy (Machine Learning) đạt được nhiều thành tựu nổi bật là nhờ Học Sâu (Deep Learning). Các mạng học sâu - Deep Neural Networks (DNNs) sử dụng trong những framework i-vector để tính toán thống kê Baum-Welch hoặc trong các khung rút trích đặc trưng theo mức (frame-level feature extraction). Ngoài ra, DNNs còn được dùng trong việc phân tách/ phân loại giọng nói.

Những kỹ thuật này cần phải tuân theo một số tiêu chuẩn nhất định, ví dụ như: độ mượt của tần số giọng nói có thể làm cản trở việc rút trích một số đặc trưng của giọng nói như cao độ và ngữ âm, .... Để khắc phục chúng, các công trình mới đây thường dùng kỹ thuật spectrogram bins (bin tần số) hoặc dùng cả sóng thô (raw waveform).

# Phát biểu bài toán

Hai tác vụ lớn trong nhận dạng giọng nói là định danh người nói và xác minh người nói.

Định danh người nói là nhiệm vụ để xác định một người nói không xác định từ một tập hợp các người nói đã biết: tìm người nói có âm thanh gần nhất với mẫu thử nghiệm. Khi tất cả các người nói trong một tập hợp nhất định đã biết, nó được gọi là kịch bản tập hợp kín (hoặc trong tập hợp). Ngoài ra, nếu bộ người nói đã biết có thể không chứa đối tượng kiểm tra tiềm năng, thì nó được gọi là nhận dạng người nói mở (hoặc ngoài tập).

Trong xác minh người nói, nhiệm vụ là xác minh xem người nói, người tuyên bố là có danh tính, có thực sự là danh tính hay không. Nói cách khác, chúng ta phải xác minh xem đối tượng có thực sự là người mà họ nói hay không. Điều này có nghĩa là so sánh hai mẫu giọng nói/ cách phát biểu và quyết định xem chúng có được nói bởi cùng một người nói hay không. Điều này - nói chung là thực hành xác minh người nói - thường được thực hiện bằng cách so sánh mẫu thử nghiệm với một mẫu giọng nói đã cho và một mô hình nền chung.

Tóm lại
- Tác vụ: Định danh người nói
    - Đầu vào (Input): Dữ liệu âm thanh giọng nói
    - Đầu ra (Output): Danh tính của người nói
- Tác vụ: Xác minh người nói
    -  Đầu vào (Input): Dữ liệu âm thanh giọng nói
    -  Đầu ra (Output): Đồng ý/ Từ chối

# Giới thiệu về bài báo Speaker Recognition from raw waveform with SincNet

Nhóm tác giả Mirco Ravanelli, Yoshua Bengio, trong bài báo này đề xuất một kiến trúc mạng CNN (Convolutional Neural Networks) mới, được gọi là SincNet, khai phá lớp tích chập đầu tiên để khám phá nhiều thông tin hơn. SincNet dựa trên các hàm $sinc$ được tham số hóa, để cài đặt các bộ lọc băng thông.

Ngược lại với CNNs chuẩn, học tất cả các phần tử của mỗi bộ lọc filter, ở đây, chúng ta chỉ có các tần số cắt thấp và cao học trực tiếp dữ liệu với phương pháp đề xuất

Cung cấp một tập các bộ lọc mà chúng nhỏ gọn và hiệu quả trong việc tùy chỉnh với ứng dụng mà chúng ta muốn.

Đây là một sự kết hợp tuyệt vời giữa Học máy (Machine Learning) và Xử lý Tín hiệu số (Digital Signal Processing).

Bài báo được đăng công khai trên arXiv dot org lần đầu tiên vào năm 2018 bởi hai người Mirco Ravanelli, Yoshua Bengio (ông được xem là một trong 3 vị cha đẻ của phương pháp Deep Learning hiện đại), phiên bản cập nhật gần đây nhất là vào năm 2019 bằng việc thay thế hàm "sinc\_conv" bằng "SincConv\_fast" giúp tăng tốc độ lên 50% so với phiên bản cũ.

# Về nhận dạng giọng nói

Về lĩnh vực Nhận dạng giọng nói, đây là một lĩnh vực nghiên cứu có nhiều ứng dụng vào thực tiễn đời sống như xác thực sinh trắc học, pháp y, bảo mật, nhận dạng giọng nói và phân cực giọng nói.

Hầu hết những giải pháp "state of the art" đều dựa trên việc biểu diễn i-vectors của những đoạn giọng nói, cải thiện đáng kể so với mô hình Gaussian Mixture Model-Universal Background Models (GMM-UBMs).

Trong những năm gần đây, Trí tuệ Nhân tạo nhất là lĩnh vực Học máy (Machine Learning) đạt được nhiều thành tựu nổi bật là nhờ Học Sâu (Deep Learning). Các mạng học sâu - Deep Neural Networks (DNNs) sử dụng trong những framework **i-vector** để tính toán thống kê Baum-Welch hoặc trong các khung rút trích đặc trưng theo mức (frame-level feature extraction). Ngoài ra, DNNs còn được dùng trong việc phân tách giọng nói.

Những kỹ thuật này cần phải tuân theo một số tiêu chuẩn nhất định, ví dụ như: độ mượt của tần số giọng nói có thể làm cản trở việc rút trích một số đặc trưng của giọng nói như cao độ và ngữ âm, .... Để khắc phục chúng, các công trình mới đây thường dùng kỹ thuật spectrogram bins (bin tần số) hoặc dùng cả sóng thô (raw waveform).

# Về Convolutional Neural Networks

Convolutional Neural Networks - CNNs là một lựa chọn thích hợp với đầu vào là những sóng thô, nó kiến trúc phổ biến nhất để xử lý các mẫu giọng nói thô nhờ vào chia sẻ trọng số, bộ lọc cục bộ và tổng hợp giúp khám phá các biểu diễn dữ liệu và bất biến.

Vấn đề lớn nhất đối với sóng thô dựa trên mạng CNNs chính là lớp tích chập đầu tiên.

|![](/images/images_posts/intro2sincnet/capture_01.png)|
|:--:|
| Minh họa chuỗi giọng nói có số chiều rất lớn. Ảnh được lấy từ video A bref introduction to SincNet thực hiện bởi Giáo sư Mirco Ravanelli |

Ở lớp này, dữ liệu đầu vào là những chuỗi Speech/Audio có số chiều rất cao, ví dụ như: cứ mỗi giây thì ta lại có đến 16000 đặc trưng. Bằng những kỹ thuật thủ công ngày xưa như FBANKs hay MFCCs thì ta có thể giúp nó giảm xuống còn 4000 đặc trưng mỗi giây, nhưng như thế vẫn còn rất nhiều!

Những đặc trưng trong phổ tần số có thể nhận ra bằng mắt thường nhưng lại bị mất đi nếu chúng ta làm mịn chúng.

|![](/images/images_posts/intro2sincnet/perceptual_evidence.png)|
|:--:|
| Ảnh được lấy từ video A bref introduction to SincNet thực hiện bởi Giáo sư Mirco Ravanelli |

Không những gặp vấn đề về số chiều dữ liệu mà còn bị ảnh hưởng nhiều hơn bởi các vấn đề về sự biến mất độ dốc đạo hàm, đặc biệt là khi sử dụng các kiến trúc rất sâu.

|![](/images/images_posts/intro2sincnet/cnns_problems.png)|
|:--:|
| Ảnh được lấy từ video A bref introduction to SincNet thực hiện bởi Giáo sư Mirco Ravanelli |

|![](/images/images_posts/intro2sincnet/Vanishing-Gradients-in-DNN.png)|
|:--:|
| Vấn đề Vanishing Gradient trong Deep Neural Networks |

Ngoài ra, các bộ lọc CNNs thường có những hình dạng đa băng tần không hợp lý, để hiểu nó thì với mạng Neural là điều dễ dàng, nhưng với con người thì nó không có nhiều ý nghĩa trong việc thể hiện giọng nói.

|![](/images/images_posts/intro2sincnet/interpretability_problems.png)|
|:--:|
| Ảnh được lấy từ video A bref introduction to SincNet thực hiện bởi Giáo sư Mirco Ravanelli |

# Kiến trúc mạng SincNet

Với một CNN chuẩn, việc tích chập trong miền thời gian giữa input waveform và một số đáp ứng xung hữu hạn (Finite Impulse Response - FIR) được cho bởi công thức:

$$y[n] = x[n] * h[n] = \sum_{l=0}^{L-1}x[l].h[n-l]$$

Trong đó:
- $x[n]$: đoạn tín hiệu giọng nói
- $h[n]$: một mặt nạ ứng với chiều dài $L$
- $y[n]$: giá trị đầu ra

Trong khi đó, Sincnet thực hiện các phép tích chập của nó với hàm $g$, hàm này phụ thuộc vào một tham số $\theta$. Công thức như sau:

$$y[n] = x[n] * g[n, \theta]$$

Trong xử lý tín hiệu số, $g$ được định nghĩa như một filter-bank gồm các bộ lọc (filter) băng thông hình chữ nhật. Trong miền tần số, độ lớn của một bộ lọc băng thông tổng quát có thể được tính như hiệu số giữa 2 bộ lọc thông tần số thấp

Với $f_1$ $f_2$ lần lượt là tần số cắt thấp (low) và cao (high) đã được học, $rect(.)$ là hàm rectangular trong miền tần số.

$$G[f, f_1, f_2] = rect\left(\frac{f}{2f_2}\right) -  rect\left(\frac{f}{2f_1}\right)$$

Công thức trên đang ở trong miền tần số, để có thể trở lại miền thời gian được, ta sử dụng phép biến đổi Fourier Ngược

**Note**: Biến đổi Fourier cho hàm Rectangular

|![](/images/images_posts/intro2sincnet/rect_fourier.jpg)|
|:--:|
| Biến đổi Fourier cho hàm Rectangular |

$$x(t) = Arect(\frac{t}{\tau})$$

Biến đổi:

$$X(\omega) = \int_{-\infty}^{\infty} x(t)e^{-j \omega t}\;\mathrm{d}t
	$$

$$X(\omega) = \int_{-\frac{\tau}{2}}^{\frac{\tau}{2}} Ae^{-j \omega t}\;\mathrm{d}t
	= -\frac{2A}{\omega}\left[\frac{e^{-\frac{j \omega \tau}{2}} - e^{\frac{j \omega \tau}{2}}}{2j}\right]
	= \frac{2A}{\omega} \left[sin\left(\frac{\omega \tau}{2}\right)\right]
	= A\tau \left[\frac{sin(\frac{\omega \tau}{2})}{\frac{\omega \tau}{2}}\right]
	$$

Hàm $sinc$ được định nghĩa

$$sinc(x) = \frac{sin(x)}{x}$$

Theo đó:

$$X(\omega) = A\tau sinc\left(\frac{\omega \tau}{2}\right)$$

Áp dụng công thức:

$$G[f, f_1, f_2] = rect\left(\frac{f}{2f_2}\right) -  rect\left(\frac{f}{2f_1}\right)$$

Ta được hàm tham chiếu $g$

$$g[n, f_1, f_2] = 2f_2sinc(2\pi f_2 n) - 2f_1sinc(2\pi f_1 n)$$

Các tần số cắt (cut-off frequencies) có thể được khởi tạo một cách ngẫu nhiên trong khoảng $\left[0, \frac{f_2}{2}\right]$, trong đó $f_s$ là tần số mẫu của tín hiệu đầu vào.

Tần suất lấy mẫu có thể thay đổi theo loại dữ liệu chúng ta đang thử nghiệm. Hệ thống IVR có tần số lấy mẫu là 8Khz, trong khi hệ thống âm thanh nổi có tần số lấy mẫu là 44khz.

Chúng ta có thể khởi tạo các bộ lọc dựa trên các tần số cắt của bộ lọc mel-scale filter-bank. Ưu điểm chính của việc chỉ định bộ lọc theo cách này là nó có lợi thế là phân bổ trực tiếp nhiều bộ lọc hơn ở phần dưới của phổ có thông tin duy nhất về giọng nói của người nói.

Để đảm bảo $f1 \geq 0$ và $f_2 \geq f_1$, phương trình phía trên được cung cấp bởi các tham số sau:

$$f_{1}^{abs} = |f_1|$$

$$f_{2}^{abs} = f_1 + |f_2 - f_1| $$

Ở đây, không có giới hạn nào đối với $f_2$, tức là không có tác nhân nào tác động lên $f_2$ để nó có thể nhỏ hơn tần số Nyquist (tốc độ tối thiểu mà tín hiệu có thể được lấy mẫu mà không có lỗi, gấp đôi tần số cao nhất hiện có trong tín hiệu) như mô hình học điều này trong khi huấn luyện. Các lớp tiếp theo khác nhau quyết định mức độ quan trọng nhiều hơn hoặc ít hơn cho mỗi đầu ra bộ lọc.

Bộ lọc băng thông lý tưởng cần có vô số phần tử $L$. Một bộ lọc băng thông lý tưởng là nơi băng thông hoàn toàn phẳng và độ suy giảm trong băng thông dừng là vô hạn. Bất kỳ sự cắt ngắn nào của $g$ chắc chắn dẫn sẽ đến sự xấp xỉ của bộ lọc lý tưởng, được đặc trưng bởi các gợn sóng trong băng thông và suy giảm giới hạn dừng băng thông.

Vì vậy, giải pháp cửa sổ (windowing) được thực hiện để giải quyết vấn đề này. Nó được thực hiện chỉ bằng cách nhân hàm bị cắt ngắn $g$ với cửa sổ $w$, nhằm mục đích làm phẳng các điểm gián đoạn đột ngột ở cuối $g$

$$g_{w}\left[n, f_1, f_2\right] = g[n, f_1, f_2 . w[n]$$

Trong bài báo, tác giả sử dụng Hamming Window, được định nghĩa bởi công thức:

$$w[n] = 0.54 - 0.46.cos(\frac{2\pi n}{L})$$


Chúng ta có thể có được tính chọn lọc tần số cao với việc sử dụng cửa sổ Hamming. Chúng ta cũng có thể sử dụng các cửa sổ khác như Hann, Blackman, Kaiser window. Một lưu ý quan trọng ở đây là do tính đối xứng, các bộ lọc có thể được tính toán hiệu quả bằng cách xem xét một nửa bộ lọc và kế thừa kết quả cho nửa còn lại.

Tần số cắt của các bộ lọc có thể được tối ưu với các thông số CNN sử dụng Stochastic Gradient Descent (SGD) hoặc các phương pháp tối ưu Gradient khác. Như mô hình bên dưới, CNN pipeline (Pooling, Normalization, Activations, Dropout) có thể được sử dụng sau tích chập dựa trên Sinc Convolution đầu tiên. Multiple standard convolutional, fully-connehoặccted hoặc recurrent layers có thể đặt chồng lên ở giai đoạn sau đó để cuối cùng qua Softmax Classifier (Bộ phân lớp Softmax) để phân lớp giọng nói.

|![](/images/images_posts/intro2sincnet/SincNet.png)|
|:--:|
| Kiến trúc mạng SincNet |

# Đặc điểm mô hình mạng SincNet

## Tính hội tụ nhanh

Sincnet được thiết kế theo cách mà nó buộc mạng phải tập trung vào các thông số lọc ảnh hưởng đến tốc độ của nó. Phong cách kỹ thuật lọc này giúp thích ứng với dữ liệu trong khi nắm bắt được tri thức giống như kỹ thuật trích xuất đặc trưng trên dữ liệu âm thanh. Tiền tri thức này làm cho việc học các đặc tính của bộ lọc dễ dàng hơn nhiều, giúp SincNet hội tụ nhanh hơn đáng kể đến một giải pháp tốt hơn. Chúng ta có được sự hội tụ nhanh chóng trong vòng 10–15 epochs đầu tiên.

|![](/images/images_posts/intro2sincnet/fast_convergence.png)|
|:--:|
| Độ hội tụ của SincNet so với CNN |

## Tính hiệu quả

Do các hàm kernel $g(.)$ là đối xứng nên ta có thể thực hiện phép tích chập trên một phần filter và kế thừa kết quả này trên phần còn lại. Điều này sẽ tiết kiệm 50% việc tính toán.

|![](/images/images_posts/intro2sincnet/g_symmetric.png)|
|:--:|
| Tính hiệu quả của SincNet |

## Cần ít tham số cho việc huấn luyện mô hình

SincNet giảm đáng kể số lượng tham số trong lớp chập đầu tiên. Ví dụ: nếu chúng ta xem xét một lớp bao gồm các bộ lọc $F$ có độ dài $L$, một CNN tiêu chuẩn sử dụng các tham số $F * L$, so với $2F$ được SincNet xem xét. Nếu $F = 90$ và $L = 100$, chúng ta sử dụng $9000$ tham số cho CNN và chỉ $180$ cho SincNet. Hơn nữa, nếu chúng ta tăng gấp đôi độ dài bộ lọc $L$, một CNN chuẩn sẽ tăng gấp đôi số lượng tham số của nó (ví dụ: chúng ta đi từ $9000$ lên $18000$), trong khi SincNet có số lượng tham số không thay đổi (chỉ có hai tham số được sử dụng cho mỗi bộ lọc, bất kể độ dài $L$ của nó). Điều này cung cấp khả năng tạo ra các bộ lọc rất chọn lọc với nhiều lần nhấn, mà không thực sự thêm các tham số vào vấn đề tối ưu hóa. Hơn nữa, sự nhỏ gọn của kiến trúc SincNet làm cho nó phù hợp trong trường hợp ít mẫu.

## Tính giải nghĩa/ diễn giải

Các feature maps của SincNet sau khi thực hiện lớp tích chập đầu tiên rất dễ hiểu và con người có thể hiểu được so với những cách tiếp cận khác. Trên thực tế, các filter-bank chỉ phụ thuộc vào các tham số có ý nghĩa vật lý rõ ràng.

|![](/images/images_posts/intro2sincnet/interpretability.png)|
|:--:|
| Khả năng diễn giải của SincNet so với CNN |

|![](/images/images_posts/intro2sincnet/interpretability_2.png)|
|:--:|
| Khả năng diễn giải của SincNet so với CNN |

# Đối chiếu Convolution Neural Networks với SincNet

|![](/images/images_posts/intro2sincnet/cnn_filters_sincnet_filters.png)|
|:--:|
| Ví dụ về các bộ lọc được học bởi CNN tiêu chuẩn và bởi SincNet (sử dụng kho ngữ liệu Librispeech). Hàng đầu tiên thể hiện các bộ lọc trong miền thời gian, trong khi hàng thứ hai hiển thị phản hồi tần số cường độ của chúng. |

# Xây dựng thực nghiệm

## Kho ngữ liệu

Trong bài báo này, nhóm tác giả sử dụng hai tập ngữ liệu khá lớn đó là TIMIT (TIMIT Acoustic-Phonetic Continuous Speech Corpus) và LibriSpeech

Với TIMIT, ta có một kho ngữ liệu với 462 người nói, các khoảng không phải lời nói ở đầu và cuối mỗi câu đã bị xóa, những tập tin về nội dung câu nói của TIMIT cũng được loại bỏ. Sau khi tinh chỉnh toàn bộ dữ liệu, tác giả dùng 5 câu nói của mỗi người nói để huấn luyện, 3 câu nói của mỗi người nói dùng để kiểm tra.

Với tập ngữ liệu LibriSpeech, những phần với độ im lặng bên trong kéo dài hơn 125 ms được chia thành nhiều phần nhỏ. Việc chia tập huấn luyện (training set), tập kiểm tra (testing set) là ngẫu nhiên bằng cách chọn 12-15 giây dữ liệu huấn luyện của mỗi người nói và các câu kiểm tra kéo dài từ 2-6 giây.

## Xây dựng mô hình SincNet

ác sóng của mỗi câu nói được cắt thành những chunks khoảng 200ms (trong đó có 10 ms overlap) để có thể đưa vào mạng SincNet.

Lớp input thực hiện hàm sinc dựa trên tích chập (convolutional) như đã nói ở phần mô tả kiến trúc mạng SincNet. Với thông số, 80 filters, mỗi filter có kích thước $L = 251$, dùng LayerNorm cho cả input và output,không dùng BatchNorm, activation LeakyReLU, không DropOut.

Sau đó, kiến trúc sử dụng 2 CNNs chuẩn với 60 filters có kích thước $L = 5$, dùng LayerNorm cho cả input và output, không dùng BatchNorm, activation LeakyReLU, không DropOut.

Kế tiếp là 3 lớp fully-connected layer - Multi Layer Perceptron (MLP), 2048 node, dùng LayerNorm cho input, dùng BatchNorm cho output, activation LeakyReLU, không DropOut.

Lớp output, Multi Layer Perceptron (MLP), 462 class\_lay với TMIT hoặc class\_lay= 2484 với LibrisSpeech, không dùng LayerNorm hay BatchNorm, activation Softmax, không DropOut.

Quá trình huấn luyện dùng RMSprop optimizer với learning\_rate $lr = 0.001, \alpha = 0.95, \epsilon = 10^{-7}$, minibatches\_size = 128

Với hệ thống xác minh người nói, kế thừa từ speaker-id neural networks với hai cách tiếp cận cài đặt. Thứ nhất, chúng ta xem xét d-vector framework, dựa vào đầu ra của lớp ẩn cuối cùng và tính toán khoảng cách cosin giữa các d-vectors thử nghiệm và mẫu cần kiểm thử. Cách thay thế thứ hai (được biểu thị ở phần sau là DNN-class), hệ thống xác minh người nói có thể trực tiếp lấy điểm sau softmax tương ứng với danh tính được xác minh.

# Các kết quả

## Phân tích các bộ lọc

|![](/images/images_posts/intro2sincnet/cnn_filters_sincnet_filters.png)|
|:--:|
| Ví dụ về các bộ lọc được học bởi CNN tiêu chuẩn và bởi SincNet (sử dụng kho ngữ liệu Librispeech). Hàng đầu tiên thể hiện các bộ lọc trong miền thời gian, trong khi hàng thứ hai hiển thị phản hồi tần số cường độ của chúng. |

Hình bên trên là sự so sánh mà nhóm tác giả đã dẫn chứng trong bài báo về cách mà một CNN (hình a) và SincNet (hình b) học từ filter như thế nào. Đây là những kết quả thực hiện trên tập dữ liệu LibriSpeech, tần số phản hồi biểu diễn từ 0 đến 4kHz. Ở trường hợp CNN, nó không luôn luôn học từ filter, bằng chứng là những đường tần số không đều, chứa đầy nhiễu (filter đầu tiên). Trong khi đó, với SincNet Filters, ta thu được những hình ảnh đều đặng hơn về tần số, có sự "đối xứng" xuất hiện ở miền thời gian, hình dạng trên miền tần số giống như hình chữ nhật, nó dường như có ý nghĩa hơn.

Ngoài việc kiểm tra định tính, điều quan trọng là phải làm nổi bật dải tần nào được bao phủ bởi các bộ lọc đã học.

|![](/images/images_posts/intro2sincnet/filter_analysis.png)|
|:--:|
| Bảng kết quả SicNet trong tác vụ nhận dạng giọng nói - SI |

Hình 3 cho thấy đáp ứng tần số tích lũy của các bộ lọc được học bởi SincNet và CNN. Điều thú vị là có ba đỉnh chính nổi bật rõ ràng với biểu đồ SincNet (xem đường màu đỏ trong hình). Âm đầu tiên tương ứng với vùng cao độ (cao độ trung bình là 133 Hz đối với nam và 234 đối với nữ). Đỉnh thứ hai (nằm gần đúng ở tần số 500 Hz) chủ yếu thu nhận các định dạng đầu tiên, có giá trị trung bình so với các nguyên âm tiếng Anh khác nhau thực sự là 500 Hz. Cuối cùng, đỉnh thứ ba (dao động từ 900 đến 1400 Hz) nắm bắt một số định dạng thứ hai quan trọng, chẳng hạn như định dạng thứ hai của nguyên âm /a/ có vị trí trung bình ở tần số 1100 Hz. Cấu hình tập các bộ lọc này chỉ ra rằng SincNet đã điều chỉnh thành công các đặc điểm của nó để giải quyết vấn đề nhận dạng người nói. Ngược lại, với CNN không thể hiện một mô hình có ý nghĩa như vậy: các bộ lọc CNN có xu hướng tập trung chính xác vào phần dưới của phổ tần số, nhưng các đỉnh được điều chỉnh trên các công thức thứ nhất và thứ hai không xuất hiện rõ ràng. Như mọi người có thể quan sát từ Hình 3, đường cong CNN đứng trên đường SincNet. Trên thực tế, SincNet học từ các bộ lọc trung bình chọn lọc hơn các bộ lọc của CNN, có thể nắm bắt đặc trưng có dải tần hẹp tốt hơn.

## Tác vụ định danh người nói - Speaker Identification

|![](/images/images_posts/intro2sincnet/performance_speaker_identification.png)|
|:--:|
| Bảng kết quả SicNet trong tác vụ nhận dạng giọng nói - SI |

Bảng trên đây là một bảng báo cáo về tỉ lệ phân lớp lỗi (Classification Error Rates - CER\%), khi thực nghiệm SincNet cùng với số kỹ thuật khác như DNN-MFCC, CNN-FBANK, CNN-Raw trên hai tập dữ liệu TIMIT và LibriSpeech. Nhìn chung, SincNet luôn dẫn đầu về độ lỗi tốt (có độ lỗi thấp nhất). Độ lỗi của CNN-Raw thật sự lớn khi tiến hành với tập TIMIT, điều này cho thấy SincNet của chúng ta hoạt động tốt ngay cả khi có không lớn dữ liệu huấn luyện có sẵn. Khi huấn luyện với LibriSpeech, độ lỗi CNN-Raw giảm xuống, chúng ta có 4% độ lỗi được giảm xuống, điều này cho thấy tốc độ hội tụ của SincNet cải thiện rõ ràng (1200 và 1800 epochs). Với DNN-MFCC, CNN-FBANK, hai kỹ thuật này hoạt động tốt trên TIMIT (vì đơn giản là TIMIT không lớn cho lắm như LibriSpeech), khi sang LibriSpeech, chúng có vẻ mất đi tính ổn định, độ lỗi cao lên.

## Tác vụ xác minh người nói - Speaker Verification

|![](/images/images_posts/intro2sincnet/performance_speaker_verification.png)|
|:--:|
| Bảng kết quả SicNet trong tác vụ xác minh giọng nói - SV |

Thử nghiệm cuối cùng mà nhóm tác giả trình bày ở trong bài báo là tác vụ xác minh giọng nói - Speaker Verification} Bảng dưới đây, được trích ra trong bài báo, báo cáo về chỉ số Equal Error Rate (EER%) khi thực nghiệm trên tập LibriSpeech.

Tất cả các mô hình DNN đều cho thấy hiệu suất đầy hứa hẹn, các chỉ EER thấp hơn 1% trong mọi trường hợp. Bảng cũng cho thấy rằng SincNet lại một lần nữa hoạt động tốt hơn các mô hình khác, cho thấy sự cải thiện hiệu suất tương đối khoảng 11% so với mô hình CNN. Các mô hình lớp DNN hoạt động tốt hơn đáng kể so với các d-vector. Bất chấp hiệu quả của cách tiếp cận sau này, một mô hình DNN mới phải được huấn luyện (hoặc tinh chỉnh) cho mỗi người nói mới được thêm vào nhóm. Điều này làm cho cách tiếp cận này hoạt động tốt hơn, nhưng kém linh hoạt hơn so với d-vector.

Để hoàn thiện hơn, nhóm tác giả cũng tiến hành các thí nghiệm khác với các i-vector tiêu chuẩn. Tuy nhiên so sánh chi tiết với kỹ thuật này nằm ngoài phạm vi của bài báo nên nhóm tác giả chỉ nêu ra những điểm đáng chú ý nhất trong kết quả. Hệ thống i-vector tốt nhất của nhóm tác giả đạt được EER = 1,1\%, khá xa so với những gì đạt được với hệ thống DNN. Tài liệu nổi tiếng rằng i-vector cung cấp hiệu suất cạnh tranh khi sử dụng nhiều dữ liệu huấn luyện hơn cho mỗi người nói và khi các câu kiểm tra dài hơn được sử dụng. Trong các điều kiện thách thức phải đối mặt trong công việc này, mạng neural đạt được khả năng tổng quát hóa tốt hơn.

# Những nhận xét về SincNet:

- Cơ sở lý thuyết Toán học vững vàng: Kỹ thuật band-pass filter, Window trong Xử lý tín hiệu số.
- Tính toán nhanh và gọn nhẹ: Như đã nói, đây là một đặc điểm của SincNet nhờ vào dùng ít tham số, kernel đối xứng.
- Kết hợp với Deep Learning một cách hiệu quả.
- Sử dùng DNN-Class trong đánh giá, cho kết quả đầy hứa hẹn, có độ lỗi EER thấp
- Nhưng vẫn có hạn chế: DNN-class tuy có EER thấp nhưng đánh đổi nhiều sự linh hoạt so với d-vectors

# Tài liệu tham khảo

- \[1\] Mirco Ravanelli. A brief introduction to sincnet, 2018.
- \[2\] Mirco Ravanelli and Yoshua Bengio. Speaker recognition from raw waveform with sincnet, 2019.
- \[3\] Dávid Sztahó, György Szaszák, and András Beke. Deep learning methods in speaker recognition: a review, 2019.
