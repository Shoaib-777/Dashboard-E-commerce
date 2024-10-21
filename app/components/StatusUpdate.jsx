
const StatusUpdate = ({order}) => {
    return (
        <form action="">
            <select className="border border-gray-300 rounded-md p-2">
                <option value="Pending" selected={order.orderStatus === "pending"}>Pending</option>
                <option value="Completed" selected={order.orderStatus === "completed"}>Completed</option>
            </select>
        </form>
    )
}

export default StatusUpdate