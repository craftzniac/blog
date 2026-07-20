---
title: Developing my coding style for C (1)
description: just yapping about some ideas I have for how I should write C code
date: 2026-07-20
slug: developing_my_coding_style_for_C_1
---

As a newcomer to the C programming language, one of the things I'm trying to do is develop my own style for writing C code. 
Right now, the challenge for me is on figuring out things like 
- camelCase, snake_case or PascalCase? which to choose?
- namespacing?? but how?
- generics?? macros or void * ??

I've also been looking at a few codebases and just looking around to see how other people write C code. I have alot to learn but I've picked up a few ideas that I am going to experiment with.

The first is that I'm using the underscore character `_` only as a pseudo-namespacing approach (I got this idea from watching Vjekoslav's showcase of FilePilot codebase on the Wookash Podcast). The second is that, Function names will be PascalCase as opposed to snake_case (Idea from watching Vjekoslav's FilePilot showcase). This helps preserve the uniqueness of the underscore for namespacing purposes.
A third rule is to have a project prefix so that if I ever try to resuse this code in a different project, there will be less chance that the function names  from my library  will clash with function names from other parts of the new project.

As I hinted in my previous log entry, I'm learning datastructures and algorithms by implementing the common ones from scratch in C, for my own datastructures and algorithms library. For this project, the project prefix is `CZ` and all the functions in the public API will be prefixed with it.

The general idea for how these rules work together is this
```c
prefix+thing_action
```
(I got the idea for the thing_action pattern of naming functions from watching one of Eskil Steenberg's streams)

e.g
In my codebase, I have
```c
// Instead of this
czstring * czstring_new();

// I have this
CZString * CZString_New();

// Instead of this
bool czstring_is_empty();

// I have this
bool CZString_IsEmpty();
```

Ofcourse, this is only a very small part of what an actual style-guide should contain, but hey, I'm new to this language and just discovering stuff as I work on my projects. So, in the future, my view on some of these may change and hopefully I have more ideas too.

Anyways, that's all.
