
# Tofu
ES6模块化的提高前端开发效率的JS工具库 (持续开发中),
现包含以下工具 :


------------


------------


------------



## Mock  
###### 可按照期望的格式随机生成假数据
```javascript
/***
* 
* @params (props:Object,num?:Number)
* 1.字段名以及字段对应值的长度组成的键值对,以及可选值('img','address','id'),对应值为数组即随机抽取数组中其中一位,可传入深层对象
* 2.生成个数(可选),大于一将返回数组格式数据
* @methods 
* 1.add(propName:String,value:Any,start?:Boolean):给对应字段(propName)的首部或末尾(start?)添加指定字段(value)
* 
* ***/

const { Mock } = Tofu

//构造示例
const mockArticles = new Mock({
   title: 5,
   content: 20,
   detail_img: 'img',
   tid: 'id',
   user: {
       name: 3,
       sex: ['男', '女'],
       user_address: 'address',
   }
}, 5)

//原型方法 add() 示例
mockArticles.add('content', '这位作者说:', true)
```
## Options  
###### 快速创建适用于options组件的每一项
```javascript
/***
* 
* @params (labels:Array | String,starting?:Number,propName?:Object)
* 1.每一项的标签名
* 2.自增值的起始值(可选),默认从0开始
* 3.统一的键值对字段名(可选),默认为'label -> value'需传入包含'value'和'label'的对象
* 
* ***/

const { Options } = Tofu

//构造示例
const payStatus = new Options('待付款,已付款,退货中,已退货')
//或
const signStatus = new Options(['未签到', '已签到'], 1, { label: 'key', value: 'val' })
```
## Task  
###### 创建并立即执行批量定时执行的任务
```javascript
/***
* 
* @params (fn:Function,num?:Number,delay?:Number,openLog?:Boolean)
* 1.需执行的方法
* 2.方法期望执行次数(可选),默认1次
* 3.每次执行任务的等待时间(可选),默认9秒
* 4.是否打印任务日志(可选),默认开启
* @methods 
* 1.stop():直接停止任务
* 
* ***/

const { Task } = Tofu

//构造示例
const showTimeTask = new Task(()=>{
   console.log(`当前时间戳为:${new Date().getTime()}`)
},100,3000)

//原型方法 stop() 示例
showTimeTask.stop()
```
## Looper  
###### 快速创建一个环状的数据结构
```javascript
/***
* 
* @params (...props:any)
* 任意参数,任意类型,将由每一项参数组成环形结构的数据
* 
* @methods 
* 1.reset():重置,将指针移到环的第一项
* 2.next():将指针移到下一位
* 3.prev():将指针移到上一位
* 
* ***/

const { Looper } = Tofu

//构造示例
const autoAnswerLoop = new Looper('emmm...', 'is ok', 'Hi')

//原型方法 next() 示例
autoAnswerLoop.next()

//原型方法 reset() 示例
autoAnswerLoop.reset()

//原型方法 prev() 示例
autoAnswerLoop.prev()
```