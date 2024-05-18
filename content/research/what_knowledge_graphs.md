+++
author = "Le, Nhut Nam"
title = "Đồ thị tri thức thực sự là gì? - What're actually knowledge graphs?"
url = '/research/what_knowledge_graphs'
date = "2023-10-26"
tags = [
    "knowledge graphs", "knowledge model", "ontology"
]
toc = true
+++

Trong lĩnh vực nghiên cứu đặc trưng tri thức (knowledge representation) và suy diễn (reasoning), tích hợp/ tổng hợp dữ liệu là một tác vụ quan trọng, và nó thường được thực hiện bằng cách sử dụng các cơ sở tri thức (knowledge bases). Có nhiều loại cơ sở tri thức, trong đó có đồ thị tri thức (knowledge graphs). 

Đồ thị tri thức được tạo ra bằng cách sử dụng một mô hình tri thức (knowledge model), đó là một mô hình dữ liệu cấu trúc hóa dạng đồ thị (graph-structured data model) hay còn được gọi là **ontology**. Đó là lý do tại sao nói, mô hình tri thức là trái tim của đồ thị tri thức.

Thông thường, đồ thị tri thức thường được sử dụng để mà lưu trữ những mô tả có liên kết nội tại (interlinked descriptions) của các thực thể (entities) bao gồm đối tượng (objects), sự kiện (events), tình huống (situations) hay những khái niệm trừu tượng (abstract concepts).

Các mô tả bên trong đồ thị đều có thông tin ngữ nghĩa (formal sematic) được mã hóa cho phép có thể được sử dụng để làm cơ sở cho việc tương tác người-máy để xử lý theo cách hiệu quả và tránh nhập nhằng. Hơn nữa, chúng cũng đóng góp cho những mô tả khác, hình thành nên một mạng lưới (network) mà trong đó mỗi thực thể thể hiện một phần của mô tả của những thực thể có liên hệ đến nó. Và dựa vào mô hình tri thức, tính đa dạng dữ liệu cũng được liên kết giữa các thành phần trong đồ thị và được mô tả thông qua semantic metadata.

![](https://miro.medium.com/v2/resize:fit:1061/1*OIgEwADf5ZD2ib_9ejZ-zw.png)

## Lịch sử hình thành

Vào những năm 1972, thuật ngữ "Đồ thị tri thức" hay "Knowledge graphs" được nhà ngôn ngữ học người Australia, Edgar W. Schneider đề ra trong một thảo luận về cách thức xây dựng một hệ thống giảng dạy module hóa (modular instructional systems for courses). Và đến mãi cuối những năm 1980, University of Groningen và University of Twente đã hợp tác trong một dự án gọi là Knowledge Graphs với mục tiêu tập trung vào thiết kế các mạng ngữ nghĩa (semantic networks) với những cạnh giới hạn trong một tập quan hệ hữu hạn để mà tạo điều kiện thuận lợi cho nghiên cứu đại số trên đồ thị. Theo đó trong những thập kỉ tiếp theo, khoảng cách giữa semantic networks và knowledge graphs trở nên mờ hẳn đi.

Những đồ thị tri thức đầu tiên là những cơ sở tri thức trong một miền tri thức cụ thể. Vào năm 1985, cơ sở dữ liệu WordNet được hình thành, nắm bắt các quan hệ ngữ nghĩa giữa các từ và ý nghĩa của chúng. Vào năm 2005, Marc Wirk sáng lập Geonames, nắm bắt các quan hệ giữa những tên gọi địa lý và vị trí và những thực thể được liên kết. Đến năm 1998, Andrew Edmonds of Science - Finance Ltd ở Anh, tạo ra một hệ thống gọi là ThinkBase sử dụng logic mờ (fuzzy-logic) dựa trên suy diễn trong ngữ cảnh trực quan (graphical context).

Đến năm 2007, lần lượt cả DBpedia và Freebase được hình thành và công bố như các cơ sở tri thức dạng đồ thị (graph-based knowledge bases) cho mục tiêu tổng quát hóa tri thức. DBpedia tập trung vào những dữ liệu được rút trích từ Wikipedia, trong khi Freebase tổng hợp một lượng lớn các tập dữ liệu công khai. Tuy nhiên cả hai không tự gọi chúng là "knowledge graphs".

Đến năm 2012, Google giới thiệu đồ thị tri thức của họ, Google Knowledge Graphs, được xây dựng trên DBpedia và Freebase cùng với một lượng lớn các nguồn dữ liệu khác. Sau đó, họ tích hợp các nội dung được rút trích như RDFa, Microdara, JSON-LD từ các web pages, CIA World Factbook, Wikidata, và Wikipedia. Các loại thực thể và mối quan hệ liên kết trong đồ thị tri thức này đã được tổ chức thêm bằng cách sử dụng các thuật ngữ từ bộ tự vựng schema.org. 

![](https://www.researchgate.net/publication/356140196/figure/fig2/AS:1089072500097059@1636666526420/Development-history-of-the-knowledge-graph.jpg)


## Định nghĩa

Như ta đã biết, một cơ sở tri thức là một tập dữ liệu cụ thể mà thể hiện những dữ liệu thế giới thực và các quan hệ ngữa nghĩa trong dạng các bộ ba (triplets). Khi mà những bộ ba được thể hiện như một đồ thị với các cạnh là những quan hệ và các nút là những thự thể, nó được xem là đồ thị tri thức. Một cách tổng quát, đồ thị tri thức và cơ sở tri thức được xem là giống nhau về mặt khái niệm và có thể thay thế được cho nhau.

Vậy, một đồ thị tri thức thực sự là gì?

Không có một định nghĩa được chấp nhận. Hầu hết chúng đều dựa trên góc nhìn từ semantic web và bao gồm những đặc trưng chính:
- Flexible relations among knowledge in topical domains: Một đồ thị tri thức
    - định nghĩa các lớp trừu tượng, và các quan hệ của những thực thể trong một lược đồ (schema),
    - mô tả chủ yếu những thực thể thế giới thực và các quan hệ nội tại giữa chúng trong tổ chức cấu trúc dữ liệu đồ thị,
    - cho phép bất kỳ thực thể nào có quan hệ tiềm năng với những thực thể khác,
    - bao quát đa dạng miền tri thức
- General structure: một mạng lưới các thực thể, những loại ngữ nghĩa, thuộc tính, và các mối quan hệ. 
- Supporting reasoning over inferred ontologies: đồ thị tri thức thu thập và tích hợp thông tin vào một ontology và áp dụng bộ suy luận để rút ra kiến thức mới.

Tuy nhiên, có nhiều đặc trưng đồ thị tri thức không thật sự cần thiết và liên quan với nhau trong một số tình huống. Có thể hiểu đơn giản hơn:
- Đồ thị tri thức là một cấu trúc số hóa mà thể hiện tri thức như các khái niệm và quan hệ giữa chúng (dữ kiện).

## Đặc trưng cốt lỗi của đồ thị tri thức

Các đồ thị tri thức kết hợp nhiều tính chất của nhiều mô hình quản lý dữ liệu như:
- Cơ sở dữ liệu (database) $\rightarrow$ dữ liệu có thể được khai phá thông qua các truy vấn được cấu trúc hóa (structured queries)
- Cấu trúc dữ liệu đồ thị (graph) $\rightarrow$ dữ liệu có thể được phân tích như cấu trúc dữ liệu mạng, đồ thị
- Cơ sở tri thức (knowledge base) $\rightarrow$ dữ liệu mang trong nó các thông tin ngữ nghĩa hình thức, có thể được sử dụng cho các tác vụ tích hợp và suy diễn.

Thông thường, các đồ thị tri thức được thể hiện trong Resource Description Framework (RDF), nó cho phép thực thi tích hợp (integration), thống nhất (unification), liên kết (linking), và tái sử dụng (reuse) bởi vì nó có đặc điểm:
- Tính biểu diễn (expressivity) vì khả năng thể hiện hiệu quả nhiều loại dữ liệu và nội dung.
- Hiệu suất (performance) cao khi có thể xử lý hàng tỉ dữ kiện và thuộc tính.
- Có khả năng tương tác (interoperability) giữa người và máy nhờ cho phép truy vấn thông qua SPARQL Protocol, quản lý nhờ vào SPARQL Store, và cộng tác (federation).
- Có tính tiêu chuẩn hóa thông qua quá trình W3C.

## Bản thể luận (ontologies) và ngữ nghĩa hình thức (formal semantics)

Bản thể luận (ontologies) là xương sống của ngữ nghĩa hình thức (formal semantics) của một đồ thị tri thứ. Nó còn gọi là một lược đồ của dồ thị. Nó là mối liên hệ giữa các developers của một đồ thị tri thức và mong muốn của người dùng về ý nghĩa của dữ liệu bên trong đồ thị.

Một người dùng có thể là con người hoặc một phần mềm mà muốn tích hợp dữ liệu theo một cách đáng tin cậy và chính xác. Các bản thể luận đảm bảo hiểu đúng đắn về dữ liệu và ý nghĩa của nó.

Khi các ngữ nghĩa hình thức (formal semantics) được sử dụng để khai triển và tích hợp dữ liệu của đồ thị tri thức, một số chỉ dẫn cần được đề ra:
- Lớp (classes)
- Loại quan hệ (relationship types)
- Loại (categories)
- Mô tả phi ngữ cảnh (free context descriptions)

## Thế nào là KHÔNG PHẢI LÀ đồ thị tri thức?

**Không phải mọi đồ thị RDF là một đồ thị tri thức**. Cụ thể, một tập hợp dữ liệu thống kế, ví dụ như dữ liệu GDP của các quốc gia được thể hiện trong một RDF thì không phải một đồ thị tri thức. Một đồ thị thể hiện dữ liệu thường thì hữu ích, nhưng nó có thể không thật sự cần thiết để nắm bắt tri thức ngữ nghĩa của dữ liệu. Nó có thể hợp lý cho một ứng dụng chỉ cần có một chuỗi "Italy" liên kết với một chuỗi "GDP" và một con số "1 tỷ" mà không cần phải định nghĩa quốc gia nào hay GDP "Gross Domestic Product" của một quốc gia là gì? **Đó là những liên kết và cấu trúc đồ thị tạo nên đồ thị tri thức**, không phải do ngôn ngữ dùng để thể hiện dữ liệu.

**Không phải mọi cơ sở tri thức là một đồ thị tri thức**. Một đặc trưng cốt lõi của một đồ thị tri thức là những mô tả thực thể nên được liên kết nội tại với một thực thể khác. Điều này định nghĩa một thực thể liên kết với một thực thể khác. Và liên kết đó là cách mà đồ thị hình thành, ví dụ A là B mà B là C và C có D thì A có D. Cơ sở tri thức mà không có cấu trúc hình thức và ngữ nghĩa như cơ sở tri thức hỏi đáp về một domain nào đó thì không phải là một đồ thị tri thức. Nó hoàn toàn khả thi để có một hệ thống chuyên gia mà có một tập dữ liệu được tổ chức mà không phải ở dạng đồ thị như một tập các luật "if-then".

## Đồ thị tri thức lớn

**Google Knowledge Graph**

![](https://www.ithinkanidea.com/wp-content/uploads/elementor/thumbs/Google-Knowledge-Graph-A-Complete-Guide-ojcy4q42vke5n0bu8gvbn4scrm1f53irumek7ggknc.jpg)

**DBpedia**

![](https://pbs.twimg.com/media/DzH7AhvX4AAhhev.jpg)

**Geonames**

![](https://techcrunch.com/wp-content/uploads/2007/05/geonames.png)

**Wordnet**

![](https://upload.wikimedia.org/wikipedia/commons/b/b8/WordNet.PNG)

**FactForge**

![](https://www.ontotext.com/wp-content/uploads/2016/09/FactForge_header1-1024x530.png)


## Tham khảo

[1] [What is a knowledge graphs?](https://www.ontotext.com/knowledgehub/fundamentals/what-is-a-knowledge-graph/), https://www.ontotext.com/knowledgehub/fundamentals/what-is-a-knowledge-graph/
