import { get } from "@/utils/request";

export function getAuth({ code, appid }: { code: string; appid: string }) {
  return get("", { code, appid });
}
