import { FetchSingleOrder, updateOrderStatus } from "@/app/lib/FetchOrders";

const OrderDetails = async ({ params }) => {
    const { id } = params;
    const order = await FetchSingleOrder(id);  // Fetch the specific order by id
    const products = order.products;  // Extract the products array from the order data

    // Function to calculate the total price for all products in the order
    const calculateTotal = () => {
        return products.reduce((total, product) => {
            return total + product.productPrice * product.productQuantity;
        }, 0).toFixed(2);
    };
    const handleStatusUpdate = async (formData) => {
        "use server"; // Enabling server-side form actions
        const status = formData.get("status");
        await updateOrderStatus({ orderId: id, status });
    };

    return (
        <div className="container mx-auto p-4 overflow-y-auto h-[100%]">
            <div className="flex gap-4 justify-center items-center mb-6">
                <h3 className="text-lg font-semibold">Order Status</h3>
                <form action={handleStatusUpdate}>
                    <select name="status" className="border border-gray-300 rounded-md p-2">
                        <option value="Pending" selected={order.orderStatus === "Pending"}>Pending</option>
                        <option value="Completed" selected={order.orderStatus === "Completed"}>Completed</option>
                    </select>
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Update Status</button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-blue-500 text-white text-sm uppercase">
                            <th className="px-3 py-3 border">Order ID</th>
                            <th className="px-3 py-3 border text-center">Product ID</th>
                            <th className="px-6 py-3 border">Title</th>
                            <th className="px-6 py-3 border">Description</th>
                            <th className="px-6 py-3 border">Image & Category</th>
                            <th className="px-6 py-3 border">Price</th>
                            <th className="px-6 py-3 border">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border text-gray-700 text-sm">
                                <td className="px-3 py-2 border ">{order.orderId}</td>
                                <td className="px-6 py-4 border">{product.productId}</td>
                                <td className="px-6 py-4 border">{product.productTitle}</td>
                                <td className="px-6 py-4 border min-w-[200px]">{product.productDescription}</td>
                                <td className="px-6 py-4 border">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={product.productImage}
                                            alt={product.productTitle}
                                            className="w-20 h-20 object-contain mb-2"
                                        />
                                        <span className="text-xs font-semibold text-red-500">{product.productCategory}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 border">${product.productPrice}</td>
                                <td className="px-6 py-4 border">{product.productQuantity}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100">
                            <td className="px-6 py-4 border text-right font-semibold" colSpan="2">
                                Total Amount
                            </td>
                            <td className="px-6 py-4 border font-semibold text-end" colSpan="4">${calculateTotal()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
