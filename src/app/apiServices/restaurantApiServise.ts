import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";

class RestaurantApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    async getTopRestaurants(): Promise<Restaurant[]> {
        try {
            const url = "/restaurants?order=top&page=1&limit=4",
                result = await axios.get(this.path + url, { withCredentials: true });
            assert.ok(result, Definer.general_err1);

            // console.log("getTopRestaurants RESULT ::", result);
            // console.log("getTopRestaurants STATE ::", result.data.state);

            const top_restaurants: Restaurant[] = result.data.data;
            // console.log("TOP Restaurants::", top_restaurants);

            return top_restaurants;
        } catch (err: any) {
            console.log(`ERROR :: getTopRestaurants", ${err.message}`);
            throw err;
        }
    };

    async getRestaurants(data: SearchObj): Promise<Restaurant[]> {
        try {
            const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
                result = await axios.get(this.path + url, { withCredentials: true });
            assert.ok(result, Definer.general_err1);

            // console.log("getRestaurants RESULT ::", result);
            // console.log("getRestaurants STATE ::", result.data.state);

            const restaurants: Restaurant[] = result.data.data;
            // console.log("ALL Restaurants::", restaurants);

            return restaurants;
        } catch (err: any) {
            console.log(`ERROR :: getRestaurants", ${err.message}`);
            throw err;
        }
    }

    async getChosenRestaurant(id: string): Promise<Restaurant> {
        try {
            const url = `/restaurants/${id}`;
            const result = await axios.get(
                this.path + url, 
                { withCredentials: true }
            );
        
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "Muvaffaqiyatsiz!", result?.data?.message);
            console.log("getChosenRestaurant STATE ::", result.data.state);
        
            const restaurant: Restaurant = result.data.data;
            return restaurant;
        } catch (err: any) {
            console.log(`ERROR :: getChosenRestaurant", ${err.message}`);
            throw err;
        }
    }
};

export default RestaurantApiService;