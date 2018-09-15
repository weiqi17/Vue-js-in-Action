Vue.component('list', {
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    //   template: '\// <div> \
    // 	<div v-for="(item,index) in list" :class="{\'list-item\':true}"> \
    // 		<span>{{ item.name }}：</span> \
    // 		<div :class="{\'list-msg\':true}"> \
    // 			<p>{{ item.message }}</p> \
    // 			<a :class="{\'list-reply\':true}" @click="handleReply(index)">回复</a> \
    // 			<a :class="{\'list-delete\':true}" @click="handleDel(index)">删除</a> \
    // 		</div> \
    // 	</div> \
    // 	<div v-if="!list.length" :class="{\'list-nothing\':true}">留言列表为空</div> \
    // </div>',
    render: function(h) {
        var _this = this;
        var list = [];
        this.list.forEach(function(msg, index) {
            var node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [
                h('span', msg.name + '：'),
                h('div', {
                    attrs: {
                        class: 'list-msg'
                    }
                }, [
                    h('p', msg.message),
                    h('a', {
                        attrs: {
                            class: 'list-reply'
                        },
                        on: {
                            click: function() {
                                _this.handleReply(index);
                            }
                        }
                    }, '回复'),
                    h('a', {
                        attrs: {
                            class: 'list-delete'
                        },
                        on: {
                            click: function() {
                                _this.handleDel(index);
                            }
                        }
                    }, '删除')
                ])
            ])
            list.push(node);
        });
        if (this.list.length) {
            return h('div', {
                attrs: {
                    class: 'list'
                }
            }, list);
        } else {
            return h('div', {
                attrs: {
                    class: 'list-nothing'
                }
            }, '留言列表为空');
        }
    },
    // methods: {
    //     handleReply: function(index) {
    //         this.$emit('reply', index);
    //     },
    //     handleDel: function(index) {
    //         this.list.splice(index, 1);
    //     }
    // }
})