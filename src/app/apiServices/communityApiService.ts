import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { BoArticle, BoArticleInput, SearchArticlesObj, SearchMemberArticlesObj } from "../../types/boArticle";
import { serverApi } from "../../lib/config";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTargetArticles(data: SearchArticlesObj): Promise<BoArticle[]> {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("getTargetArticles STATE ::", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR :: getTargetArticles ${err.message}`);
      throw err;
    }
  };

  public async getMemberCommunityArticles(data: SearchMemberArticlesObj): Promise<BoArticle[]> {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {withCredentials: true});

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("getMemberCommunityArticles STATE ::", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR :: getMemberCommunityArticles ${err.message}`);
      throw err;
    }
  };

  public async getChosenArticle(art_id: string) {
    try {
      let url = `/community/single-article/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:::", result.data.state);

      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR :: getChosenArticle ${err.message}`);
      throw err;
    }
  };

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append('community_image', image);
      console.log("IMAGE :::", image);

      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("uploadImageToServer STATE ::", result.data.state);

      const iamge_name: string = result.data.data;
      return iamge_name;
    } catch (err: any) {
      console.log(`ERROR :: uploadImageToServer ${err.message}`);
      throw err;
    }
  };

  public async createArticles(data: BoArticleInput) {
    try {
      const result = await axios.post(
        this.path + "/community/create", 
        data,
        {withCredentials: true}
      );

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("createArticles STATE ::", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR :: createArticles ${err.message}`);
      throw err;
    }
  };
};

export default CommunityApiService;