import { UserModel } from "../../data/models/user.model";

export class AppConfig {
    private domain = "https://api-test-web.agiletech.vn";

    constructor() { }

    getDomain() {
        return this.domain;
    }

     setUserId(userId: number){
      localStorage.setItem('userId', JSON.stringify(userId));
    }

     getUserId(){
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

    getUserInfo() {
      try {
          const userInfo = localStorage.getItem('userInfo');
          if (userInfo) {
              return userInfo;
          }

          return null;
      } catch (error) {
          throw error;
      }
    }

    setUserInfo(username: string) {
      localStorage.setItem('userInfo', username);
    }

     getAccessToken() {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return null;
      }

      return accessToken;
    }

     setAccessToken(token: string) {
      localStorage.setItem('accessToken', token);
    }

     getRefreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
          return null;
      }

      return refreshToken;
    }

     setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }

    setTimeExpires() {
      let endTime = Date.now() + 2 * 60 * 1000;
      localStorage.setItem('expireTime', endTime.toString());
    }

    isExpired() {
      const endTimeStr = localStorage.getItem('expireTime');

      if (endTimeStr !== null) {
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        return now >= endTime;
      }

      return true;
    }


    async clear() {
      localStorage.clear();
    }
}