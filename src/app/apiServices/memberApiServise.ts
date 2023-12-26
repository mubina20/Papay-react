import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";

class MemberApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async loginRequest(login_data: any): Promise<Member> {
        try {
            const result = await axios.post(
                this.path + "/login", 
                login_data, 
                {withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "muvaffaqiyatsiz", result?.data?.message);
            console.log("Login STATE :: ", result.data.state);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            console.log("Login MEMBER :: ", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR :: loginRequest: ${err.message}`);
            throw err;
        }
    }

    public async signupRequest(signup_data: any): Promise<Member> {
        try {
            const result = await axios.post(
                this.path + "/signup", 
                signup_data, 
                {
                withCredentials: true}
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "muvaffaqiyatsiz", result?.data?.message);
            console.log("Signup STATE ::", result.data.state);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            console.log("Signup MEMBER :: ", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR :: signupRequest: ${err.message}`);
            throw err;
        }
    }

    public async logOutRequest() {
        try {
            const result = await axios.get(
                this.path + "/logout", 
                { withCredentials: true }
            );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "muvaffaqiyatsiz", result?.data?.message);
        
            const logout_result = result.data.state;
            return logout_result === "success";
        } catch (err: any) {
            console.log(`ERROR :: logOutRequest: ${err.message}`);
            throw err;
        }
    }
};

export default MemberApiService;