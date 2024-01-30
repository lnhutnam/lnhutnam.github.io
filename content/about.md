+++
title = "About"
description = "Wandering on Graph World."
date = "2023-08-19"
aliases = ["about","about-lnnam","contact"]
author = "Le, Nhut-Nam"
+++

## Preface

<img src="/images/avt/114420940_p0.jpg" alt="avt"
style="float:left; width:30%; height:30%; padding-right:10px; border-radius: 50%;">

I am currently graduated student in Computer Sciences and Applied Mathematics (Double Master Programmes) at <a href="https://en.hcmus.edu.vn/" target="_blank">University of Science, Vietnam National University, HCMC</a>.

Before joining graduated program, I received Bachelor’s Degree in Computer Science and was fortunate to be advised by <a href="https://www.fit.hcmus.edu.vn/~lnthanh/">Thanh Le</a>.

My main research field is graph mining, especially knowledge graph completion. Furthermore, I also have a huge interest in theoretical computer science and mathematics.

My favoriate quote:
> "Complete disorder is impossible", Theodore S. Motzkin, Israeli-American mathematician, 1908 - 1970

For contact information: <a href="../files/CV.pdf" target="_blank" type="application/pdf">Curriculum Vitae </a>; <a href="https://dblp.org/pid/188/7634-4.html"> Dblp</a>; <a href="https://scholar.google.com/citations?user=Vw1yV3YAAAAJ&hl=en&authuser=2"> Google Scholar</a>; <a href="https://github.com/lnhutnam"> Github</a>; <a href="mailto:nam.lnhut@gmail.com"> nam [dot] lnhut [at] gmail [dot] com</a>

Me on social networks: <a rel="me" href="https://mathstodon.xyz/@namln">Mastodon</a>, <a href="https://twitter.com/lnhutnam">Twitter</a>


Current research topics:
- Link prediction on (static) knowledge graphs
- Temporal knowledge graph completion & reasoning
- Object detection algorithms (YOLO, Faster-RCNN), Tracking Algorithms.

Current research projects:
- [Project: Wandering on Graphs]({{< relref "n2l" >}})

## Contents

In this site, I maintain some kind of works on his research things, good news and bad news from his own life. Currently, I am writting/ maintancing:
- [Mathematics]({{< relref "mathematics" >}})
- [Research projects related to Graphs & its applications]({{< relref "n2l" >}})
- [Collection of favoriate quotes]({{< relref "quotations" >}})
- [Randomized photography]({{< relref "photography" >}})
- [Useful resource sharing]({{< relref "resources" >}})


## Copyrights and licensing

This site is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License. And theme which use for this site is under MIT LICENSE.

This blog site is dedicated to sharing knowledge about graph and math. You are free to use and share the content on this site for personal or educational purposes, as long as you give proper credit to the original authors. The source code of this site is licensed under the MIT License, which means you can modify and distribute it as you wish, provided that you include the original license notice. However, please note that the content of this site is not intended for commercial use, and you should not sell or profit from it in any way. If you want to use this for educational or scholarly purposes, you can do so without any charge (but please let the author knows in advance); if you want to use this for business purposes, you can do so for a small fee. Please contact and discuss clearly what you plan to do with this with the author, and the final decision will be made after that.


## News

This part will be updated with both good news, bad news and all kinds of news.

- [01/07/2023] IPCV Project: Segmentation & classification problems in medical image processing systems.
> Survey presentation (Vietnamese): <a href="https://drive.google.com/file/d/1Ff0JYtYSZGTJm-4ASPaFTafkTwLUhjF-/view?usp=drive_link" target="_blank">[Slide]</a>
> Transformer go for Medical Segmentation and Classification (English): <a href="https://drive.google.com/file/d/1f8PwHU3NQdRgg5KeDShIgu58nMaYjg_Z/view?usp=sharing" target="_blank">[Slide]</a>
- [01/04/2023] Project: <a href="https://github.com/m32us/ReMethods" target="_blank">Layer-wise Relevance Propagation in PyTorch with Mixed-Precision Training</a>. 
<details><summary style="color:#7C4700">Project summary</summary>
        <font color = "7C4700">
            Implementation of unsupervised layer-wise relevance propagation (LRP; Bach et al.; Montavon et al.) in PyTorch with mixed-precision training for VGG networks from scratch. 
            <a href="https://git.tu-berlin.de/gmontavon/lrp-tutorial" target="_blank">This tutorial</a> served as a starting point. In this implementation, we provide a study about layer-wise relevance propagation from our master's course (HCMUS Master Course: Research Methodologies) and a framework that is easy to understand for PyTorch users.
            In this repository, we apply a novel relevance propagation filter to this implementation, resulting in much crisper heatmaps than could be found in <a href="https://kaifishr.github.io/" target="_blank">Fischer Kai's blogs</a>.
            We provide two strategies for training your network: normal training - like you learned in school, and mixed precision training for training your network from scratch. 
            Furthermore, we use layer-wise propagation to help us identify input features that were relevant for the network’s classification decision. 
            Almost all the source code is available in <a href="https://github.com/kaifishr/PyTorchRelevancePropagation" target="_blank">Layer-wise Relevance Propagation in PyTorch </a> by Fischer, Kai. For producing experiment results, 
            we use a GTX 1050 Nvidia graphics card. The FPS can be improved with a stronger graphics card. <a href="https://drive.google.com/file/d/1znNLRTkMRDTEG3gvXXOYWbPBjsdbtc5I/view?usp=share_link" target="_blank">[Slide]</a><a href="https://drive.google.com/file/d/1EAH9UoXMQ3VofE6dHrAMNyae_xZ2NI4d/view?usp=share_link" target="_blank">[Report]</a><a href="https://drive.google.com/file/d/1LIM_pwAJocEF3cZsVyskLxkYHbWAsrGq/view?usp=share_link" target="_blank">[Proposal]</a>
        </font>
    </details>
- [01/04/2023] Project: <a href="https://github.com/m32us/RL4MRD" target="_blank">Quasi-Hyperbolic Momentum Optimization for Multi-hop Knowledge Graph Reasoning based on Fourier-Knowledge Graph Embedding & Reinforcement Learning</a>. 
<details><summary style="color:#7C4700">Project summary</summary>
        <font color = "7C4700">
            Entities in this world can be organized into a graph whose relationships between entities of these different types can be edges of different types. That is the knowledge graph. 
            Knowledge Graph data can never be perfect. Currently, there are many proposed methods for trying to refine or uncover unseen facts or latent relatioships within this kind of data. 
            One of the current approaches to this problem is multi-hop knowledge graph reasoning. The implementation of this method can be represented as a serialized decision problem, and can be solved by reinforcement learning. 
            Building on recently published work, RL-based multi-hop KG reasoning model Path Additional Action space Ranking (PAAR), in this technical report we propose an improved model for PAAR based on on Fourier-Knowledge Graph 
            Embeddig and optimize for more efficient learning of embeddings through Quasi-hyperbolic momentum and Adam methods. To add more useful embeddings, Fourier-KGE vectors are added to the state space and help to improve state 
            space representation. Similar to PAAR, we solve the reward sparsity problem in reinforcement learning by using Fourier-KGE's score function as a soft-reward. The experimental results are reported in tabular form based on 
            experimental data sets and re-experimented the results of the original paper.
        </font>
    </details>
- [01/04/2023] Graph Partition Algorithms open-source project. I and my co-worker Tran X. Loc, Nguyen B. Long implement some popular graph partition algorithms such as Breadth First Search (BFS), Kerninghan-Lin (KL) algorithm, Fiduccia-Mattheyses (FM) algorithm, and Spectral Bisection.
<details><summary style="color:#7C4700">Project summary</summary>
        <font color = "7C4700">
            Graph partitioning is the process of dividing a graph into multiple subgraphs or partitions, such that each subgraph is connected and has a certain desirable property, such as balanced size or minimal cut size. 
            Although it is a challenging problem, finding a partition that makes graph analysis easier has applications in scientific computing. In this project, we provide a Python programming language implementation for a few well-known graph partitioning techniques.
        </font>
    </details>
- [04/11/2022] As co-authors of the article <b>"Knowledge Graph Embedding by Relational Rotation and Complex Convolution for Link Prediction"</b>, we are happy to hear that our final version, which includes full bibliographic details, is now available online. Furthermore, Expert Systems with Applications provides a Share Link, a personalized URL that provides 50 days of free access to the article, to assist other authors in accessing and sharing our work. Anyone who clicks on this link before December 23, 2022, will be directed to the final version of your article on ScienceDirect, which they may read or download. There is no need to sign up, register, or pay any fees. <a href="https://authors.elsevier.com/c/1g14O3PiGTLsCU" target="_blank">https://authors.elsevier.com/c/1g14O3PiGTLsCU</a>

- [21/10/2022] Our paper <b>"Knowledge Graph Embedding by Relational Rotation and Complex Convolution for Link Prediction"</b>. Thanh Le, <b>Nam Le</b> and Bac Le. Accepted at <i>Journal Expert Systems With Applications</i> (Impact Factor of 8.665, CiteScore of 12.20)
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
- [10/08/2022] [Deep Learning Course - Master K31] [Semniar Project Kaggle AI4Code] <b>Optimization Techniques for Transformers</b>. Presenter: <b>LE, Nhut Nam</b>. <a href="{{ site.baseurl }}/files/AI4Code_Seminar-1.pdf" target="_blank">[Slides]</a>
<details><summary style="color:#7C4700">Project summary</summary>
        <font color = "7C4700">
           We provide a strategy which improve the training time, and inference time for understand code in Jupyter Notebook. We combine many techniques such as Gradient Accumulation, Automatic Mixed Precision Training, 8-bit Optimizers - 8-bit Adam/AdamW Optimizer, and Fast Tokenizers. 
           Source code is available on <a href="https://github.com/a2do/ai4code-optimization-techniques" target="_blank">Github</a>
        </font>
    </details>

- [07/08/2022] [Applied in Machine Learning - Master K31] <b>Optimization Methods and Regularization</b>. 
<details><summary style="color:#7C4700">Project summary</summary>
        <font color = "7C4700">
           Some basic optimization method for ML was presented such as Gradient Descent with Momentum, Gradient Desent with Nesterov Accelerated Gradient; Optimization Experiment on Beale function for Gradient Desent Variants and Beyond (AdaGrad, AdaDelta, RMSProp, Adam); Second-Order Optimization Method (Newton's Method; Secant's Method and Quasi Newton Method) by <b>LE, Nhut-Nam</b>. <a href="{{ site.baseurl }}/files/HocMayUngDung-Slides-Presentation.pdf" target="_blank">[Slides]</a><a href="{{ site.baseurl }}/files/HocMayUngDung-FullReport.pdf" target="_blank">[Report]</a>
        </font>
    </details>


- [07/08/2022] [Deep Learning Course - Master K31] <b>Knowledge Embedding Based Graph Convolution Network</b>. <a href="{{ site.baseurl }}/files/K31_Deep_Learning___Presentation.pdf" target="_blank">[Slides]</a>

- [12/07/2022] BSc Thesis Defense: <b>Link Prediction on Knowledge Graphs based-on Convolutional Neural Networks</b> (Phan, Anh Hao & Le, Nhut Nam); Score: 10.0/10.0. <a href="{{ site.baseurl }}/files/BSc_Thesis_Slide_Presentation_LNNam_PAHao.pdf" target="_blank">[Slides]</a>

<details><summary style="color:#7C4700">Abstract</summary>
        <font color = "7C4700">
            The modernisation of the globe and the growth of human knowledge have both been facilitated by the development of technology in various disciplines. This information is preserved through a variety of store tools, including books, notebooks, movies, and is currently preserved on several computers and the internet. A data structure called knowledge graph is used to represent this knowledge information as a collection of things connected by relationships. In 2012, Google has implemented and created this structure to best store and utilize this data in their search engine. As a result, this thesis provides an overview of association prediction problems as well as knowledge graphs, approaches, and applications. Translation-distance geometry, semantic matching, and artificial neural network-based techniques are the three main strategies mentioned. The adaptive convolution in ConvR model and recalibration mechanism, were used to build the proposed ACRM model, a method based on convolutional neural networks, to tackle the link prediction problem. The model addressed the issue that channels using the local receptacle field were unable to use context information from outside the local receptacle. When compared to the baseline models, the experimental results demonstrate that many common datasets have improved. To improve performance on the link prediction problem, there are a number of flaws in the proposed model that should be enhanced and improved in the future research directions.
        </font>
    </details>

- [Advanced topics in Machine Learning  - Master K31] <b>Temporal Parallelization of Inference in Hidden Markov Models</b>. Presentation section: Sum-product algorithm in terms of associative operations; Parallelization of the sum-product algorithm presented by <b>LE, Nhut Nam</b>. <a href="{{ site.baseurl }}/files/K31_HOCMAYNC_PHMM.pdf" target="_blank">[Slides]</a>