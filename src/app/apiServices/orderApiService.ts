import axios from "axios";
import { CartItem } from "../../types/others";
import { serverApi } from "../../lib/config";
import assert from "assert";
import { Definer } from "../../lib/Definer";

class OrderApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    async createOrder(data: CartItem[]): Promise<any> {
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
            console.log("ORDER ::", order)
            return true
        } catch (err: any) {
            console.log(`ERROR :: createOrder, ${err.message}`);
            throw err;
        }
    }
};

export default OrderApiService;