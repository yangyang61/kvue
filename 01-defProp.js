// 响应式
// const obj = {}

function defineReactive(obj, key, val) {

  observe(val)

  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log("key",key)
      return val
    },
    set(newVal) {
      if(newVal !== val) {
        console.log('set' + key + ': ' + newVal) 
        // 如果传入的newVal 是 Object 
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if(typeof obj !== 'object' || obj === null){
    // 希望传入的是ojbect
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {foo: 'foo', bar: 'bar', baz: {a: 1}}

observe(obj)

obj.foo
obj.foo = 'fooooo'
obj.bar
obj.bar = 'barrrrr'
obj.baz.a = 12