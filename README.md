
# Tofu
ES6模块化的提高前端开发效率的JS工具库 (持续开发中),
```html
<!-- 将dist目录下的Tofu.js放入你的相应工程下,在需要的页面引入 -->
```
```javascript
/***使用示例***/

//Node环境
const { Mock } = Tofu

//浏览器环境
const { Mock } = Tofu.default
```
现包含以下工具 :


------------


## Mock  
###### 可按照期望的格式随机生成假数据
```javascript
/***
* 
* @params (props:Object,num?:Number)
* 1.字段名以及字段对应值的长度组成的键值对,以及可选值('img','address','id'),对应值为数组即随机抽取数组中其中一位,可传入深层对象
* 2.生成个数(可选),大于一将返回数组格式数据
*
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
*
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
## Meteor  
###### 创建一个即将消逝的数据
```javascript
/***
* 
* @params (value:any,delay?:Number,fn?:Function)
* 1.即将消逝的数据
* 2.数据停留时间(可选),默认5秒
* 3.数据消逝后执行的回调(可选,回调参数中包含具体信息),默认为空函数
* 
* @methods 
* 1.wish(fn:Function):如果数据还没有消逝,则调用传入的回调函数(fn),并统计回调成功的次数
* 
* ***/

const { Meteor } = Tofu

//构造示例
const dataWillDie = new Meteor(
    { name: 'Met' }, 
    9000, 
    (res) => { 
        if(res.isCrashed){
            console.log(`
            消逝的数据是${JSON.stringify(res.crashedValue)}
            wish成功调用了${res.meteor.wishComeTrueTime}次
            `);
        }
    }
)

//原型方法 wish() 示例
dataWillDie.wish(val => console.log(`Hi, ${val.name}`))
```
## Black8  
###### 创建一个很容易报错的数据
```javascript
/***
* 
* @params (obj?:any,deep?:Boolean)
* 1.数据源(可选),任意类型,推荐为键值对,如果不是键值对将自动匹配为value属性的值
* 2.是否进行深度构建(可选),默认为关闭,开启后所有的子对象都会转化为Black8的实例
* 
* @methods 
* 1.boom(msg?:String):直接抛出错误信息为(msg)的异常,并对错误信息进行统计
* 2.getErrorInfo(reason?:String):返回对应原因(reason)的错误统计信息,无参数时返回所有统计信息
* 
* ***/

const { Black8 } = Tofu

//构造示例
const userData = new Black8(
    {
        name: 'tony',
        id: 1,
        info: {
            grade: 7,
            sex: 'male',
            borther: {
                name: 'jake',
                grade: 6
            }
        }
    },
    true
)
//或
const dataBetterJustRead = new Black8('you better use me carefully')

//原型方法 boom() 示例
userData.boom('grade should bigger than 1')
//原型方法 getErrorInfo() 示例
console.table(userData.getErrorInfo())
```
## Chaos  
###### 创建一片混沌
```javascript
/***
* 
* @params (length?:Number)
* 1.长度(可选),默认为1,将返回对应长度的混乱的可遍历数组
* 
* @methods 
* 1.evolution(time?:Number):将数组中所有数据进行(time,默认为1)次的随机类型转化或序列化处理
* 
* ***/

const { Chaos } = Tofu

//构建示例
const chaos = new Chaos(100)

//原型方法 evolution() 示例
chaos.evolution(1000)

```
## Cleaner  
###### 快速清理一份数据
```javascript
/***
* 
* @params (obj?:Object,rules?(target,smart,special):Object)
* 1.数据源(可选),要清理的数据,会对对象属性以及子对象都进行深度清理,
* 2.清理规则(可选,{ target?:any,smart?:Boolean,special?:Object }),
*       target:每个属性被清理后的值,默认为undefined
*       smart:是否开启智能模式,即按照属性类型清理为合适的值,默认关闭
*       special:特殊处理组,如数据源中包含对应属性,将按照键值对的值赋给对应属性,默认空对象
* 
* @methods 
* 1.clean():按照规则(构造时传入的rules)执行一次清理(构造函数创建也会自动执行一次)
* 2.setCleanRules(rules?:Object):将实例的规则覆盖为对应的规则(传入的属性才覆盖)
* 
* ***/

const Cleaner = { Tofu }

//构造示例
const userForm = new Cleaner(
    {
        name: 'tony',
        age: 12,
        detail: {
            sex: 'male',
            like: ['singing', 'swimming'],
            borther: {
                age: 10,
                name: 'Jake'
            }
        }
    },
    {
        target: null,
        special: { age: 100 }
    }
)
//或
const initData = new Cleaner();

//原型方法 setCleanRules() 示例
userForm.setCleanRules({ smart: true, special: { age: 13 } })

//原型方法 clean() 示例
userForm.clean();

```
