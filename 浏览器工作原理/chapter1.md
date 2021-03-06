站在用户体验的角度去考虑页面性能

首屏显示涉及`DNS`、`HTTP`、`DOM解析`、`CSS阻塞`、`JavaScript阻塞`因素，其中的某一项没处理好就会导致整个页面延时。

前端模块化开发：`WebComponents`涉及了`Custom elements`（自定义原生）、`Shadow DOM`（影子 DOM）、`HTML Templates`（HTML 模板）。

## 进程和线程

### 并行处理

并行处理的意思就是说，同时处理多个任务。比如下面的代码。

```js
let a = 0 + 1;
let b = a + 1;
let c = b + 1;
console.log(c);
```

上面的代码在 JavaScript 的**单线程**中处理，那么就要分四个步骤按顺序执行这四个任务。

在**多线程**中，只需要分 “两步走” ：第一步，用三个线程同时执行前三个任务；第二步，再执行第四个任务。因此你会发现，多线程只需要两步，单线程就需要四步。所以使用并行处理能提高性能。

### 线程

线程不能单独存在的，它是由进程来启动和管理的。

### 进程

进程是启动程序时，操作系统会为该程序创建一块内存，用于存放代码、运行中的数据和一个执行任务的主线程。

线程依靠进程，而进程中使用多线程并行处理可以提高运算效率。

### 进程和线程的关系

1. 进程中的任何一个线程执行出错，都会导致整个进程崩溃。
   假设，线程中有一个运算代码出错，都会导致整个进程崩溃。
2. 线程之间共享进程中的数据。
   **线程 1** 可以获取同进程下的**线程 2**、**线程 3** 的数据。
3. 一个进程关闭之后，系统会回收进程所占用的内存。
   一个进程退出时，系统会回收这个进程的所有资源；即使其中任意一个线程因为某种原因导致内存泄漏，在进程退出时，这些内存会被回收。
4. 进程之间的内容互相隔离。
   进程隔离是保护操作系统中进程互不干扰的技术，每个进程只能访问自己的数据，从而避免了出现进程 A 将数据写入到进程 B 中。假设一个进程出现崩溃，其他的进程不会受影响。如果进程之间需要数据通信，就要使用用于进程间通信（IPC）的机制。

## 单线程浏览器

单线程浏览器指的是浏览器的所有功能模块都运行在同一个进程中，这些模块包含网络、插件、JavaScript 运行环境、渲染引擎和页面等。页面线程中包含了页面渲染、页面展示、JavaScript 环境、插件。

这些模块都在一个进程中，导致了单线程浏览器不稳定、不流畅和不安全。

#### 不稳定

插件：一个插件会导致意外崩溃引起整个浏览器的崩溃。
渲染引擎模块：复杂的 JavaScript 代码可能引起渲染引擎模块的崩溃。和插件一样，渲染引擎崩溃会导致整个浏览器崩溃。

#### 不流畅

所有页面的渲染模块、JavaScript 执行环境和插件都运行在同一个线程当中，这就说明了同一时刻只能执行一个模块。通常一段 JS 的无限循环代码会导致整个浏览器失去响应，变卡顿，因为它独占整个线程，导致其他运行在该线程中的模块没有机会被执行。除此之外，页面的内存泄漏也会导致单线程变慢的一个主要原因。运行一个复杂点的页面再关闭页面，会存在内存不能被完全回收的情况，这就导致使用时间越长，内存占用越高，浏览器变得越慢。

#### 不安全

通过插件可以获取系统的任意资源，在页面上运行一个插件时意味着这个插件可以操作你的电脑。如果是恶意插件，就可以释放病毒、窃取用户的账号密码，一系列的安全问题。

### 多线程浏览器

多线程浏览器的出现，解决了以上单线程浏览器的主要三大问题。

1. 当一个页面或者插件崩溃时，受影响的只是当前的页面进程或插件进程，并不会影响到浏览器和其他页面，这就解决了页面或插件的崩溃导致整个浏览器崩溃的问题。
2. 每个页面都有自己的渲染进程，所以 JS 阻塞了渲染进程，也只是当前的渲染页面受影响，并不会影响到浏览器和其他页面。如果运行一个死循环，没有响应的只是当前的页面。
3. 当关闭一个页面时，整个渲染进程也会被关闭，之后该进程占用的内存都会被系统回收，这就解决了页面的内存泄漏问题。
4. 采用多进程架构的额外好处是可以使用安全沙箱，可以把沙箱看做是系统给进程上了一个锁，沙箱里面的程序可以运行，但是不能在硬盘上写入任何数据，也不能在敏感位置读取数据。而插件进程和渲染进程都被锁在沙箱 里面，即使在这两个进程里面执行了恶意程序，也无法突破沙箱去获取系统权限。

### 目前多进程架构

最新的 Chrome 浏览器包含：1 个浏览器主进程、1 个网络进程、1 个 GPU 进程、多个插件进程和多个渲染进程。

- **浏览器主进程**：负责界面显示、用户交互、子进程管理，同时提供存储等功能。
- **渲染进程**：HTML、CSS、JS、排版引擎 Blink 和 V8 引擎都在这个进程中运行。Chrome 会为每个 Tab 标签创建一个渲染进程。渲染进程都是运行在沙箱模式下。
- **GPU 进程**：实现 3D CSS 的效果。
- **网络进程**：负责页面的网络资源加载。
- **插件进程**：负责插件的运行，因为插件容易崩溃，所以需要通过插件进程来隔离，这样能确保插件进程崩溃不会对浏览器和页面造成影响。

打开 1 个页面至少有 1 个网络进程、一个 GPU 进程、1 个浏览器进程和 1 个渲染进程。如果有运行插件的话，还要加上 1 个插件进程。

这样带来了一些问题。
更高的资源占用、更复杂的体系架构。
