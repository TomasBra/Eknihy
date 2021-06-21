

export function checkUrl(props: any): string {
    console.log(props);
    if (String(props.location.pathname).split("/")[1] == "books") {
        return ("/books/" + String(props.location.pathname).split("/")[2]+"/10/" + props.SearchValue);
    }
    else if (String(props.location.pathname).split("/")[3] == "products") {
        return ("/administration/get/products/" + String(props.location.pathname).split("/")[4] + "/10/" + props.SearchValue);
    }
    else if (String(props.location.pathname).split("/")[3] == "users") {
        return ("/administration/get/users/10/" + props.SearchValue);
    }
    else if (String(props.location.pathname).split("/")[3] == "orders") {
        return ("/administration/get/orders/10/" + props.SearchValue);
    }
    else if (String(props.location.pathname).split("/")[1] == "orders") {
        return ("/orders/10/" + props.SearchValue);
    }
    else if (props.location == null || String(props.location.pathname).split("/")[1] != "books") {
        return ("/store/All/10/"+ props.SearchValue);
    }
    return ("/store/" + String(props.location.pathname).split("/")[2]+"/10/" + props.SearchValue);
}