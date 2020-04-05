import bem from '@/mixins/bem';

const install = function (Vue) {
    Vue.component(this.name, this);
};

export default function (sfc) {
    sfc.components = Object.assign(sfc.components || {}, {});
    sfc.name = `tt-${sfc.name}`;
    sfc.install = sfc.install || install;
    sfc.mixins = sfc.mixins || [];
    sfc.mixins.push(bem);
    sfc.methods = sfc.methods || {};
    return sfc;
}
