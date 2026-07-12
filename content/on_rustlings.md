---
title: On Rustlings
description: just my thoughts on Rustlings
date: 2026-06-12
slug: on_rustlings
---

Hi, it's me. So for the past few weeks I took a break from working through "Crafting Interpreters" book to "properly" learn Rust. Trying to grok Rust while at the same time trying to grok the concepts expressed in the book has been a lot more difficult than it needed to be, which is why I decided to work on my knowledge of Rust.

I could have read the [Rust Book](https://doc.Rust-lang.org/stable/book/) (and I know I should) but it felt too long to go through and I wanted something that would be "quick" and mostly exercise-based. [Enter Rustlings!](https://Rustlings.Rust-lang.org/) For the uninitiated, Rustlings is a series of tiny Rust exercises which you complete to learn Rust. Picture this; each exercise has instructions for what you should do. You write some code, Rustlings checks your code and if it passes the tests, the progress bar goes up and you level up to the next exercise. There are currently a total of 94 tiny exercises spanning beginner to intermediate Rust concepts.

You can install it as a Rust crate,  [to get started](https://Rustlings.Rust-lang.org/). It's really cool and I highly recommend it. It took me a few weeks to complete the exercises.

### Is Rustlings alone enough to learn Rust? 
No, and it wasn't meant to be. In fact, on the official Rustlings website, they recommend you do Rustlings along side reading the Rust book. What Rustling does is to give you concrete practice on the concepts you learn from the Rust book, which makes those concepts stick.

Even though I have completed Rustlings, I still have a long way to go. Lifetimes now make a bit more sense. I think I understand some of the Smart Pointers but some like RefCell and Cell, I still don't fully understand.

### How I used Rustlings
Tl;dr
>I used it as an excuse to read (sections of) the Rust book

I would attempt to do the exercises first and if I realised that I had no idea what I was doing in any specific exercise, I would go read the sections of the book that cover that topic. I try to read the entire chapter/section of the Rust book that talks about that concept. When I'm done, I go back to that Rustling exercise and complete it. Then I move on to the next exercise.

If you're new to Rust, the concepts might still not make sense even after reading about it in the Rust Book. For concepts like this, I would check out other resources such as blogs and/or Youtube videos. If you still don't get it, maybe take a walk outside or go touch grass. Rust is kinda hard, and some of these concepts take time before they start to make sense. So give yourself some grace.

Speaking of Youtube videos, the [Crust of Rust playlist](https://youtube.com/playlist?list=PLqbS7AVVErFiWDOAVrPt7aYmnuuOLYvOa&si=xWvBUO0iR24PoCDR) has been very useful for understanding certain concepts. Also, this video on [pointers vs references](https://youtu.be/Ltandyyg9CI?si=albtc2zwV8CuLsYn) in Rust, I also found to be quite insightful.

### My "criticism" of Rustling
I don't have any negative views about Rustlings. I just wish they add more exercises on the chapters about Smart Pointers, Threads and Macros. And hopefully they also add a section on Async programming in rust.

### So what now?
After completing Rustlings, I feel a bit more confident in my knowledge of the Rust language to tackle a project. As for what comes next, I do not have a good grasp of data structures and algorithms, so I think I should learn about those properly before going back to the "Crafting Interpreters" book. I'll be writing about how that's going soon. Talk about a side quest of a side quest lol. 