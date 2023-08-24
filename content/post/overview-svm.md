+++
author = "Le, Nhut Nam"
title = "Support-Vector Network: Overview"
date = "2023-02-03"
description = "A Support Vector Machine (SVM) is a supervised machine learning algorithm that can be employed for both classification and regression purposes - Noel Bambrick"
tags = [
    "machine learning", "learning algorithms", "statistical learning"
]
+++

*"Just as we have two eyes and two feet, duality is part of life"* - Carlos Santana

 *"A Support Vector Machine (SVM) is a supervised machine learning algorithm that can be employed for both classification and regression purposes.*
— Noel Bambrick, **Support Vector Machines: A Simple Explanation**

*"Each of the five tribes of machine learning has its own master algorithm, a general-purpose learner that you can in principle use to discover knowledge from data in any domain. The symbolists’ master algorithm is inverse deduction, the connectionists’ is backpropagation, the evolutionaries’ is genetic programming, the Bayesians’ is Bayesian inference, and the analogizers’ is the support vector machine."*
— Pedro Domingos

## What exactly is SVM?

Support Vector Machine (SVM) or Support-Vector Network (SVN) is a supervised learning model, which means you need a dataset that has been labeled.

Consider the issue of spam email classification. Users do not have much time during the workday to determine whether an email is spam or not because they receive a large volume of email. We'd like to be able to create a program that can automatically identify them. This program could be designed in one of two ways.
- Approach 1:  In Gmail, we can create a label with keywords such as "advertisement," "joke," and so on. The disadvantage of this method is that we must consider all possible keywords in spam mail, and we will almost certainly miss some of them.
- Approach 2: We can use a supervised machine learning algorithm.

**Step 1**: The more data we collect from users, the better. We're referring to the fact that you collect email and text data but not personal information. We must protect users' privacy.

**Step 2**: Assigning a label for each email Some emails are labeled "normal email - 1," while others are labeled "spam email - (-1)" based on their contents.

**Step 3**: We train a model on this dataset.

**Step 4**: Assessing the quality of the prediction (using cross validation).

**Step 5**: Using this model to predict if an email is a spam or not.

At the Step 3 involves training a supervised learning algorithm, such as SVM, on labeled data. SVM, for example, learns a linear model. The linear model is a simple line (a hyperplane for greater complexity). If your data is simple and has only two dimensions, the SVM will learn a line that can separate the data.

<p align="center">
  <img src="/images/svm/support-vectors-and-maximum-margin.png" style="width:50%; height:50%"/>
</p>

Linear model is just a line. So why we talk about it? Because we cannot learn a line :)
- We assume that the data to be classified can be separated by a line.
- We already know that a line can be represented by an equation such as $y = ax + b$
- We know that changing the slope and bias of the line equation yields an infinite number of lines.
- We employ an algorithm to determine the values of these parameters, resulting in the "best" line separating the data.

## Algorithm or model?

To keep things simple, say "SVM algorithm" or "SVM model." But what is the truth? The term "algorithm" or "SVM model" is frequently used interchangeably. But what is the truth? The term "algorithm" is frequently misused. SVM, for example, is sometimes referred to as a supervised learning algorithm. This is not correct if you consider an algorithm to be a set of actions to be performed in order to achieve a specific result. You can use some algorithm to train SVM such as sequential minimal optimization or coordinate descent. But for simplicity, we use the term of "SVM algorithm".

## SVM or SVMs?

People will sometimes talk about SVM, and sometimes about SVMs. So what is the rightway to talk about it?

<div style="padding: 6px; color: black; background-color: white; border: black 2px solid;"> <span style="color:dodgerblue">Wikipedia:
</span>
    In machine learning, support vector machines (SVMs) are supervised learning models with associated learning algorithms that analyze data used for classification and regression analysis.
</div>

### SVMs - Support Vector Machines

- SVM is used for classification
- SVR (Support Vector Regression) is used for regression

<p align="center">
  <img src="/images/svm/SVR_1.png"/>
</p>


### Classification

For classification task, we have four different Support Vector Machines:
- The original one : the Maximal Margin Classifier, which invented by Vapnik and Chervonenkis.
- The kernelized version using the Kernel Trick,
- The soft-margin version,
- The soft-margin kernelized version

### Regression

For regression task, Vapnik et al. proposed Support Vector Regression like Support Vector Machine  for deadling with predict continuous values.

## Other type of Support Vector Machines

- Structured support vector machine which is able to predict structured objects
    - Ioannis Tsochantaridis, Thorsten Joachims, Thomas Hofmann and Yasemin Altun (2005), Large Margin Methods for Structured and Interdependent Output Variables, JMLR, Vol. 6, pages 1453-1484.
    - Thomas Finley and Thorsten Joachims (2008), Training Structural SVMs when Exact Inference is Intractable, ICML 2008.
    - Sunita Sarawagi and Rahul Gupta (2008), Accurate Max-margin Training for Structured Output Spaces, ICML 2008.
    - Gökhan BakIr, Ben Taskar, Thomas Hofmann, Bernhard Schölkopf, Alex Smola and SVN Vishwanathan (2007), Predicting Structured Data, MIT Press.
    - Vojtěch Franc and Bogdan Savchynskyy Discriminative Learning of Max-Sum Classifiers, Journal of Machine Learning Research, 9(Jan):67—104, 2008, Microtome Publishing
    - Kevin Murphy. Chapter 19: Undirected graphical models (Markov random fields), Machine Learning, MIT Press

- Least square support vector machine used for classification and regression
    - J. A. K. Suykens, T. Van Gestel, J. De Brabanter, B. De Moor, J. Vandewalle, Least Squares Support Vector Machines, World Scientific Pub. Co., Singapore, 2002. ISBN 981-238-151-1
    - Suykens J. A. K., Vandewalle J., Least squares support vector machine classifiers, Neural Processing Letters, vol. 9, no. 3, Jun. 1999, pp. 293–300.
    - Vladimir Vapnik. The Nature of Statistical Learning Theory. Springer-Verlag, 1995. ISBN 0-387-98780-0
    - MacKay, D. J. C., Probable networks and plausible predictions—A review of practical Bayesian methods for supervised neural networks. Network: Computation in Neural Systems, vol. 6, 1995, pp. 469–505.
- Support vector clustering used to perform cluster analysis
    - V. N. Vapnik. Statistical learning theory. New York: Wiley, 1998. (See pages 339-371)
    - V. Tresp. A Bayesian committee machine, Neural Computation, 12, 2000, pdf.
    - B. Russell. The Problems of Philosophy, Home University Library, 1912. [1].
- Transductive Support Vector Machine used for semi-supervised learning
    - A. Ben-Hur, D. Horn, H.T. Siegelmann and V. Vapnik. Support vector clustering. Journal of Machine Learning Research 2:125-137, 2001.
    - S.J. Roberts. Parametric and non-parametric unsupervised cluster analysis. Pattern Recognition, 30(2): 261-272, 1997.
- Ranking SVM used to sort results
    - oachims, T. (2002), "Optimizing Search Engines using Clickthrough Data", Proceedings of the ACM Conference on Knowledge Discovery and Data Mining
    - Bing Li; Rong Xiao; Zhiwei Li; Rui Cai; Bao-Liang Lu; Lei Zhang; "Rank-SIFT: Learning to rank repeatable local interest points", Computer Vision and Pattern Recognition (CVPR), 2011
    - M.Kemeny . Rank Correlation Methods, Hafner, 1955
    - A.Mood, F. Graybill, and D. Boes. Introduction to the Theory of Statistics. McGraw-Hill, 3rd edition, 1974
    - J. Kemeny and L. Snell. Mathematical Models in THE Social Sciences. Ginn & Co. 1962
    - Y. Yao. Measuring retrieval effectiveness based on user preference of documents. Journal of the American Society for Information Science, 46(2): 133-145, 1995.
    - R.Baeza- Yates and B. Ribeiro-Neto. Modern Information Retrieval. Addison- Wesley-Longman, Harlow, UK, May 1999
    - C. Cortes and V.N Vapnik. Support-vector networks. Machine Learning Journal, 20: 273-297,1995
    - V.Vapnik. Statistical Learning Theory. WILEY, Chichester, GB, 1998
    - N.Fuhr. Optimum polynomial retrieval functions based on the probability ranking principle. ACM TRANSACTIONS on Information Systems, 7(3): 183-204
    - N.Fuhr, S. Hartmann, G. Lustig, M. Schwantner, K. Tzeras, and G. Knorz. Air/x - a rule-based multistage indexing system for large subject fields. In RIAO,1991
- [One class support vector machine used for anomaly detection](https://rvlasveld.github.io/blog/2013/07/12/introduction-to-one-class-support-vector-machines/)