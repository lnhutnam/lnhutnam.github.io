+++
author = "Le, Nhut Nam"
title = "Knowledge Graphs - Submissions in ICLR 2024 (Continue)"
date = "2023-10-29"
url = '/projects/n2l/kg-iclr2024s'
description = "Early submissions related to Knowledge Graphs @ ICLR 2024"
tags = [
    "knowledge graphs", "temporal data", "transferability", "beyond knowledge graphs"
]
+++

Here are my reading collections from early submissions at ICLR 2024 about knowledge graphs and related topics. Almost all the papers I took were at the Github repository of [Naganandy](https://github.com/naganandy), and the readers can find them [here](https://github.com/naganandy/graph-based-deep-learning-literature/blob/master/conference-publications/folders/submissions_iclr/2024.md). My take notes were based on the categories as well as in this repo, which include:
- Temporal data
- Transferability
- Knowledge graphs
- Miscellaneous (Beyond knowledge graphs)

Disclaimer: This note is used only for research in education and not for any commercial purposes.

## Temporal data

### [Enhancing Temporal Knowledge Graph Completion with Global Similarity and Weighted Sampling](https://openreview.net/forum?id=wN9HBrNPSX)

**General information**:
- Keywords: Temporal Knowledge Graph, Representation Learning
- TL;DR: Model agnostic framework for improving temporal knowledge graph completion that leverages entities global similarities and weighted sampling.

This paper focuses on temporal knowledge graph completion. The objective of this problem is to predict potential links between two entities at a given time, which can be done as a ranked list with a score.
- Predicting the subject entity with a given object and relation at a specific timestamp,
- Predicting the object entity with a given subject and relation at a specific timestamp

The paper focuses on extrapolation settings in which predict events are the timestamps beyond the dataset in this problem.

This paper has two criteria contributions:
- Model-Agnostic Enhancement Layer
- Weighted Sampling Strategy

a. Model-Agnostic Enhancement Layer

The authors define a relaito-based similarity, two entities are similar if they share a connection via the same relation. Thus lead to define the enhancement function for any given query.

b. Weighted Sampling Strategy

To address inherent bias towards entities, the authors propose a weighted frequency-based sampling strategy that samples quadruples from the training set based on the inverse frequency of either the subject or object entity.

### [TKG-LM: Temporal Knowledge Graph Extrapolation Enhanced by Language Models](https://openreview.net/forum?id=T0hhkuv8I0)

**General information**:
- Keywords: Knowledge Graph Reasoning, Temporal Knowledge Graph, Large Language Model

**Motivation**: 
- Although graph embedding methods help improve performance completion task, the semantic text information of objects in knowledge graph such as entities and relations still needs to be fully exploited. 
- Language models with structured temporal knowledge graphs still remains unxplored, and has three main challenges. Following the papers, we can list as:
    - Adequate utilization of the semantic prior knowledge of language models. (1)
    - Robust temporal reasoning. (2)
    - Effectively interaction of multi-modal information. (3)

**Summary contributions**: To overcome these three challenges, the authors proposed the method that have ability in earning contextual semantic information and topologically structured knowledge.
- (1) The proposed me-weighted LM-based function to score the gap between the query to be predicted and its historical fact.
- (2) By using the sampling prompt construction to initialize the input of LMs and incorporating a pruned subgraph for the input of the GNN layer, it helps improve the robustness of temporal reasoning.
- (3) By constructing the layer-wise modality interaction, which is composed of an attention-based residual fusion module, it helps effectively integrate the interaction of multi-modal information.

### [Continual Learning Knowledge Graph Embeddings for Dynamic Knowledge Graphs](https://openreview.net/forum?id=SiUhAbb3LH)

**General information**:
- Keywords: Continual Learning, Dynamic Knowledge Graphs

**Motivation**: Existing methods focus on earning new knowledge based on existing knowledge while neglecting new knowledge and old knowledge should contribute to each other. Thus lead two challenges:
- (1) transfer the knowledge from the old to the new without retraining the entire KG
- (2) and alleviate the catastrophic forgetting of old knowledge with new knowledge.

**Summary contributions**
- (1) leverage continual learning to conduct the knowledge transfer and obtain new knowledge based on the old knowledge graph.
- (2) utilize the energy-based model, learning an energy manifold for the knowledge represetations and aligning new knowledge and old knowledge such that their energy on the manifold is minimized => alleviate catastrophic forgetting with the assistance of new knowledge.

### [Continual Knowledge Graph Link Prediction: Beyond Experience Replay](https://openreview.net/forum?id=gP9TWGHtGM)

**General information**:
- Keywords: Knowledge Graph Link Prediction, Continual Learning

**Motivation**: The dynamic nature of real-world KGs emphasizes the importance of KG link prediction algorithms that can learn on the fly. However, existing benchmark datasets generally use sampling-based methods, which fall short of effectively testing models' skills for continual KG link prediction. 

**Summary contributions**
- Two new datasets
- BER,  novel approach based on experience replay and knowledge distillation to alleviate the catastrophic for continual KG link prediction.

## Transferability

### [Towards Foundation Models for Knowledge Graph Reasoning](https://openreview.net/forum?id=jVEoydFOl9)

**General information**:
- Keywords: graph neural networks, foundation model, knowledge graph, link prediction, knowledge graph reasoning.
- TL;DR: An approach for building foundation models for KG reasoning: pre-train on one (or several) graphs, run zero-shot inference and fine-tuning on any multi-relational graph.
- Link ArXiv: https://arxiv.org/abs/2310.04562
- Link source code: https://github.com/DeepGraphLearning/ULTRA
- Link Tweets: https://twitter.com/michael_galkin/status/1716509408795197543

This paper proposed "ULTRA, a method for Unified, Learnable, and TRAnsferable KG representations that leverages the invariance of the relational structure and employs relative relation representations on top of this structure for parameterizing any unseen relation."

Motivated from foundation models that recenly used in natural language processing and computer vision have ability in inferencing on any text or vision inputs. And behind its sucess is transferable representations. However, in graph machine learning, especially in knowledge graphs, we have many different entities and relations that have no overlap in general. 

To address this challenge, this paper designed mainly to find the invariances transferable across graphs with arbitrary entity and relation vocabularies. Thus, we have able to leverage and learn such invariances features, enable the pre-train and find-tuning paradigm of foundation models for knowledge graph reasoning.

### [Think-on-Graph: Deep and Responsible Reasoning of Large Language Model on Knowledge Graph](https://openreview.net/forum?id=nnVO1PvbTv)

**General information**:
- Keywords: Knowledge Graph, Chain-of-Thought, Large Language Models

## Knowledge graphs

### [Fully Hyperbolic Representation Learning on Knowledge Hypergraph](https://openreview.net/forum?id=q6WtaLj8O1)

**General information**:
- Keywords: Representation Learning, Hyperbolic Space, Knowledge Hypergraph

**Motivation**: Knowledge hypergraphs can be considered as generalization of knowledge graphs that have multiples entities connected by hyperedges and complicated relations represented with in these edges. Existing embedding methods use two approaches for knowledge hypergraphs:
- Transforming hyperedges into an easier to handle set of binary relations
- Considering hyperedges as isolated and ignore their adjacencies.
And thus methods lead many issues such information loss, and sub-optimal models.

**Summary contributions**
- Proposed hyper-star message passing,  a novel hypergraph-specific message passing scheme, which can be seamlessly integrated into any mainstream GNN.
- Sucess defines linear transformation, i.e., a matrix function to perform linear transformations in hyperbolic space, laying the foundation for the development of hyperbolic graph neural networks.

### [Knowledge Graph Reasoning with Reinforcement Learning Agent guided by Multi-relational Graph Neural Networks](https://openreview.net/forum?id=d1zLRzhalF)

**General information**:
- Keywords: Knowledge Graphs, Reinforcement Learning, Graph Neural Networks

**Motivation**: RL-based knowledge graph completion is one of the most potential approaches. However, existing methods only focus on training the agent to move along the graph, seldom take into account the multi-relation connectivity inherent in knowledge graphs. 

**Summary contributions**: To address this issue, this paper propose:
- a Multi-relation Graph Attention Network (MGAT) which generate high quality KG entity and relation embedding to help agent navigation.
-  Query-aware Action Embedding Enhancement (QAE) module to strength information contained in action embedding.


### [Inductive Link Prediction in Knowledge Graphs using Path-based Neural Networks](https://openreview.net/forum?id=5xV0yTP50n)

**General information**:
- Keywords: Knowledge Graph, Inductive Link Prediction, Siamese Neural Network, Transfer Learning

### [Unified Interpretation of Smoothing Methods for Negative Sampling Loss Functions in Knowledge Graph Embedding](https://openreview.net/forum?id=Oz6ABL8o8C)

**General information**:
- Keywords: Knowledge Graph, Knowledge Graph Completion, Knowledge Graph Embedding, Negative Sampling, Smoothing Methods, Loss Function
- TL;DR: This paper provides theoretical interpretations of smoothing methods in the NS loss for KG Completion (KGC) and induces a new NS loss, Triplet-based SANS (T-SANS), that can cover the conventional smoothing methods for the NS loss in KGC.

### [Knowledge Graph Completion by Intermediate Variables Regularization](https://openreview.net/forum?id=bSlAUCyY4T)

**General information**:
- Keywords: Knowledge Graph Completion, Tensor Decomposition, Regularization
- TL;DR: We propose a regularization to alleviate the overfitting problem of tensor decomposition based models for knowledge graph completion.

### [DSparsE: Dynamic Sparse Embedding for Knowledge Graph Completion](https://openreview.net/forum?id=z4qWt62BdN)

**General information**:
- Keywords: Knowledge graph completion, Link prediction, Dynamic learning, Sparse embedding

### [EMU: EFFICIENT NEGATIVE SAMPLE GENERATION METHOD FOR KNOWLEDGE GRAPH LINK PREDICTION](https://openreview.net/forum?id=rcsV1C2eyk)

**General information**:
- Keywords: knowledge base, ling prediction, representation learning, negative sample generation
- TL;DR: proposing a new efficient negative sample generation method for knowledge graph link prediction

## Complex query

### [${\rm EFO}_k$-CQA: Towards Knowledge Graph Complex Query Answering beyond Set Operation](https://openreview.net/forum?id=xwZhyKynCB)

**General information**:
- Keywords: complex query answering, knowledge graph

### [Rethinking Complex Queries on Knowledge Graphs with Neural Link Predictors](https://openreview.net/forum?id=1BmveEMNbG)

**General information**:
- Keywords: complex query answering, knowledge graph, link prediction

### [Abductive Logical Reasoning on Knowledge Graphs](https://openreview.net/forum?id=DIuSX4HqDZ)

### [Text2NKG: Fine-Grained N-ary Relation Extraction for N-ary relational Knowledge Graph Construction](https://openreview.net/forum?id=1g77zRaJq0)

**General information**:
- Keywords: N-ary Relation Extraction, N-ary relational Knowledge Graph, Knowledge Graph Construction
- TL;DR: We introduce Text2NKG, a novel fine-grained n-ary relation extraction framework for n-ary relational knowledge graph construction.

### [COINs: Model-based Accelerated Inference for Knowledge Graphs](https://openreview.net/forum?id=ut9aUpFZFr)

**General information**:
- Keywords: Knowledge Graph Inference, Scalability, Graph Embeddings, Community Structure
- TL;DR: Community structure leveraged for accelerating embeddings-based knowledge graph inference while preserving prediction power

### [LARGE LANGUAGE MODELS FOR BIOMEDICAL KNOWLEDGE GRAPH CONSTRUCTION](https://openreview.net/forum?id=K1bv86Uvbp)

**General information**:
- Keywords: Knowledge Graphs, Knowledge Discovery, Large Language Models, Relation Extraction, EMR, Clinical Notes

### [Less is More: One-shot Subgraph Reasoning on Large-scale Knowledge Graphs](https://openreview.net/forum?id=QHROe7Mfcb)

**General information**:
- Keywords: knowledge graph reasoning, graph sampling
- TL;DR: We propose the one-shot subgraph reasoning to achieve efficient as well as adaptive reasoning on knowledge graphs

## Miscellaneous (Beyond knowledge graphs)

### [GraphCare: Enhancing Healthcare Predictions with Personalized Knowledge Graphs](https://openreview.net/forum?id=tVTN7Zs0ml)

**General information**:

### [BioBridge: Bridging Biomedical Foundation Models via Knowledge Graph](https://openreview.net/forum?id=jJCeMiwHdH)

**General information**:

### [Robust Self-supervised Learning in Heterogeneous Graph Based on Feature-Topology Balancing](https://openreview.net/forum?id=1JiIKjcwrr)

**General information**:
- Keywords: Heterogeneous Graph, Knowledge graph, Self-supervised learning
- TL;DR: A novel robust self-supervised learning framework for heterogeneous graphs, which is trained by striking a balance between graph topology and node features for the first time.