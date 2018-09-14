Vue.directive('clickoutside', {
    bind: function(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutSide__ = documentHandler;
        document.addEventListener('click', documentHandler);

        function keyupHandler(e) {
            if (27 === e.keyCode) {
                if (binding.expression) {
                    binding.value(e);
                }
            }
        }
        el.__vueClickOutSide__esc = keyupHandler;
        document.addEventListener('keyup', keyupHandler);
    },
    unbind: function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
        document.removeEventListener('keyup', el.__vueClickOutSide__esc);
        delete el.__vueClickOutSide__esc;
    }
})