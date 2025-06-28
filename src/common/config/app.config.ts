import { UserModel } from "../../data/models/user.model";

export class AppConfig {
    private domain = "https://api-test-web.agiletech.vn";

    constructor() { }

    getDomain() {
        return this.domain;
    }

    async setUserId(userId: number){
      localStorage.setItem('userId', JSON.stringify(userId));
    }

    async getUserId(){
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                return JSON.parse(userId) as number;
            }

            return -1;
        } catch (error) {
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                return JSON.parse(userInfo);
            }

            return null;
        } catch (error) {
            throw error;
        }
    }

    async setUserInfo(userInfo: UserModel) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    async getAccessToken() {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return null;
      }

      return accessToken;
    }

    async setAccessToken(token: string) {
      localStorage.setItem('accessToken', token);
    }

    async getRefreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
          return null;
      }

      return refreshToken;
    }

    async setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }

    async clear() {
       localStorage.clear();
    }
}