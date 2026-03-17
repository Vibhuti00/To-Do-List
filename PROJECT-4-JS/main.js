var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var form = document.getElementById('form');
var inputText = document.getElementById('text');
var table = document.querySelector('table tbody');
var list = [];
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var obj = {
        id: Date.now(),
        text: inputText.value,
        isComplete: false
    };
    list.push(obj);
    inputText.value = '';
    inputText.focus();
    displayData();
});
var displayData = function () {
    table.innerHTML = '';
    list.forEach(function (value, index) {
        var row = document.createElement('tr');
        row.innerHTML =
            "\n            <td>".concat(index + 1, "</td>\n            <td class=\"").concat(value.isComplete ? 'cancelled' : '', "\">\n                ").concat(value.text, "\n            </td>\n            <td>\n            ").concat(!value.isComplete
                ?
                    "<button class=\"btn btn-success\"\n                onclick=\"handleComplete(".concat(value.id, ")\">\n                Complete\n                </button>")
                :
                    "<button class=\"btn btn-danger\"\n                onclick=\"handleDelete(".concat(value.id, ")\">\n                Remove\n                </button>"), "\n            </td>\n        ");
        table.appendChild(row);
    });
};
function handleDelete(id) {
    list = list.filter(function (value) { return value.id !== id; });
    displayData();
}
function handleComplete(id) {
    list = list.map(function (value) {
        if (value.id === id) {
            return __assign(__assign({}, value), { isComplete: true });
        }
        return value;
    });
    displayData();
}
