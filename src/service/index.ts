import { get } from "@/utils/request";

export function getSome(params: any) {
  return get("url", params);
}
