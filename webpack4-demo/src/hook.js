
class SyncHook {
    constructor() {
        this.tasks = []
    }
    tap(event, task) {
        this.tasks.push(task)
    }
    call(...args) {
        // this.tasks.forEach(item => {item(...args)})
        // this.tasks.forEach(item => item.apply(this, args))
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (index === this.tasks.length) return finalCallback()
            this.tasks[index++](...args, next)
        }
        next()
    }
}

let l = new SyncHook(['name']);
l.tap('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name);
        cb()
    }, 1000)
})
l.tap('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name);
        cb()
    }, 1000)
})
l.call('xhq', () => {
    console.log('end')
})
