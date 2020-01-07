https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用。

为什么要2MSL
因为服务器最后需要收到ack来确认，
如果客户端，发送的ack有问题，服务器接收不到，客户端不等待2msl
就会使服务器不能正常关闭

2.服务器可能接受到客户端第二次的连接,然后服务器还没有断开，直接进行重连接，
把原有的连接请求的报文段给复用了。


### 7.es5/es6的继承除了写法以外还有什么区别
1.class声明会提升，但不会初始化赋值。

2.class生命内部会启用严格模式

3.class的所有方法（包括静态方法和实例方法）都是不可以枚举的

4.class的所有方法(包括静态方法和实例方法)都没有prototype,也没有constructor,都不能调用new

5.必须使用new来调用class

6.class内部无法重写类名

继承的差异：
1.子类可以通过__proto__寻址到父类，而es5是sub.__proto__ === Functiopn.prototype
2.this的生成顺序不同，es5的集成先生成了子类实例，再调用父类的构造函数修饰子类实例。而es6的继承先生成父类实例，
再调用子类的构造函数修饰父类实例，这个差别是的es6可以继承内置对象

先看es5的继承（原型链继承）
```javascript
function a() {
  this.name = 'a';
}

a.prototype.getName = function getName() {
  return this.name
}

function b() {}
b.prototype = new a();

console.log(b.prototype.__proto__ === a.prototype); // true
console.log(b.__proto__ === a); // false
console.log(b.__proto__); // [Function]
```

es6继承
```javascript
class A {
  constructor(a) {
    this.name = a;
  }
  getName() {
    return this.name;
  }
}

class B extends A{
  constructor() {
    super();
  }
}

console.log(B.prototype.__proto__ === A.prototype); // true
console.log(B.__proto__ === A); // true
console.log(B.__proto__); // [Function: A]
```

对比代码可以知道，子类的继承都是成功的，但是问题出在，子类的 __proto__ 指向不一样。

ES5 的子类和父类一样，都是先创建好，再实现继承的，所以它们的指向都是 [Function] 。

ES6 则得到不一样的结果，它指向父类，那么我们应该能推算出来，它的子类是通过 super 来改造的。

根据 es6--阮一峰 在class继承里面的说法，是这样子的：
>引用阮一峰的 ECMAScript6入门 的class继承篇：
 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
 ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

