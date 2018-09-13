function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + ' ');
}

Vue.component('input-number', {
    template: '\
    <div>\
        <input type="text" :value="currentValue" @change="handleChange" @keydown="handleKeydown" />\
        <button @click="handleReduce" :disabled="currentValue <= min">-</button>\
        <button @click="handleAdd" :disabled="currentValue >= max">+</button>\
    </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        handleChange: function (event) {
            var val = event.target.value.trim();
            if (isValueNumber(val)) {
                var max = this.max;
                var min = this.min;
                val = Number(val);
                this.currentValue = val;
                if (val > max) this.currentValue = max;
                if (val < min) this.currentValue = min;
            } else {
                event.target.value = this.currentValue;
            }
        },
        handleKeydown: function (event) {
            if (event.keyCode == 38) {
                this.handleAdd();
            }
            if (event.keyCode == 40) {
                this.handleReduce();
            }
        },
        handleAdd: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleReduce: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    },
});