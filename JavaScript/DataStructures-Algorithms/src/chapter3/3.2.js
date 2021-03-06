/*
  ## 创建和初始化数组
  用js声明、创建和初始化数组很简单，就像下面这样。
  ```js
  let daysOfweek = new Array();
  daysOfweek = new Array(7);
  daysOfweek = new Array('1', '2', '3', '4', '5');
  ```
  使用`new`关键字，就能简单地声明并初始化一个数组（第一行）。用这种方法，还可以创建一个指定长度的数组（第二行）。
  另外也可以直接将数组元素作为参数传递给它的构造器（第三行）。

  但是，用`new`创建数组并不是最好的方式。如果想在js中创建一个数组，只用中括号（`[]`）的形式就可以了，如下所示。
  ```js
  const daysOfweek = [];
  ```
  也可以用一些元素初始化数组，如下所示。
  ```js
  let numbers = ['1', '2', '3', '4', '5'];
  ```
  如果你想知道数组里存了多少个元素（也就是它的长度），可以使用数组的`length`属性。下面的代码输出的是`5`。
  ```js
  let numbers = ['1', '2', '3', '4', '5'];
  console.log(numbers.length); // 5
  ```

  ### 访问元素和迭代数组
  要访问数组里特定位置的元素，可以用中括号传递数值的位置，就可以得到想知道的值或者赋新的值。假如想输出数组
  `numbers`里的所有元素，可以通过循环迭代数组、打印元素，如下：
  ```js
  let numbers = ['1', '2', '3', '4', '5'];
  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
  }
  ```
  来看另一个例子：求斐波那契数列的前20个数。已知斐波那契数列中的前两项是1，从第三项开始，每一项都等于前两项之和。
  ```js
  const fibonacci = [];
  fibonacci[1] = 1;
  fibonacci[2] = 2;
  for (let i = 3; i < 20; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    console.log(fibonacci[i]);
  }

  for (let i = 0; i < fibonacci.length; i++) {
    console.log(fibonacci[i]);
  }

  console.log(fibonacci);
  // [undefined, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
  ```
  下面来梳理一下上面的代码。
  * 首先声明并创建一个数组。
  * 然后把斐波那契数列中的前两个数分别赋给了数组的第二和第三个位置（在js中，数组第一位的索引始终是`0`。因为斐波那契数列不存在0，所以在这里直接就省略了。从第二位开始分别保存斐波那契数列中对应位置的元素。）
  * 然后，需要做的就是想办法得到斐波那契数列中第三到第二十个位置上的数，（前两个值已经初始化过了）。我们就可以用循环来处理，把数组中前两位上的元素相加，结果赋给当前位置上的元素。
  * 最后，看看输出，我们只需要循环迭代数组的各个元素，或者直接打印`fibonacci`数组都能看到结果。
*/