<template>
    <div class="root">
        <div class="row">
            <span>时间戳转日期：</span>
            <input v-model="inputs.num1" placeholder="请输入时间戳" type="text" />
            <button @click="submit(1)">确认</button>
            <div class="result">
                {{ results.num1 }}
                <img @click="copys(1)" src="../static/img/copy.png" alt="">
            </div>
        </div>
        <div class="row">
            <span>日期转时间戳：</span>
            <input v-model="inputs.num2" placeholder="请输入日期" type="text" />
            <button @click="submit(2)">确认</button>
            <div class="result">
                {{ results.num2 }}
                <img @click="copys(2)" src="../static/img/copy.png" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive } from 'vue';
    import { ElMessage } from 'element-plus'

    const inputs = reactive({
        num1: '',
        num2: ''
    })
    const results = reactive({
        num1: '',
        num2: ''
    })
    const submit = (index) => {
        let time = ''
        if(index === 1){
            results.num1 = ''
            time = inputs.num1
            if (time.toString().length === 10) {
                time *= 1000;
            }
            const date = new Date(time*1);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');  // 月份从0开始，需要加1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            results.num1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }else{
            results.num2 = ''
            time = inputs.num2;
            if (!time.includes(' ')) {
                time += ' 00:00:00';
            }
            const date = new Date(time);
            results.num2 = Math.floor(date.getTime() / 1000);
        }
    }
    
    const copys = (index) => {
        if(!results.num1&&!results.num2) return ElMessage.warning('内容为空')
        const str = index===1?results.num1:results.num2
        if (navigator.clipboard) {
            navigator.clipboard.writeText(str).then(() => {
                ElMessage.success('复制成功')
            }).catch(err => {
                ElMessage.error('复制成功')
            })
        }else{
            const textArea = document.createElement('textarea');
            textArea.value = str;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            ElMessage.success('复制成功')
        }
    }
</script>
<style lang="less" src="./css/time.less"></style>