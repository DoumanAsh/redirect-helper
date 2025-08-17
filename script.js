function copy_to_clipboard(value) {
    if (value === '') {
        return;
    }

    navigator.clipboard.writeText(value)
}

function on_click(event) {
    var row = event.srcElement
    if (row.nodeName === "TD") {
        row = row.parentElement
    }

    alert("Copy '" + row.children[0].innerHTML + "' to the clipboard")
    copy_to_clipboard(row.children[1].innerHTML)
}

window.onload = function() {
    var table = document.getElementById("table")

    var query_idx = window.location.href.indexOf('?')
    if (query_idx !== -1) {
        var query_split = window.location.href.slice(query_idx + 1).split('&');

        for (var query_split_idx = 0; query_split_idx < query_split.length; query_split_idx++) {
            var query_param = query_split[query_split_idx];
            if (query_param === '') {
                continue;
            }
            var query_param_split = query_param.split('=');

            var query_param_name = query_param_split[0]
            var query_param_value = query_param_split[1]
            if (query_param_value === undefined) {
                query_param_value = ''
            }

            //apend new row
            var new_row = table.insertRow(-1)
            new_row.classList.add("table_row")

            var name_cell = new_row.insertCell(0)
            var value_cell = new_row.insertCell(1)

            name_cell.innerHTML = query_param_name
            value_cell.innerHTML = query_param_value
            new_row.addEventListener('click', on_click)
        }
    }
};
