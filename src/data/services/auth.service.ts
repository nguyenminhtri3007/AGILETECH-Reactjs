import { AppConfig } from "../../common/config/app.config";
import CustomAxios from "../../common/config/axios.config";
import { HttpCode } from "../../common/resource/http-code";
import { HandleHttp } from "../../common/service/handle-http";
import { AuthModel } from "../models/auth.model";

const appConfig = new AppConfig();

const ALLOWED_USERNAMES = [
  "admin", "admin1", "admin2",
  "adminRefresh", "adminRefresh1", "adminRefresh2", "adminRefresh3", "adminRefresh4", "adminRefresh5", "adminRefresh6", "adminRefresh7", "adminRefresh8", "adminRefresh9", "adminRefresh10"
];

export const signIn = async (data: AuthModel) => {
  try {
    if (!ALLOWED_USERNAMES.includes(data.username)) {
      throw new Error("Tài khoản không hợp lệ. Vui lòng sử dụng tài khoản test được cấp.");
    }
    const domain = appConfig.getDomain();
    const payload = AuthModel.toJson(data);
    const resp = await CustomAxios.post(
      `${domain}/auth/login`,
      payload
    );
    appConfig.setAccessToken(resp.data?.accessToken);
    appConfig.setRefreshToken(resp.data?.refreshToken);
    return true;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}

export const refreshToken = async () => {
  try {
    const domain = appConfig.getDomain();
    const refreshToken = await appConfig.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Không tìm thấy refresh token.");
    }
    const resp = await CustomAxios.post(
      `${domain}/auth/refreshToken`,
      { refreshToken }
    );
    appConfig.setAccessToken(resp.data?.accessToken);
    return resp.data?.accessToken;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}

export const logout = async () => {
  try {
    const domain = appConfig.getDomain();
    const accessToken = await appConfig.getAccessToken();
    await CustomAxios.post(`${domain}/auth/logout`, { accessToken });
    await appConfig.clear();
    return true;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}