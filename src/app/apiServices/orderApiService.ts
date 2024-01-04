import axios from "axios";
import { CartItem } from "../../types/others";
import { serverApi } from "../../lib/config";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Order } from "../../types/order";

class OrderApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    async createOrder(data: CartItem[]) {
        try {
            const url = "/orders/create";
            const result = await axios.post(
                    this.path + url, 
                    data, 
                    { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("state", result.data.state);

            const order: any = result.data.data;
            console.log("ORDER ::", order);

            return true;
        } catch (err: any) {
            console.log(`ERROR :: createOrder, ${err.message}`);
            throw err;
        }
    }

    async getMyOrder(order_status: string): Promise<Order[]> {
        try {
            const url = `/orders?status=${order_status}`,
                result = await axios.get(this.path + url, { withCredentials: true });
        
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("getMyOrder STATE ::", result.data.state);
        
            const orders: any = result.data.data;
            console.log("orders:::", orders);

            return orders;
        } catch (err: any) {
            console.log(`ERROR :: getMyOrder, ${err.message}`);
            throw err;
        }
    }

    async updateOrderStatus(data: any): Promise<Order> {
        try {
            const url = "/orders/edit";
            const result = await axios.post(
                    this.path + url, 
                    data, 
                    { withCredentials: true }
                );
        
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "muvaffaqiyatsiz", result?.data?.message);
            console.log("updateOrderStatus STATE ::", result.data.state);
        
            const order: any = result.data.data;
            return order;
        } catch (err: any) {
            console.log(`ERROR :: updateOrderStatus, ${err.message}`);
            throw err;
        }
    }
};

export default OrderApiService;