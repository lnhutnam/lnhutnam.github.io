+++
author = "Le, Nhut Nam"
title = "A brief note about Representation Learning"
date = "2024-02-20"
tags = [
    "representation learning", " image processing", "speech recognition", "natural language processing", "network analysis"
]
+++

In machine learning fields, the better the feature set (representation), the more efficient the model. The purpose of representation learning is to extract enough information from data while leaving out unnecessary details. Traditionally, feature sets can be obtained by handcratf techniques. For example, in digitial image processing, one can use Histogram of Oriented Gradients (HOG), Local Binary Pattern (LBP), or Gabor filter. Until now, these techniques still work and provide a lightweight to perform traditional machine learning algorithm on relative small datasets. Despite of widely using,  its drawbacks are also salient, including:
-  Intensive labors from domain experts are usually needed.
-  Incomplete and biased feature extraction.

To tackle with above mentioned challenges, new machine learning should be designed that less dependent on feature engineering. And that has been become a a desired goal in machine learning and artificial intelligence domains.

Among techniques, deep learning-based representation learning has been considered as an efficient way to get more abstract and ultimately more useful representations from data. The reason mak this learning approach works well is its composition of multiple non-linear transformations. We can categorize it into several types:
- Supervised learning,
- Unsupervised learning,
- Transfer learning,
- Others: reinforcement learning, few-shot learning, and disentangled representation learning.

And depend on what area that currently interesting, we have different techniques/ methods for designing representation learning model.

**References**

[1] L. Zhao, L. Wu, P. Cui, and J. Pei, [“Representation learning,”](https://graph-neural-networks.github.io/gnnbook_Chapter1.html) in Graph Neural Networks: Foundations, Frontiers, and Applications, L. Wu, P. Cui, J. Pei, and L. Zhao, Eds. Singapore: Springer Singapore, 2022, pp. 3–15.

```
@incollection{GNNBook-ch1-zhao,
author = "Zhao, Liang and Wu, Lingfei and Cui, Peng and Pei, Jian",
editor = "Wu, Lingfei and Cui, Peng and Pei, Jian and Zhao, Liang",
title = "Representation Learning",
booktitle = "Graph Neural Networks: Foundations, Frontiers, and Applications",
year = "2022",
publisher = "Springer Singapore",
address = "Singapore",
pages = "3--15",
}
```
