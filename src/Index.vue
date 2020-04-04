<template>
    <div id="timer">
        <p class="timer_date">{{date}}</p>
        <p class="timer_day">{{day}}</p>
        <p class="timer_time">{{time}}</p>
    </div>
</template>
<script>
export default {
    name: 'Timer',
    data() {
        return {
            date: '',
            day: '',
            time: '',
            timer: null
        }
    },
    methods: {
        dateFormat: (date, fmt = "yyyy-MM-dd hh:mm:ss") => {
            if (!date) {
                return "";
            }
            if (typeof date === "string") {
                date = new Date(date.replace(/-/g, "/"));
            }
            if (typeof date === "number") {
                date = new Date(date);
            }
            // const date = new Date(timeStamp * 1000);
            const o = {
                "M+": date.getMonth() + 1, // 月份
                "d+": date.getDate(), // 日
                "h+": date.getHours(), // 小时
                "m+": date.getMinutes(), // 分
                "s+": date.getSeconds(), // 秒
                S: date.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        // RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                        RegExp.$1.length === 1
                            ? o[k]
                            : String("00" + o[k]).substr(("" + o[k]).length)
                    );
                }
            }
            return fmt;
        },
        transDay(index) {
            let map = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
            return map[index - 1];
        },
        init() {
            let current = new Date();
            this.date = this.dateFormat(current, 'yyyy年MM月dd日');
            this.day = this.transDay(current.getDay());
            this.time = this.dateFormat(current, 'hh时 mm分 ss秒');
            this.updateTime();
        },
        // 更新时间
        updateTime() {
            this.timer = setInterval(() => {
                this.time =  this.dateFormat(new Date(), 'hh时 mm分 ss秒');
                if (this.time === '59时 59分 59秒') {
                    this.updateDate();
                }
            }, 1000);
        },
        // 更新日期和星期数
        updateDate() {
            let current = new Date();
            this.date = this.dateFormat(current, 'yyyy年MM月dd日');
            this.day = this.transDay(current.getDay());
        }
    },
    created() {
        this.init();
    },
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>
<style lang="less" scope>
#timer {
    text-align: center;
    font-size: 30px;
    p {
        &:nth-child(2) {
            padding: 20px;
            color: #2d8cf0;
        }
        &:last-child {
            font-size: 26px;
        }
    }
}
</style>