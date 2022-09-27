/* Written by Christian Hall
 * Date: 9/27/2022
 * Purpose: Easy method of viewing query parameters parsed into a javascript object literal.
 *
 */

let splitEquals = (item) => {
    equals_idx = item.indexOf("=")
    split_on_equals = item.split("=")

    key = split_on_equals[0]
    value = split_on_equals[1]

    return { [key]: value }
};

let isValidUrl = (string) => {
    // first arg (start): inclusive
    // second arg (end): non-inclusive
    protocol = string.slice(0, 5);
    tcp_protocol = string.slice(0, 6);

    return protocol === "http:" || tcp_protocol === "https:"
}

let getFirstParam = (first_item) => {
    /* First item refers to the first string after the split on and symbol for query strings 
     * 
     * ex. 'http://localhost:8000/api/v3/ocm-inbound-importable/?cable_import=True'
     */
    is_url = isValidUrl(first_item)

    if (!is_url) {
        return { "invalid": "Please provide a valid url." }
    }

    first_arg_start_idx = first_item.indexOf("?")
    console.log(first_item)
    question_mark_slice = first_item.slice(first_arg_start_idx + 1, first_item.length)

    first_arg_end_idx = question_mark_slice.indexOf("=")

    mapping = splitEquals(question_mark_slice)
    //first_arg = question_mark_slice.slice(0, first_arg_end_idx)

    return mapping
}

let getRestParams = (rest_items) => {
    /* Parse the rest of the query parameters, only first one has special rule.
     *
     * ex. 'country=US'
     */
    return rest_items.map((item) => splitEquals(item))
}

let splitQueryParams = (url) => {
    split_url = url.split("&")

    one = getFirstParam(split_url[0])
    rest = getRestParams(split_url.slice(1, split_url.length))

    //full_params_list = one + rest.join("")
    console.log("one", one);
    console.log("rest", rest);

    //console.log("Params parsed: ", full_params_list);
}

//isValidUrl = (string) => {
//    let url;
//
//    try {
//        url = new URL(string);
//    } catch (_) {
//        return false;
//    }
//
//    return url.protocol === "http:" || url.protocol === "https:"
//}


script_name = process.argv[1]
user_provided_arg = process.argv[2]

splitQueryParams(user_provided_arg)





/* Bonus: In browser way of getting url query parameters */
let getParamsInBrowser = (url) => {
    /* Coincidentally also works with node so could use this instead if desired */
    obj = new URL(url)
    for ([k, v] of obj.searchParams.entries()) {
        console.log(k, v);
    }
}

url = "http://localhost:8000/api/v3/ocm-inbound-importable/?cable_import=True&country=US&expand=material,material.pricing,storage_location,location.plant&page_size=all&planning_order=906122107&price_list=27&pricing_date=2019-10-05"
getParamsInBrowser(url)
