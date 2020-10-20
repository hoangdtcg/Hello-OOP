const listProduct = document.getElementById("list-product");
const inputName = document.getElementById('add-product-name');
const inputPrice = document.getElementById('add-product-price');
const inputDesc = document.getElementById('add-product-desc');

let current = -1;
let products = [];
loadData();

function displayProducts() {
    let str = `<tr>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th colspan="2">Action</th>
                </tr>`;

    for (let i = 0; i < products.length; i++) {
        str += products[i].getHtml();

    }

    listProduct.innerHTML = str;
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveData();
    displayProducts();
}

function editProduct(index) {
    // let edit = prompt("Nhap ten moi cua san pham");
    // if (edit === '' || edit === null) return;
    // products[index] = edit;

    document.getElementById('edit-product-name').value = products[index].name;
    document.getElementById('edit-product-price').value = products[index].price;
    document.getElementById('edit-product-desc').value = products[index].desc;
    current = index;

    // displayProducts();
}

function addProduct() {
    // let product = [inputName.value,inputPrice.value];
    let product = new Product(inputName.value,inputPrice.value,inputDesc.value);
    if (product[0] == '' || product[1] == '') {
        alert("Vui long nhap san pham!");
        inputName.focus();
        return;
    }
    products.push(product);
    clearInput();
    saveData();
    displayProducts();
}

function updateProduct() {
    products[current].name = document.getElementById('edit-product-name').value;
    products[current].price = document.getElementById('edit-product-price').value;
    products[current].price = document.getElementById('edit-product-desc').value;
    saveData();
    displayProducts();
    clearInput();
}

function clearInput() {
    document.getElementById('add-product').reset();
    document.getElementById('edit-product').reset();
}

function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadData() {
    if(localStorage.hasOwnProperty('products')){
        let arr = JSON.parse(localStorage.getItem('products'));
        for (let i = 0; i < arr.length; i++) {
            let product = new Product(arr[i]['name'],arr[i]['price'],arr[i].desc);
            product.id = i;
            products.push(product);
        }
    }

}

displayProducts();

