const path = require('path'); 
const fs = require("fs");
class Task {
    word = [];
    right = [];
    len = 6;
    static authType = {
        None: 0, // 未选中
        OK: 1, // 正确位置
        AVAIABLE: 2, // 字母正确 位置错误
        BLOCKED: 3, // 不允许出现的位置
        INVALID: 4
    }
    // static options = {
    //     right: [],
    //     word: [],
    //     len: 6
    // };
    constructor(options) {
        let right = [];
        for(var i= "A";i <= "Z";i++) {
            right.push({
                name: i,
                state: Task.authType.None,
                position: []
            });
        }
        this.right = [right, ...options.right];
        if(options.word.length == 0) {
            this.word = [];
        } else {
            this.word = options.word;
        }
        if(options.len > 0) {
            this.len = options.len;
        }
    }
    async state() {
        return {
            right: this.right,
            word: this.word,
        };
    }
    async start () {
        let data = await this.init();
        await this.run(data);
    }
    async run (data) {
        for(var i=0; i<data.length; i++) {
            if (data[i].length == this.len) {
                if(await this.check(data[i])) {
                    await this.update(data[i]);
                }
            }
        }
    }
    async update(data) {
        await this.insertWord(data);
    }
    async insertWord(data) {
        this.word.push(data);
    }
    async check(data) {
        let state = await this.state();
        let flag = true;
        if(state.right.length > 0) {
            let right = state.right.filter(d=> d.state != Task.authType.None);
            for(var i=0;i< right.length;i++) {
                if(!flag) {
                    break;
                }
                if(right[i].state == Task.authType.OK) {
                    for(var p=0;p< right[i].position.length;p++) {
                        if(data.substr(right[i].position[p],1) == right[i].name.toLowerCase()) {
                            continue;
                        }else{
                            flag = false;
                        }
                    }
                }
                if(right[i].state == Task.authType.AVAIABLE) {
                    if(!data.includes(right[i].name.toLowerCase())) {
                        flag = false;
                    }
                }
                if(right[i].state == Task.authType.INVALID) {
                    if(data.includes(right[i].name.toLowerCase())) {
                        flag = false;
                    }else {
                        continue;
                    }
                    // console.log(data, data.includes(right[i].name.toLowerCase()), right[i].name, "test");
                }
                if(right[i].state == Task.authType.BLOCKED) {
                    for(var j=0; j<right[i].position.length; j++) {
                        if(data.substr(right[i].position[j], 1) == right[i].name.toLowerCase()) {
                            flag = false;
                        } else {
                            continue;
                        }
                    }
                }
            }
        }
        return flag;
    }
    async init() {
        let jsondata = fs.readFileSync(path.join(__dirname, 'en_word.json'));
        jsondata = JSON.parse(jsondata);
        return jsondata;
    }
    getTask() {
        return {
            len: this.len,
            word: this.word,
            right: this.right
        };
    }
};
const main = async function() {
    let right = [
        {
            name: "A",
            state: Task.authType.OK,
            position: [0]
        },
        {
            name: "I",
            state: Task.authType.OK,
            position: [1]
        },
        {
            name: "R",
            state: Task.authType.BLOCKED,
            position: [5]
        },
        {
            name: "R",
            state: Task.authType.OK,
            position:[2]
        },
        {
            name: "I",
            state: Task.authType.AVAIABLE,
            position:[]
        },
        {
            name: "P",
            state: Task.authType.AVAIABLE,
            position: []
        },
        {
            name: "O",
            state: Task.authType.AVAIABLE,
            position: []
        },
        {
            name: "P",
            state: Task.authType.BLOCKED,
            position: [3]
        },
        {
            name: "O",
            state: Task.authType.BLOCKED,
            position: [4]
        },
        {
            name: "I",
            state: Task.authType.BLOCKED,
            position:[4]
        },
        {
            name: "S",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "E",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "V",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "C",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "T",
            state: Task.authType.INVALID,
            position: []
        },
    ];
    let len = 7;
    let task = new Task({
        right,
        len,
        word: []
    });
    await task.start();
    console.log(task.getTask());
}

main();