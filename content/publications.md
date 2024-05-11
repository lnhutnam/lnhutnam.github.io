+++
title = "Publications"
description = "Researching"
date = "2023-08-19"
aliases = ["publication","publication-lnnam"]
author = "Le, Nhut-Nam"
+++

Thesises
---

### Graduate

Updating...

### Undergraduate

[*] Phan Anh-Hao, Le Nhut-Nam, Link prediction on knowledge graphs based-on Convolutional Neural Networks, Faculty of Information Technology, University of Science, Vietnam National University, Ho Chi Minh City, 07/2022

<details><summary style="color:#7C4700">Abstract</summary>
  <font color = "7C4700">
    The modernisation of the globe and the growth of human knowledge have
    both been facilitated by the development of technology in various disciplines. This
    information is preserved through a variety of store tools, including books, notebooks,
    movies, and is currently preserved on several computers and the internet. A data
    structure called knowledge graph is used to represent this knowledge information as
    a collection of things connected by relationships. In 2012, Google has implemented
    and created this structure to best store and utilize this data in their search engine. As
    a result, this thesis provides an overview of association prediction problems as well
    as knowledge graphs, approaches, and applications. Translation-distance geometry,
    semantic matching, and artificial neural network-based techniques are the three main
    strategies mentioned. The adaptive convolution in ConvR model and recalibration mechanism, were
    used to build the proposed ACRM model, a method based on convolutional neural
    networks, to tackle the link prediction problem. The model addressed the issue that
    channels using the local receptacle field were unable to use context information from
    outside the local receptacle. When compared to the baseline models, the
    experimental results demonstrate that many common datasets have improved. To
    improve performance on the link prediction problem, there are a number of flaws in
    the proposed model that should be enhanced and improved in the future research
    directions.
  </font>
</details>

2022
---

### Conference Publications

[1] Le, Thanh, Nam Le, and Bac Le. "[Embedding Model with Attention over Convolution Kernels and Dynamic Mapping Matrix for Link Prediction.](https://link.springer.com/chapter/10.1007/978-3-031-21743-2_19)" In Asian Conference on Intelligent Information and Database Systems, pp. 234-246. Springer, Cham, 2022.

<details><summary style="color:#7C4700">Abstract</summary>
  <font color = "7C4700">
    Knowledge Graph Completion, especially its sub-task link prediction attracts the attention of the research community and industry because of its applicability as a premise for developing several potential applications. Knowledge graph embedding (KGE) shows promising results to solve this problem. This paper focuses on the neural networks-based approach for KGE, which can extract features from the graphs better than other groups of embedding methods. The ConvE model is the first work using 2D convolution over embeddings and stacking multiple nonlinear feature layers to model knowledge graphs. However, its computation is inefficient and does not preserve translation between entity and relation embedding. Therefore, dynamic convolution was designed to solve limited representation capability issues and show the promised performance. This work introduces a mixture model that incorporates attention into performing the convolutional operation on projection embeddings. The TransD idea is used to project entity embedding from entity space to relation space. Then, it is stacked with relation embedding to perform dynamic convolution over stacked embedding without reshaping, following the idea that comes from Conv-TransE. So the translational property between the entity and the relation is preserved, and their diversity is considered. We experimented on benchmark datasets and showed how our proposed model is better than baseline models in terms of MR, MRR, and Hits@K. 
  </font>
</details>

### Journal Publications

[1] Le, Thanh, Nam Le, and Bac Le. "[Knowledge graph embedding by relational rotation and complex convolution for link prediction.](https://www.sciencedirect.com/science/article/abs/pii/S0957417422021406)" Expert Systems with Applications 214 (2023): 119122.

<details><summary style="color:#7C4700">Abstract</summary>
  <font color = "7C4700">
      Knowledge graphs are organized as triplets to represent facts from the real world and play an important role in various intelligent information systems. 
      Because knowledge graphs are frequently constructed using manual or semi-automatic methods, they often miss connections between entities. 
      Link prediction was created to solve this problem. Many recent state-of-the-art studies, such as those introducing the RotatE and RotatHS models, 
      have advocated for rotation transformations with entity and relation embeddings in complex vector spaces. However, using only rotation planes means
      that these models do not have the expressive power of models based on neural networks, such as the ConvE and the ConvR models. As a result, link prediction
      performance suffers. To address these shortcomings, this paper proposes the ConvRot model, which integrates a 2D convolution. Specifically, we perform
      convolution on embeddings of entities and relations to obtain support vector embeddings. These vectors are then integrated into an element-wise rotation
      from the head entity to the tail entity using the Hadamard product, enabling the model to capture local interactions among entities and relations through
      the neural network while still ensuring intuitiveness through a roto-transformation in the link prediction. In addition, we present two strategies for
      designing the complex convolution module and show their effects on model performance. The proposed method is evaluated on standard benchmark datasets
      and achieves significantly improved results on MRR and Hits@K (K = 1, 3, 10). Overall, our model’s link prediction performance is superior by approximately
      5–7 %. Moreover, the ConvRot model is also considered separately on many relation types, such as one-to-one, one-to-many, many-to-one, and many-to-many. 
      Finally, we prove that type constraints can help increase the model’s overall performance, especially on complex and large datasets.
  </font>
</details>