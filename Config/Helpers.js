exports.is1 = (runtime) => {
    return runtime == 1;
};
exports.is2 = (runtime) => {
    return runtime == 2;
};
exports.is3 = (runtime) => {
    return runtime == 3;
};
exports.TakeHalf = (runtime) => {
    var part = runtime.toString().substring(0, 30);
    return `${part}...`;
};

exports.TakePara = (runtime) => {
    var part = runtime.toString().substring(0, 300);
    return `${part}...`;
};
