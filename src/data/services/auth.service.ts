import { AppConfig } from "../../common/config/app.config";
import CustomAxios from "../../common/config/axios.config";
import { HttpCode } from "../../common/resource/http-code";
import { HandleHttp } from "../../common/service/handle-http";
import { AuthModel } from "../models/auth.model";

const appConfig = new AppConfig();

export const  signIn = async (data: AuthModel) => {
  try {
    const domain  = appConfig.getDomain();
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