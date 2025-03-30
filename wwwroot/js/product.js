
async function fetchProducts() {
    try {
        let response = await fetch('/api/products');
        let products = await response.json();

        let tableBody = document.getElementById('productTable');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        products.forEach(product => {
            let row = `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} VND</td>
                <td>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// Lấy sản phẩm theo ID
async function getProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Product not found");
        return await response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

// Thêm sản phẩm mới
async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Thêm sản phẩm thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi thêm sản phẩm.');
    }
}

async function editProduct(id) {
    let response = await fetch(`/api/products/${id}`);
    let product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
}

// Cập nhật sản phẩm
async function updateProduct() {
    const id = document.getElementById('productId').value;
    const product = {
        id: id,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    let response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Cập nhật thành công!');
        fetchProducts();
    } else {
        alert('Lỗi khi cập nhật sản phẩm.');
    }
}

// Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        return; // Hủy nếu người dùng không đồng ý
    }

    try {
        const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error("Lỗi khi xóa sản phẩm");
        }

        alert("Xóa sản phẩm thành công!");
        fetchProducts(); // Cập nhật danh sách sản phẩm sau khi xóa
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
}


window.onload = fetchProducts;