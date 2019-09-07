let event = {
    list: {},
    on(key, fn) {
        if(!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn);
    },
    emit(...args) {
        let key = args.shift(),
          fns = this.list[key];

        if(!fns || fns.length === 0) {
            return;
        }
        fns.forEach(fn => {
            fn(...args);
        });
    },
    remove(key, fn) {
        let fns = this.list[key];
        if (!fns) return false;
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    }
}

function cat() {
    console.log('一起喵喵喵');
}
function dog() {
    console.log('一起旺旺旺');
}

event.on('pet', data => {
    console.log('接收数据');
    console.log(data);
});
event.on('pet', cat);
event.on('pet', dog);

event.remove('pet', dog);

event.emit('pet', ['二哈', '波斯猫']);
