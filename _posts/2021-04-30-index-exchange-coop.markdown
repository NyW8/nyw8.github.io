---
layout: post
title: "Index Exchange Co-op"
img: ix-banner.jpg
date: 2021-04-30 12:55:00 +0300
description: Nyah's co-op at Index Exchange as a software engineer.
tag: [coursework]
category: coursework
---
My experience at Index Exchange was the middle of my 3 co-ops. Below are some of my thoughts on both the position and the company.

Having never worked in AdTech before, in the first few weeks I felt entirely out of my element at Index. The terminology was all new to me, as was working in a purely backend environment. How do you verify your changes? Which side is the buyer and which is the seller? What are bid floors and second price auctions? As my team was very willing to help me understand what was going on, I soon learned the answers to most of those questions.

The position I took on at Index Exchange was that of a software engineer. My primary project within the time I was working with them was to create a metrics dashboard that displayed information and trends related to merge requests for the new software version that had just been released, called Arc3. 

This project included creating a new database on a server cluster to hold the raw data, querying the gitlab API and evaluating that data to get the information needed, writing Python scripts aggregate and send that data to the database, connecting the whole thing to Redash for visualizations, and writing a bunch of SQL queries to show the required trends and metrics. The dashboard is shown below:

<figure style="text-align:center">
<img src="./../assets/img/ix-dashboard-1.png" width=45% alt="The dashboard I worked on at Index Exchange (part 1)">
<img src="./../assets/img/ix-dashboard-2.png" width=45% alt="The dashboard I worked on at Index Exchange (part 2)">
<figcaption>The metrics dashboard I created while on co-op at Index Exchange.</figcaption>
</figure>

<details><summary>Also see my end-of-term co-op presentation</summary>
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQPK9sGGeq7ny7XjPnaqnyz7eiYIi8BNmW8Qjc_vNI53LN15AwK68DgM8mjI0fI6JbILU4VCTqgrkx3/embed?start=false&loop=false&delayms=5000" frameborder="0" width="100%" height="300px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></details>
<br>

During my co-op, I interacted with many other frameworks and tools including using Ansible to create playbooks and deploy services to different servers.

Languages/Frameworks used:
{% highlight linenos %}
SQL
Golang
Perl
Python
{% endhighlight %}

Tools used:
{% highlight linenos %}
Redash
Docker
Ansible
Gitlab API
Gitlab CI/CD
Filebeat # part of the ElasticSearch stack
Grafana
Kafka
Vim
{% endhighlight %}

Thank you to my team (in no order): Robert, James, Ivan, Kevin, Sean. All of you were so patient with my questions and always were willing to help me along when I was confused about something.

Index Exchange's site is [here][ix-site] and to learn more about the work they do, I recommend this video.
<div style="text-align:center"><iframe width="100%" height="300px" src="https://www.youtube.com/embed/XEqh9t04wj0" title="Intro to Index Exchange" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

[ix-site]: https://www.indexexchange.com/