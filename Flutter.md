# 使用onGenerateRoute的问题
### ModalRoute.of(context).settings.arguments为null

字符串中可以使用
```dart
main () async {
  String a = 'In main: version is ${await lookUpVersion()}';
}
```

```dart
class Echo extends StatelessWidget {
  const Echo({
    Key key,  
    @required this.text,
    this.backgroundColor:Colors.grey,
  }):super(key:key);
  // 构造函数传入参数，不能Echo({text: '123'})
  // 或者 Echo(text: '123')

  final String text;
  final Color backgroundColor;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: backgroundColor,
        child: Text(text),
      ),
    );
  }
}
```
定义函数是，使用 {param1, param2, …} 来指定命名参数：
>```dart
>void enableFlags({bool bold, bool hidden}) {}
>```

使用 @required 注释表示参数是 required 性质的命名参数， 该方式可以在任何 Dart 代码中使用（不仅仅是Flutter）。
>```dart
>Scrollbar({Key key, @required Widget child});
>```

build方法有一个context参数，表示当前widget在widget树中的上下问，每一个widget都会对应一个context
对象。

通过router跳转的statelessWidget
print(context.ancestorWidgetOfExactType(Scaffold)); 不能获取到上一个页面的标题，
可以判断router新建一个树

# State生命周期
initState => didChangeDependencies => build
点击热重载
reassemble => didUpdateWidget => build

后退键
deactive => dispose

+ initState: 当widget第一次插入到widget树时会被调用，对于每一个Syaye对象，FLutter framework只会调用一次
该回调，所以，通常在该回调中做一些一次性的操作，如状态初始化、订阅子树的事件通知等。不了了个在该回调中调用BuildContext.inheritFromWidgetOfExactTyoe
（该方法用于在widget树上获取离当前widget最近的一个父级InheritFromWidget）,原因是在初始化完成后，widget树中的InheritFromWidget也可能会发生变化，所以正确的做法应该在Buld()方法
或者didCHngaeDependENCIES()中调用它。（就是说用是可以用但是呢，可能会不准确吧？）

+ didCHngaeDependencies()当State对象的依赖发生变化时会被调用；例如：在之前Build()中包含了一个inheritedWidget,然后再之后的build()中
inheritedWidget发生了变化，那么此时inheritedWidget的子widget的didchangeDependencies()回调都会被调用，典型的场景是当系统语音Locale或引用主题改变时，
Flutter framework会通知iwdget调用此回调（不懂！是不是他爸爸inheritedWidget发生变化？就是还一个爸爸，然后发生变化？怎么换.. 不懂）

+ build(): 此回调主要时用于构建widget子树的

1.再调用initState()之后
2.didUpdateWidget()之后
3.在调用setState()之后
4.在调用didChangeDependencies()之后
5.在State对象从树中一个位置移除后（会调用deactivate）又重新插入到树的其他位置之后。
+ reassemble():开发调试用的，在热重载时会被调用。

+ didUpdateWidget() 在widget重新构建时，Flutter framework会调用widget.canUpdate来检测widget树中同一
位置的新旧节点，然后决定是否需要更新，如果widget.canUpdate返回true则会调用此回调。正如之前所述，widget.canUpdate会在新旧
widget的key和runtimeType同时相等时会返回true,也就是说在新旧widget的key和runtimeType同时相等时，didUpdateWidget()
就会被调用。

+ deactivate()：当State对象从树中被移除时，会调用此回调。
在一些场景下，Flutter framework会将State对象重新插到树中，如包含此State对象的子树在树的一个位置移动到另一个位置时（可以通过GlobalKey来实现）
。如果移除后没有重新插入到树中则紧接着会调用dispose()方法。

+ dispose()：当State对象从树中被永久移除时调用；通常在此回调中释放资源。

> 注意：使用GlobalKey开销较大，如果有其他可选方案，应尽量避免使用它。
> 另外同一个GlobalKey在整个widget树中必须是唯一的，不能重复。

### 基础组件
+Text: 带格式的文本。
+Row、Column: 弹性空间的布局内widget，水平，垂直方向上创建灵活的布局，其
设计是基于web开发中的flexbox布局模型
+Stack:取代线性布局，Stack允许子widget堆叠，用positioned来定位他们相对于stack的上下左右四条边的位置。
Stacks是基于web开发中的绝对定位布局模型来设计的。
+Container： Container可以创建矩形视觉元素。Container可以装饰一个boxDecoration,如background,边框，阴影。
container也可以具有边距，填充和应用于其大小的约束。另外，Container可以使用矩阵在三维空间中对其进行变换。

### Material组件
MarterialApp、Scaffold、AppBar、FlatButton等。

### 3.2.2父widget管理子widget的状态
子widget无需成为statefulwidget,父传入回调改变状态就好，因为每次都会重新构建build。
stateless 和 stateful 根据是否需要管理state状态来选取，state里面可以使用setState(),
类似于vue框架。

state 里面可以调用 widget 来获取stateFul的方法 变量（惊呆了。。。）


我觉得把2进制计算下来 挺不好的 以为本来只需要转换一个而已

这个问题相当于 纸片堆叠的问题
解决的方法 需要利用到压缩的办法了，
重复的数据用来记录下来
 其实就是 +2^n 然后翻滚 
 和上一次位置的 组合 得到新的数组
 
 树很大 需要去查找到数据
                     [0,  1]
                  [0, 1,  3,  2]
            [0, 1, 3, 2,  6,  7,  5,  4]
[0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8]
3层第4个如何拥有？
[0, 1] 翻转 + 2^2 结合


4层

                     [ '  0', '  1' ]
              [ ' 00', ' 01', ' 11', ' 10' ]
[ '000', '001', '011', '010', '110', '111', '101', '100' ]

发现了一个 规律 
第一个 向下   +0 +1
第二个 向下   +1 +0

假如1 需要 010
column 是 3 
是单数
那他父 位置怎么计算？

column = 0

if (0) {
  column = 0
}
if (1) {
  column = 1
}

判断后面那一位 我觉得应该是两位两位判断吧？每次判断需要拿上一次的 和本次的 可以算出
if (00) {
  column = column * 2
}
if (01) {
  column = ((column + 1) * 2) - 1
}

if (10) {
  column = ((column + 1) * 2) - 1
}
if (11) {
  column = column * 2
}

### 3.3文本和样式
和python一样 字符可以 * 数字





